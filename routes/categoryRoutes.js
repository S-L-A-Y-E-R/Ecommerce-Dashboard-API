const express = require("express");
const {
  createCategory,
  getAllCategories,
  getOneCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");

const router = express.Router();

router
  .route("/:id")
  .get(getOneCategory)
  .patch(updateCategory)
  .delete(deleteCategory);

router.route("/").post(createCategory).get(getAllCategories);

module.exports = router;
