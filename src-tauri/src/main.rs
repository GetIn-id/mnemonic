use std::time::Duration;
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

fn main() {
    tauri::Builder::default()
        .setup(|app| {
            let app_handle = app.app_handle();

            tauri::async_runtime::spawn(async move {
                let post = "Post";
                let mut i = 0;
                loop {
                    sleep(Duration::from_millis(2000)).await;
                    println!(
                        "{}",
                        format_args!("Sending post from Rust backend: {post} {i}")
                    );
                    app_handle
                        .emit_all(
                            "feed-event",
                            Payload {
                                post: format!("{post} {i}"),
                            },
                        )
                        .unwrap();
                    println!("{}", i);
                    i += 1;
                }
            });

            app.listen_global("hello-from-frontend", |event| {
                println!("got payload {:?}", event.payload());
            });

            Ok(())
        })
        .invoke_handler(tauri::generate_handler![greet])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
