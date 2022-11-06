import React from "react";
import styled from "styled-components";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
const Container = styled.div``;
const ShippingSum = styled.div`
  padding: 50px;
  background-color: white;
  margin-top: 3%;
`;

const CardNumber = styled.span``;
const Date = styled.span``;
const HolderName = styled.span``;
const PaymentMetohd = () => {
  return (
    <Container>
      <Row>
        <Col></Col>
        <Col xs={7}>
          <ShippingSum>
            <Row>
              <Col>
                <h4>PAYMENT METHOD</h4>
              </Col>
              <Col style={{ textAlignLast: "right", fontWeight: "100px" }}>
                <>EDIT</>
              </Col>
            </Row>
            <Row style={{ margin: "10px 30px" }}>
              <CardNumber>
                <b>Card Number: </b> 6359-1234-2345-2222
              </CardNumber>
              <Date>
                <b>Expiration Date:</b> 08/25
              </Date>
              <HolderName>
                <b>Card Holder:</b> SoftEn SoftJai
              </HolderName>
        </Row>
          </ShippingSum>
        </Col>
        <Col></Col>
      </Row>
    </Container>
  );
};

export default PaymentMetohd;
