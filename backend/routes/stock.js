const router = require("express").Router();

const {
    addProductStock,
    updateProductStock,
    addNewStock
} = require("../controller/stock");

router.route("/update").patch(updateProductStock);
router.route("/new/:id").post(addNewStock)
router.route("/").post(addProductStock)


module.exports = router;