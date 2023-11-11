const Size = require("../models/sizeModel");
const {
  createOne,
  getAll,
  getOne,
  updateOne,
  deleteOne,
} = require("./factoryHandler");

exports.createSize = createOne(Size);

exports.getAllSizes = getAll(Size);

exports.getOneSize = getOne(Size);

exports.updateSize = updateOne(Size);

exports.deleteSize = deleteOne(Size);
