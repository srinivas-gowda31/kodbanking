const bcrypt = require('bcryptjs');
const User = require('../../api/models/User');

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
    const { uid, uname, password, email, phone } = req.body;

    // Validation
    if (!uid || !uname || !password || !email || !phone) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    // Check if user already exists
    const existingUsername = await User.findByUsername(uname);
    const existingEmail = await User.findByEmail(email);
    const existingUid = await User.findByUid(uid);

    if (existingUsername) {
      return res.status(400).json({ success: false, message: 'Username already exists' });
    }
    if (existingEmail) {
      return res.status(400).json({ success: false, message: 'Email already exists' });
    }
    if (existingUid) {
      return res.status(400).json({ success: false, message: 'UID already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user with default balance
    const result = await User.create({
      uid,
      uname,
      password: hashedPassword,
      email,
      phone,
      role: 'customer',
      balance: 100000
    });

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      userId: result[0].insertId
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
}
