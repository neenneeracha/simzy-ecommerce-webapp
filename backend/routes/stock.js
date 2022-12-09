const router = require("express").Router();

const {
    addProductStock,
    updateProductStock
} = require("../controller/stock");

router.route("/update").patch(updateProductStock);
router.route("/").post(addProductStock)


module.exports = router;