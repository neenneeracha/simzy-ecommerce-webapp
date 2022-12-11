/********************************************************************
 *
 * stock.js
 *
 *   This file contains a collection of routers to handle 
 *   requests to the backend for product stock information
 * 
 ********************************************************************
 */

const router = require("express").Router();

const {
    addProductStock,
    updateProductStock,
    addNewStock
} = require("../controller/stock");

router.route("/update").patch(updateProductStock);
router.route("/new/:id").post(addNewStock)
router.route("/").post(addProductStock)


module.exports = router;