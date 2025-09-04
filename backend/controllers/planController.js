import Plan from "../models/Plan.js";

// @desc    Create new plan
export const createPlan = async (req, res) => {
  try {
    const { title, price, duration, description } = req.body;

    const plan = new Plan({ title, price, duration, description });
    await plan.save();

    res.status(201).json(plan);
  } catch (error) {
    res.status(500).json({ message: "Failed to create plan", error: error.message });
  }
};


// @desc    Get all plans
export const getPlans = async (req, res) => {
  try {
    const plans = await Plan.find();
    res.json(plans);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch plans", error: error.message });
  }
};

// @desc    Delete a plan
export const deletePlan = async (req, res) => {
  try {
    const plan = await Plan.findByIdAndDelete(req.params.id);
    if (!plan) {
      return res.status(404).json({ message: "Plan not found" });
    }
    res.json({ message: "Plan deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete plan", error: error.message });
  }
};

// @desc    Update a plan
export const updatePlan = async (req, res) => {
  try {
    const { title, price, duration, description } = req.body;

    const updatedPlan = await Plan.findByIdAndUpdate(
      req.params.id,
      { title, price, duration, description },
      { new: true, runValidators: true }
    );

    if (!updatedPlan) {
      return res.status(404).json({ message: "Plan not found" });
    }

    res.json(updatedPlan);
  } catch (error) {
    res.status(500).json({ message: "Failed to update plan", error: error.message });
  }
};
