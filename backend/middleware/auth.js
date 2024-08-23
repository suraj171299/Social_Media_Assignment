import ErrorResponse from "../utils/errorResponse.js";
import User from '../models/user.js';
import jwt from 'jsonwebtoken';

export const authenticated = async (req, res, next) => {
    const { token }= req.cookies;

    if(!token){
        return next(new ErrorResponse("User Not authenticated!! Please Login to continue ", 401))
    }

    try{
        const authenticate = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(authenticate.id);
        next()
    }catch(error){
        next(new ErrorResponse("You must Login to continue", 401))
    }
}