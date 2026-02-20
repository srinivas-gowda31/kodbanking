const jwt = require('jsonwebtoken');
const User = require('../../api/models/User');
const UserToken = require('../../api/models/UserToken');

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', process.env.FRONTEND_URL || 'http://localhost:5173');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    // Get token from cookies
    const token = req.cookies?.authToken;

    if (!token) {
      return res.status(401).json({ success: false, message: 'No token provided' });
    }

    // Verify JWT token
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        return res.status(401).json({ success: false, message: 'Token expired' });
      }
      return res.status(401).json({ success: false, message: 'Invalid token' });
    }

    // Verify token exists in database
    const tokenRecord = await UserToken.findByToken(token);
    if (!tokenRecord) {
      return res.status(401).json({ success: false, message: 'Invalid or expired token' });
    }

    // Extract username from JWT subject
    const username = decoded.sub;

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
}
