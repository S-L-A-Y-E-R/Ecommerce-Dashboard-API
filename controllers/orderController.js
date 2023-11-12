const Order = require("../models/orderModel");
const {
  createOne,
  getAll,
  getOne,
  updateOne,
  deleteOne,
} = require("./factoryHandler");
const catchAsync = require("../utils/catchAsync");

exports.createOrder = createOne(Order);

exports.getAllOrders = getAll(Order);

exports.getOneOrder = getOne(Order);

exports.updateOrder = updateOne(Order);

exports.deleteOrder = deleteOne(Order);

exports.getEmptyOrder = catchAsync(async (req, res, next) => {
  res.status(200).json({
    status: "success",
    data: [],
  });
});
