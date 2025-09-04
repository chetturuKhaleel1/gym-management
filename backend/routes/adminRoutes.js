// backend/routes/adminRoutes.js
import express from 'express';
import { getDashboardStats } from '../controllers/adminController.js'; // ✅ step 1

const router = express.Router();

// ✅ Trainer placeholder route
router.get('/trainers', (req, res) => {
  res.json({ trainers: [] });
});

// ✅ Dashboard stats route
router.get('/stats', getDashboardStats); // ✅ step 2

export default router;
