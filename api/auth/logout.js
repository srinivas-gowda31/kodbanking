const jwt = require('jsonwebtoken');
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

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const token = req.cookies?.authToken;
    
    if (token) {
      try {
        // Verify and delete token from database
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        await UserToken.deleteByUsername(decoded.sub);
      } catch (error) {
        console.error('Token verification error during logout:', error);
      }
    }

    // Clear cookie
    res.setHeader('Set-Cookie', 'authToken=; Path=/; HttpOnly; Expires=Thu, 01 Jan 1970 00:00:00 UTC;');
    
    res.status(200).json({ success: true, message: 'Logout successful' });
  } catch (error) {
    res.setHeader('Set-Cookie', 'authToken=; Path=/; HttpOnly; Expires=Thu, 01 Jan 1970 00:00:00 UTC;');
    res.status(200).json({ success: true, message: 'Logout successful' });
  }
}
