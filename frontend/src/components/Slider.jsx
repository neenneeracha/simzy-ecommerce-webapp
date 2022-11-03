import Carousel from 'react-bootstrap/Carousel';



const Slider = () => {
  return (
    <Carousel style = {{width: "100%", marginTop: "1%"}}>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={process.env.PUBLIC_URL+"img/slider1.jpg"}
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
          src={process.env.PUBLIC_URL+"img/slider2.jpg"}
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
          src={process.env.PUBLIC_URL+"img/slider5.jpg"}
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
  );

};

export default Slider;

