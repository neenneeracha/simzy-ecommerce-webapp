import styled from "styled-components";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Products from "../components/Products";
import Newsletter from '../components/NewLetter';
import { popularProducts } from "../data";
import {useState} from "react";

const Container = styled.div``;

const Title = styled.h1`
  margin: 20px;
  text-align: center;
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

  const [ users, setUsers ] = (popularProducts);

  const [ sorted, setSorted ] = useState({sorted: "price", reversed: false});

  const sortByPrice = () => {
    setSorted({sorted: "price", reversed: !sorted.reversed});
    
    const usersCopy = [...users];
    usersCopy.sort((userA, userB)=>{
        return userB.price - userA.price;
    })
    setUsers(usersCopy);
  }


  
  

  return (
    <Container>
      <Navbar />
      <Title>Dresses</Title>
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
          <FilterText onChange={sortByPrice} >Sort By:</FilterText>
          <Select>
            <Option selected >Default</Option>
            <Option onChange={sortByPrice} >Price (asc)</Option>
            <Option onChange={sortByPrice} >Price (desc)</Option>
          </Select>
        </Filter>
      </FilterContainer>
      <Products />
      {/* <Newsletter/> */}
      <Footer />
    </Container>
  );
};

export default ProductList;
