/********************************************************************
 *
 * BackNavBar.jsx
 *
 *    This file represents the navigation bar that returns
 *    to the home page. Used in the registration and login pages.
 *
 ********************************************************************
 */

import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { ArrowBack } from "@material-ui/icons";
import { increaseFontSize, decreaseFontSize } from "../redux/fontRedux";
import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";

// style the components
const Container = styled.div`
  height: 60px;
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
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
  margin-right: 12px;

  &:hover {
    color: #eda3b5;
    text-decoration: underline;
  }
`;
const Text = styled.div``;

// handle with the back button action to go back to the previous page
const handleClick = () => {
  window.history.back();
};

const BackNavBar = () => {
  const fontSize = useSelector((state) => state.fontSize);
  const dispatch = useDispatch();

  return (
    <Container>
      <Wrapper>
        <Left>
          <MenuItem onClick={handleClick}>
            <ArrowBack
              style={{
                fontSize: `${16 + fontSize.fontSize}px`,
                marginBottom: 3,
                marginRight: 4,
              }}
            />{" "}
            <Text
              style={{
                fontSize: `${16 + fontSize.fontSize}px`,
                display: " inline-block",
              }}
            >
              BACK
            </Text>
          </MenuItem>
        </Left>
        <Center>
          <Logo style={{ fontSize: `${40 + fontSize.fontSize}px` }}>SIMZY</Logo>
        </Center>
        <Right>
          <Button
            variant="light"
            onClick={() => dispatch(increaseFontSize())}
            style={{
              fontSize: `${16 + fontSize.fontSize}px`,
              whiteSpace: "nowrap",
            }}
          >
            + A
          </Button>
          <Button
            variant="light"
            onClick={() => dispatch(decreaseFontSize())}
            style={{
              fontSize: `${16 + fontSize.fontSize}px`,
              whiteSpace: "nowrap",
            }}
          >
            {" "}
            - A
          </Button>
          <MenuItem>
            <Link style={{ textDecoration: "none" }} to="/">
              <LinkItem
                style={{
                  fontSize: `${16 + fontSize.fontSize}px`,
                }}
              >
                HOME
              </LinkItem>
            </Link>
          </MenuItem>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default BackNavBar;
