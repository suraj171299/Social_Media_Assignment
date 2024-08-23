import  User  from '../models/user.js';
import ErrorResponse from '../utils/errorResponse.js';

export const signUp = async (req, res, next) => {
    const { email } = req.body;
    const userExist = await User.findOne({ email });
    if (userExist) {
        return next(new ErrorResponse("E-mail already registred", 400));
    }
    try {
        const user = await User.create(req.body);
        res.status(201).json({
            success: true,
            user
        })
    } catch (error) {
        next(error);
    }
}

export const signIn = async (req, res, next) => {
    try{
        const { email, password } = req.body
        if(!email || !password){
            return next(new ErrorResponse("Missing email or password", 403))
        }
        const user = await User.findOne({ email });
        if(!user){
            return next(new ErrorResponse("Invalid email", 400))
        }
        const isPasswordMatch = await user.comparePassword(password);
        if(!isPasswordMatch){
            return next(new ErrorResponse("Invalid password", 400))
        }
        getToken(user, 200, res);
    }catch(error){
        next(error)
    }
}

const getToken = async(user, statusCode, res) => { 
    const token = await user.getJwtToken();
    res.status(statusCode).json({
        success: true,
        id: user._id,
        role: user.role
    })
}