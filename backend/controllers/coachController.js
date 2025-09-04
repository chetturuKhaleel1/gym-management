import Coach from '../models/Coach.js';

// Get all coaches
export const getAllCoaches = async (req, res) => {
  try {
    const coaches = await Coach.find();
    res.status(200).json(coaches);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch coaches", error });
  }
};

// Create new coach
export const createCoach = async (req, res) => {
  try {
    const newCoach = new Coach(req.body);
    await newCoach.save();
    res.status(201).json(newCoach);
  } catch (error) {
    res.status(500).json({ message: "Failed to create coach", error });
  }
};

// Update coach
export const updateCoach = async (req, res) => {
  try {
    const updated = await Coach.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: "Failed to update coach", error });
  }
};

// Delete coach
export const deleteCoach = async (req, res) => {
  try {
    await Coach.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Coach deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete coach", error });
  }
};
