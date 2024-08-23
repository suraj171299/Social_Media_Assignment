import express from "express";
import { createPost } from '../controllers/post.js';
import  { authenticated }  from '../middleware/auth.js';


const router = express.Router();

router.post('/post/create', authenticated, createPost);


export default router;