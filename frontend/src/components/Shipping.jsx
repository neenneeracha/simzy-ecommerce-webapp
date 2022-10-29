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

const ShippingName = styled.span``;
const ShippingAddress = styled.span``;
const ShippingPhone = styled.span``;
const Delivery = styled.span``;
const Detail = styled.span``;

const Shipping = () => {
  return (
    <Container>
      <Row>
        <Col></Col>
        <Col xs={7}>
          <ShippingSum>
            <Row>
              <Col>
                <h4>SHIPPING ADDRESS</h4>
              </Col>
              <Col style={{ textAlignLast: "right", fontWeight: "100px" }}>
                <>EDIT</>
              </Col>
            </Row>
            <Row style={{ margin: "10px 30px" }}>
              <ShippingName>
                <b>Name:</b> SoftEn SoftJai
              </ShippingName>
              <ShippingAddress>
                <b>Address:</b> 126 Pracha Uthit Rd, Bang Mot, Thung Khru,
                Bangkok 10140
              </ShippingAddress>
              <ShippingPhone>
                <b>Phone Number:</b> 0934902834
              </ShippingPhone>
              <hr
                style={{
                  background: "gray",
                  color: "gray",
                  borderColor: "gray",
                  height: "1px",
                  margin: "2% 0",
                }}
              />
            </Row>
            <Delivery>
            <h4>DELIVERY DETAIL</h4>
              <Detail style={{ margin: "10px 30px" }}>
                <b>Packaging fee:</b>THB 90.00 
                (Delivery may be delayed 3-5 for flood
                areas and remote areas)
              </Detail>
            </Delivery>
          </ShippingSum>
        </Col>
        <Col></Col>
      </Row>
    </Container>
  );
};

export default Shipping;
