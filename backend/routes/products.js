<<<<<<< HEAD
const router = require('express').Router()

const { getAllProducts, getOneProduct, getProductImg, getProductColor, getProductStock } = require('../controller/product')

router.route("/").get(getAllProducts)
router.route("/:id").get(getOneProduct)
router.route("/img/:id").get(getProductImg)
router.route("/color/:id").get(getProductColor)
router.route("/stock/:id").get(getProductStock)

=======
const router = require('express').Router()

const { getAllProducts, getOneProduct, getProductImg, getProductColor, getProductStock } = require('../controller/product')

router.route("/").get(getAllProducts)
router.route("/:id").get(getOneProduct)
router.route("/img/:id").get(getProductImg)
router.route("/color/:id").get(getProductColor)
router.route("/stock/:id").get(getProductStock)

>>>>>>> 21d83452411a8277c11e0492f29aa4dba0308495
module.exports = router