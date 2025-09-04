import express from 'express';
import {
  getAllCoaches,
  createCoach,
  updateCoach,
  deleteCoach,
} from '../controllers/coachController.js';

const router = express.Router();

router.get('/', getAllCoaches);
router.post('/', createCoach);
router.put('/:id', updateCoach);
router.delete('/:id', deleteCoach);

export default router;
