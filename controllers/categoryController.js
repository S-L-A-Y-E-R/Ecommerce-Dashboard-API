const Category = require("../models/CategoryModel");
const {
  createOne,
  getAll,
  getOne,
  updateOne,
  deleteOne,
} = require("./factoryHandler");
const catchAsync = require("../utils/catchAsync");

exports.createCategory = createOne(Category);

exports.getAllCategories = getAll(Category);

exports.getOneCategory = getOne(Category);

exports.updateCategory = updateOne(Category);

exports.deleteCategory = deleteOne(Category);

exports.getEmptyCategory = catchAsync(async (req, res, next) => {
  res.status(200).json({
    status: "success",
    data: [],
  });
});
