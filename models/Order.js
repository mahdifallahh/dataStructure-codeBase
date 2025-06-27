// این مدل نمایانگر ساختار داده سفارش است.
// فیلدها: user (ارجاع به User)، محصولات، وضعیت و تاریخ‌ها

const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  // index true for optimization
  items: [{ type: String }],
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true },
  total: Number,
  createdAt: { type: Date, default: Date.now },
});
OrderSchema.index({ user: 1 }); // ایندکس برای بهینه‌سازی کوئری‌های کاربر
module.exports = mongoose.model('Order', OrderSchema);
