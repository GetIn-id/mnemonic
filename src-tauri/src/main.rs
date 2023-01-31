use tauri::Manager;

#[cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

#[derive(Clone, serde::Serialize)]
struct Payload {
  message: String,
}

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet])
        .setup(|app| {
            // listen to the `event-name` (emitted on any window)
            // let id = app.listen_global("event-name", |event| {
            //   println!("got event-name with payload {:?}", event.payload());
            // });
            // unlisten to the event using the `id` returned on the `listen_global` function
            // an `once_global` API is also exposed on the `App` struct
            // app.unlisten(id);
      
            // emit the `event-name` event to all webview windows on the frontend
            app.emit_all("event-name", Payload { message: "Tauri is awesome!".into() }).unwrap();
            Ok(())
          })
          .run(tauri::generate_context!())
          .expect("failed to run app");
}
