use nostr_rust::{
    events::extract_events_ws, nostr_client::Client, req::ReqFilter, Identity, Message,
};
use serde::{Deserialize, Serialize};
use tauri::AppHandle;
use tokio::sync::mpsc;

#[derive(Debug, Deserialize, Serialize, Clone, Copy)]
pub enum ClientCommand {
    ReactLoaded,
    HomeFeedLoaded,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
struct Post {
    content: String,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct FeedPosts {
    posts: Vec<Post>,
}

#[derive()]
pub struct ClientWrapper {
    nostr_client: Client,
    identity: Identity,
    app_handle: AppHandle,
    client_command_rx: mpsc::Receiver<ClientCommand>,
    feed_tx: mpsc::Sender<FeedPosts>,
    feed_posts: FeedPosts,
}

impl ClientWrapper {
    pub fn new(
        identity: Identity,
        app_handle: AppHandle,
        client_command_rx: mpsc::Receiver<ClientCommand>,
        feed_tx: mpsc::Sender<FeedPosts>,
    ) -> Self {
        let nostr_client =
            tauri::async_runtime::block_on(Client::new(vec!["wss://nos.lol"])).unwrap();

        Self {
            nostr_client,
            identity,
            app_handle,
            client_command_rx,
            feed_tx,
            feed_posts: FeedPosts { posts: vec![] },
        }
    }

    pub async fn init(&mut self) {
        while let Some(command) = self.client_command_rx.recv().await {
            match command {
                ClientCommand::ReactLoaded => break,
                _ => continue,
            }
        }
        //self.subscribe().await;
        self.recv_commands().await;
    }

    pub async fn recv_commands(&mut self) {
        while let Some(command) = self.client_command_rx.recv().await {
            match command {
                ClientCommand::HomeFeedLoaded => {
                    self.subscribe().await;
                    self.read_messages_on_demand().await;
                    self.feed_tx.send(self.feed_posts.clone()).await.unwrap();
                }
                _ => {}
            }
        }
    }

    fn handle_message(&mut self, relay_url: &String, message: &Message) -> Result<(), String> {
        println!("Received message from {}: {:?}", relay_url, message);

        let events = extract_events_ws(message);
        println!("Events: {:?}\n", events);

        for event in events {
            self.feed_posts.posts.push(Post {
                content: event.get_content(),
            });
        }

        Ok(())
    }

    pub async fn read_messages_on_demand(&mut self) {
        for (relay_url, message) in self.nostr_client.next_data().await.unwrap().iter() {
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

    pub async fn subscribe(&mut self) {
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
