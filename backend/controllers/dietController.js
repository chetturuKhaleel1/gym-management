import Diet from '../models/DietModel.js';

export const addDiet = async (req, res) => {
  try {
    const diet = new Diet(req.body);
    await diet.save();
    res.status(201).json(diet);
  } catch (err) {
    res.status(500).json({ message: 'Error adding diet', error: err });
  }
};

export const getDiets = async (req, res) => {
  try {
    const diets = await Diet.find().populate('createdBy', 'name');
    res.status(200).json(diets);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching diets', error: err });
  }
};

// DELETE diet by ID
export const deleteDiet = async (req, res) => {
  try {
    const { id } = req.params;
    await Diet.findByIdAndDelete(id);
    res.status(200).json({ message: 'Diet deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting diet', error: err });
  }
};

// UPDATE diet by ID
export const updateDiet = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedDiet = await Diet.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(updatedDiet);
  } catch (err) {
    res.status(500).json({ message: 'Error updating diet', error: err });
  }
};
