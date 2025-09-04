// backend/controllers/userController.js
import User from '../models/UserModel.js'; 
import bcrypt from 'bcryptjs'; 
// 🆙 Promote a user to admin
export const makeAdmin = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findByIdAndUpdate(userId, { role: 'admin' }, { new: true });

    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json({ message: 'User promoted to admin', user });
  } catch (error) {
    res.status(500).json({ message: 'Error promoting user', error });
  }
};

// 👇 Demote admin to member
export const removeAdmin = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findByIdAndUpdate(userId, { role: 'member' }, { new: true });

    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json({ message: 'User demoted to member', user });
  } catch (error) {
    res.status(500).json({ message: 'Error demoting user', error });
  }
};

// ❌ Delete user
export const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findByIdAndDelete(userId);

    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error });
  }
};

// 📋 Get all users
// 📋 Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
      .select('-password')
      .populate({
        path: 'membership',
        populate: { path: 'plan' }  // If membership includes a reference to a plan
      });

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error });
  }
};


// ➕ Create new member (Admin only)
export const createMember = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(409).json({ message: 'User already exists with this email' });
    }

    const newUser = new User({
      name,
      email,
      password, // 👉 You should hash this before saving in production
      role: 'member'
    });

    await newUser.save();
    res.status(201).json({ message: 'Member added successfully', user: newUser });
  } catch (error) {
    res.status(500).json({ message: 'Error adding member', error });
  }
};

// ✅ Get all members only
export const getAllMembers = async (req, res) => {
  try {
    const members = await User.find({ role: 'member' }).select('-password');
    res.status(200).json(members);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch members', error });
  }
};

// ✏️ Update profile (name & password)


export const updateProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const { name, password } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (name) user.name = name;

    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    const updatedUser = await user.save();

    res.status(200).json({
      message: 'Profile updated successfully',
      user: {
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Error updating profile', error });
  }
};
