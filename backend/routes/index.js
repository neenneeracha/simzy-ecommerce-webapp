const router = require('express').Router()

const productRoutes = require('./products')
const authRoutes = require('./auth')
const categoryRoutes = require('./category')
const paymentRoutes = require('./payment')

router.use("/products", productRoutes)
router.use("/auth", authRoutes)
router.use("/category", categoryRoutes)
router.use("/payment", paymentRoutes)

module.exports = router