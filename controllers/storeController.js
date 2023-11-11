const Store = require("../models/storeModel");
const {
  createOne,
  getOne,
  getAll,
  updateOne,
  deleteOne,
} = require("./factoryHandler");

exports.createStore = createOne(Store);

exports.getOneStore = getOne(Store);

exports.getAllStores = getAll(Store);

exports.updateStore = updateOne(Store);

exports.deleteStore = deleteOne(Store);
