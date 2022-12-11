/********************************************************************
 *
 * Product.jsx
 *
 *    This file represents the product container mapping the signle 
 *    product and display it as the product list
 * 
 ********************************************************************
 */

import React from 'react';
import styled from "styled-components";
import Product from "./Product";

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Products = ({ products }) => {
  return (
    <Container>
      {products.map((item, index) => (
        <Product item={item} key={index} />
      ))}
    </Container>
  );
};

export default Products;
