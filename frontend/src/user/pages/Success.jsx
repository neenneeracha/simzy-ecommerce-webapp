import React, { useEffect } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Col, Image, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Cookie from "js-cookie";
import { useSelector } from "react-redux";

const Container = styled.div`
  min-height: 100vh;
  position: relative;
`;
const Content = styled.div`
  margin-top: 2%;
`;
const SuccessAlert = styled.div`
  padding: 50px;
  margin: 3% 0;
`;
const Text = styled.h3`
  text-align: center;
  margin-top: 50px;
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
  }
`;
const Success = () => {
  const order_id = Cookie.get("orderID");
  const navigate = useNavigate();
  const fontSize = useSelector((state) => state.fontSize);

  useEffect(() => {
    const checkOrderID = async () => {
      if (isNaN(order_id)) {
        console.log(order_id);
        navigate("/");
      }
    };

    checkOrderID();
  }, [order_id, navigate]);

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
              <Text style={{ fontSize: `${32 + fontSize.fontSize}px` }}>Successfully ordered!</Text>
              <TextThank style={{ fontSize: `${28 + fontSize.fontSize}px` }}>THANK YOU FOR YOUR ORDER</TextThank>
              <OrderReference>
                <b style={{ fontSize: `${20 + fontSize.fontSize}px` }}>YOUR ORDER REFERENCE: {order_id}</b>
              </OrderReference>
              <Button
                type="create"
                className="d-block mx-auto w-50"
                onClick={() => navigate("/")}
              >
                <b style={{ fontSize: `${20 + fontSize.fontSize}px` }}>BACK TO SHOP</b>
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
