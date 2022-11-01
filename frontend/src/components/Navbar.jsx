import { Search } from "@material-ui/icons";
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import React from "react";
import styled from "styled-components";
import NavDropdown from "react-bootstrap/NavDropdown";
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';

const Container = styled.div`
  height: 60px;
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex; /* shoe horizontal */
  align-items: center;
  justify-content: space-between; /* space */
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  font-weight: bold;
`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;

  &:hover {
    color: #eda3b5;
    text-decoration: underline;
  }
`;

const Input = styled.input`
  border: none;
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
  padding-top: 5px;
`;

const Logo = styled.h1`
  font-weight: bold;
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  font-weight: bold;
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;

  &:hover {
    color: #eda3b5;
    text-decoration: underline;
  }
`;

const LinkItem = styled.div`
color: black;
text-decoration: none;

&:hover {
  color: #EDA3B5;
  text-decoration: underline;
}
`;

const LinkCat = styled.div`
color: black;
text-decoration: none;
`;

const Navbar = () => {
  const [womenCats, setWomenCats] = useState([])
  const [menCats, setMenCats] = useState([])
  const [kidsCats, setKidsCats] = useState([])

useEffect(() => {

  const getWomenCat = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/v1/category?category=Women")
        setWomenCats(res.data)
      } catch (error) {
        console.log(error)
      }
  }

  const getMenCat = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/v1/category?category=Men")
      setMenCats(res.data)
    } catch (error) {
      console.log(error)
    }
}

const getKidsCat = async () => {
  try {
    const res = await axios.get("http://localhost:8080/api/v1/category?category=Kids")
    setKidsCats(res.data)
  } catch (error) {
    console.log(error)
  }
}

  getWomenCat()
  getMenCat()
  getKidsCat()

}, [])


  return (
    <Container>
      <Wrapper>
        <Left>
          <MenuItem>
            <Link style={{ textDecoration: "none" }} to="/">
              <LinkItem>
                HOME
              </LinkItem>
            </Link>
          </MenuItem>
          <MenuItem>
            <NavDropdown title="WOMEN" id="basic-nav-dropdown">
            {womenCats.map((cat,index) => 
                 <NavDropdown.Item as="li" key={index}>
                 <Link style={{ textDecoration: "none" }} to={`/products?main_category=Women&sub_category=${cat.sub_category}`}>
                   <LinkCat>
                   {cat.sub_category}
                   </LinkCat>
                 </Link>
             </NavDropdown.Item>
              )}
            </NavDropdown>
          </MenuItem>
          <MenuItem>
            <NavDropdown title="MEN" id="basic-nav-dropdown">
            {menCats.map((cat,index) => 
                 <NavDropdown.Item as="li" key={index}>
                 <Link style={{ textDecoration: "none" }} to={`/products?main_category=Men&sub_category=${cat.sub_category}`}>
                   <LinkCat>
                   {cat.sub_category}
                   </LinkCat>
                 </Link>
             </NavDropdown.Item>
              )}
            </NavDropdown>
          </MenuItem>
          <MenuItem>
            <NavDropdown title="KIDS" id="basic-nav-dropdown">
              {kidsCats.map((cat,index) => 
                <NavDropdown.Item as="li" key={index}>
                  <Link style={{ textDecoration: "none" }} to={`/products?main_category=Kids&sub_category=${cat.sub_category}`}>
                    <LinkCat>
                    {cat.sub_category}
                    </LinkCat>
                  </Link>
              </NavDropdown.Item>
              )}
            </NavDropdown>
          </MenuItem>
        </Left>
        <Center>
          <Logo>SIMZY</Logo>
        </Center>
        <Right>
          <SearchContainer>
            <Input />
            <Search style={{ color: "gray", fontsize: 16 }} />
          </SearchContainer>
          <MenuItem>
            <Button variant="light">
              CART <Badge bg="danger">0</Badge>
              {/* <span className="visually-hidden">unread messages</span> */}
            </Button>
          </MenuItem>
          <MenuItem>
          <Link style={{ textDecoration: "none" }} to="/login">
              <LinkItem>
                LOGIN
              </LinkItem>
            </Link>
          </MenuItem>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
