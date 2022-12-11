/********************************************************************
 *
 * OrderItem.jsx
 *
 *   This file represents the order item component display product 
 *   details on the order detail page 
 *
 ********************************************************************
 */

import React from "react";
import styled from "styled-components";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Container = styled.div``;

const ProductSum = styled.div`
  padding: 50px;
  background-color: white;
`;
const Title = styled.h2`
  text-align: center;
  margin: 30px;
`;

const Image = styled.img`
  width: 250px;
  align-items: center;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductColor = styled.div`
  display: flex;
`;

const SelectColor = styled.div`
  background-color: ${(props) => props.color};
  margin-left: 5%;
  cursor: pointer;
  display: inline-block;
  width: 30px;
  height: 30px;
`;

const ProductSize = styled.span``;

const Amount = styled.span`
  text-align-last: right;
`;

const OrderItem = () => {
  return (
    <Container>
      <Row>
        <Col></Col>
        <Col xs={7}>
          <Title>ORDER SUMMARY</Title>
          <ProductSum>
            <Row>
              <Col>
                <h4>ORDER ITEM(s)</h4>
              </Col>
              <Col style={{ textAlignLast: "right", fontWeight: "100px" }}>
                <>EDIT</>
              </Col>
            </Row>
            <Details>
              <Row>
                <Col sm={4}>
                  <Image src="https://image.uniqlo.com/UQ/ST3/th/imagesgoods/449878/item/thgoods_12_449878.jpg?width=1600&impolicy=quality_75" />
                </Col>
                <Col>
                  <Row style={{ margin: "30px 0" }}>
                    <ProductName>
                      <b>Product:</b> JESSIE THUNDER SHOES
                    </ProductName>
                  </Row>
                  <Row style={{ margin: "30px 0" }}>
                    <ProductColor>
                      <b>Color: </b>
                      <SelectColor color="black" />
                    </ProductColor>
                  </Row>

                  <Row style={{ margin: "30px 0" }}>
                    <Col>
                      <ProductSize>
                        <b>Size:</b> L
                      </ProductSize>
                    </Col>
                  </Row>
                  <Col style={{ textAlignLast: "right" }}>
                    <Amount> X 2</Amount>
                  </Col>
                </Col>
              </Row>
            </Details>
            <Details>
              <Row>
                <Col sm={4}>
                  <Image src="https://image.uniqlo.com/UQ/ST3/th/imagesgoods/449874/item/thgoods_01_449874.jpg?width=1600&impolicy=quality_75" />
                </Col>
                <Col>
                  <Row style={{ margin: "30px 0" }}>
                    <ProductName>
                      <b>Product:</b> JESSIE THUNDER SHOES
                    </ProductName>
                  </Row>
                  <Row style={{ margin: "30px 0" }}>
                    <ProductColor>
                      <b>Color: </b>
                      <SelectColor color="gray" />
                    </ProductColor>
                  </Row>

                  <Row style={{ margin: "30px 0" }}>
                    <Col>
                      <ProductSize>
                        <b>Size:</b> M
                      </ProductSize>
                    </Col>
                  </Row>
                  <Col style={{ textAlignLast: "right" }}>
                    <Amount> X 1</Amount>
                  </Col>
                </Col>
              </Row>
            </Details>
          </ProductSum>
        </Col>
        <Col></Col>
      </Row>
    </Container>
  );
};

export default OrderItem;
