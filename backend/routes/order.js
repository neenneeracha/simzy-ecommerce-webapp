const router = require("express").Router();

const { addNewOrder, addOrderHistory, getUserOrder } = require("../controller/order");

router.route("/neworder").post(addNewOrder);
router.route("/orderhistory").post(addOrderHistory);
router.route("/:id").get(getUserOrder);

module.exports = router;