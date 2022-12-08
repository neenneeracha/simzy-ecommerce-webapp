const router = require("express").Router();

const { getShippingInfo, getAllUserInfo, getUserInfo, updatePassword, updatePasswordByAdmin, updateUserInfo, updateInfoByAdmin } = require("../controller/user");

router.route("/address/:id").get(getShippingInfo);
router.route("/").get(getAllUserInfo);
router.route("/:id").get(getUserInfo);
router.route("/update-password/:id").patch(updatePassword);
router.route("/update-password-admin/:id").patch(updatePasswordByAdmin);
router.route("/update-info/:id").patch(updateUserInfo);
router.route("/update-info-admin/:id").patch(updateInfoByAdmin);

module.exports = router;