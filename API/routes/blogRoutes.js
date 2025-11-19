const express = require('express');
const multer = require('multer');
const { createPost, getBlogs, getBlogById, deleteBlog, editBlog, getBlogsByAuthor, getMyBlogs, likeBlog, unlikeBlog } = require('../controllers/blogController');
const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

router.post('/post', upload.single('file'), createPost);
router.get('/blogs', getBlogs);
router.get('/blogs/:id', getBlogById);
router.delete('/blogs/:id', deleteBlog);
router.put('/edit/:id', upload.single('file'), editBlog);
router.get('/names/', getBlogsByAuthor);
router.get('/myBlogs/', getMyBlogs);
router.post('/blogs/:id/like', likeBlog);
router.post('/blogs/:id/unlike', unlikeBlog);

module.exports = router;
