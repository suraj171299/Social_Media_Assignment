import Post from "../models/post.js";
import User from "../models/user.js";
import Comment from "../models/comment.js";
import ErrorResponse from "../utils/errorResponse.js";

export const createPost = async (req, res, next) => {
    try {
        const { caption } = req.body;
        const authorId = req.id;
        if (!caption) {
            res.status(401).json({
                message: "Caption cannot be empty",
                success: false,
            });
        }
        const post = await Post.create({
            caption,
            author: authorId,
        });
        const user = await User.findById(authorId);

        if (user) {
            user.posts.push(post._id);
            await user.save();
        }

        await post.populate({ path: "author", select: "-password" });

        res.status(201).json({
            message: "New post created",
            post,
            success: true,
        });
    } catch (error) {
        next(error);
    }
};

export const showAllPosts = async (req, res, next) => {
    try {
        const posts = await Post.find()
            .sort({ createdAt: -1 })
            .populate({ path: "author", select: "username" })
            .populate({
                path: "comments",
                sort: { createdAt: -1 },
                populate: {
                    path: "author",
                    select: "username",
                },
            });
        res.status(200).json({
            posts,
            success: true,
        });
    } catch (error) {
        next(error);
    }
};

export const userPosts = async (req, res, next) => {
    try {
        const authorId = req.id;
        const posts = await Post.find({ author: authorId })
            .sort({ createdAt: -1 })
            .populate({
                path: "author",
                select: "username",
            })
            .populate({
                path: "comments",
                sort: { createdAt: -1 },
                populate: {
                    path: "author",
                    select: "username",
                },
            });
        res.status(200).json({
            posts,
            success: true,
        });
    } catch (error) {
        next(error);
    }
};

export const likePost = async (req, res, next) => {
    try {
        const likedUserId = req.id;
        const postId = req.params.id;

        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({
                message: "Post not found",
                success: false,
            });
        }

        await post.updateOne({ $addToSet: { likes: likedUserId } });
        await post.save();

        return res.status(201).json({
            message: "Post liked",
            success: true
        })
    } catch (error) {
        next(error);
    }
};

export const dislikePost = async (req, res, next) => {
    try {
        const likedUserId = req.id;
        const postId = req.params.id;

        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({
                message: "Post not found",
                success: false,
            });
        }

        await post.updateOne({ $pull: { likes: likedUserId } });
        await post.save();

        return res.status(201).json({
            message: "Post disliked",
            success: true
        })
    } catch (error) {
        next(error);
    }
};

export const addComment = async (req, res) => {
    try {
        const postId = req.params.id;
        const commentedUserId = req.id;

        const { text }  = req.body;
        console.log(text);
        
        const post = await Post.findById(postId);

        if (!text) return res.json(400).json({ message: "Comment cannot be empty", success: false })

        const comment = await Comment.create({
            text,
            author: commentedUserId,
            post: postId
        })

        await comment.populate({
                path: 'author',
                select: 'username'
        })

        post.comments.push(comment._id)
        await post.save();

        return res.status(201).json({
            message: "Comment added",
            success: true,
            comment,
        })

    } catch (error) {
        console.log(error);
        
    }

}

export const commentPerPost = async (req, res) => {
    try {
        const postId = req.params.id

        const comments = await Comment.find({ post: postId }).populate('author', 'username')

        if (!comments) return res.status(404).json({ message: "No comments found", success: false })

        return res.status(200).json({ success: true, comments })

    } catch (error) {
        console.log(error);
    }
}

export const deletePost = async (req, res, next) => {

    try {

        const postId = req.params.id;
        const authorId = req.id;

        const post = await Post.findById(postId);

        if (post.author.toString() != authorId) return res.status(403).json({ message: "Unauthorized", })

        await Post.findByIdAndDelete(postId)

        let user = await User.findById(authorId);

        user.posts = user.posts.filter(id => id.toString() != postId);
        await user.save();

        await Comment.deleteMany({ post: postId });

        res.status(200).json({
            message: "Post deleted",
            success: true,
        });
    } catch (error) {
        next(error);
    }
};

export const addComments = async (req, res, next) => {
    const { comment } = req.body;
    try {
        const addComment = await Post.findByIdAndUpdate(
            req.params.id,
            {
                $push: {
                    comments: {
                        text: comment,
                        author: req.user._id,
                    },
                },
            },
            { new: true }
        );

        const post = await Post.findById(comment._id).populate(
            "comments.author",
            "name"
        );
        res.status(200).json({
            success: true,
            post,
        });
    } catch (error) {
        next(error);
    }
};
