import User from "../models/user.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Post from "../models/post.js";

export const signup = async (req, res) => {
    try {
        const { username, email, password } = req.body
        if (!username || !email || !password) {
            return res.status(401).json({
                message: "username or email or password is missing",
                success: false,
            })
        }
        const user = await User.findOne({ email });
        if (user) {
            return res.status(401).json({
                message: "User with this email already exists",
                success: false,
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        await User.create({
            username,
            email,
            password: hashedPassword
        })
        return res.status(201).json({
            message: "Account created successfully",
            success: true,
        })
    } catch (error) {
        console.log(error);
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(401).json({
                message: "email or password is missing",
                success: false,
            })
        }

        let user = await User.findOne({ email })
        if (!user) {
            return res.status(401).json({
                message: "Incorrect email or password",
                success: false,
            })
        }

        const isPassword = await bcrypt.compare(password, user.password)

        if (!isPassword) {
            return res.status(401).json({
                message: "Incorrect email or password",
                success: false,
            })
        }

        const loginToken = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: 3600 })

        const populatedPost = await Promise.all(
            user.posts.map(async (postId) => {
                const post = await Post.findById(postId);
                if (post.author.equals(user._id)) {
                    return post
                }
                return null;
            })
        )

        user = {
            _id: user._id,
            username: user.username,
            email: user.email,
            posts: populatedPost
        }

        return res.cookie('token', loginToken, { httpOnly: true }).json({
            message: `${user.username} login successful`,
            success: true,
            user
        })
    } catch (error) {
        console.log(error);

    }
}

export const logout = async (req, res) => {
    try {
        return res.cookie("token", { maxAge: 0 }).json({
            message: "Logged Out",
            success: true
        })
    } catch (error) {
        console.log(error);

    }
}