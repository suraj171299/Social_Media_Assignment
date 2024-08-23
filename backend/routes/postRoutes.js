import express from "express";
import { createPost, showAllPosts } from '../controllers/post.js';
import  { authenticated }  from '../middleware/auth.js';


const router = express.Router();

router.post('/post/create', authenticated, createPost);
router.get('/posts', showAllPosts);


export default router;