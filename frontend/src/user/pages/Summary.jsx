/********************************************************************
 *
 * Summary.jsx
 *
 *    This file represents the order summary page for customers
 *    which consist of Navigation bar, Slider, Order Item, 
 *    Shipping information, Price information and Footer components.
 *
 ********************************************************************
 */

import React from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import OrderItem from "../components/OrderItem";
import Shipping from "../components/Shipping";
import PriceInfo from "../components/PriceInfo";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Container = styled.div``;

const Content = styled.div`
  background-color: #f6f6f6;
`;

const Button = styled.h3`
  text-align: center;
  color: #eda3b5;
  font-size: 20px;
  padding: 10px 60px;
  border-radius: 5px;
  border: 2px solid #eda3b5;
  cursor: pointer;
  font-weight: 500;
  margin: 30px;
  &:hover {
    color: white;
    background-color: #eda3b5;
    opacity: 0.7;
    cursor: default;
  }
`;

const Summary = () => {
  return (
    <Container>
      <Navbar />
      <Content>
        <OrderItem />
        <Shipping />
        <PriceInfo />
        <Row>
          <Col></Col>
          <Col xs={7}>
            <Row>
              <Col>
                <Button type="create">BACK</Button>
              </Col>
              <Col xs={3}></Col>
              <Col>
                <Button type="create">PLACE ORDER</Button>
              </Col>
            </Row>
          </Col>
          <Col></Col>
        </Row>
      </Content>
      <Footer />
    </Container>
  );
};

export default Summary;
