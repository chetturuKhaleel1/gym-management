import express from 'express';
import User from '../models/UserModel.js';

const router = express.Router();

// GET all members
router.get('/', async (req, res) => {
  try {
    const members = await User.find({ role: 'member' });
    res.json(members);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch members' });
  }
});

// GET a member by ID
router.get('/:id', async (req, res) => {
  try {
    const member = await User.findOne({ _id: req.params.id, role: 'member' });
    if (!member) {
      return res.status(404).json({ error: 'Member not found' });
    }
    res.json(member);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching member' });
  }
});

// PUT (update) a member by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedMember = await User.findOneAndUpdate(
      { _id: req.params.id, role: 'member' },
      req.body,
      { new: true }
    );
    if (!updatedMember) {
      return res.status(404).json({ error: 'Member not found' });
    }
    res.json(updatedMember);
  } catch (err) {
    res.status(500).json({ error: 'Error updating member' });
  }
});

// DELETE a member by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedMember = await User.findOneAndDelete({ _id: req.params.id, role: 'member' });
    if (!deletedMember) {
      return res.status(404).json({ error: 'Member not found' });
    }
    res.json({ message: 'Member deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Error deleting member' });
  }
});

export default router;
