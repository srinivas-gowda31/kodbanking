const jwt = require('jsonwebtoken');
const UserToken = require('../models/UserToken');

const authMiddleware = async (req, res, next) => {
  try {
    // Get token from cookies
    const token = req.cookies.authToken;

    if (!token) {
      return res.status(401).json({ success: false, message: 'No token provided' });
    }

    // Verify JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Verify token exists in database
    const tokenRecord = await UserToken.findByToken(token);
    if (!tokenRecord) {
      return res.status(401).json({ success: false, message: 'Invalid or expired token' });
    }

    // Attach user info to request
    req.user = {
      username: decoded.sub,
      role: decoded.role
    };

    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ success: false, message: 'Token expired' });
    }
    return res.status(401).json({ success: false, message: 'Invalid token' });
  }
};

module.exports = authMiddleware;
