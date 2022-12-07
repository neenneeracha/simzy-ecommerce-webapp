import React from "react";
import styled from "styled-components";
import Categories from "../components/Categories";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import NewArrivals from "../components/NewArrivals";
import Slider from "../components/Slider";


const Container = styled.div`
  min-height: 100vh;
  position: relative;
`;

const Home = () => {
  return (
    <Container>
      <Navbar />
      <Slider />
      <Categories />
      <NewArrivals />
      <Footer />
    </Container>
  );
};

export default Home;
