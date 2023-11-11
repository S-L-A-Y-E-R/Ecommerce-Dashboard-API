const mongoose = require("mongoose");

const storeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "The store must have a name"],
    trim: true,
  },
  userId: {
    type: String,
    required: [true, "The store must belong to a user"],
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

storeSchema.pre(/^findOneAndUpdate/, function (next) {
  this._update.updatedAt = Date.now();
  next();
});

const Store = mongoose.model("Store", storeSchema);

module.exports = Store;
