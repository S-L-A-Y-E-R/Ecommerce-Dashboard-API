const express = require("express");
const {
  createProduct,
  getAllProducts,
  getOneProduct,
  updateProduct,
  deleteProduct,
  getEmptyProduct,
} = require("../controllers/productController");

const router = express.Router();

router.get("/new", getEmptyProduct);

router
  .route("/:id")
  .get(getOneProduct)
  .patch(updateProduct)
  .delete(deleteProduct);

router.route("/").post(createProduct).get(getAllProducts);

module.exports = router;
