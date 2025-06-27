// این فایل شامل روت‌های مربوط به سفارش‌ها است.
// مسیرهای اصلی:
//   POST /orders
//   GET /orders

const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { authMiddleware } = require('../middlewares/authMiddleware');

// 5. Get orders with user info
router.get('/', authMiddleware, orderController.getOrdersWithUsers);

// Create new order
router.post('/', authMiddleware, orderController.createOrder);

module.exports = router;
