const Router = require('express');
const multer = require('multer');
const path = require('path');
const authMiddleware = require('../middlewares/authMiddleware');
const { saveObjectData, getObjectData } = require('../controllers/objectController');

const router = Router();

const storage = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
      const allowedTypes = ['application/octet-stream', 'model/gltf-binary', 'model/obj', 'model/glb'];
      if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
      } else {
        cb(new Error('Invalid file type'), false);
      }
    },
  });

  router.post('/upload', authMiddleware, upload.single('object'), saveObjectData);
  router.get('/', authMiddleware, getObjectData);

  module.exports = router;