import Supplement from '../models/SupplementModel.js';

export const addSupplement = async (req, res) => {
  try {
    const supplement = new Supplement(req.body);
    await supplement.save();
    res.status(201).json(supplement);
  } catch (err) {
    res.status(500).json({ message: 'Error adding supplement', error: err });
  }
};

export const getSupplements = async (req, res) => {
  try {
    const supplements = await Supplement.find();
    res.status(200).json(supplements);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching supplements', error: err });
  }
};

// controller
export const deleteSupplement = async (req, res) => {
  try {
    await Supplement.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting supplement', error: err });
  }
};

// Edit supplement by ID
export const updateSupplement = async (req, res) => {
  try {
    const updated = await Supplement.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: "Error updating supplement", error: err });
  }
};

// routes


