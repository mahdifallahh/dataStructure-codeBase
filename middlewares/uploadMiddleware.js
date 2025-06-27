const fs = require('fs');
const path = require('path');
const multer = require('multer');

// مسیر پوشه آپلود
const uploadDir = path.join(__dirname, '../uploads');
// اگر پوشه وجود نداشت، بساز
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') cb(null, true);
  else cb(new Error('Only JPEG and PNG images allowed'), false);
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 1 * 1024 * 1024 }, // 1MB
});

const uploadImages = multer({
  storage,
  fileFilter,
  limits: { fileSize: 1 * 1024 * 1024, files: 5 },
});

module.exports = { upload, uploadImages };
