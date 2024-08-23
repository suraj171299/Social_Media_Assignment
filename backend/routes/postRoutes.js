import express from "express";
import { createPost, showAllPosts, showPostById, deletePost, updatePost, addComments } from '../controllers/post.js';
import  { authenticated }  from '../middleware/auth.js';


const router = express.Router();

router.post('/post/create', authenticated, createPost);
router.get('/posts', showAllPosts);
router.get('/post/:id', showPostById);
router.delete('/delete/post/:id', authenticated, deletePost);
router.put('/update/post/:id', authenticated, updatePost);
router.put('/comment/post/:id', authenticated, addComments);

export default router;