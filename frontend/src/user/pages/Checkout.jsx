import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Accordion from "react-bootstrap/Accordion";
import Shipping from "../components/Shipping";
import Form from "react-bootstrap/Form";
import StripeCheckout from 'react-stripe-checkout'
import axios from 'axios'

const publishableKey = "pk_test_51LchXIApEdj0AcTgW6ZKmx7Kt6z9i7Yz2FePwNv3GDXg4fv8ziF1lMFVJZIffoZUC9N1Zf1BV4orEBzsd9BovjoE00Dm08fmgu"

const Container = styled.div`
  min-height: 100vh;
  position: relative;
`;

const Wrapper = styled.div`
  padding: 20px;
`;

const Title = styled.h1`
  font-weight: 500;
  text-align: center;
  margin: 2%;
`;

// justify-content: space-between;

const Summary = styled.div`
  flex: 1;
  border-radius: 10px;
  background-color: #fbfbfb;
  padding: 20px;
`;

const SummaryTitle = styled.h3`
  font-weight: bold;
`;

const SummaryItem = styled.div`
  margin: 30px 30px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;
const CashText = styled.span`
  font-size: 16px;
  color: red;
`;

const Button = styled.h3`
  text-align: center;
  color: #eda3b5;
  font-size: 20px;
  padding: 10px 60px;
  border-radius: 5px;
  border: 2px solid #eda3b5;
  margin: 10px 0px;
  cursor: pointer;
  font-weight: 500;

  &:hover {
    color: white;
    background-color: #eda3b5;
    cursor: default;
  }
`;

const Checkout = () => {
  const [show, setShow] = useState("");
  const navigate = useNavigate();
  //const [stripeToken, setStripeToken] = useState(null)

  const onToken = async token => {
    try {
      const res = await axios.post("http://localhost:8080/api/v1/payment", {tokenId: token.id, amount: 2000})
      if (res.data.paid) {
        navigate("/success", {state: {data: 1}})
      }
      
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Container>
      <Navbar />
      <Wrapper>
        <Title>CHECK OUT</Title>
        <Row>
          <Col xs={8}>
            {" "}
            <Accordion defaultActiveKey="0" style={{ margin: "3%" }}>
              <Accordion.Item eventKey="0">
                <Accordion.Header><b>SHIPPING DEAIL</b></Accordion.Header>
                <Accordion.Body>
                  <Shipping />
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header><b>PAYMENT METHOD</b></Accordion.Header>
                <Accordion.Body>
                  <Form.Group>
                    <Form.Label>Please Select a payment method</Form.Label>
                    <br />
                    <Form.Check
                      name="PaymentMethod"
                      label="Cash On Delivery"
                      inline
                      type="radio"
                      onClick={() => setShow(true)}
                    />
                    <Form.Check
                      name="PaymentMethod"
                      label="Credit/Debit Card"
                      inline
                      type="radio"
                      onClick={() => setShow(false)}
                    />

                    {show ? (
                      <CashText>
                        <br /> Please make payment at the time the order is
                        delivered
                      </CashText>
                    ) : (
                      <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                          <Form.Label><b>Card Number:</b> </Form.Label>
                          <Form.Control
                            type="CardNum"
                            placeholder="Enter your card number"
                          />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="expiredDate">
                          <Form.Label><b>Expiration Date:</b> </Form.Label>
                          <Form.Control type="text" placeholder="MM/YY" />
                        </Form.Group>
                        <Form.Group
                          className="mb-3"
                          controlId="formBasicCheckbox"
                        >
                          <Form.Group
                            className="mb-3"
                            controlId="securitycide"
                          >
                            <Form.Label><b>Security Code :</b> </Form.Label>
                            <Form.Control
                              type="int"
                              placeholder="3 digit"
                            />
                          </Form.Group>
                          <Form.Group
                            className="mb-3"
                            controlId="name"
                          >
                            <Form.Label><b>Full Name:</b> </Form.Label>
                            <Form.Control
                              type="text"
                            />
                          </Form.Group>
                        </Form.Group>
                      </Form>
                    )}
                  </Form.Group>
                </Accordion.Body>
              
              </Accordion.Item>
            </Accordion>
          </Col>
          <Col>
            <Summary>
              <SummaryTitle>ORDER SUMMARY</SummaryTitle>
              <SummaryItem>
                <SummaryItemText>Subtotal</SummaryItemText>
                <SummaryItemPrice>฿3,570</SummaryItemPrice>
              </SummaryItem>
              <SummaryItem>
                <SummaryItemText>Estimated Shipping</SummaryItemText>
                <SummaryItemPrice>฿90</SummaryItemPrice>
              </SummaryItem>
              <SummaryItem type="total">
                <SummaryItemText>Total</SummaryItemText>
                <SummaryItemPrice>฿3,660</SummaryItemPrice>
              </SummaryItem>
            </Summary>
          </Col>
        </Row>
        <StripeCheckout
          name="Simzy"
          description="Your total is 2000 THB"
          email="hi@gmail.com"
          amount={2000}
          token={onToken}
          stripeKey={publishableKey}
        >
          <Button className="d-block mx-auto w-25" >CONTINUE</Button>
        </StripeCheckout>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Checkout;
