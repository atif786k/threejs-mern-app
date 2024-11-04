const Object3D = require("../models/Object3D");

const saveObjectData = async (req, res) => {
  try {
    const { originalname, path } = req.file;
    const userId = req.user.userId;

    const newObject = new Object3D({
      name: originalname,
      filePath: path,
      userId,
    });
    await newObject.save();
    res
      .status(201)
      .json({ msg: "3D object uploaded successfully", object: newObject });
  } catch (error) {
    res.status(500).json({ msg: "Server error", error });
  }
};

const getObjectData = async (req, res) => {
  try {
    const userId = req.user.userId;
    const objects = await Object3D.find({ userId });

    res.status(200).json({ msg: "All data has been fetched", objects });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = { saveObjectData, getObjectData };
