const multer = require('multer');

const storage = multer.memoryStorage();
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
