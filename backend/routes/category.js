/********************************************************************
 *
 * category.js
 *
 *   This file contains a collection of routers to handle 
 *   requests to the backend for product category information
 * 
 ********************************************************************
 */

const router = require("express").Router();

const { getSubCategory, getAllCategory } = require("../controller/category");

router.route("/").get(getSubCategory);
router.route("/all").get(getAllCategory);
module.exports = router;