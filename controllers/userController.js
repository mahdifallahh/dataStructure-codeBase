// این کنترلر برای مدیریت کاربران استفاده می‌شود.
//
// getUsersWithProfiles:
//   دریافت لیست کاربران به همراه اطلاعات پروفایل (bio, avatar) به صورت بهینه.
//   خروجی: آرایه‌ای از کاربران با فیلدهای name, email, profile.
//
// getUserById:
//   دریافت کاربر بر اساس آیدی با مدیریت خطا.
//   خروجی: شیء کاربر یا پیام خطا در صورت عدم وجود.
//
// asyncHandler:
//   تابع کمکی برای مدیریت خطاهای async/await در روت‌ها.
//
// برای استفاده در روت‌ها:
// router.get('/users', userController.getUsersWithProfiles)
// router.get('/users/:id', userController.getUserById)

const User = require('../models/User');

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

// 3b. Async handler utility for reusability
exports.asyncHandler = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
