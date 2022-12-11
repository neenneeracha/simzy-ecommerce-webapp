/********************************************************************
 *
 * index.js
 *
 *  This file is the main page of the SIMZY back-end router
 * 
 ********************************************************************
 */


const router = require("express").Router();
const productRoutes = require("./product");
const authRoutes = require("./auth");
const categoryRoutes = require("./category");
const paymentRoutes = require("./payment");
const userRoutes = require("./user");
const orderRoutes = require("./order");
const colorRoutes = require("./color");
const stockRoutes = require("./stock");

router.use("/products", productRoutes);
router.use("/auth", authRoutes);
router.use("/category", categoryRoutes);
router.use("/payment", paymentRoutes);
router.use("/user", userRoutes);
router.use("/order", orderRoutes);
router.use("/color", colorRoutes);
router.use("/stock", stockRoutes);

module.exports = router;