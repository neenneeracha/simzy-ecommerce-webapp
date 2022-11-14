const pool = require('../database/connector')
require('dotenv').config()

const KEY = process.env.STRIPE_SECRET_KEY
const stripe = require("stripe")(KEY)

const handlePayment = (req, res) => {
    stripe.charges.create({
        source: req.body.tokenId,
        amount: req.body.amount * 10,
        currency: "thb"
    }, (stripeErr, stripeRes) => {
        if (stripeErr) {
            res.status(500).json(stripeErr)
        } else {
            res.status(200).json(stripeRes)
        }
    })

}

module.exports = { handlePayment }