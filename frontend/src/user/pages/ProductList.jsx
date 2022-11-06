import styled from "styled-components";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Products from "../components/Products";
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useSearchParams } from "react-router-dom";

const Container = styled.div``;

const Title = styled.h1`
  margin: 40px 20px 20px;
  text-align: center;
  color: #EDA3B5;
  font-weight: bold;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
`;

const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
`;
const Option = styled.option``;

const Filter = styled.div`
  margin: 10px;
`;


const ProductList = () => {
  const [products, setProducts] = useState([])
  const [searchParams] = useSearchParams();
  const main_category = searchParams.get('main_category')
  const sub_category = searchParams.get('sub_category')
  const search_input = searchParams.get('search_input')

  // sub_category ? alert(sub_category) : main_category ? alert(main_category) : alert(search_input)

useEffect(() => {
  const getProducts = async () => {
      try {
        const res = await axios.get(
          sub_category ? `http://localhost:8080/api/v1/products?main_category=${main_category}&sub_category=${sub_category}` 
          : main_category ? `http://localhost:8080/api/v1/products?main_category=${main_category}`
          : `http://localhost:8080/api/v1/products?search_input=${search_input}`)
        setProducts(res.data)
      } catch (error) {
        console.log(error)
      }
  }

  getProducts()

}, [main_category, sub_category, search_input])

  return (
    <Container>
      <Navbar />
      <Title>{ sub_category ? sub_category : main_category ? main_category : search_input }</Title>
      <FilterContainer>
        <Filter>
          <FilterText>Filter By:</FilterText>
          <Select>
            <Option disabled selected>
              Color
            </Option>
            <Option>White</Option>
            <Option>Black</Option>
            <Option>Red</Option>
            <Option>Blue</Option>
            <Option>Yellow</Option>
            <Option>Green</Option>
          </Select>
          <Select>
            <Option disabled selected>
              Size
            </Option>
            <Option>XS</Option>
            <Option>S</Option>
            <Option>M</Option>
            <Option>L</Option>
            <Option>XL</Option>
          </Select>
          <Select>
            <Option disabled selected>
              Price
            </Option>
            <Option>500THB - 999THB</Option>
            <Option>1000THB - 1999THB</Option>
            <Option>2000THB - 2999THB</Option>
            <Option>3000THB - 3999THB</Option>
            <Option>4000THB - 4999THB</Option>
          </Select>
        </Filter>
        <Filter>
          <FilterText >Sort By:</FilterText>
          <Select>
            <Option selected >Default</Option>
            <Option >Price (asc)</Option>
            <Option >Price (desc)</Option>
          </Select>
        </Filter>
      </FilterContainer>
      <Products products={products}/>
      <Footer />
    </Container>
  );
};

export default ProductList;