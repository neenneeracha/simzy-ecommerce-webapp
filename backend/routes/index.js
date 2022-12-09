const router = require("express").Router();

const productRoutes = require("./product");
const authRoutes = require("./auth");
const categoryRoutes = require("./category");
const paymentRoutes = require("./payment");
const userRoutes = require("./user");
const orderRoutes = require("./order");
const colorRoutes = require("./color");

router.use("/products", productRoutes);
router.use("/auth", authRoutes);
router.use("/category", categoryRoutes);
router.use("/payment", paymentRoutes);
router.use("/user", userRoutes);
router.use("/order", orderRoutes);
router.use("/color", colorRoutes);

module.exports = router;