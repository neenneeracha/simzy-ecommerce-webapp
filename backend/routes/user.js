const router = require("express").Router();

const { getShippingInfo, getAllUserInfo, getUserInfo } = require("../controller/user");

router.route("/address/:id").get(getShippingInfo);
router.route("/").get(getAllUserInfo);
router.route("/:id").get(getUserInfo);

module.exports = router;