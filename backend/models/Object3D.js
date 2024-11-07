const mongoose = require('mongoose');

const object3DSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
      },
      filePath: {
        type: String,
        required: true,
      },
      mtlPath: {
        type: String,
      },
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
})

module.exports = mongoose.model("Object3D", object3DSchema);