const express = require("express");
const {
  createOrder,
  getAllOrders,
  getOneOrder,
  updateOrder,
  deleteOrder,
  getEmptyOrder,
  getCheckoutSession,
} = require("../controllers/orderController");

const router = express.Router();

router.get("/new", getEmptyOrder);

router.route("/:id").get(getOneOrder).patch(updateOrder).delete(deleteOrder);

router.route("/").post(createOrder).get(getAllOrders);

router.post("/checkout-session", getCheckoutSession);

module.exports = router;
