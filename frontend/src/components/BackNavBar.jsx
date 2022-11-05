import React from 'react'
import { Link } from 'react-router-dom'
import styled from "styled-components";
import { ArrowBack } from '@material-ui/icons';

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

const Center = styled.div`
  flex: 1;
  text-align: center;
  padding-top: 7px;
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
  margin-right: 10px;
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

const handleClick = () => {
  window.history.back()
} 

const BackNavBar = () => {
  return (
    <Container>
      <Wrapper>
        <Left>
        <MenuItem onClick={handleClick}>
            <ArrowBack style={{fontSize: 18, marginBottom: 2, marginRight: 4}}/>  BACK
          </MenuItem>
        </Left>
        <Center>
          <Logo>SIMZY</Logo>
        </Center>
        <Right>
        <MenuItem>
            <Link style={{ textDecoration: "none" }} to="/">
              <LinkItem>
                HOME
              </LinkItem>
            </Link>
          </MenuItem>
        </Right>
      </Wrapper>
    </Container>
  );
}

export default BackNavBar