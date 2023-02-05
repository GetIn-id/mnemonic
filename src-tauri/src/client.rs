use nostr_rust::{
    events::extract_events_ws, nostr_client::Client, req::ReqFilter, Identity, Message,
};
use serde::{Deserialize, Serialize};
use tokio::sync::mpsc;

use crate::posts_cache::{Post, PostsCache};

#[derive(Debug, Deserialize, Serialize, Clone)]
pub enum ClientCommand {
    ReactLoaded,
    HomeFeedLoaded,
    Subscribe(String, Vec<ReqFilter>),
}

#[derive()]
pub struct ClientWrapper {
    nostr_client: Client,
    identity: Identity,
    client_command_rx: mpsc::Receiver<ClientCommand>,
    feed_tx: mpsc::Sender<PostsCache>,
    feed_posts: PostsCache,
}

impl ClientWrapper {
    pub fn new(
        identity: Identity,
        client_command_rx: mpsc::Receiver<ClientCommand>,
        feed_tx: mpsc::Sender<PostsCache>,
    ) -> Self {
        let nostr_client =
            tauri::async_runtime::block_on(Client::new(vec!["wss://nos.lol"])).unwrap();

        Self {
            nostr_client,
            identity,
            client_command_rx,
            feed_tx,
            feed_posts: PostsCache { posts: vec![] },
        }
    }

    pub async fn init(&mut self) {
        while let Some(command) = self.client_command_rx.recv().await {
            match command {
                ClientCommand::ReactLoaded => break,
                _ => continue,
            }
        }

        // TODO: This is just a default subscribe for initial subscription
        // Should be removed when we have proper subscription loading in place.
        self.subscribe(
            "dummy_id_for_now",
            vec![ReqFilter {
                ids: None,
                authors: Some(vec![
                    "66a2eec5ef4a0c232c3c7f8720838a446296194742fe001ccb8dbb926b72518b".to_string(),
                ]),
                kinds: Some(vec![1]),
                e: None,
                p: None,
                since: None,
                until: None,
                limit: Some(10),
            }],
        )
        .await;
        self.recv_commands().await;
    }

    pub async fn recv_commands(&mut self) {
        while let Some(command) = self.client_command_rx.recv().await {
            match command {
                ClientCommand::HomeFeedLoaded => {
                    self.read_messages_on_demand().await;
                    self.feed_tx.send(self.feed_posts.clone()).await.unwrap();
                }
                ClientCommand::Subscribe(sub_id, filters) => {
                    self.subscribe(sub_id.as_str(), filters).await;
                }
                _ => {}
            }
        }
    }

    fn handle_message(&mut self, relay_url: &String, message: &Message) -> Result<(), String> {
        let events = extract_events_ws(message);

        for event in events {
            self.feed_posts.insert(Post {
                content: event.get_content(),
            })
        }

        Ok(())
    }

    pub async fn read_messages_on_demand(&mut self) {
        println!("read_messages_on_demand");
        let events = self.nostr_client.next_data().await.unwrap();
        for (relay_url, message) in events.iter() {
            self.handle_message(relay_url, message).unwrap();
        }
    }

    pub async fn read_messages(&mut self) {
        while let Ok(events) = self.nostr_client.next_data().await {
            for (relay_url, message) in events.iter() {
                self.handle_message(relay_url, message).unwrap();
            }
        }
    }

    pub async fn subscribe(&mut self, sub_id: &str, filters: Vec<ReqFilter>) {
        self.nostr_client
            .subscribe_with_id(sub_id, filters)
            .await
            .unwrap();

        self.nostr_client
            .subscribe_with_id(
                "dummy_id_for_now",
                vec![ReqFilter {
                    ids: None,
                    authors: Some(vec![
                        "66a2eec5ef4a0c232c3c7f8720838a446296194742fe001ccb8dbb926b72518b"
                            .to_string(),
                    ]),
                    kinds: Some(vec![1]),
                    e: None,
                    p: None,
                    since: None,
                    until: None,
                    limit: Some(10),
                }],
            )
            .await
            .unwrap();
    }
}
