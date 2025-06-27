// این مدل نمایانگر ساختار داده کاربر است.
// فیلدها: name, email, password, profile (ارجاع به مدل Profile)

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  // حذف index: true از فیلدهای email و username برای جلوگیری از اخطار ایندکس تکراری
  name: { type: String, required: false },
  email: { type: String, required: true, unique: true, index: true },
  password: { type: String, required: true },
  profile: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile' },
  username: { type: String, required: true, unique: true, index: true },
});

//the user indexed in order model for optimization

module.exports = mongoose.model('User', UserSchema);
