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
} = require("../controller/product");

router.route("/").get(getAllProducts);
router.route("/allproducts").get(getAllProductInfo);
router.route("/new-arrivals").get(getNewArrivals);
router.route("/filtered").get(getAllFilteredProducts);
router.route("/:id").get(getOneProduct);
router.route("/img/:id").get(getProductImg);
router.route("/color/:id").get(getProductColor);
router.route("/stock/:id").get(getProductStock);

module.exports = router;
