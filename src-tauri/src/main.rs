use std::str::FromStr;

use dotenv::dotenv;
use nostr_rust::Identity;
use tauri::{Manager, RunEvent};
use tokio::sync::mpsc;
use tokio::sync::Mutex;

mod client;
use client::{ClientCommand, ClientWrapper, FeedPosts};

#[cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

struct ClientCommandChannelTx {
    inner: Mutex<mpsc::Sender<ClientCommand>>,
}
struct FeedChannelRx {
    inner: Mutex<mpsc::Receiver<FeedPosts>>,
}

#[tauri::command]
async fn react_loaded(
    value: bool,
    tx_state: tauri::State<'_, ClientCommandChannelTx>,
) -> Result<String, ()> {
    let sender = tx_state.inner.lock().await;
    if value {
        sender.send(ClientCommand::ReactLoaded).await.unwrap();
    }

    println!("{value}");
    Ok(String::from("Success"))
}

#[tauri::command]
async fn load_home_feed(
    value: bool,
    tx_state: tauri::State<'_, ClientCommandChannelTx>,
    rx_state: tauri::State<'_, FeedChannelRx>,
) -> Result<FeedPosts, ()> {
    println!("load_home_feed");
    let sender = tx_state.inner.lock().await;
    let mut rx = rx_state.inner.lock().await;
    if value {
        sender.send(ClientCommand::HomeFeedLoaded).await.unwrap();
    }

    if let Some(posts) = rx.recv().await {
        println!("{:?}", posts);
        return Ok(posts);
    }

    Err(())
}

// the payload type must implement `Serialize` and `Clone`.
#[derive(Clone, serde::Serialize)]
struct Payload {
    post: String,
}

fn main() -> Result<(), Box<dyn std::error::Error>> {
    // Load .env file
    dotenv().ok();
    let (client_command_tx, client_command_rx) = mpsc::channel(1);
    let (posts_tx, posts_rx) = mpsc::channel(1);
    tauri::Builder::default()
        .manage(ClientCommandChannelTx {
            inner: Mutex::new(client_command_tx),
        })
        .manage(FeedChannelRx {
            inner: Mutex::new(posts_rx),
        })
        .setup(|app| {
            let app_handle = app.app_handle();

            // TODO: How should we really load nost private key
            let private_key = std::env::var("NOSTR_PRIVATE_KEY").unwrap();
            let _public_key = std::env::var("NOSTR_PUBLIC_KEY").unwrap();

            let my_identity = Identity::from_str(&private_key).unwrap();

            let mut client = ClientWrapper::new(
                my_identity,
                app_handle.to_owned(),
                client_command_rx,
                posts_tx,
            );

            tauri::async_runtime::spawn(async move {
                client.init().await;
            });

            app_handle.listen_global("hello-from-frontend", |event| {
                println!("got payload {:?}", event.payload());
            });

            Ok(())
        })
        .invoke_handler(tauri::generate_handler![react_loaded, load_home_feed])
        //.run(tauri::generate_context!())
        .build(tauri::generate_context!())?
        .run(move |app_handle, event| match event {
            RunEvent::Ready => {
                println!("Application ready");
            }
            _ => {}
        });

    Ok(())
}
