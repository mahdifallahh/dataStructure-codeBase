// این کنترلر برای مدیریت سفارش‌ها استفاده می‌شود.
// توابع معمولاً شامل ایجاد، دریافت، ویرایش و حذف سفارش هستند.
// برای استفاده در روت‌ها:
// router.post('/orders', orderController.createOrder)
// router.get('/orders', orderController.getOrders)

const Order = require('../models/Order');

// 5. Get orders for current user with user info (user-based)
exports.getOrdersWithUsers = async (req, res, next) => {
  try {
    const userId = req.user && req.user.id ? req.user.id : null;
    if (!userId) return res.status(401).json({ message: 'Unauthorized' });
    const orders = await Order.find({ user: userId })
      .populate({ path: 'user', select: 'name email', options: { lean: true } })
      .lean();
    res.json(orders);
  } catch (err) {
    next(err);
  }
};

// Create new order
exports.createOrder = async (req, res, next) => {
  try {
    const { products, status } = req.body;
    const user = req.user && req.user.id ? req.user.id : null;
    if (!user) return res.status(401).json({ message: 'Unauthorized' });
    const order = await Order.create({ user, products, status });
    res.status(201).json(order);
  } catch (err) {
    next(err);
  }
};
