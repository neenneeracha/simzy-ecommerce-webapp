const router = require("express").Router();

<<<<<<< HEAD
const {
  addNewOrder,
  addOrderHistory,
  getAllOrderInfo,
} = require("../controller/order");
=======
const { addNewOrder, addOrderHistory, getUserOrder, getOrderDetails, getOrderedProducts } = require("../controller/order");
>>>>>>> dead63f83451be9835834e2b5d9a6eeb7a78205b

router.route("/").get(getAllOrderInfo);
router.route("/neworder").post(addNewOrder);
router.route("/orderhistory").post(addOrderHistory);
router.route("/:id").get(getUserOrder);
router.route("/details/:id").get(getOrderDetails);
router.route("/products/:id").get(getOrderedProducts);

module.exports = router;