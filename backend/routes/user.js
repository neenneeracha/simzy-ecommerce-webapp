const router = require("express").Router();

const { getShippingInfo } = require("../controller/user");

router.route("/address/:id").get(getShippingInfo);

module.exports = router;
