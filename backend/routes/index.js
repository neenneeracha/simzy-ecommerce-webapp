<<<<<<< HEAD
const router = require('express').Router()

const productRoutes = require('./products')
const authRoutes = require('./auth')
const categoryRoutes = require('./category')

router.use("/products", productRoutes)
router.use("/auth", authRoutes)
router.use("/category", categoryRoutes)

=======
const router = require('express').Router()

const productRoutes = require('./products')
const authRoutes = require('./auth')
const categoryRoutes = require('./category')

router.use("/products", productRoutes)
router.use("/auth", authRoutes)
router.use("/category", categoryRoutes)

>>>>>>> 21d83452411a8277c11e0492f29aa4dba0308495
module.exports = router