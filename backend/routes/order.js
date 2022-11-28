const router = require("express").Router();

const { addNewOrder, addOrderHistory } = require("../controller/order");

router.route("/neworder").post(addNewOrder);
router.route("/orderhistory").post(addOrderHistory);

module.exports = router;
