/********************************************************************
 *
 * PaymentProcessing.jsx
 *
 *   This file represents the payment processing page and
 *   shows loading until the system finishes processing the payment.
 *
 ********************************************************************
 */

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import LoadingOverlay from "react-loading-overlay";
import { useNavigate, useSearchParams } from "react-router-dom";
import { clearCart } from "../redux/cartRedux";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useUser } from "../../context/UserContext";
import Cookie from "js-cookie";

// style the components
const Container = styled.div`
  min-height: 100vh;
  position: relative;
`;

const PaymentProcessing = () => {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [inputs, setInputs] = useState([]);
  const navigate = useNavigate();
  const session_id = searchParams.get("session_id");
  const user = useUser();
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  LoadingOverlay.propTypes = undefined;

  // get payment information from backend
  useEffect(() => {
    const getPaymentDetails = async () => {
      const res = await axios.get(
        `http://localhost:8080/api/v1/payment/stripe?session_id=${session_id}`
      );
      setInputs(res.data);
    };

    getPaymentDetails();
  }, [session_id]);

  // processing of submitted forms
  useEffect(() => {
    const handleSubmit = async () => {
      // input is not empty
      if (inputs.length !== 0) {
        try {
          // send payment information to the back end
          let res = await axios.post(
            "http://localhost:8080/api/v1/payment/new",
            { payment: "2", status: "1" }
          );
          const payment_id = res.data.insertId;

          // send order information to the back end
          res = await axios.post(
            "http://localhost:8080/api/v1/order/neworder",
            [inputs, { user_id: user.user_id, payment_id: payment_id }]
          );
          const order_id = res.data.insertId;

          // Send order history information to the back end
          res = await axios.post(
            "http://localhost:8080/api/v1/order/orderhistory",
            [cart.products, { order_id: order_id }]
          );

          setTimeout(function () {
            setLoading(false);
            dispatch(clearCart());
            Cookie.set("orderID", order_id, {
              path: "/",
              expires: 2 / (24 * 60),
            });
            navigate("/success");
          }, 2000);
        } catch (error) {
          console.log(error);
        }
      }
    };

    handleSubmit();
  }, [inputs, user.user_id, cart.products, navigate, dispatch]);

  return (
    <LoadingOverlay
      active={loading}
      spinner
      text="Processing with the payment..."
    >
      <Container>
        <Navbar />
      </Container>
    </LoadingOverlay>
  );
};

export default PaymentProcessing;
