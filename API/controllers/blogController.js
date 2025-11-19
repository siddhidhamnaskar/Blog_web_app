const Post = require('../models/post.js');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const cloudinary = require('cloudinary');
const secret = process.env.SECRET;


 cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.API_KEY,
    api_secret:process.env.API_SECRET

})


const createPost = async (req, res) => {
    try {
        const urls = [];
        console.log(req.body);
        const fileStr = req.file.buffer.toString("base64");
        let token = req.body.token;

        jwt.verify(token, secret, {}, async (err, info) => {
            const response = await cloudinary.uploader.upload(
                `data:${req.file.mimetype};base64,${fileStr}`,
                { folder: "uploads", resource_type: "auto" }
            );

            urls.push(response.secure_url);

            const blog = new Post({
                Title: req.body.title,
                Summary: req.body.summary,
                img: urls[0],
                Content: req.body.content,
                Author: info.id
            });
            const post = await blog.save();
            console.log(post);
            res.status(200).json(post);
        });
    } catch (err) {
        res.status(505).json(err);
    }
};

const getBlogs = async (req, res) => {
    try {
        const blogData = await Post.find().populate('Author', ['Name']).sort({ createdAt: -1 }).limit(20);
        res.status(200).json(blogData);
    } catch (err) {
        res.status(505).json(err);
    }
};

const getBlogById = async (req, res) => {
    try {
        const blog = await Post.findById(req.params.id).populate('Author', ['Name']);
        res.json(blog);
    } catch (err) {
        res.status(505).json(err);
    }
};

const deleteBlog = async (req, res) => {
    try {
        const blog = await Post.findByIdAndDelete(req.params.id).populate('Author', ['Name']);
        res.json(blog);
    } catch (err) {
        res.status(505).json(err);
    }
};

const editBlog = async (req, res) => {
    try {
        const blog = await Post.findById(req.params.id).populate('Author', ['Name']);
        blog.Title = req.body.title;
        blog.Summary = req.body.summary;
        blog.Content = req.body.content;
        if (req.file) {
            const fileStr = req.file.buffer.toString("base64");
            const response = await cloudinary.uploader.upload(
                `data:${req.file.mimetype};base64,${fileStr}`,
                { folder: "uploads", resource_type: "auto" }
            );
            blog.img = response.secure_url;
        }
        const post = await blog.save();
        res.status(200).json(post);
    } catch (err) {
        res.status(505).json(err);
    }
};

const getBlogsByAuthor = async (req, res) => {
    try {
        console.log(req.query.Author);
        const blogData = await Post.find().populate('Author', ['Name']).sort({ createdAt: -1 }).limit(20);
        const data = blogData.filter((elem) => {
            return elem.Author.Name === req.query.Author;
        });
        res.status(200).json(data);
    } catch (err) {
        res.status(505).json(err);
    }
};

const getMyBlogs = async (req, res) => {
    try {
        const blogData = await Post.find(req.query).populate('Author', ['Name']).sort({ createdAt: -1 }).limit(20);
        res.status(200).json(blogData);
    } catch (err) {
        res.status(505).json(err);
    }
};

const likeBlog = async (req, res) => {
    try {
        let token = req.body.token;
        jwt.verify(token, secret, {}, async (err, info) => {
            if (err) throw err;
            const post = await Post.findById(req.params.id);
            if (!post) return res.status(404).json("Post not found");
            if (!post.likes.includes(info.id)) {
                post.likes.push(info.id);
                await post.save();
            }
            res.status(200).json(post);
        });
    } catch (err) {
        res.status(500).json(err);
    }
};

const unlikeBlog = async (req, res) => {
    try {
        let token = req.body.token;
        jwt.verify(token, secret, {}, async (err, info) => {
            if (err) throw err;
            const post = await Post.findById(req.params.id);
            if (!post) return res.status(404).json("Post not found");
            post.likes = post.likes.filter(id => id.toString() !== info.id);
            await post.save();
            res.status(200).json(post);
        });
    } catch (err) {
        res.status(500).json(err);
    }
};

module.exports = { createPost, getBlogs, getBlogById, deleteBlog, editBlog, getBlogsByAuthor, getMyBlogs, likeBlog, unlikeBlog };
