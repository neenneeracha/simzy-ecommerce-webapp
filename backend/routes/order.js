const router = require("express").Router();

const {
    addNewOrder,
    addOrderHistory,
    getUserOrder,
    getOrderDetails,
    getOrderedProducts,
    getAllOrderInfo,
    getOrderStatus,
    updateOrderStatus
} = require("../controller/order");

router.route("/status").get(getOrderStatus);
router.route("/neworder").post(addNewOrder);
router.route("/orderhistory").post(addOrderHistory);
router.route("/details/:id").get(getOrderDetails);
router.route("/products/:id").get(getOrderedProducts);
router.route("/:id").get(getUserOrder).patch(updateOrderStatus);
router.route("/").get(getAllOrderInfo);

module.exports = router;