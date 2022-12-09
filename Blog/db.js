const mongoose = require("mongoose");

mongoose.set("strictQuery",false);
mongoose.connect("mongodb://localhost:27017/blogDB")

const postsSchema = mongoose.Schema({
    title: String,
    body: String
})

const Post = mongoose.model("Post", postsSchema)

async function getAllPosts() {
    const posts = await Post.find();
    return posts
}

async function findPostById(id){
    const post = await Post.findById(id)
    return post 
}

async function createNewPost(title, body) {
    const newPost = new Post({
        title: title,
        body: body
    })
    newPost.save()
}

module.exports = {getAllPosts, findPostById, createNewPost}




