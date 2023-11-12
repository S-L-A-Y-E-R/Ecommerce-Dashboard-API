const Category = require("../models/CategoryModel");
const Product = require("../models/productModel");
const { createOne, getAll, getOne, updateOne } = require("./factoryHandler");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.checkBeforeDelete = catchAsync(async (req, res, next) => {
  const products = await Product.find({ categoryId: req.params.id });

  if (products.length > 0) {
    return next(
      new AppError(
        "This category is used by some products. Please delete those products first.",
        400
      )
    );
  }

  next();
});

exports.createCategory = createOne(Category);

exports.getAllCategories = getAll(Category);

exports.getOneCategory = getOne(Category);

exports.updateCategory = updateOne(Category);

exports.deleteCategory = catchAsync(async (req, res, next) => {
  const category = await Category.findByIdAndDelete(req.params.id);

  if (!category) {
    return next(new AppError("No category found with that ID", 404));
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
});

exports.getEmptyCategory = catchAsync(async (req, res, next) => {
  res.status(200).json({
    status: "success",
    data: [],
  });
});
