import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        trim: true,
        required: [true, "Username is required"],
        maxLength: 50
    },
    email: {
        type: String,
        trim: true,
        required: [true, "e-mail is required"],
        unique: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email'
        ]
    },
    password: {
        type: String,
        trim: true,
        required: [true, 'password is required'],
    },
    posts:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }]
}, {timestamps: true});


const User = mongoose.model("User", userSchema);

export default User;
