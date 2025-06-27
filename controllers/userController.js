const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// 2. Get users with profiles populated (optimized)
exports.getUsersWithProfiles = async (req, res, next) => {
  try {
    const users = await User.find({})
      .populate({ path: 'profile', select: 'bio avatar', options: { lean: true } })
      .select('name email profile')
      .lean();
    res.json(users);
  } catch (err) {
    next(err);
  }
};

// 3. Get user by ID with async/await and error handling
exports.getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).lean();
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    next(err);
  }
};

// 3b. Reusable function for getting user by ID (for use in other controllers/routes)
exports.getUserByIdSafe = async (id) => {
  if (!id || id.length !== 24) return null;
  try {
    const user = await User.findById(id).lean();
    return user;
  } catch (err) {
    return null;
  }
};

// دریافت اطلاعات کامل کاربر برای /me
exports.getUserBaseInfo = async (userId) => {
  const user = await User.findById(userId).select('id username email name').lean();
  if (!user) return null;
  return user;
};

// Signup controller
exports.signup = async (req, res, next) => {
  try {
    const { username, email, password, name } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    // Check if user exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' });
    }
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create user
    const user = await User.create({ username, email, password: hashedPassword, name });
    // Generate JWT
    const token = jwt.sign({ id: user._id, username: user.username, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(201).json({
      user: { id: user._id, username: user.username, email: user.email },
      token
    });
  } catch (err) {
    next(err);
  }
};

// Login controller
exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    // Find user
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    // Generate JWT
    const token = jwt.sign({ id: user._id, username: user.username, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({
      user: { id: user._id, username: user.username, email: user.email },
      token
    });
  } catch (err) {
    next(err);
  }
};
