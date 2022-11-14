import { Add, Remove } from "@material-ui/icons";
import styled from "styled-components";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import LocalMallIcon from "@material-ui/icons/LocalMall";
import DeleteIcon from "@material-ui/icons/Delete";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../redux/cartRedux";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
  min-height: 100vh;
  position: relative;
`;

const Title = styled.h1`
  font-weight: 500;
  text-align: center;
`;

const Bottom = styled.div`
  display: flex;
  margin-top: 70px;
  justify-content: space-between;
`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
  margin-left: 30px;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductColor = styled.div``;

const ProductSize = styled.span``;

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
  font-size: 24px;
  margin: 5px;
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
`;

const Hr = styled.hr`
  background-color: #ced0cd;
  border: none;
  height: 1px;
`;

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
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const ButtonCheck = styled.h3`
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

const CartEmpty = styled.div``;

const Text = styled.h3`
  text-align: center;
  margin: 30px;
  
  b {
    color: black;
  }

  p {
    color: #999;
    font-size: 20px;
  }
`;
const Icon = styled.div`
  text-align: center;
  margin: 50px 0 30px;
`;
const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));
const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const [quantity, setQuantity] = useState(1);

  const dispatch = useDispatch();

  const classes = useStyles();

  const handleQuantity = (type) => {
    if (type === "dec") {
      quantity > 1 && setQuantity(quantity - 1);
    } else {
      setQuantity(quantity + 1);
    }
  };
  const handleClick = () => {
    window.history.back();
  };
  const handleRemoveFromCart = (product) => {
    dispatch(removeFromCart(product));
  };

  return (
    <Container>
      <Navbar />
      <Wrapper>
        <Title>MY CART</Title>

        {cart.products.length=== 0 ? (
          <CartEmpty>
            <Icon>
              <LocalMallIcon style={{ fontSize: "100px", color: "#eda3b5" }} />{" "}
            </Icon>
            <Text>
              {" "}
              <b>"You cart is currently empty"</b> <br /> <p>Looks like you haven't added anything to your cart yet</p>
              <Link to="/">
                <h5>Start to shopping</h5>
              </Link>
            </Text>
          </CartEmpty>
        ) : (
          <Bottom>
            <Info>
              {cart.products.map((product) => (
                <Product>
                  <ProductDetail>
                    <Image src="https://image.uniqlo.com/UQ/ST3/th/imagesgoods/449878/item/thgoods_12_449878.jpg?width=1600&impolicy=quality_75" />
                    <Details>
                      <ProductName>
                        <b>Product:</b> {product.name}
                      </ProductName>
                      <ProductColor>
                        <b>Color:</b> {product.color}
                      </ProductColor>
                      <ProductSize>
                        <b>Size:</b> L
                      </ProductSize>
                    </Details>
                  </ProductDetail>
                  <PriceDetail>
                    <ProductAmountContainer>
                      <Remove
                        onClick={() => handleQuantity("dec")}
                        style={{ cursor: "pointer" }}
                      />
                      <ProductAmount>{quantity}</ProductAmount>
                      <Add
                        onClick={() => handleQuantity("inc")}
                        style={{ cursor: "pointer" }}
                      />
                    </ProductAmountContainer>
                    <ProductPrice>฿1,190</ProductPrice>
                    <Button
                      variant="contained"
                      color="secondary"
                      className={classes.button}
                      startIcon={<DeleteIcon />}
                      onClick={() => handleRemoveFromCart(product)}
                    >
                      Delete
                    </Button>
                  </PriceDetail>
                </Product>
              ))}
              <Hr />
            </Info>
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
              <ButtonCheck>CHECKOUT NOW</ButtonCheck>
              <ButtonCheck onClick={handleClick}> BACK</ButtonCheck>
            </Summary>
          </Bottom>
        )}
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Cart;
