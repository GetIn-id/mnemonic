use dotenv::dotenv;
use nostr_rust::{
    events::extract_events_ws,
    nostr_client::{self, Client},
    req::ReqFilter,
    Identity, Message,
};
use std::{str::FromStr, sync::Arc, sync::Mutex, thread, time::Duration};
use tauri::{AppHandle, Manager};
use tokio::time::sleep;

mod client;
use client::ClientWrapper;

#[cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]
// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn react_loaded(value: bool) -> String {
    println!("{value}");
    String::from("Success")
}

// the payload type must implement `Serialize` and `Clone`.
#[derive(Clone, serde::Serialize)]
struct Payload {
    post: String,
}

// TODO: remove allow lint
#[allow(dead_code)]
fn handle_message(relay_url: &String, message: &Message) -> Result<String, String> {
    //println!("Received message from {relay_url}: {:?}", message);

    let events = extract_events_ws(message);
    println!("Events: {:?}", events[0].get_content());

    let content = events[0].get_content();

    println!("\n");

    Ok(content)
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

            let mut client = ClientWrapper::new(my_identity, app_handle);

            tauri::async_runtime::spawn(async move {
                client.init().await;
            });

            app.listen_global("hello-from-frontend", |event| {
                println!("got payload {:?}", event.payload());
            });

            Ok(())
        })
        .invoke_handler(tauri::generate_handler![react_loaded])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
