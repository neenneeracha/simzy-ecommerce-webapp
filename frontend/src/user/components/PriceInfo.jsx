import React from "react";
import styled from "styled-components";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Container = styled.div``;
const PriceSum = styled.div`
  padding: 50px;
  background-color: white;
  margin-top: 3%;
`;

const PriceInfo = () => {
  return (
    <Container>
      <Row>
        <Col></Col>
        <Col xs={7}>
          <PriceSum>
            <Row>
              {" "}
              <Col>
                {" "}
                <b>Item(s) subtotal: </b>
              </Col>
              THB 1,580.00
            </Row>
            <Row>
              {" "}
              <Col>
                {" "}
                <b>Packaging Fee: </b>
              </Col>
              THB 90.00{" "}
            </Row>
            <hr
              style={{
                background: "gray",
                color: "gray",
                borderColor: "gray",
                height: "1px",
                margin: "2% 0",
              }}
            />
            <Row>
              {" "}
              <Col>
                {" "}
                <h4>
                  <b>Order Total: </b>
                </h4>
              </Col>
              THB 4,470.00{" "}
            </Row>
          </PriceSum>
        </Col>
        <Col></Col>
      </Row>
    </Container>
  );
};

export default PriceInfo;
