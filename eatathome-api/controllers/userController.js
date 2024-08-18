const User = require('../models/User');
const bcrypt = require('bcryptjs');

exports.signup = async (req, res) => {
  const { email, password, name, postCode, address } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = new User({
      email,
      password: hashedPassword,
      name,
      postCode,
      address
    });

    const result = await user.save();

    res.status(201).json({ userId: result._id, message: 'User created!' });
  } catch (error) {
    res.status(500).json({ message: 'Error creating user' });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Authentication failed' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Authentication failed' });
    }

    res.status(200).json({ userId: user._id });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in' });
  }
};

// New updatePassword method
exports.updatePassword = async (req, res) => {
  const { email, newPassword } = req.body;

  try {
    // Find the user by ID
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Hash the new password
    const hashedNewPassword = await bcrypt.hash(newPassword, 12);

    // Update user's password
    user.password = hashedNewPassword;
    await user.save();

    res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating password' });
  }
};
