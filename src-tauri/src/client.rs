use nostr_rust::{
    events::extract_events_ws, nostr_client::Client, req::ReqFilter, Identity, Message,
};
use serde::{Deserialize, Serialize};
use tauri::{AppHandle, Manager};

#[derive(Serialize, Deserialize, Clone)]
struct Post {
    content: String,
}

#[derive()]
pub struct ClientWrapper {
    nostr_client: Client,
    identity: Identity,
    app_handle: AppHandle,
}

impl ClientWrapper {
    pub fn new(identity: Identity, app_handle: AppHandle) -> Self {
        let nostr_client =
            tauri::async_runtime::block_on(Client::new(vec!["wss://nos.lol"])).unwrap();

        Self {
            nostr_client,
            identity,
            app_handle,
        }
    }

    pub async fn init(&mut self) {
        self.subscribe().await;
        self.read_messages().await;
    }

    fn handle_message(&self, relay_url: &String, message: &Message) -> Result<(), String> {
        println!("Received message from {}: {:?}", relay_url, message);

        let events = extract_events_ws(message);
        println!("Events: {:?}\n", events);

        for event in events {
            if let Err(err) = self.app_handle.emit_all(
                "feed-event",
                Post {
                    content: event.get_content(),
                },
            ) {
                eprintln!("error when emitting feed-event {:?}", err)
            }
        }

        Ok(())
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
                        "884704bd421721e292edbff42eb77547fe115c6ff9825b08fc366be4cd69e9f6"
                            .to_string(),
                    ]),
                    kinds: None,
                    e: None,
                    p: None,
                    since: None,
                    until: None,
                    limit: Some(1),
                }],
            )
            .await
            .unwrap();
    }
}
