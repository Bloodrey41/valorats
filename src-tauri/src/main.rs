#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use ipc::data::get_data;

mod model;
mod ipc;

fn main() {
    let data = get_data("https://www.thespike.gg/events/stats/vct-2023-challengers-league-spain-rising-split-1/2267");
    println!("{:#?}", data);
    //tauri::Builder::default()
        //.invoke_handler(tauri::generate_handler![])
        //.run(tauri::generate_context!())
        //.expect("error while running tauri application");
}
