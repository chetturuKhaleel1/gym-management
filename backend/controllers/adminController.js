// server/controllers/adminController.js
import User from '../models/UserModel.js';
import Membership from '../models/membershipModel.js';
import Payment from '../models/Payment.js';

export const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const activeMemberships = await Membership.countDocuments({ status: 'active' });

    const revenueResult = await Payment.aggregate([
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);
    const totalRevenue = revenueResult[0]?.total || 0;

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const monthly = await Payment.aggregate([
      {
        $group: {
          _id: { $month: '$createdAt' },
          revenue: { $sum: '$amount' }
        }
      }
    ]);

    const monthlyRevenue = months.map((month, i) => {
      const found = monthly.find(m => m._id === i + 1);
      return { month, revenue: found?.revenue || 0 };
    });

    const activeMembers = await Membership.find({ status: 'active' })
      .populate('user')
      .select('startDate endDate status user');

    const formattedMembers = activeMembers.map(m => ({
      name: m.user?.name || "N/A",
      datePaid: m.startDate,
      expiryDate: m.endDate,
      status: m.status
    }));

    res.json({
      totalUsers,
      activeMemberships,
      totalRevenue,
      monthlyRevenue,
      activeMembers: formattedMembers
    });

  } catch (err) {
    console.error("❌ Admin Dashboard Error:", err);
    res.status(500).json({ message: "Failed to load admin stats" });
  }
};
