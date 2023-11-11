const Size = require("../models/sizeModel");
const {
  createOne,
  getAll,
  getOne,
  updateOne,
  deleteOne,
} = require("./factoryHandler");
const catchAsync = require("../utils/catchAsync");

exports.createSize = createOne(Size);

exports.getAllSizes = getAll(Size);

exports.getOneSize = getOne(Size);

exports.updateSize = updateOne(Size);

exports.deleteSize = deleteOne(Size);

exports.getEmptySize = catchAsync(async (req, res, next) => {
  res.status(200).json({
    status: "success",
    data: [],
  });
});
