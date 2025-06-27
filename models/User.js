// این مدل نمایانگر ساختار داده کاربر است.
// فیلدها: name, email, password, profile (ارجاع به مدل Profile)

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, index: true },
  password: { type: String, required: true },
  profile: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile' },
});

UserSchema.index({ email: 1 });

module.exports = mongoose.model('User', UserSchema);
