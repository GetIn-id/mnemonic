use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize, Clone, Hash, PartialEq, Eq)]
pub struct Post {
    pub content: String,
}

#[derive(Debug, Serialize, Deserialize, Clone, Hash, PartialEq, Eq)]
pub struct PostsCache {
    pub posts: Vec<Post>,
}

impl PostsCache {
    pub fn new() -> Self {
        Self { posts: vec![] }
    }

    pub fn insert(&mut self, post: Post) {
        if !self.posts.contains(&post) {
            self.posts.push(post);
        }
    }
}
