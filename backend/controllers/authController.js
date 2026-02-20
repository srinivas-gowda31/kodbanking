const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const UserToken = require('../models/UserToken');

exports.register = async (req, res) => {
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
};

exports.login = async (req, res) => {
  try {
    const { uname, password } = req.body;

    // Validation
    if (!uname || !password) {
      return res.status(400).json({ success: false, message: 'Username and password required' });
    }

    // Find user
    const user = await User.findByUsername(uname);
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        sub: user.uname,
        role: user.role
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
    );

    // Store token in database
    await UserToken.create({ uname: user.uname, token });

    // Set HttpOnly cookie
    res.cookie('authToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000 // 24 hours
    });

    res.status(200).json({
      success: true,
      message: 'Login successful',
      username: user.uname,
      role: user.role
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.logout = async (req, res) => {
  try {
    const token = req.cookies.authToken;
    if (token) {
      // Remove token from database
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      await UserToken.deleteByUsername(decoded.sub);
    }

    // Clear cookie
    res.clearCookie('authToken');
    res.status(200).json({ success: true, message: 'Logout successful' });
  } catch (error) {
    res.clearCookie('authToken');
    res.status(200).json({ success: true, message: 'Logout successful' });
  }
};
