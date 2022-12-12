/********************************************************************
 *
 * Cart.jsx
 *
 *    This file represents the customer's shopping cart of SIMZY
 *    The products added to the cart by the customer will be
 *    displayed, along with a summary of all the total prices.
 *
 ********************************************************************
 */

 import styled from "styled-components";
 import Footer from "../components/Footer";
 import Navbar from "../components/Navbar";
 import React, { useEffect, useState } from "react";
 import { Link } from "react-router-dom";
 import DeleteIcon from "@material-ui/icons/Delete";
 import VisibilityIcon from "@material-ui/icons/Visibility";
 import { useDispatch, useSelector } from "react-redux";
 import { removeFromCart, getTotals } from "../redux/cartRedux";
 import Button from "@material-ui/core/Button";
 import { makeStyles } from "@material-ui/core/styles";
 import { MDBBtn } from "mdb-react-ui-kit";
 import OptionAlert from "../components/OptionAlert";
 import { useUser } from "../../context/UserContext";
 import {useNavigate } from "react-router-dom"; 

const Container = styled.div`
  min-height: 100vh;
  position: relative;
`;

const Wrapper = styled.div`
  padding: 20px;
`;

const Title = styled.h1`
  font-weight: bolder;
  text-align: center;
  color: #eda3b5;
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
  margin: 15px 0;
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

const Imageicon = styled.img`
  height: 20%;
  width: 20%;
`;

const ButtonText = styled.div`
  color: white;
  text-decoration: none;
`;

const ButtonGroup = styled.div`
  display: flex;
`;

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const fontSize = useSelector((state) => state.fontSize);

  const user = useUser();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const classes = useStyles();

  const [show, setShow] = useState(false);
  const [showOption, setShowOption] = useState({});

  // go back to previous page 
  const handleClick = () => {
    window.history.back();
  };

  // log user out 
  const handleCheckout = () => {
    if (user !== null) {
      navigate("/checkout");
    } else {
      const newText = {};
      newText.title = "Unauthorized User";
      newText.message = "Please login before proceeding to checkout";
      newText.backBtn = "Back";
      newText.proceedBtn = "Login now";
      newText.proceedLink = "/login";
      setShowOption(newText);
      setShow(true);
    }
  };

  /* remove item from the cart */
  const handleRemoveFromCart = (product) => {
    dispatch(removeFromCart(product));
  };

  // get total item in cart
  useEffect(() => {
    dispatch(getTotals());
  }, [cart, dispatch]);

  return (
    <Container>
      <Navbar />
      <Wrapper>
        {show ? (
          <OptionAlert
            show={show}
            setShow={setShow}
            text={showOption}
            setText={setShowOption}
          />
        ) : undefined}
        <Title style={{ fontSize: `${36 + fontSize.fontSize}px` }}>
          MY CART
        </Title>

        {cart.products.length === 0 ? (
          <CartEmpty>
            <Icon>
              <Imageicon
                src={process.env.PUBLIC_URL + "img/Add to Cart-amico.png"}
              />
            </Icon>
            <Text>
              <b style={{ fontSize: `${30 + fontSize.fontSize}px` }}>
                You cart is currently empty
              </b>{" "}
              <br />
              <p style={{ margin: "10px 0px 20px", fontSize: `${24 + fontSize.fontSize}px` }}>
                Looks like you haven't added anything to your cart yet
              </p>{" "}
              <Link to="/">
                <MDBBtn
                  className="mx-2"
                  color="primary"
                  style={{ fontFamily: "K2D" }}
                >
                  <b
                    style={{
                      fontSize: `${20 + fontSize.fontSize}px`,
                      color: "white",
                    }}
                  >
                    Continue shopping
                  </b>
                </MDBBtn>
              </Link>
            </Text>
          </CartEmpty>
        ) : (
          <Bottom>
            <Info>
              {cart.products.map((product) => (
                <Product key={product.product_id}>
                  <ProductDetail>
                    <Image src={product.url} />
                    <Details>
                      <ProductName
                        style={{ fontSize: `${18 + fontSize.fontSize}px` }}
                      >
                        <b>Product:</b> {product.product_name}
                      </ProductName>
                      <ProductColor
                        style={{ fontSize: `${18 + fontSize.fontSize}px` }}
                      >
                        <b>Color:</b> {product.color}
                      </ProductColor>
                      <ProductSize
                        style={{ fontSize: `${18 + fontSize.fontSize}px` }}
                      >
                        <b>Size:</b> {product.selectedSize}
                      </ProductSize>
                    </Details>
                  </ProductDetail>
                  <PriceDetail>
                    <ProductAmountContainer>
                      {/* <Remove /> */}
                      <ProductAmount
                        style={{ fontSize: `${24 + fontSize.fontSize}px` }}
                      >
                        {" "}
                        X {product.quantity}
                      </ProductAmount>
                      {/* <Add /> */}
                    </ProductAmountContainer>
                    <ProductPrice
                      style={{ fontSize: `${30 + fontSize.fontSize}px` }}
                    >
                      ฿ {product.price * product.quantity}
                    </ProductPrice>
                    <ButtonGroup
                      style={{ fontSize: `${18 + fontSize.fontSize}px` }}
                    >
                      <Button
                        variant="contained"
                        color="secondary"
                        className={classes.button}
                        startIcon={<DeleteIcon />}
                        onClick={() => handleRemoveFromCart(product)}
                        style={{ fontSize: `${14 + fontSize.fontSize}px` }}
                      >
                        <ButtonText
                          style={{ fontSize: `${14 + fontSize.fontSize}px` }}
                        >
                          Delete
                        </ButtonText>
                      </Button>
                      <Link
                        to={`/product/${product.product_id}`}
                        style={{ textDecoration: "none" }}
                      >
                        <Button
                          variant="contained"
                          color="primary"
                          className={classes.button}
                          startIcon={<VisibilityIcon />}
                        >
                          <ButtonText
                            style={{ fontSize: `${14 + fontSize.fontSize}px` }}
                          >
                            View
                          </ButtonText>
                        </Button>
                      </Link>
                    </ButtonGroup>
                  </PriceDetail>

                  <Hr />
                </Product>
              ))}
            </Info>
            <Summary style={{ fontSize: `${16 + fontSize.fontSize}px` }}>
              <SummaryTitle style={{ fontSize: `${25 + fontSize.fontSize}px` }}>
                ORDER SUMMARY
              </SummaryTitle>
              <SummaryItem>
                <SummaryItemText>Subtotal</SummaryItemText>
                <SummaryItemPrice>฿ {cart.cartTotalAmount}</SummaryItemPrice>
              </SummaryItem>
              <SummaryItem>
                <SummaryItemText>Estimated Shipping</SummaryItemText>
                <SummaryItemPrice>฿90</SummaryItemPrice>
              </SummaryItem>
              <SummaryItem type="total">
                <SummaryItemText
                  style={{ fontSize: `${25 + fontSize.fontSize}px` }}
                >
                  Total
                </SummaryItemText>
                <SummaryItemPrice>
                  {" "}
                  ฿ {cart.cartTotalAmount + 90}
                </SummaryItemPrice>
              </SummaryItem>

              <ButtonCheck
                onClick={handleCheckout}
                style={{ fontSize: `${20 + fontSize.fontSize}px` }}
              >
                CHECKOUT NOW
              </ButtonCheck>

              <ButtonCheck
                onClick={handleClick}
                style={{ fontSize: `${20 + fontSize.fontSize}px` }}
              >
                {" "}
                BACK
              </ButtonCheck>
            </Summary>
          </Bottom>
        )}
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Cart;
