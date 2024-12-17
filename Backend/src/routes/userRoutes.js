import express from 'express';
import { registerUser, loginUser, verifyToken, logoutUser } from '../controllers/userControllers.js';

const router = express.Router();

// Register a new user
router.post('/register', registerUser);

// Login user
router.post('/login', loginUser);

// Verify token
router.get('/verify-token', verifyToken);

// Logout user
router.post('/logout', logoutUser);

export default router;
