const Billboard = require("../models/billboardsModel");
const Category = require("../models/CategoryModel");
const { createOne, getAll, getOne, updateOne } = require("./factoryHandler");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.checkBeforeDelete = catchAsync(async (req, res, next) => {
  const categories = await Category.find({ billboardId: req.params.id });

  if (categories.length > 0) {
    return next(
      new AppError(
        "This billboard is used by some categories. Please delete those categories first.",
        400
      )
    );
  }

  next();
});

exports.createBillboard = createOne(Billboard);

exports.getAllBillboards = getAll(Billboard);

exports.getOneBillboard = getOne(Billboard, "categories");

exports.updateBillboard = updateOne(Billboard);

exports.deleteBillboard = catchAsync(async (req, res, next) => {
  const billboard = await Billboard.findByIdAndDelete(req.params.id);

  if (!billboard) {
    return next(new AppError("No billboard found with that ID", 404));
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
});

exports.getEmptyBillboard = catchAsync(async (req, res, next) => {
  res.status(200).json({
    status: "success",
    data: [],
  });
});
