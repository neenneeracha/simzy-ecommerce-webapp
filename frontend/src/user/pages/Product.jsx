import { Add, Remove } from "@material-ui/icons";
import styled from "styled-components";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { data } from "../../data";
import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { Col, Row } from "react-bootstrap";
import { MDBIcon, MDBRadio } from "mdb-react-ui-kit";
import { addProduct } from "../redux/cartRedux";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import axios from "axios";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
`;

const ImgContainer = styled.div`
  max-width: 80rem;
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));

  ul {
    margin-top: 10px;
    padding-left: 0;
  }
  ul li {
    display: inline;
    justify-content: flex-start;
  }
`;

const Image = styled.img`
  width: 80%;
  height: 80%;
  border-radius: 1rem;
  margin-left: 80px;
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
`;

const Title = styled.h1`
  font-weight: 350;
`;

const Desc = styled.p`
  margin: 20px 0px;
  color: #999;
`;

const Price = styled.h3`
  font-weight: 100;
`;

const FilterContainer = styled.div`
  width: 50%;
  margin: 30px 0;
  justify-content: space-between;
`;

const ColorInfo = styled.div`
  display: flex;
  align-items: center;
`;

const SizeInfo = styled.div`
  display: flex;
  align-items: center;
`;

const FilterTitle = styled.h5``;

const FilterColor = styled.div`
  margin: 5%;
  cursor: pointer;
  display: flex;
`;

const FilterSize = styled.div`
  margin: 5%;
  cursor: pointer;
  display: flex;
`;
const MaterialDetail = styled.div``;
const MaterialTitle = styled.h5`
  margin: 30px 0;
`;
const MaterialContent = styled.h6`
  color: #999;
`;
const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;

const Amount = styled.span`
  padding: 15px;
  border: 2px solid #e9e9e9;
  background-color: white;
  cursor: pointer;
  font-weight: 500;
  margin: 5%;
  margin-left: 10%;
`;

const Imagethumbnail = styled.img`
  width: 20%;
  height: 20%;
  border-radius: 1rem;
  cursor: pointer;
`;

const ButtonGroup = styled.div`
  display: flex;
`;

const ImageLightbox = styled.div``;
const styles = {
  customButton: {
    backgroundColor: "#eda3b5",
    borderColor: "#eda3b5",
    color: "white",
    borderRadius: "5px",
    marginTop: "30px",
  },
};


const Product = () => {
  const [productData] = useState(data);
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [value, setValue] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState({});
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const dispatch = useDispatch();
  const { img } = productData[value]; /* get img from product */

  // useEffect(() => {
  //   const getProduct = async () => {
  //     try {
  //       const res = await axios.get("http://localhost:8080/api/v1/products/" + id);
  //       setProduct(res.data);
  //     } catch {}
  //   };
  //   getProduct();
  // }, [id]);

  const addTocarthandler = () => {
    /* update cart */
    dispatch(addProduct({ ...product, quantity }));
  };

  const handleQuantity = (type) => {
    if (type === "dec") {
      quantity > 1 && setQuantity(quantity - 1);
    } else {
      setQuantity(quantity + 1);
    }
  };


  return (
    <Container>
      <Navbar />
      <Wrapper>
        <Row>
          <Col>
            <ImgContainer>
              <article>
                <ImageLightbox></ImageLightbox>
                <Image src={img} />
                <ul>
                  {productData.map((item, index) => (
                    <li
                      key={item.id}
                      onClick={() => setValue(index)}
                      className={index === value && "opacity-30"}
                    >
                      <Imagethumbnail src={item.img} />
                    </li>
                  ))}{" "}
                </ul>
              </article>
            </ImgContainer>
          </Col>

          <Col>
            <InfoContainer>
              <Title>
                HEATTECH Pile Lined Sweat Full-Zip Long Sleeve Hoodie
              </Title>
              <Desc>
                HEATTECH hoodie with a warm, fluffy lining. Updated for added
                comfort.
              </Desc>
              <Price> $ 1,900</Price>
              <MaterialDetail>
                <MaterialTitle>Material: </MaterialTitle>
                <MaterialContent>
                  {" "}
                  Body: 67% Polyester, 19% Acrylic, 14% Rayon/ Rib: 58% Cotton,
                  39% Polyester, 3% Spandex/ Pocket Lining: Outer Layer: 60%
                  Acrylic, 40% Rayon/ Back: 67% Polyester, 19% Acrylic, 14%
                  Rayon WASHING INSTRUCTIONS Machine wash cold, gentle cycle, Do
                  not Dry Clean - The images shown may include colors that are
                  not available.
                </MaterialContent>
              </MaterialDetail>
              <FilterContainer>
                <ColorInfo>
                  <FilterTitle>Color: </FilterTitle>
                  <FilterColor>
                    <MDBRadio
                      name="inlineRadio"
                      id="inlineRadio1"
                      value="option1"
                      label="black"
                      inline
                    />
                    <MDBRadio
                      name="inlineRadio"
                      id="inlineRadio2"
                      value="option2"
                      label="pink"
                      inline
                    />
                    <MDBRadio
                      name="inlineRadio"
                      id="inlineRadio3"
                      value="option3"
                      label="white"
                      inline
                    />
                  </FilterColor>
                </ColorInfo>
                <SizeInfo>
                  <FilterTitle>Size: {""} </FilterTitle>
                  <FilterSize>
                    <MDBRadio
                      name="size"
                      id="size4"
                      value="option1"
                      label="XS"
                      inline
                    />
                    <MDBRadio
                      name="size"
                      id="size5"
                      value="option2"
                      label="S"
                      inline
                    />
                    <MDBRadio
                      name="size"
                      id="size6"
                      value="option2"
                      label="M"
                      inline
                    />
                    <MDBRadio
                      name="size"
                      id="size7"
                      value="option2"
                      label="L"
                      inline
                    />
                    <MDBRadio
                      name="size"
                      id="size8"
                      value="option2"
                      label="XL"
                      inline
                    />
                  </FilterSize>
                </SizeInfo>
                <AddContainer style={{ marginTop: "5%" }}>
                  <FilterTitle>Quantity: </FilterTitle>
                  <AmountContainer>
                    <Remove
                      onClick={() => handleQuantity("dec")}
                      style={{ cursor: "pointer" }}
                    />
                    <Amount>{quantity}</Amount>
                    <Add
                      onClick={() => handleQuantity("inc")}
                      style={{ cursor: "pointer" }}
                    />
                  </AmountContainer>
                </AddContainer>
              </FilterContainer>
              <ButtonGroup>
                <Button
                  className="d-block mx-auto w-35"
                  type="submit"
                  style={styles.customButton}
                  onClick={addTocarthandler}
                >
                  <MDBIcon
                    fas
                    icon="shopping-cart"
                    style={{ marginRight: "10px" }}
                  />{" "}
                  ADD TO CART
                </Button>
                <Button
                  className="d-block mx-auto w-35"
                  type="submit"
                  style={styles.customButton}
                >
                  <MDBIcon
                    far
                    icon="money-bill-alt"
                    style={{ marginRight: "10px" }}
                  />{" "}
                  CHECK OUT
                </Button>
              </ButtonGroup>
            </InfoContainer>
          </Col>
        </Row>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Product;
