import express from 'express';
import { signUp } from '../controllers/authController.js';
const router = express.Router();

//authentication routes
router.post('/signup', signUp);




export default router;