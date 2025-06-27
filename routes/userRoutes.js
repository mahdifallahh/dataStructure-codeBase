// این فایل شامل روت‌های مربوط به کاربران است.
// مسیرهای اصلی:
//   GET /users
//   GET /users/:id

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authMiddleware } = require('../middlewares/authMiddleware');

// 2. Get users with profiles
router.get('/', authMiddleware, userController.asyncHandler(userController.getUsersWithProfiles));

// 3. Get user by ID
router.get('/:id', authMiddleware, userController.asyncHandler(userController.getUserById));

module.exports = router;
