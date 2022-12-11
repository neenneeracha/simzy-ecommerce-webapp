/********************************************************************
 *
 * CategoriesItem.jsx
 *
 *    This file represents the compoents of Categories.jsx
 *    which link to each category's product page.
 *
 ********************************************************************
 */

import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Container = styled.div`
  flex: 1;
  margin: 3px;
  height: 70vh;
  position: relative;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Info = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
  color: white;
  margin-bottom: 20px;
  font-weight: bold;
`;
const Text = styled.div``;

const Button = styled.button`
  border: none;
  padding: 10px;
  background-color: white;
  color: black;
  cursor: pointer;
  font-weight: 600;
  border-radius: 7px;
  &:hover {
    background-color: #eda3b5;
    transform: scale(1.1);
    color: white;
    border-radius: 0px;
  }
`;

const CategoryItem = ({ item }) => {
  const fontSize = useSelector((state) => state.fontSize);

  return (
    <Container>
      <Link to={item.url}>
        <Image src={item.img} />
        <Info>
          <Title
            style={{
              fontSize: `${40 + fontSize.fontSize}px`,
            }}
          >
            {item.title}
          </Title>
          <Button>
            <Text
              style={{
                fontSize: `${20 + fontSize.fontSize}px`,
              }}
            >
              SHOP NOW
            </Text>
          </Button>
        </Info>
      </Link>
    </Container>
  );
};

export default CategoryItem;
