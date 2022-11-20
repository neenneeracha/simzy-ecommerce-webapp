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
        customer_email: req.body.email,
        shipping_details: [{

        }],
        line_items: [{
            price_data: {
                product_data: {
                    name: "T-shirt"
                },
                unit_amount: req.body.amount * 100,
                currency: 'thb',
            },
            quantity: 1,
        }],
        mode: 'payment',
        success_url: 'http://localhost:3000/processing?session_id={CHECKOUT_SESSION_ID}',
        cancel_url: 'http://localhost:3000/checkout',
    });

    res.send({ url: session.url })
}

const addNewPayment = (req, res) => {
    const payment_type = req.body.payment

    const q = "INSERT INTO payment (payment_type, status) VALUES (?, 0)"

    pool.query(q, [payment_type], (err, data) => {
        if (err) return res.status(500).json(err)

        return res.status(200).json(data)
    })
}

module.exports = { handlePayment, stripePayment, addNewPayment }