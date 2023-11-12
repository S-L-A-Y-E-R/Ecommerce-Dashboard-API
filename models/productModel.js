const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "The product must have a name"],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "The product must have a price"],
    },
    storeId: {
      type: mongoose.Schema.ObjectId,
      ref: "Store",
      required: true,
    },
    categoryId: {
      type: mongoose.Schema.ObjectId,
      ref: "Category",
      required: true,
    },
    sizeId: {
      type: mongoose.Schema.ObjectId,
      ref: "Size",
      required: true,
    },
    colorId: {
      type: mongoose.Schema.ObjectId,
      ref: "Color",
      required: true,
    },
    images: {
      type: [String],
      required: [true, "The product must have at least one image"],
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isArchived: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    updatedAt: {
      type: Date,
      select: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

productSchema.pre(/^findOneAndUpdate/, function (next) {
  this._update.updatedAt = Date.now();
  next();
});

productSchema.pre(/^find/, function (next) {
  this.populate({
    path: "categoryId",
    select: "name -storeId -billboardId",
  })
    .populate({
      path: "sizeId",
      select: "name",
    })
    .populate({
      path: "colorId",
      select: "value",
    });
  next();
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
