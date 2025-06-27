// این فایل شامل روت‌های مربوط به کاربران است.
// مسیرهای اصلی:
//   GET /users
//   GET /users/:id

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authMiddleware } = require('../middlewares/authMiddleware');
const errorHandler = require('../utils/errorHandler');

// Get current user info (user base)
router.get('/me', authMiddleware, async (req, res) => {
  if (!req.user) return res.status(401).json({ message: 'Unauthorized' });
  // دریافت اطلاعات کامل کاربر از دیتابیس
  const user = await userController.getUserBaseInfo(req.user.id);
  res.json({ user });
});

// 2. Get users with profiles
router.get('/', authMiddleware, errorHandler(userController.getUsersWithProfiles));

// 3. Get user by ID with async/await and error handling
router.get('/:id', authMiddleware, errorHandler(async (req, res) => {
  const user = await userController.getUserByIdSafe(req.params.id);
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json(user);
}));

// Signup
router.post('/signup', errorHandler(userController.signup));
// Login
router.post('/login', errorHandler(userController.login));

module.exports = router;
