const mongoose = require("mongoose");

const sizeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "The size must have a label"],
    trim: true,
  },
  storeId: {
    type: mongoose.Schema.ObjectId,
    ref: "Store",
    required: true,
  },
  value: {
    type: String,
    required: [true, "The size must have a value"],
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

sizeSchema.index({ storeId: 1 });

sizeSchema.pre(/^findOneAndUpdate/, function (next) {
  this._update.updatedAt = Date.now();
  next();
});

const Size = mongoose.model("Size", sizeSchema);

module.exports = Size;
