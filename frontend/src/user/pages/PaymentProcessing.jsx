import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Navbar from '../components/Navbar';
import LoadingOverlay from 'react-loading-overlay';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from "axios";
import { useSelector } from "react-redux";
import { useUser } from "../../UserContext";
import Cookie from 'js-cookie'

const Container = styled.div`
  min-height: 100vh;
  position: relative;
`;

const PaymentProcessing = () => {
  const [searchParams] = useSearchParams()
  
  const session_id = searchParams.get('session_id')
  const [loading, setLoading] = useState(true)
  const [inputs, setInputs] = useState([])
  LoadingOverlay.propTypes = undefined

  const user = useUser();
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    const getPaymentDetails = async () => {
      const res = await axios.get(
        `http://localhost:8080/api/v1/payment/stripe?session_id=${session_id}`
      );
      setInputs(res.data);
    };

    getPaymentDetails();
  }, [session_id]);

  useEffect(() => {
    const handleSubmit = async () => {
      if (inputs.length !== 0) {
        try {
          let res = await axios.post("http://localhost:8080/api/v1/payment/new", {payment: "2"});
          const payment_id = res.data.insertId
    
          res = await axios.post("http://localhost:8080/api/v1/order/neworder", [inputs, {user_id: user.user_id, payment_id: payment_id}]);
          const order_id = res.data.insertId
          
           res = await axios.post("http://localhost:8080/api/v1/order/orderhistory", [cart.products, {order_id: order_id}])
          
           setTimeout(function() {
            window.location.href = `/success?id=${order_id}`
         }, 2000);
          
        } catch (error) {
          console.log(error);
        }
      }
      
    }

    
    handleSubmit()
  }, [inputs, user.user_id, cart.products])
  
  
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
