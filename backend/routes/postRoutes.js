import express from "express";
import { createPost, showAllPosts, showPostById } from '../controllers/post.js';
import  { authenticated }  from '../middleware/auth.js';


const router = express.Router();

router.post('/post/create', authenticated, createPost);
router.get('/posts', showAllPosts);
router.get('/post/:id', showPostById);

export default router;