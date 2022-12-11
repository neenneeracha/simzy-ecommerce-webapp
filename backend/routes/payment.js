/********************************************************************
 *
 * payment.js
 *
 *   This file contains a collection of routers to handle 
 *   requests to the backend for payment information
 * 
 ********************************************************************
 */

const router = require("express").Router();

const {
  stripePayment,
  addNewPayment,
  getPaymentDetails,
} = require("../controller/payment");

router.route("/stripe").post(stripePayment).get(getPaymentDetails);
router.route("/new").post(addNewPayment);

module.exports = router;
