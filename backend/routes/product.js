const router = require("express").Router();

const {
    getAllProducts,
    getAllProductInfo,
    getAllFilteredProducts,
    getOneProduct,
    getProductImg,
    getProductColor,
    getProductStock,
    getNewArrivals,
    updateProductInfo,
    updateProductImg,
    removeProduct
} = require("../controller/product");


router.route("/allproducts").get(getAllProductInfo);
router.route("/new-arrivals").get(getNewArrivals);
router.route("/filtered").get(getAllFilteredProducts);
router.route("/img/update").patch(updateProductImg)
router.route("/:id").get(getOneProduct).patch(updateProductInfo).delete(removeProduct);
router.route("/img/:id").get(getProductImg);
router.route("/color/:id").get(getProductColor);
router.route("/stock/:id").get(getProductStock);
router.route("/").get(getAllProducts);

module.exports = router;