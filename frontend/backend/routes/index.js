const router = require('express').Router()

const productRoutes = require('./products')

// product
router.use("/products", productRoutes)

module.exports = router