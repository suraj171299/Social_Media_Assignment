import express from 'express';
import { signup, login, logout } from '../controllers/user.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/logout', logout);

export default router;
