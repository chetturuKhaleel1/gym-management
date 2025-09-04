import Membership from '../models/membershipModel.js';

export const getMyMembership = async (req, res) => {
  console.log("📩 /api/membership/me hit");

  try {
    const membership = await Membership.findOne({ user: req.user._id }).populate('plan');

    if (!membership) {
      return res.status(404).json({ message: 'No active membership' });
    }

    console.log("💾 Membership plan populated: ", membership.plan); 

    // ✅ Return full plan object instead of just title
    res.json({
      plan: membership.plan,             // full plan object (title, price, etc.)
      startDate: membership.startDate,
      expiresAt: membership.endDate,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
