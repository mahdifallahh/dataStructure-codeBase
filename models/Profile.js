// این مدل نمایانگر ساختار داده پروفایل است.
// فیلدها: bio, avatar, user (ارجاع به مدل User)

const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  bio: String,
  avatar: String,
});

module.exports = mongoose.model('Profile', ProfileSchema);
