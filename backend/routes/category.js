const router = require("express").Router();

const { getSubCategory } = require("../controller/category");

router.route("/").get(getSubCategory);
module.exports = router;
