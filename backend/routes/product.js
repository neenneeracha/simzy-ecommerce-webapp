const router = require("express").Router();

const {
<<<<<<< HEAD:backend/routes/products.js
  getAllProducts,
  getAllProductInfo,
  getAllFilteredProducts,
  getOneProduct,
  getProductImg,
  getProductColor,
  getProductStock,
} = require("../controller/product");

router.route("/").get(getAllProducts);
router.route("/info").get(getAllProductInfo);
=======
    getAllProducts,
    getAllFilteredProducts,
    getOneProduct,
    getProductImg,
    getProductColor,
    getProductStock,
    getNewArrivals

} = require("../controller/product");

router.route("/").get(getAllProducts);
router.route("/new-arrivals").get(getNewArrivals);
>>>>>>> dead63f83451be9835834e2b5d9a6eeb7a78205b:backend/routes/product.js
router.route("/filtered").get(getAllFilteredProducts);
router.route("/:id").get(getOneProduct);
router.route("/img/:id").get(getProductImg);
router.route("/color/:id").get(getProductColor);
router.route("/stock/:id").get(getProductStock);

module.exports = router;