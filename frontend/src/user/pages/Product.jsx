import { Add, Remove } from "@material-ui/icons";
import styled from "styled-components";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { Col, Row } from "react-bootstrap";
import { MDBIcon, MDBRadio } from "mdb-react-ui-kit";
import { addProduct } from "../redux/cartRedux";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import ClearIcon from "@material-ui/icons/Clear";
import Alert from "../components/Alert";
import SizeChartModal from "../components/SizeChartModal";

const Container = styled.div`
  min-height: 100vh;
  position: relative;
`;

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

const Desc = styled.div`
  margin: 20px 0px;
  color: #999;
`;

const Price = styled.h3`
  font-weight: 100;
`;
const Text = styled.div``;

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

const Line = styled.hr``;

const Message = styled.h3`
  margin-top: 30px;
`;

const SizeChart = styled.p`
  color: silver;
  text-align: right;
  margin-top: 20px;
  margin-bottom: -40px;

  &:hover {
    text-decoration: underline;
    color: #eda3b5;
    cursor: pointer;
  }
`;

const styles = {
  customButton: {
    backgroundColor: "#eda3b5",
    borderColor: "#eda3b5",
    color: "white",
    borderRadius: "5px",
    marginTop: "30px",
    whiteSpace: "nowrap",
    padding: "15px 25px",
  },
  clearButton: {
    backgroundColor: "white",
    borderColor: "white",
    color: "#9e9e9e",
    borderRadius: "5px",
    marginTop: "30px",
    padding: "15px 25px",
  },
};

