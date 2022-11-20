const router = require('express').Router()

const { stripePayment, addNewPayment } = require('../controller/payment');

router.route("/stripe").post(stripePayment)
router.route("/new").post(addNewPayment)

module.exports = router