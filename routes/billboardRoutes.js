const express = require("express");
const {
  createBillboard,
  getAllBillboards,
  getOneBillboard,
  updateBillboard,
  deleteBillboard,
  getEmptyBillboard,
  checkBeforeDelete,
} = require("../controllers/billboardController");

const router = express.Router();

router.get("/new", getEmptyBillboard);

router
  .route("/:id")
  .get(getOneBillboard)
  .patch(updateBillboard)
  .delete(checkBeforeDelete, deleteBillboard);

router.route("/").post(createBillboard).get(getAllBillboards);

module.exports = router;
