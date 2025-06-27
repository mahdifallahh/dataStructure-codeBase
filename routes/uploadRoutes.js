// این فایل شامل روت‌های مربوط به آپلود فایل است.
// مسیرهای اصلی:
//   POST /upload/single
//   POST /upload/multi

const express = require('express');
const router = express.Router();
const uploadController = require('../controllers/uploadController');
const { authMiddleware } = require('../middlewares/authMiddleware');

// 4. Single image upload
router.post('/single', authMiddleware, ...uploadController.singleImageUpload);

// 4b, 6, 6b. Multiple image upload (up to 5, 1MB each, only jpeg/png)
router.post('/multi', authMiddleware, ...uploadController.multiImageUpload);

module.exports = router;
