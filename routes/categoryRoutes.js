const express = require("express");
const {
  createCategory,
  getAllCategories,
  getOneCategory,
  updateCategory,
  deleteCategory,
  getEmptyCategory,
  checkBeforeDelete,
} = require("../controllers/categoryController");

const router = express.Router();

router.get("/new", getEmptyCategory);

router
  .route("/:id")
  .get(getOneCategory)
  .patch(updateCategory)
  .delete(checkBeforeDelete, deleteCategory);

router.route("/").post(createCategory).get(getAllCategories);

module.exports = router;
