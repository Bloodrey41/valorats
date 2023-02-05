use std::collections::HashMap;

use serde::Serialize;

use super::agent::Agent;

#[derive(Debug, Clone, PartialEq, Serialize)]
pub struct Data {
    pub agent: Agent,
    pub maps: HashMap<String, f32>,
}
