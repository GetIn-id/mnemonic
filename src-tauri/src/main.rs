use dotenv::dotenv;
use nostr_rust::{
    events::extract_events_ws,
    nostr_client::{self, Client},
    req::ReqFilter,
    Identity, Message,
};
use std::{str::FromStr, sync::Arc, sync::Mutex, thread, time::Duration};
use tauri::Manager;
use tokio::time::sleep;

#[cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]
// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

// the payload type must implement `Serialize` and `Clone`.
#[derive(Clone, serde::Serialize)]
struct Payload {
    post: String,
}

// TODO: remove allow lint
#[allow(dead_code)]
fn handle_message(relay_url: &String, message: &Message) -> Result<(), String> {
    println!("Received message from {relay_url}: {:?}", message);

    let events = extract_events_ws(message);
    println!("Events: {:?}", events);

    Ok(())
}

fn main() {
    // Load .env file
    dotenv().ok();

    tauri::Builder::default()
        .setup(|app| {
            let app_handle = app.app_handle();
            // TODO: How should we really load nost private key
            let private_key = std::env::var("NOSTR_PRIVATE_KEY").unwrap();
            let public_key = std::env::var("NOSTR_PUBLIC_KEY").unwrap();

            let my_identity = Identity::from_str(&private_key).unwrap();

            let nostr_client = Arc::new(Mutex::new(
                Client::new(vec!["wss://nostr.relayer.se", "wss://relay.snort.social"]).unwrap(),
            ));

            // Run a new thread to handle messages
            let nostr_clone = nostr_client.clone();
            let handle_thread = thread::spawn(move || {
                println!("Listening...");
                let events = nostr_clone.lock().unwrap().next_data().unwrap();

                for (relay_url, message) in events.iter() {
                    handle_message(relay_url, message).unwrap();
                }
            });

            let subscription_id = nostr_client
                .lock()
                .unwrap()
                .subscribe_with_id(
                    "my_subscription_id",
                    vec![ReqFilter {
                        ids: None,
                        authors: Some(vec![public_key.to_string()]),
                        kinds: Some(vec![1]),
                        e: None,
                        p: None,
                        since: None,
                        until: None,
                        limit: Some(1),
                    }],
                )
                .unwrap();

            // EXAMPLE, how to emit to frontend
            //tauri::async_runtime::spawn(async move {
            //    let post = "Post";
            //    let mut i = 0;
            //    loop {
            //        sleep(Duration::from_millis(2000)).await;
            //        println!(
            //            "{}",
            //            format_args!("Sending post from Rust backend: {post} {i}")
            //        );
            //        app_handle
            //            .emit_all(
            //                "feed-event",
            //                Payload {
            //                    post: format!("{post} {i}"),
            //                },
            //            )
            //            .unwrap();
            //        println!("{}", i);
            //        i += 1;
            //    }
            //});

            app.listen_global("hello-from-frontend", |event| {
                println!("got payload {:?}", event.payload());
            });

            // Wait for the thread to finish
            handle_thread.join().unwrap();
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![greet])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
