const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
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
  images: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Image",
      required: true,
    },
  ],
  orderItems: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "OrderItem",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    select: false,
  },
});

productSchema.pre(/^findOneAndUpdate/, function (next) {
  this._update.updatedAt = Date.now();
  next();
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
