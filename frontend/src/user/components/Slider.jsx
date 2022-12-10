import React from "react";
import Carousel from "react-bootstrap/Carousel";
import styled from "styled-components";
import { useSelector } from "react-redux";
const Container = styled.div`
  .carousel-control-next-icon:after,
  .carousel-control-prev-icon:after {
    content: "";
  }
`;

const Slider = () => {
  const fontSize = useSelector((state) => state.fontSize);
  return (
    <Container>
      <Carousel style={{ width: "100%", marginTop: "1%" }}>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={process.env.PUBLIC_URL + "img/slider1.jpg"}
            alt="First slide"
          />
          <Carousel.Caption>
            <h1 style={{ fontSize: `${52 + fontSize.fontSize}px` }}>SIMZY</h1>
            <h3 style={{ fontSize: `${20 + fontSize.fontSize}px` }}>
              We have everything you need!
            </h3>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={process.env.PUBLIC_URL + "img/slider2.jpg"}
            alt="Second slide"
          />

          <Carousel.Caption>
            <h1 style={{ fontSize: `${52 + fontSize.fontSize}px` }}>SIMZY</h1>
            <h3 style={{ fontSize: `${20 + fontSize.fontSize}px` }}>
              New season, new style
            </h3>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={process.env.PUBLIC_URL + "img/slider5.jpg"}
            alt="Third slide"
          />

          <Carousel.Caption>
            <h1 style={{ fontSize: `${52 + fontSize.fontSize}px` }}>SIMZY</h1>
            <h3 style={{ fontSize: `${20 + fontSize.fontSize}px` }}>
              A great dress can make you remember what is beautiful about life
            </h3>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </Container>
  );
};

export default Slider;
