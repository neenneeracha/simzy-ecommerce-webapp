import React, { useEffect, useState } from "react";
import Card from 'react-bootstrap/Card';
import { ArrowBack } from "@material-ui/icons";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import styled from "styled-components";
import axios from "axios";

import {
  MDBCol
} from 'mdb-react-ui-kit';

const styles = {
  customButton: {
    backgroundColor: "#eda3b5",
    borderColor: "#eda3b5",
    color: "white",
    borderRadius: "5px",
    fontSize: "14px"
  }
};

const Container = styled.div`
  
`;

const BackBtn = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin: 20px 30px;
  width: 250px;

  &:hover {
    color: #eda3b5;
  }
`;

const Body = styled.div`
  justify-content: center;
  align-items: center;
  padding: 1% 20%;
`;

const Title = styled.h2`
  text-align: center;
`;

const Status = styled.p`
text-align: center;
font-size: 16px;
margin: 0px;
`;

const Highlight = styled.strong`

`;

const Line = styled.hr`
margin-top: 20px;
`;

const Details = styled.div`
`;

const Section = styled.div`
  display: flex;
  align-items: center;
  justify-content start;
`;

const Text = styled.h5`
margin-top: 36px;
`;

const LineBreak = styled.p`
  height: 10px;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
  height: 200px;
  object-fit: cover;
`;

const ProductDetails = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductText = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 20px;
  margin: 5px;
`;

const ProductPrice = styled.div`
  font-size: 24px;
  font-weight: 200;
`;

const ButtonGroup = styled.div`
  display: flex;
  margin-top: 10px;
`;

const Summary = styled.div`
  flex: 1;
  border-radius: 10px;
  background-color: #fbfbfb;
  padding: 20px;
  margin-top: 4%;
`;

const SummaryTitle = styled.h5`
  font-weight: bold;
`;

const SummaryItem = styled.div`
  margin: 30px 30px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "20px"};
`;