const Product = () => {
  const { id } = useParams();
  const [url, setUrl] = useState("");
  const [info, setInfo] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState({});
  const [colors, setColors] = useState([]);
  const [selectedColor, setSelectedColor] = useState(null);
  const [mainColor, setMainColor] = useState(null);
  const [stocks, setStocks] = useState([]);
  const [images, setImages] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [selectedSize, setSelectedSize] = useState(null);
  const [filteredColors, setFilteredColors] = useState([]);
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState({
    title: "",
    message: "",
    type: "",
    link: "",
  });
  const navigate = useNavigate();

  const sizeOptions = ["XS", "S", "M", "L", "XL"];
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  // const [fontSize, setFontSize] = useState([]);
  const fontSize = useSelector((state) => state.fontSize);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8080/api/v1/products/" + id
        );
        if (res.data.length !== 1) {
          navigate("/*");
        }
        setProduct(res.data[0]);
      } catch (error) {
        console.log(error);
      }
    };

    const getColors = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8080/api/v1/products/color/" + id
        );
        setColors(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    const getImages = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8080/api/v1/products/img/" + id
        );
        setImages(res.data);
        for (let i = 0; i < res.data.length; i++) {
          if (res.data[i].is_main_color) {
            setMainColor(res.data[i].product_color_id);
            setUrl(res.data[i].img_link);
            break;
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    const getStocks = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8080/api/v1/products/stock/" + id
        );
        setStocks(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    getProduct();
    getColors();
    getImages();
    getStocks();
  }, [id, navigate]);

  useEffect(() => {
    const changeImage = () => {
      if (selectedColor !== null) {
        setUrl(
          images
            .filter((img) => img.product_color_id === selectedColor)
            .slice(0)[0].img_link
        );
      }
    };
    changeImage();
  }, [images, mainColor, selectedColor]);

  useEffect(() => {
    const manageSize = () => {
      if (selectedColor !== null) {
        setSizes(
          stocks.filter((stock) => stock.product_color_id === selectedColor)
        );
      }
    };
    manageSize();
  }, [stocks, selectedColor]);

  useEffect(() => {
    const manageColor = () => {
      if (selectedSize != null) {
        setFilteredColors(
          stocks.filter((stock) => stock.size === selectedSize)
        );
      }
    };
    manageColor();
  }, [stocks, selectedSize]);

  useEffect(() => {
    const checkQuantity = () => {
      if (selectedColor && selectedSize) {
        const stock = stocks
          .filter(
            (stock) =>
              stock.product_color_id === selectedColor &&
              stock.size === selectedSize
          )
          .slice(0)[0].quantity;

        const stock_id = stocks
          .filter(
            (stock) =>
              stock.product_color_id === selectedColor &&
              stock.size === selectedSize
          )
          .slice(0)[0].stock_id;

        let inCartQuantity = 0;
        const inCart = cart.products.filter(
          (product) => product.stock === stock_id
        );

        if (inCart.length !== 0) {
          inCartQuantity = inCart.slice(0)[0].quantity;
        }

        if (stock - inCartQuantity < quantity) {
          // quantity exceed
          const color = colors
            .filter((color) => color.product_color_id === selectedColor)
            .slice(0)[0].color;
          toast.info(
            `Sorry, we only have ${stock} items for ${color} - ${selectedSize} in the stock`,
            {
              position: "top-center",
            }
          );
          if (stock - inCartQuantity === 0) {
            setSelectedSize(null);
          } else {
            setQuantity(stock - inCartQuantity);
          }
        }
      }
    };

    checkQuantity();
  }, [selectedSize, selectedColor, quantity, stocks, colors, cart.products]);

  const addToCartHandler = () => {
    if (!selectedColor && !selectedSize) {
      setError((prev) => ({
        ...prev,
        title: "Invalid Selection",
        message: "Please select both color and size !!",
        type: "error",
      }));
      setShow(true);
    } else if (!selectedColor) {
      setError((prev) => ({
        ...prev,
        title: "Invalid Selection",
        message: "Please select the color that you want !!",
        type: "error",
      }));
      setShow(true);
    } else if (!selectedSize) {
      setError((prev) => ({
        ...prev,
        title: "Invalid Selection",
        message: "Please select the size that you want !!",
        type: "error",
      }));
      setShow(true);
    } else {
      /* update cart */
      if (quantity !== 0) {
        const color = colors
          .filter((color) => color.product_color_id === selectedColor)
          .slice(0)[0].color;

        const stock = stocks
          .filter(
            (stock) =>
              stock.product_color_id === selectedColor &&
              stock.size === selectedSize
          )
          .slice(0)[0].stock_id;

        dispatch(
          addProduct({ ...product, stock, quantity, url, color, selectedSize })
        );
      }
      setQuantity(1);
    }
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
        {" "}
        {show ? (
          <Alert
            show={show}
            setShow={setShow}
            text={error}
            setText={setError}
          />
        ) : undefined}{" "}
        <Row>
          <Col>
            <ImgContainer>
              <article>
                {url ? <Image src={url} /> : undefined}
                <ul>
                  {" "}
                  {images
                    .filter((img) => img.is_main_color === 1)
                    .map((img, index) => (
                      <li
                        key={index}
                        onClick={() => setUrl(img.img_link)}
                        className={
                          img.img_link === url ? "opacity-30" : undefined
                        }
                      >
                        <Imagethumbnail src={img.img_link} />{" "}
                      </li>
                    ))}{" "}
                </ul>{" "}
              </article>{" "}
            </ImgContainer>{" "}
          </Col>
          <Col>
            <InfoContainer>
              <Title style={{ fontSize: `${40 + fontSize.fontSize}px` }}>
                {" "}
                {product.product_name}{" "}
              </Title>{" "}
              <Desc style={{ fontSize: `${20 + fontSize.fontSize}px` }}>
                {" "}
                {product.description}{" "}
              </Desc>{" "}
              <Price style={{ fontSize: `${30 + fontSize.fontSize}px` }}>
                {" "}
                {product.price}
                THB
              </Price>{" "}
              <MaterialDetail>
                <MaterialTitle
                  style={{ fontSize: `${20 + fontSize.fontSize}px` }}
                >
                  Material:{" "}
                </MaterialTitle>{" "}
                <MaterialContent
                  style={{ fontSize: `${16 + fontSize.fontSize}px` }}
                >
                  {" "}
                  {product.details}{" "}
                </MaterialContent>{" "}
              </MaterialDetail>{" "}
              <SizeChart onClick={() => setOpen(true)}>
                {" "}
                click here to view size chart{" "}
              </SizeChart>{" "}
              {stocks.length > 0 ? (
                <>
                  <FilterContainer>
                    <ColorInfo>
                      <FilterTitle
                        style={{ fontSize: `${20 + fontSize.fontSize}px` }}
                      >
                        Color:{" "}
                      </FilterTitle>{" "}
                      <FilterColor>
                        {" "}
                        {!selectedSize ? (
                          <>
                            {" "}
                            {colors.map((color, index) => (
                              <MDBRadio
                                key={index}
                                name="inlineRadio-color"
                                id={`inlineRadio${color.product_color_id}`}
                                value={color.product_color_id}
                                label={color.color}
                                inline
                                checked={
                                  color.product_color_id === selectedColor
                                }
                                onChange={(e) =>
                                  setSelectedColor(parseInt(e.target.value))
                                }
                              />
                            ))}{" "}
                          </>
                        ) : (
                          <>
                            {" "}
                            {colors.map((color, index) => (
                              <MDBRadio
                                key={index}
                                name="inlineRadio-color"
                                id={`inlineRadio${color.product_color_id}`}
                                value={color.product_color_id}
                                label={color.color}
                                inline
                                checked={
                                  color.product_color_id === selectedColor
                                }
                                disabled={
                                  filteredColors.filter(
                                    (filter) =>
                                      filter.product_color_id ===
                                      color.product_color_id
                                  ).length > 0
                                    ? false
                                    : true
                                }
                                onChange={(e) =>
                                  setSelectedColor(parseInt(e.target.value))
                                }
                              />
                            ))}{" "}
                          </>
                        )}{" "}
                      </FilterColor>{" "}
                    </ColorInfo>{" "}
                    <SizeInfo>
                      <FilterTitle
                        style={{ fontSize: `${20 + fontSize.fontSize}px` }}
                      >
                        Size: {""}{" "}
                      </FilterTitle>{" "}
                      <FilterSize>
                        {" "}
                        {!selectedColor ? (
                          <>
                            {" "}
                            {sizeOptions.map((size, index) => (
                              <MDBRadio
                                key={index}
                                name="inlineRadio-size"
                                id={size}
                                value={size}
                                label={size}
                                inline
                                checked={size === selectedSize}
                                onChange={(e) =>
                                  setSelectedSize(e.target.value)
                                }
                              />
                            ))}{" "}
                          </>
                        ) : (
                          <>
                            {" "}
                            {sizeOptions.map((size, index) => (
                              <MDBRadio
                                key={index}
                                name="inlineRadio-size"
                                id={size}
                                value={size}
                                label={size}
                                inline
                                checked={size === selectedSize}
                                disabled={
                                  sizes.filter((stock) => stock.size === size)
                                    .length > 0
                                    ? false
                                    : true
                                }
                                onChange={(e) =>
                                  setSelectedSize(e.target.value)
                                }
                              />
                            ))}{" "}
                          </>
                        )}{" "}
                      </FilterSize>{" "}
                    </SizeInfo>{" "}
                    <AddContainer style={{ marginTop: "5%" }}>
                      <FilterTitle
                        style={{ fontSize: `${20 + fontSize.fontSize}px` }}
                      >
                        Quantity:{" "}
                      </FilterTitle>{" "}
                      <AmountContainer
                        style={{ fontSize: `${20 + fontSize.fontSize}px` }}
                      >
                        <Remove
                          onClick={() => handleQuantity("dec")}
                          style={{ cursor: "pointer" }}
                        />{" "}
                        <Amount> {quantity} </Amount>{" "}
                        <Add
                          onClick={() => handleQuantity("inc")}
                          style={{ cursor: "pointer" }}
                        />{" "}
                      </AmountContainer>{" "}
                    </AddContainer>{" "}
                  </FilterContainer>{" "}
                  <ButtonGroup>
                    <Button
                      className="d-block mx-auto w-35"
                      type="submit"
                      style={styles.customButton}
                      onClick={addToCartHandler}
                    >
                      <MDBIcon
                        fas
                        icon="shopping-cart"
                        style={{
                          marginRight: "10px",
                          fontSize: `${16 + fontSize.fontSize}px`,
                        }}
                      />{" "}
                      <Text
                        style={{
                          fontSize: `${16 + fontSize.fontSize}px`,
                          display: " inline-block",
                        }}
                      >
                        ADD TO CART{" "}
                      </Text>{" "}
                    </Button>
                    <Button
                      className="d-block mx-auto w-35"
                      type="submit"
                      style={styles.clearButton}
                      onClick={() => window.location.reload()}
                    >
                      <MDBIcon
                        fas
                        icon="trash-alt"
                        style={{
                          marginRight: "10px",
                          fontSize: `${16 + fontSize.fontSize}px`,
                        }}
                      />{" "}
                      <Text
                        style={{
                          fontSize: `${16 + fontSize.fontSize}px`,
                          display: " inline-block",
                        }}
                      >
                        {" "}
                        CLEAR SELECTION{" "}
                      </Text>{" "}
                    </Button>{" "}
                  </ButtonGroup>{" "}
                </>
              ) : (
                <>
                  <Line />
                  <Message>
                    Sorry, this product is currently out of stock{" "}
                  </Message>{" "}
                  <Link
                    to={`/products?main_category=${product.main_category}&sub_category=${product.sub_category}`}
                  >
                    <Button style={styles.customButton}>
                      {" "}
                      {product.main_category !== "Kids"
                        ? `View other ${product.main_category}'s ${product.sub_category}`
                        : `View other products for ${product.main_category} (${product.sub_category})`}{" "}
                    </Button>{" "}
                  </Link>{" "}
                </>
              )}{" "}
            </InfoContainer>{" "}
          </Col>{" "}
        </Row>{" "}
        <SizeChartModal show={open} onHide={() => setOpen(false)} />{" "}
      </Wrapper>{" "}
      <Footer />
    </Container>
  );
};

export default Product;
