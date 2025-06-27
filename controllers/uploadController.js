// این کنترلر برای آپلود تصاویر تکی و چندتایی استفاده می‌شود.
// singleImageUpload: آپلود یک تصویر با کلید 'image'.
// multiImageUpload: آپلود تا ۵ تصویر با کلید 'images' (هر تصویر حداکثر ۱ مگابایت، فقط jpeg/png).
//
// برای استفاده در روت‌ها:
// router.post('/upload/single', uploadController.singleImageUpload)
// router.post('/upload/multi', uploadController.multiImageUpload)
//
// خروجی singleImageUpload:
//   { message: 'Image uploaded', file: req.file }
// خروجی multiImageUpload:
//   { message: 'Images uploaded', files: req.files }

const { upload, uploadImages } = require('../middlewares/uploadMiddleware');

// 4. Single image upload
exports.singleImageUpload = [
  upload.single('image'),
  (req, res) => {
    res.json({ message: 'Image uploaded', file: req.file });
  }
];

// 4b, 6, 6b. Multiple image upload (up to 5, 1MB each, only jpeg/png)
exports.multiImageUpload = [
  uploadImages.array('images', 5),
  (req, res) => {
    res.json({ message: 'Images uploaded', files: req.files });
  }
];
