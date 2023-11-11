const mongoose = require("mongoose");

const billboardSchema = new mongoose.Schema({
  label: {
    type: String,
    required: [true, "The billboard must have a label"],
    trim: true,
  },
  storeId: {
    type: mongoose.Schema.ObjectId,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
});

billboardSchema.pre(/^findOneAndUpdate/, function (next) {
  this._update.updatedAt = Date.now();
  next();
});

const Billboard = mongoose.model("Billboard", billboardSchema);

module.exports = Billboard;
