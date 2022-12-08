const router = require("express").Router();

const {
  addNewOrder,
  addOrderHistory,
  getUserOrder,
  getOrderDetails,
  getOrderedProducts,
  getAllOrderInfo,
} = require("../controller/order");

router.route("/").get(getAllOrderInfo);
router.route("/neworder").post(addNewOrder);
router.route("/orderhistory").post(addOrderHistory);
router.route("/:id").get(getUserOrder);
router.route("/details/:id").get(getOrderDetails);
router.route("/products/:id").get(getOrderedProducts);

module.exports = router;
