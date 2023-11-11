const express = require("express");
const {
  createStore,
  getOneStore,
  getAllStores,
  updateStore,
  deleteStore,
} = require("../controllers/storeController");

const router = express.Router();

router.route("/").post(createStore).get(getAllStores);

router.route("/:id").get(getOneStore).patch(updateStore).delete(deleteStore);

module.exports = router;
