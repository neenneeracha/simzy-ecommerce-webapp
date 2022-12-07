import React, { useState, useEffect } from "react";
import Products from "../components/Products";

import axios from "axios";
import styled from "styled-components";

const Container = styled.div`
`;

const Line = styled.hr`
    width: 30%;
    margin: 10px auto;
    color: gray;
`;

const Title = styled.h1`
  margin: 30px 20px 20px;
  text-align: center;
  color: black;
  font-weight: bold;
`;

const NewArrivals = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const getNewArrivals = async () => {
          try {
            const res = await axios.get(
              "http://localhost:8080/api/v1/products/new-arrivals"
            );
            setProducts(res.data);
          } catch (error) {
            console.log(error);
          }
        };
        getNewArrivals();
      }, []);

  return (
    <Container>
        {
            products.length > 0 ? 
            <>
                <Title>New Arrivals</Title>
                <Line/>
                <Products products={products} />
            </>
            :
            undefined
        }
    
    </Container>
  )
}

export default NewArrivals