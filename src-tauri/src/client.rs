use nostr_rust::{events::extract_events_ws, nostr_client::Client, Identity, Message};
use tauri::AppHandle;

#[derive()]
pub struct ClientWrapper {
    nostr_client: Client,
    identity: Identity,
    app_handle: AppHandle,
}

impl ClientWrapper {
    pub fn new(identity: Identity, app_handle: AppHandle) -> Self {
        let nostr_client = tauri::async_runtime::block_on(Client::new(vec![
            "wss://nostr.relayer.se",
            "wss://relay.snort.social",
        ]))
        .unwrap();

        Self {
            nostr_client,
            identity,
            app_handle,
        }
    }

    fn handle_message(&self, relay_url: &String, message: &Message) -> Result<(), String> {
        println!("Received message from {}: {:?}", relay_url, message);

        let events = extract_events_ws(message);
        println!("Events: {:?}", events);

        Ok(())
    }

    pub async fn read_messages(&mut self) {
        let events = self.nostr_client.next_data().await.unwrap();

        for (relay_url, message) in events.iter() {
            self.handle_message(relay_url, message).unwrap();
        }
    }
}
