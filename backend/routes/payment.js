const router = require('express').Router()

const { handlePayment } = require('../controller/payment');

router.route("/").post(handlePayment)

module.exports = router