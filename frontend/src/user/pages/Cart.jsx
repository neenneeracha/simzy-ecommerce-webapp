import styled from "styled-components";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import DeleteIcon from "@material-ui/icons/Delete";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { useDispatch, useSelector } from "react-redux";
import {
  removeFromCart,
  getTotals,
} from "../redux/cartRedux";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { MDBBtn } from "mdb-react-ui-kit";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
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
  // const [quantity, setQuantity] = useState(1);

  const dispatch = useDispatch();
  const classes = useStyles();

  const handleClick = () => {
    window.history.back();
  };

  /* remove item from the cart */
  const handleRemoveFromCart = (product) => {
    dispatch(removeFromCart(product));
  };

  useEffect(() => {
    dispatch(getTotals());
  }, [cart, dispatch]);

  return (
    <Container>
      <Navbar />
      <Wrapper>
        <Title>MY CART</Title>

        {cart.products.length === 0 ? (
          <CartEmpty>
            <Icon>
              <Imageicon
                src={process.env.PUBLIC_URL + "img/Add to Cart-amico.png"}
              />
            </Icon>
            <Text>
              <b>"You cart is currently empty"</b> <br />
              <p>Looks like you haven't added anything to your cart yet</p>{" "}
              <Link to="/">
                <MDBBtn
                  className="mx-2"
                  color="primary"
                  style={{ fontFamily: "K2D" }}
                >
                  Continue shopping
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
                      <ProductName>
                        <b>Product:</b> {product.product_name}
                      </ProductName>
                      <ProductColor>
                        <b>Color:</b> {product.color}
                      </ProductColor>
                      <ProductSize>
                        <b>Size:</b> {product.selectedSize}
                      </ProductSize>
                    </Details>
                  </ProductDetail>
                  <PriceDetail>
                    <ProductAmountContainer>
                      {/* <Remove /> */}
                      <ProductAmount> X {product.quantity}</ProductAmount>
                      {/* <Add /> */}
                    </ProductAmountContainer>
                    <ProductPrice>
                      ฿ {product.price * product.quantity}
                    </ProductPrice>
                    <ButtonGroup>
                      <Button
                        variant="contained"
                        color="secondary"
                        className={classes.button}
                        startIcon={<DeleteIcon />}
                        onClick={() => handleRemoveFromCart(product)}
                      >
                        Delete
                      </Button>
                      <Link to={`/product/${product.product_id}`}>
                        <Button
                          variant="contained"
                          color="primary"
                          className={classes.button}
                          startIcon={<VisibilityIcon />}
                        >
                          <ButtonText>View</ButtonText>
                        </Button>
                      </Link>
                    </ButtonGroup>
                  </PriceDetail>

                  <Hr />
                </Product>
              ))}
            </Info>
            <Summary>
              <SummaryTitle>ORDER SUMMARY</SummaryTitle>
              <SummaryItem>
                <SummaryItemText>Subtotal</SummaryItemText>
                <SummaryItemPrice>฿ {cart.cartTotalAmount}</SummaryItemPrice>
              </SummaryItem>
              <SummaryItem>
                <SummaryItemText>Estimated Shipping</SummaryItemText>
                <SummaryItemPrice>฿90</SummaryItemPrice>
              </SummaryItem>
              <SummaryItem type="total">
                <SummaryItemText>Total</SummaryItemText>
                <SummaryItemPrice>
                  {" "}
                  ฿ {cart.cartTotalAmount + 90}
                </SummaryItemPrice>
              </SummaryItem>
              <Link to="/checkout" style={{ textDecoration: "none" }}>
                <ButtonCheck>CHECKOUT NOW</ButtonCheck>
              </Link>

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
