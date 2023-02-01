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

mod client;
use client::ClientWrapper;

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
            let mut client_wrapper = ClientWrapper::new(my_identity, app_handle);

            tauri::async_runtime::spawn(async move {
                client_wrapper.read_messages().await;
            });

            //let nostr_client = Arc::new(Mutex::new(
            //    Client::new(vec!["wss://nostr.relayer.se", "wss://relay.snort.social"]).unwrap(),
            //));

            // Run a new thread to handle messages
            //let nostr_clone = nostr_client.clone();
            //let handle_thread = thread::spawn(move || {
            //    println!("Listening...");
            //    let events = nostr_clone.lock().unwrap().next_data().unwrap();

            //    for (relay_url, message) in events.iter() {
            //        handle_message(relay_url, message).unwrap();
            //    }
            //});

            //let subscription_id = nostr_client
            //    .lock()
            //    .unwrap()
            //    .subscribe_with_id(
            //        "my_subscription_id",
            //        vec![ReqFilter {
            //            ids: None,
            //            authors: Some(vec![public_key.to_string()]),
            //            kinds: Some(vec![1]),
            //            e: None,
            //            p: None,
            //            since: None,
            //            until: None,
            //            limit: Some(1),
            //        }],
            //    )
            //    .unwrap();

            //tauri::async_runtime::spawn(async move {
            //    let post = r#"{ id: "7e8aefb9cb8a29f7e0cdca6347f5a9a00a08524666dec4c8f808cc777641952b", pub_key: "66a2eec5ef4a0c232c3c7f8720838a446296194742fe001ccb8dbb926b72518b", created_at: 1674556309, kind: 1, tags: [], content: "Hi everyone I just started to experiment with Nostr in react native and got a little bit stuck. Im following the examples on https://github.com/nbd-wtf/nostr-tools under “interacting with a relay”, and the response from the log is: \n\nconnected to wss://relay.damus.io\n\nfailed to publish to wss://relay.damus.io: event not seen after 5 seconds\n\nHas anyone experienced this before, and if so can you point me to some documentation or examples to help me out?", sig: "97b79bb05d5517e0fd17fb02e9c06ad239091ed7eb30f5a9ec943c6bacea35c6cb059cd0f0fc28f5aa1d82763a07931811db995a4255b9f0d1278fa628cba645" }"#;
            //    loop {
            //        sleep(Duration::from_millis(2000)).await;
            //        app_handle
            //            .emit_all(
            //                "feed-event",
            //                Payload {
            //                    post: post.to_string(),
            //                },
            //            )
            //            .unwrap();
            //    }
            //});

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
            //handle_thread.join().unwrap();
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![greet])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
