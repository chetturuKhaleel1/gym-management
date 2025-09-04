import express from 'express';
import Trainer from '../models/TrainerModel.js';
// ✅ Correct
import { verifyToken, isAdmin } from '../middlewares/authMiddleware.js';



const router = express.Router();

// @route   POST /api/trainers
router.post('/', verifyToken, async (req, res) => {
  try {
    const { name, expertise, experience } = req.body;
    const trainer = await Trainer.create({ name, expertise, experience });
    res.status(201).json(trainer);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// @route   GET /api/trainers
router.get('/', async (req, res) => {
  try {
    const trainers = await Trainer.find();
    res.json(trainers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// @route   DELETE /api/trainers/:id
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    await Trainer.findByIdAndDelete(req.params.id);
    res.json({ message: 'Trainer deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
