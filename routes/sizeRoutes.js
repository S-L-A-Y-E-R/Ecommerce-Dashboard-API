const express = require("express");
const {
  createSize,
  getAllSizes,
  getOneSize,
  updateSize,
  deleteSize,
  getEmptySize,
} = require("../controllers/sizeController");

const router = express.Router();

router.get("/new", getEmptySize);

router.route("/:id").get(getOneSize).patch(updateSize).delete(deleteSize);

router.route("/").post(createSize).get(getAllSizes);

module.exports = router;
