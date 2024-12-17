import express from 'express';
import { registerAdmin, loginAdmin, verifyToken, logoutAdmin } from '../controllers/adminController.js';

const router = express.Router();

// Register a new admin
router.post('/register', registerAdmin);

// Login admin
router.post('/login', loginAdmin);

// Verify token
router.get('/verify-token', verifyToken);

// Logout admin
router.post('/logout', logoutAdmin);

export default router;
