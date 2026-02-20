const User = require('../models/User');

exports.getBalance = async (req, res) => {
  try {
    const username = req.user.username;

    // Fetch balance from database
    const balance = await User.getBalance(username);

    res.status(200).json({
      success: true,
      username,
      balance,
      currency: '₹'
    });
  } catch (error) {
    console.error('Get balance error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
