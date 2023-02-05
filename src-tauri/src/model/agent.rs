use serde::Serialize;

#[derive(Debug, Clone, PartialEq, Serialize)]
pub enum Role {
    Duelist,
    Initiator,
    Controller,
    Sentinel,
}

#[derive(Debug, Clone, PartialEq, Serialize)]
pub struct Agent {
    pub name: String,
    pub picture: String,
    pub role: Role,
}

pub fn get_agent_role(agent_name: &str) -> Role {
    let duelists = vec!["Jett", "Raze", "Neon", "Yoru", "Reyna", "Phoenix"];

    let initiators = vec!["Sova", "Fade", "KAY/O", "Skye", "Breach"];

    let controllers = vec!["Omen", "Brimstone", "Viper", "Astra", "Harbor"];

    let sentinels = vec!["Killjoy", "Cypher", "Chamber", "Sage"];

    if duelists.contains(&agent_name) {
        return Role::Duelist;
    }

    if initiators.contains(&agent_name) {
        return Role::Initiator;
    }

    if controllers.contains(&agent_name) {
        return Role::Controller;
    }

    if sentinels.contains(&agent_name) {
        return Role::Sentinel;
    }

    panic!("Invalid agent name")
}
