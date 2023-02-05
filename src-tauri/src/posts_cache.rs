use crate::client::Post;

pub struct PostsCache {
    pub posts: Vec<Post>,
}

impl PostsCache {
    pub fn new() -> Self {
        Self { posts: vec![] }
    }

    pub fn insert(&mut self, post: Post) {
        println!("PostsCache, inserting {:?}", post);
        self.posts.push(post);
    }
}
