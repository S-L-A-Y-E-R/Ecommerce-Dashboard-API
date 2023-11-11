const mongoose = require("mongoose");

const colorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "The color must have a label"],
    trim: true,
  },
  storeId: {
    type: mongoose.Schema.ObjectId,
    ref: "Store",
    required: true,
  },
  value: {
    type: String,
    required: [true, "The color must have a value"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
});

colorSchema.pre(/^findOneAndUpdate/, function (next) {
  this._update.updatedAt = Date.now();
  next();
});

const Color = mongoose.model("Color", colorSchema);

module.exports = Color;
