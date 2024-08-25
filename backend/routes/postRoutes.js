import express from "express";
import { createPost, showAllPosts, userPosts, deletePost, addComment, likePost, commentPerPost, dislikePost } from '../controllers/post.js';
import  { authenticated }  from '../middleware/auth.js';


const router = express.Router();

router.post('/create', authenticated, createPost);
router.get('/allposts', authenticated, showAllPosts);
router.get('/userpost/all', authenticated, userPosts);
router.get('/:id/like', authenticated, likePost);
router.get('/:id/dislike', authenticated, dislikePost);
router.post('/:id/comment', authenticated, addComment);
router.get('/:id/comment/all', authenticated, commentPerPost);
router.delete('/delete/:id', authenticated, deletePost);


export default router;