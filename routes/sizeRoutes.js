const express = require("express");
const {
  createSize,
  getAllSizes,
  getOneSize,
  updateSize,
  deleteSize,
} = require("../controllers/sizeController");

const router = express.Router();

router.route("/:id").get(getOneSize).patch(updateSize).delete(deleteSize);

router.route("/").post(createSize).get(getAllSizes);

module.exports = router;
