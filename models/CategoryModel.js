const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "The category must have a name"],
      trim: true,
    },
    storeId: {
      type: mongoose.Schema.ObjectId,
      ref: "Store",
      required: true,
    },
    billboardId: {
      type: mongoose.Schema.ObjectId,
      ref: "Billboard",
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
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

categorySchema.index({ storeId: 1 });

categorySchema.virtual("products", {
  ref: "Product",
  foreignField: "categoryId",
  localField: "_id",
});

categorySchema.pre(/^findOneAndUpdate/, function (next) {
  this._update.updatedAt = Date.now();
  next();
});

categorySchema.pre(/^find/, function (next) {
  this.populate({
    path: "storeId",
    select: "name",
  }).populate({
    path: "billboardId",
    select: "label imageUrl",
  });
  next();
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
