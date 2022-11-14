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

const stripePayment = async(req, res) => {
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        customer_email: "hello@gmail.com",
        line_items: [{
            price_data: {
                product_data: {
                    name: "T-shirt"
                },
                unit_amount: 1500,
                currency: 'thb',
            },
            quantity: 1,
        }],
        mode: 'payment',
        success_url: 'http://localhost:3000/success',
        cancel_url: 'http://localhost:3000/checkout',
    });

    res.send({ url: session.url })
}

module.exports = { handlePayment, stripePayment }