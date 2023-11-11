const Billboard = require("../models/billboardsModel");
const {
  createOne,
  getAll,
  getOne,
  updateOne,
  deleteOne,
} = require("./factoryHandler");

exports.createBillboard = createOne(Billboard);

exports.getAllBillboards = getAll(Billboard);

exports.getOneBillboard = getOne(Billboard);

exports.updateBillboard = updateOne(Billboard);

exports.deleteBillboard = deleteOne(Billboard);
