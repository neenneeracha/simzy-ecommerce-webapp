const router = require("express").Router();

const { getShippingInfo, getAllUserInfo, getUserInfo, updatePassword } = require("../controller/user");

router.route("/address/:id").get(getShippingInfo);
router.route("/").get(getAllUserInfo);
router.route("/:id").get(getUserInfo);
router.route("/update-password/:id").patch(updatePassword);

module.exports = router;