import express from "express";
import { createPost, showAllPosts, userPosts, deletePost, addComment, likePost, commentPerPost } from '../controllers/post.js';
import  { authenticated }  from '../middleware/auth.js';


const router = express.Router();

router.post('/post/create', authenticated, createPost);
router.get('/allposts', authenticated, showAllPosts);
router.get('/userpost/all', authenticated, userPosts);
router.get('/:id/like', authenticated, likePost);
router.post('/:id/comment', authenticated, addComment);
router.get('/:id/comment/all', authenticated, commentPerPost);
router.post('/delete/:id', authenticated, deletePost);


export default router;