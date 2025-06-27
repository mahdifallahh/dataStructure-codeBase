require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const orderRoutes = require('./routes/orderRoutes');
const uploadRoutes = require('./routes/uploadRoutes');

// این فایل شامل تنظیمات و راه‌اندازی اصلی اپلیکیشن است.
// راه‌اندازی سرور، اتصال به دیتابیس و استفاده از روت‌ها در این فایل انجام می‌شود.

const app = express();
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes);

// Error handler
app.use((err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).json({ message: err.message || 'Internal server error' });
});

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/testdb';

// رفع هشدارهای MongoDB Driver:
// مقداردهی connect فقط با MONGO_URI کافی است (بدون useNewUrlParser و useUnifiedTopology)
mongoose.connect(MONGO_URI)
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });
