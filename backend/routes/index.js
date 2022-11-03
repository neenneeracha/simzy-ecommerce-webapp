const router = require('express').Router()

const productRoutes = require('./products')
const authRoutes = require('./auth')
const categoryRoutes = require('./category')

router.use("/products", productRoutes)
router.use("/auth", authRoutes)
router.use("/category", categoryRoutes)

module.exports = router