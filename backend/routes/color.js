/********************************************************************
 *
 * color.js
 *
 *   This file contains a collection of color to handle 
 *   requests to the backend for product color information
 * 
 ********************************************************************
 */

const router = require("express").Router();

const { getAllColorGroup, UpdateStockColor } = require("../controller/color");

router.route("/update/:id").patch(UpdateStockColor);
router.route("/").get(getAllColorGroup);
module.exports = router;