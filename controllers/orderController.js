// این کنترلر برای مدیریت سفارش‌ها استفاده می‌شود.
// توابع معمولاً شامل ایجاد، دریافت، ویرایش و حذف سفارش هستند.
// برای استفاده در روت‌ها:
// router.post('/orders', orderController.createOrder)
// router.get('/orders', orderController.getOrders)

const Order = require('../models/Order');

// 5. Get orders with user info (optimized)
exports.getOrdersWithUsers = async (req, res, next) => {
  try {
    const orders = await Order.find({})
      .populate({ path: 'user', select: 'name email', options: { lean: true } })
      .lean();
    res.json(orders);
  } catch (err) {
    next(err);
  }
};
