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


export const showPostById = async (req, res, next) => {

    const { id } = req.params;
    try{
        const post = await Post.findById(id).populate('comments.author', 'name');
        res.status(200).json({
            success: true,
            post        
     });
    }catch(error){
        next(error);
    }
}

export const deletePost = async (req, res, next) => {

    const { id } = req.params;
    
    try{
        const post = await Post.findByIdandRemove(id);
        res.status(200).json({
            success: true,
            message: "post deleted"       
     });
    }catch(error){
        next(error);
    }
}


export const updatePost = async (req, res, next) => {

    try{
        const { title, content } = req.body;
        const { id } = req.params;
        const currentPost = await Post.findById(id);

        const data = {
            title: title || currentPost.title,
            content: content || currentPost.content
        }

        const postUpdate = await Post.findByIdAndUpdate(id, data, {new: true});
        res.status(200).json({
        success: true,
        postUpdate
        });
    }catch(error){
        next(error);
    }
}