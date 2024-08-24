import ErrorResponse from "../utils/errorResponse.js";
import User from '../models/user.js';
import jwt from 'jsonwebtoken';

export const authenticated = async (req, res, next) => {
    
    try{
        const { token } = req.cookies;

        if(!token){
            return next(new ErrorResponse("User Not authenticated!! Please Login to continue ", 401))
        }
        
        const authenticate = await jwt.verify(token, process.env.SECRET_KEY);
        
        req.id = authenticate.userId;
        
        next();
    }catch(error){
        next(new ErrorResponse("You must Login to continue", 401))
    }
}