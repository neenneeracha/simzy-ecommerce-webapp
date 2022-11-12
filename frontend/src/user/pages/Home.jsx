import React from 'react';
import styled from "styled-components";
import Categories from '../components/Categories';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import Products from '../components/Products';
import Slider from '../components/Slider';
import { popularProducts } from "../../data";

const Container = styled.div`
  min-height: 100vh;
  position: relative;
`;

const Home = () => {
    return (
        <Container>
            <Navbar/> 
            <Slider/>
            <Categories/>
            <Products products={popularProducts}/>
            <Footer/>
        </Container>
    )
}

export default Home