use std::collections::HashMap;

use select::{document::Document, predicate::{Class, Name, Predicate, Attr, Any}};

use crate::model::{data::Data, agent::{get_agent_role, Agent, Role}};

#[tauri::command]
pub fn get_data(url: impl Into<String>) -> Vec<Data> {
    let html = reqwest::blocking::get(url.into()).unwrap().text().unwrap();

    let document = Document::from(html.as_str());

    let table = document.find(Class("event_column__K2XPK").and(Class("event_agentPicks__wlhpD"))).next().unwrap();

    let header = table.find(Class("event_tableHeader__9HLCu")).next().unwrap();

    let headers = header.find(Name("div"))
        .map(|h| {
            let mut h = h.text().to_lowercase();
            if h == "agente" {
                h = "agent".to_owned();
            }
            if h == "pickrate" {
                h = "all".to_owned();
            }
            h
        })
    .collect::<Vec<_>>();

    let mut data = vec![];

    for row in table.find(Class("event_tableRow__5JpdP")) {
        let mut agent_data = Data {
            agent: Agent {
                name: "".to_string(),
                picture: "".to_string(),
                role: Role::Duelist,
            },
            maps: HashMap::new(),
        };

        for (index, column) in row.find(Name("div")).enumerate() {
            let header = &headers[index];

            let text = column.text().split('>').last().unwrap().trim().to_owned();

            if index == 0 {
                let agent_name = text;

                let agent_role = get_agent_role(&agent_name);

                agent_data.agent = Agent {
                    name: agent_name,
                    role: agent_role,
                    picture: format!("https://www.thespike.gg{}", column.find(Name("img")).next().unwrap().attr("src").unwrap()),
                };
            } else {
                let map = text.split('(').nth(0).unwrap();
                let map = map.replace("%", "");
                agent_data.maps.insert(header.to_owned(), map.parse::<f32>().unwrap());
            }

            data.push(agent_data.clone())
        }
    }

    let mut res = vec![];
    
    for x in data {
        if !res.contains(&x) {
            res.push(x);
        }
    }

    res
}
