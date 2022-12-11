/********************************************************************
 *
 * payment.js
 *
 *   This file contains a collection of controllers to handle 
 *   requests to the backend for payment information
 * 
 ********************************************************************
 */

const pool = require("../database/connector");
require("dotenv").config();

const KEY = process.env.STRIPE_SECRET_KEY;
const stripe = require("stripe")(KEY);


const stripePayment = async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    customer_email: req.body.email,
    metadata: {
      name: req.body.inputs.name,
      surname: req.body.inputs.surname,
      address: req.body.inputs.address,
      district: req.body.inputs.district,
      province: req.body.inputs.province,
      zipCode: req.body.inputs.zipCode,
      phoneNumber: req.body.inputs.phoneNumber,
    },
    line_items: [
      {
        price_data: {
          product_data: {
            name: "Subtotal",
          },
          unit_amount: req.body.amount * 100,
          currency: "thb",
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url:
      "http://localhost:3000/processing?session_id={CHECKOUT_SESSION_ID}",
    cancel_url: "http://localhost:3000/checkout",
  });

  res.send({ url: session.url });
};

// get payment details by admin
const getPaymentDetails = async (req, res) => {
  const session = await stripe.checkout.sessions.retrieve(req.query.session_id);

  res.send(session.metadata);
};

// add new payment by admin
const addNewPayment = (req, res) => {
  const payment_type = req.body.payment;
  const payment_status = req.body.status;

  const q = "INSERT INTO payment (payment_type, status) VALUES (?, ?)";

  pool.query(q, [payment_type, payment_status], (err, data) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json(data);
  });
};

module.exports = {
  stripePayment,
  addNewPayment,
  getPaymentDetails,
};