const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const OrderDetails = ({ order_id, setViewOrder, totalPrice, setTotalPrice }) => {
  const [orderDetails, setOrderDetails] = useState([])
  const [orderedItems, setOrderedItems] = useState([])

  useEffect(() => {
    const getOrderDetails = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8080/api/v1/order/details/" + order_id
        );
        if (res.data.length > 0) {
              var createdDate = new window.Date(res.data[0].created_at)
                  .toISOString().replace(/T.*/,'')
                  .split('-').reverse().join('/')
              var createdTime = new window.Date(res.data[0].created_at)
              .toISOString().slice(11,19)
              res.data[0].created_at = createdDate.concat(" " + createdTime)

              var updatedDate = new window.Date(res.data[0].updated_at)
                  .toISOString().replace(/T.*/,'')
                  .split('-').reverse().join('/')
              var updatedTime = new window.Date(res.data[0].updated_at)
              .toISOString().slice(11,19)
              res.data[0].updated_at = updatedDate.concat(" " + updatedTime)               
        }
        setOrderDetails(res.data[0])
      } catch (error) {
        console.log(error);
      }
    };
    const getOrderedItems = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8080/api/v1/order/products/" + order_id
        );
        setOrderedItems(res.data)
      } catch (error) {
        console.log(error);
      }
    };
    getOrderDetails();
    getOrderedItems();
  }, [order_id]);

  return (
    <Container>       
      <Card>
        <Card.Body>
          <BackBtn onClick={() => {
                  setViewOrder(null);
                  setTotalPrice(null);
                }}>
          <ArrowBack
                  style={{ fontSize: 18, marginBottom: 3, marginRight: 4 }}
                />{" "}
                BACK TO ORDER HISTORY
          </BackBtn>
        <Body>
                <Title>Order Reference #{order_id}</Title>
                <Status>Ordered date: {orderDetails.created_at}</Status> 
                <Status>Status: <Highlight>{orderDetails.description}</Highlight> | Updated at {orderDetails.updated_at}</Status> 
               
                <Line />
                <Details>
                <Text>Payment Details</Text>
                <Section>
                  <MDBCol sm="2" style={{ marginTop: 5 }}>Payment ID:</MDBCol>
                  <MDBCol sm="2" style={{ marginTop: 5, color: "#616161" }}>{orderDetails.payment_id}</MDBCol>

                  <MDBCol sm="2" style={{ marginTop: 5 }}>Payment Status:</MDBCol>
                  <MDBCol sm="2" style={{ marginTop: 5, color: "#616161" }}>{orderDetails.status === 0? "Pending" : "Paid"}</MDBCol>

                  <MDBCol sm="2" style={{ marginTop: 5 }}>Payment Type:</MDBCol>
                  <MDBCol sm="2" style={{ marginTop: 5, color: "#616161" }}>{orderDetails.payment_type === 1? "Cash on Delivery" : "Card Payment"}</MDBCol>
                </Section>
                </Details>
                <Details>
                <LineBreak/>
                <Line />
                <Text>Shipping Details</Text>
                <Section>
                  <MDBCol sm="2" style={{ marginTop: 5 }}>Name:</MDBCol>
                  <MDBCol sm="4" style={{ marginTop: 5, color: "#616161" }}>{orderDetails.name}</MDBCol>

                  <MDBCol sm="2" style={{ marginTop: 5 }}>Surname:</MDBCol>
                  <MDBCol sm="4" style={{ marginTop: 5, color: "#616161" }}>{orderDetails.surname}</MDBCol>
                </Section>
                
                <Section>
                  <MDBCol sm="2" style={{ marginTop: 5 }}>Address:</MDBCol>
                  <MDBCol sm="10" style={{ marginTop: 5, color: "#616161" }}>{orderDetails.address}</MDBCol>
                  <MDBCol sm="0" ></MDBCol>
                  <MDBCol sm="0" ></MDBCol>
                </Section>
                <Section>
                  <MDBCol sm="2" style={{ marginTop: 5 }}>District:</MDBCol>
                  <MDBCol sm="4" style={{ marginTop: 5, color: "#616161" }}>{orderDetails.district}</MDBCol>

                  <MDBCol sm="2" style={{ marginTop: 5 }}>Province:</MDBCol>
                  <MDBCol sm="4" style={{ marginTop: 5, color: "#616161" }}>{orderDetails.province}</MDBCol>
                </Section>
                <Section>
                  <MDBCol sm="2" style={{ marginTop: 5 }}>Zipcode:</MDBCol>
                  <MDBCol style={{ marginTop: 5, color: "#616161" }}>{orderDetails.zip_code}</MDBCol>

                  <MDBCol sm="2" style={{ marginTop: 5 }}>Phone no:</MDBCol>
                  <MDBCol style={{ marginTop: 5, color: "#616161" }}>{orderDetails.phone_number}</MDBCol>
                </Section>
                </Details>
                <LineBreak />
                <Line />
                <Text>Items Ordered</Text>
                {orderedItems.map((product) => (
                <Product key={product.product_id}>
                  <ProductDetail>
                    <Image src={product.img_link} />
                    <ProductDetails>
                      <ProductText>
                        <b>Product:</b> {product.product_name}
                      </ProductText>
                      <ProductText>
                        <b>Color:</b> {product.color}
                      </ProductText>
                      <ProductText>
                        <b>Size:</b> {product.size}
                      </ProductText>
                      <ProductText>
                        <b>Price per unit:</b> THB {product.price} 
                      </ProductText>
                    </ProductDetails>
                  </ProductDetail>
                  <PriceDetail>
                    <ProductAmountContainer>
                      <ProductAmount> X {product.quantity}</ProductAmount>
                    </ProductAmountContainer>
                    <ProductPrice>
                      ฿ {product.price * product.quantity}
                    </ProductPrice>
                    <ButtonGroup>
                     
                      <Link to={`/product/${product.product_id}`} target="_blank">
                      <Button
                
                style={styles.customButton}
                
              >
                VIEW DETAILS
              </Button>
                      </Link>
                    </ButtonGroup>
                  </PriceDetail>

                  <Line />
                </Product>
              ))}
              <Summary>
              <SummaryTitle>ORDER SUMMARY</SummaryTitle>
              <SummaryItem>
                <SummaryItemText>Subtotal</SummaryItemText>
                <SummaryItemPrice>THB {totalPrice}</SummaryItemPrice>
              </SummaryItem>
              <SummaryItem>
                <SummaryItemText>Shipping Fee</SummaryItemText>
                <SummaryItemPrice>THB 90</SummaryItemPrice>
              </SummaryItem>
              <SummaryItem type="total">
                <SummaryItemText>Total</SummaryItemText>
                <SummaryItemPrice>THB {totalPrice + 90}</SummaryItemPrice>
              </SummaryItem>
            </Summary>
            
        </Body>
      
    
        </Card.Body>
      </Card>
    </Container>
    
  )
}

export default OrderDetails