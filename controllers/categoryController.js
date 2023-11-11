const Category = require("../models/CategoryModel");
const {
  createOne,
  getAll,
  getOne,
  updateOne,
  deleteOne,
} = require("./factoryHandler");

exports.createCategory = createOne(Category);

exports.getAllCategories = getAll(Category);

exports.getOneCategory = getOne(Category);

exports.updateCategory = updateOne(Category);

exports.deleteCategory = deleteOne(Category);
