import React from "react";
import Carousel from "react-bootstrap/Carousel";
import styled from "styled-components";

const Container = styled.div`
  .carousel-control-next-icon:after,
  .carousel-control-prev-icon:after {
    content: "";
  }
`;

const Slider = () => {
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
            <h1>SIMZY</h1>
            <h3>We have everything you need!</h3>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={process.env.PUBLIC_URL + "img/slider2.jpg"}
            alt="Second slide"
          />

          <Carousel.Caption>
            <h1>SIMZY</h1>
            <h3>New season, new style</h3>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={process.env.PUBLIC_URL + "img/slider5.jpg"}
            alt="Third slide"
          />

          <Carousel.Caption>
            <h1>SIMZY</h1>
            <h3>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </h3>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </Container>
  );
};

export default Slider;
