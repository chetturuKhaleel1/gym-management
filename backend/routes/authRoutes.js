import express from 'express';
import { registerUser, loginUser,getAllUsers } from '../controllers/authController.js';

const router = express.Router();

// @route   POST /api/auth/register
// @desc    Register a new user
// @access  Public
router.post('/register', registerUser);

// @route   POST /api/auth/login
// @desc    Login existing user
// @access  Public
router.post('/login', loginUser);
router.get('/users', getAllUsers)

export default router;
