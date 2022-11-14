const router = require('express').Router()

const { stripePayment } = require('../controller/payment');

router.route("/").post(stripePayment)

module.exports = router