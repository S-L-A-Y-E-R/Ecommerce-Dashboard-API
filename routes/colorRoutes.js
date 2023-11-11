const express = require("express");
const {
  createColor,
  getAllColors,
  getOneColor,
  updateColor,
  deleteColor,
  getEmptyColor,
} = require("../controllers/colorController");

const router = express.Router();

router.get("/new", getEmptyColor);

router.route("/:id").get(getOneColor).patch(updateColor).delete(deleteColor);

router.route("/").post(createColor).get(getAllColors);

module.exports = router;
