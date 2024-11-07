const Router = require("express");
const multer = require("multer");
const path = require("path");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  saveObjectData,
  getObjectData,
  getSingleObjData
} = require("../controllers/objectController");

const router = Router();

const storage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      "application/octet-stream",
      "model/obj",
      "model/glb",
      "model/gltf-binary",
      "model/mtl",
    ];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type"), false);
    }
  },
});

// router.post('/upload', authMiddleware, upload.single('object'), saveObjectData);
router.post("/upload", authMiddleware, upload.single("object"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "File not received" });
  }
  console.log("File uploaded:", req.file);
  saveObjectData(req, res);
});
router.get("/", authMiddleware, getObjectData);
router.get("/:id", authMiddleware, getSingleObjData)

module.exports = router;
