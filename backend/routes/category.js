const router = require("express").Router();

const { getSubCategory, getAllCategory } = require("../controller/category");

router.route("/").get(getSubCategory);
router.route("/all").get(getAllCategory);
module.exports = router;