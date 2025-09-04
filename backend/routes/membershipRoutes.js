import express from 'express';
import { getMyMembership } from '../controllers/membershipController.js';   
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/me', protect, getMyMembership);

export default router;
