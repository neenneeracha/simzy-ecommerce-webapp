const router = require("express").Router();

const { getShippingInfo, getAllUserInfo } = require("../controller/user");

router.route("/address/:id").get(getShippingInfo);
router.route("/").get(getAllUserInfo);

module.exports = router;
