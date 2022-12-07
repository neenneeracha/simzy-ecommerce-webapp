const router = require("express").Router();

const {
  addNewOrder,
  addOrderHistory,
  getAllOrderInfo,
} = require("../controller/order");

router.route("/").get(getAllOrderInfo);
router.route("/neworder").post(addNewOrder);
router.route("/orderhistory").post(addOrderHistory);

module.exports = router;
