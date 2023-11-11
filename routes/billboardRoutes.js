const express = require("express");
const {
  createBillboard,
  getAllBillboards,
  getOneBillboard,
  updateBillboard,
  deleteBillboard,
} = require("../controllers/billboardController");

const router = express.Router();

router
  .route("/:id")
  .get(getOneBillboard)
  .patch(updateBillboard)
  .delete(deleteBillboard);

router.route("/").post(createBillboard).get(getAllBillboards);

module.exports = router;
