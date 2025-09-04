import express from 'express';
import {
  createMember,
  makeAdmin,
  removeAdmin,
  deleteUser,
  getAllUsers,
  getAllMembers,
  updateProfile
} from '../controllers/userController.js';
import { protect } from '../middlewares/authMiddleware.js';


const router = express.Router();

router.post('/add-member', createMember); // 👈 New route
router.get('/', getAllUsers);
router.put('/make-admin/:userId', makeAdmin);
router.put('/remove-admin/:userId', removeAdmin);
router.delete('/:userId', deleteUser);
router.get('/members', getAllMembers); // ✅ Add this line
router.put('/update-profile', protect, updateProfile); // 👈 Add this line

export default router;
