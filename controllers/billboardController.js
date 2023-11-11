const Billboard = require("../models/billboardsModel");
const {
  createOne,
  getAll,
  getOne,
  updateOne,
  deleteOne,
} = require("./factoryHandler");
const catchAsync = require("../utils/catchAsync");

exports.createBillboard = createOne(Billboard);

exports.getAllBillboards = getAll(Billboard);

exports.getOneBillboard = getOne(Billboard);

exports.updateBillboard = updateOne(Billboard);

exports.deleteBillboard = deleteOne(Billboard);

exports.getEmptyBillboard = catchAsync(async (req, res, next) => {
  res.status(200).json({
    status: "success",
    data: [],
  });
});
