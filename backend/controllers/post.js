import Post from '../models/post.js';
import ErrorResponse from '../utils/errorResponse.js';

export const createPost = async (req, res, next) => {

    const { title, content, author, comments, createdAt} = req.body;

    try{
        const post = await Post.create({
            title,
            content,
            author: req.user._id,
        });
        res.status(201).json({
            success: true,
            post
        });
    }catch(error){
        next(error);
    }
}


export const showAllPosts = async (req, res, next) => {

    try{
        const posts = await Post.find().sort({createdAt: -1}).populate('author', 'name');
        res.status(200).json({
            success: true,
            posts
        });
    }catch(error){
        next(error);
    }
}