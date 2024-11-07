const Object3D = require("../models/Object3D");

const saveObjectData = async (req, res) => {
  try {
    const { originalname, filename } = req.file;
    const userId = req.user.userId;

    // Construct a URL for the uploaded file
    const fileUrl = `${req.protocol}://${req.get("host")}/uploads/${filename}`;

    // Save object metadata in the database
    const newObject = new Object3D({
      name: originalname,
      filePath: fileUrl, // Store URL instead of local path
      userId,
    });
    await newObject.save();

    res.status(201).json({ msg: "3D object uploaded successfully", fileUrl });
  } catch (error) {
    res.status(500).json({ msg: "Server error", error });
  }
};

const getObjectData = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ msg: "Not Authenticated" });
  }
  try {
    const userId = req.user.userId;
    const objects = await Object3D.find({ userId });

    res.status(200).json({ msg: "All data has been fetched", objects });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const getSingleObjData = async (req, res) => {
  const {
    params: { id },
  } = req;
  if (!req.user) {
    return res.status(401).json({ msg: "Not Authenticated" });
  }

  try {
    const singleObj = await Object3D.findById(id);
    if (!singleObj) {
      return res.json({ msg: "Object not found" });
    }
    res.status(200).json({ msg: "Note found successfully", singleObj });
  } catch (error) {
    res.status(500).json({ msg: "Some error occured", errorMsg: error });
  }
};

module.exports = { saveObjectData, getObjectData, getSingleObjData };
