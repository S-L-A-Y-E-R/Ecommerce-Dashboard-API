const Product = require("../models/productModel");
const {
  createOne,
  getAll,
  getOne,
  updateOne,
  deleteOne,
} = require("./factoryHandler");
const catchAsync = require("../utils/catchAsync");

exports.createProduct = createOne(Product);

exports.getAllProducts = getAll(Product);

exports.getOneProduct = getOne(Product);

exports.updateProduct = updateOne(Product);

exports.deleteProduct = deleteOne(Product);

exports.getEmptyProduct = catchAsync(async (req, res, next) => {
  res.status(200).json({
    status: "success",
    data: [],
  });
});
