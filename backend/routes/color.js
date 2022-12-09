const router = require("express").Router();

const { getAllColorGroup } = require("../controller/color");

router.route("/").get(getAllColorGroup);
module.exports = router;