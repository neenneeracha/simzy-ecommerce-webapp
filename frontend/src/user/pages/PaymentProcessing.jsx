import React from 'react'
import styled from "styled-components";
import Navbar from '../components/Navbar';
import LoadingOverlay from 'react-loading-overlay';

const Container = styled.div`
  min-height: 100vh;
  position: relative;
`;

const PaymentProcessing = () => {
  return (
  <LoadingOverlay
  active={true}
  spinner
  text='Processing with the payment...'
  >
    <Container>
      <Navbar/>
    </Container>
</LoadingOverlay>
  )
}

export default PaymentProcessing