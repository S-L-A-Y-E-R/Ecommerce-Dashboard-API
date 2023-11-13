const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    storeId: {
      type: mongoose.Schema.ObjectId,
      ref: "Store",
      required: true,
    },
    orderItems: [
      {
        productId: {
          type: mongoose.Schema.ObjectId,
          ref: "Product",
          required: true,
        },
      },
    ],
    isPaid: {
      type: Boolean,
      default: false,
    },
    phone: {
      type: String,
      default: "",
    },
    address: {
      type: String,
      default: "",
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

orderSchema.index({ storeId: 1 });

orderSchema.pre(/^find/, function (next) {
  this.populate({
    path: "orderItems.productId",
    select: "name price",
  });
  next();
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
