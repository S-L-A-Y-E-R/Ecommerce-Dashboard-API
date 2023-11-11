const Color = require("../models/colorModel");
const {
  createOne,
  getAll,
  getOne,
  updateOne,
  deleteOne,
} = require("./factoryHandler");
const catchAsync = require("../utils/catchAsync");

exports.createColor = createOne(Color);

exports.getAllColors = getAll(Color);

exports.getOneColor = getOne(Color);

exports.updateColor = updateOne(Color);

exports.deleteColor = deleteOne(Color);

exports.getEmptyColor = catchAsync(async (req, res, next) => {
  res.status(200).json({
    status: "success",
    data: [],
  });
});
