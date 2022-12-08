const router = require("express").Router();

const { getShippingInfo, getAllUserInfo, getUserInfo, addNewUser, updatePassword, updatePasswordByAdmin, updateUserInfo, updateInfoByAdmin } = require("../controller/user");

router.route("/").get(getAllUserInfo).post(addNewUser);;
router.route("/:id").get(getUserInfo)
router.route("/address/:id").get(getShippingInfo);
router.route("/update-password/:id").patch(updatePassword);
router.route("/update-password-admin/:id").patch(updatePasswordByAdmin);
router.route("/update-info/:id").patch(updateUserInfo);
router.route("/update-info-admin/:id").patch(updateInfoByAdmin);

module.exports = router;