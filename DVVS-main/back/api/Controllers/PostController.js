const { Post } = require('../models/postModel');

const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.findAll();
        res.json(posts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const createPost = async (req, res) => {
    try {
        const { name, content, written_by } = req.body;
        const newPost = await Post.create({ name, content, written_by });
        res.json(newPost);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const updatePost = async (req, res) => {
    try {
        const postId = req.params.id;
        const { name, content, written_by } = req.body;
        const updatedPost = await Post.findByPk(postId);
        if (!updatedPost) {
            return res.status(404).json({ error: 'Post not found' });
        }
        updatedPost.name = name;
        updatedPost.content = content;
        updatedPost.written_by = written_by;
        await updatedPost.save();
        res.json(updatedPost);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const deletePost = async (req, res) => {
    try {
        const postId = req.params.id;
        const deletedPost = await Post.findByPk(postId);
        if (!deletedPost) {
            return res.status(404).json({ error: 'Post not found' });
        }
        await deletedPost.destroy();
        res.json({ success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    getAllPosts,
    createPost,
    updatePost,
    deletePost,
};
