const router = require("express").Router();

const { getShippingInfo, getAllUserInfo, getUserInfo, updatePassword, updateUserInfo } = require("../controller/user");

router.route("/address/:id").get(getShippingInfo);
router.route("/").get(getAllUserInfo);
router.route("/:id").get(getUserInfo);
router.route("/update-password/:id").patch(updatePassword);
router.route("/update-info/:id").patch(updateUserInfo);

module.exports = router;