import mongoose from 'mongoose';
const { ObjectId } = mongoose.Schema

const postSchema = new mongoose.Schema({
    title:{
        type: String,
        required: [true, 'Title is required'],
    },
    content:{
        type: String,
        required: [true, 'Content is required'],
    },
    author:{
        type: ObjectId,
        ref: "User",
    },
    comments:[{
        text: String,
        createdAt: {
            type: Date,
            default: Date.now
        },
        author:{
            type: ObjectId,
            ref: "User",
        }
    }]
},{ timestamps: true });

const Post = mongoose.model("Post", postSchema);

export default Post;