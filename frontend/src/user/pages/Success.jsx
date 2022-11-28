import React from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Col, Image, Row } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";

const Container = styled.div`
  min-height: 100vh;
  position: relative;
`;
const Content = styled.div`
  background-color: #f6f6f6;
`;
const SuccessAlert = styled.div`
  padding: 50px;
  background-color: white;
  margin: 3% 0;
`;
const Text = styled.h3`
  text-align: center;
  margin-top: 30px;
  color: #299f00;
`;

const TextThank = styled.h6`
  text-align: center;
  color: #938e8e;
`;

const OrderReference = styled.h6`
  text-align: center;
  margin: 30px;
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
  align-items: center;
  &:hover {
    color: white;
    background-color: #eda3b5;
    opacity: 0.7;
    cursor: default;
  }
`;
const Success = () => {
  const [searchParams] = useSearchParams();
  const order_id = searchParams.get("id");

  return (
    <Container>
      <Navbar />
      <Content>
        <Row>
          <Col></Col>
          <Col xs={7} className="m-auto">
            <SuccessAlert>
              <Image
                className="d-block mx-auto img-fluid w-25"
                src={process.env.PUBLIC_URL + "img/success.png"}
              />
              <Text>Successfully ordered!</Text>
              <TextThank>THANK YOU FOR YOUR ORDER</TextThank>
              <OrderReference>
                <b>YOUR ORDER REFERENCE: 1 {order_id}</b>
              </OrderReference>
              <Button type="create" className="d-block mx-auto w-50">
                BACK TO SHOP
              </Button>
            </SuccessAlert>
          </Col>

          <Col></Col>
        </Row>
      </Content>
      <Footer />
    </Container>
  );
};

export default Success;
