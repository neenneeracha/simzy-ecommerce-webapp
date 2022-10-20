import { Badge } from "@material-ui/core";
import { Search, ShoppingCartOutlined } from "@material-ui/icons";
import React from "react";
import styled from "styled-components";
import NavDropdown from 'react-bootstrap/NavDropdown';


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


const Bag = styled.div`
`;

const Navbar = () => {
  return (
    <Container>
      <Wrapper>
        <Left>
          <MenuItem>HOME</MenuItem>
          <MenuItem>
          <NavDropdown title="WOMEN" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">JEANS</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">DRESSES</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">T-SHIRTS</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.4">PANTS</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.5">SHORTS</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.6">SKIRTS</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.7">TOP&SHIRTS</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.8">SWEATSHIRTS</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.9">JACKETS</NavDropdown.Item>
            </NavDropdown>
          </MenuItem>
          <MenuItem> 
          <NavDropdown title="MEN" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">SHIRTS</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">T-SHIRTS</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">PANTS</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.4">SHORTS</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.5">POLOS</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.6">JEANS</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.7">SWEATSHIRTS</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.8">JACKETS</NavDropdown.Item>
            </NavDropdown>
          </MenuItem>
          <MenuItem>
          <NavDropdown title="KIDS" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">GIRLS</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">BOYS</NavDropdown.Item>
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
            <Badge color="secondary" badgeContent={99}>
              <MenuItem>CART</MenuItem>
            </Badge>
          </MenuItem>
          <MenuItem>PROFILE</MenuItem>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
