
const multer = require('multer');

const storage = multer.memoryStorage();

function fileFilter(req, file, cb) {
  const ok = ['image/jpeg', 'image/png', 'image/webp'].includes(file.mimetype);
  cb(ok ? null : new Error('Only JPEG, PNG, or WEBP images are allowed.'), ok);
}

module.exports = multer({ storage, fileFilter, limits: { fileSize: 4 * 1024 * 1024 } });
