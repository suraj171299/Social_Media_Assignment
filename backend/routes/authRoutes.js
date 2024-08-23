import express from 'express';
import { signUp, signIn, logOut } from '../controllers/authController.js';
const router = express.Router();

//authentication routes
router.post('/signup', signUp);
router.post('/signin', signIn);
router.get('/logout', logOut);


export default router;