const router = require('express').Router()

const productRoutes = require('./products')
const authRoutes = require('./auth')
const categoryRoutes = require('./category')
const paymentRoutes = require('./payment')
const userRoutes = require('./user')

router.use("/products", productRoutes)
router.use("/auth", authRoutes)
router.use("/category", categoryRoutes)
router.use("/payment", paymentRoutes)
router.use("/user", userRoutes)

module.exports = router