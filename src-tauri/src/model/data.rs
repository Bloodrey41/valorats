use std::collections::HashMap;

use super::agent::Agent;

#[derive(Debug, Clone)]
pub struct Data {
    pub agent: Agent,
    pub maps: HashMap<String, f32>,
}

impl PartialEq for Data {
    fn eq(&self, other: &Self) -> bool {
        self.agent.name == other.agent.name
    }
}
