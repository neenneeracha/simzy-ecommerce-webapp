/********************************************************************
 *
 * EmptyList.jsx
 *
 *   This file is used to display when there is no data in the table
 *
 ********************************************************************
 */

import React from "react";
import styled from "styled-components";

const Container = styled.div``;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 40px 30px 0px;
`;

const Image = styled.img`
  margin-top: 40px;
  height: 40%;
  width: 40%;
`;

const TextWrapper = styled.div`
  height: 40%;
  width: 40%;
  display: block;
`;

const Title = styled.h2`
  color: #eda3b5;
  font-size: 48px;
`;

const Text = styled.p`
  color: black;
  font-size: 20px;
`;

const EmptyList = ({ message }) => {
  return (
    <Container>
      <Wrapper>
        <Image src={process.env.PUBLIC_URL + "img/no-result.png"} />
        <TextWrapper>
          <Title>No Results Found!</Title>
          <Text>There's currently no {message} to display.</Text>
        </TextWrapper>
      </Wrapper>
    </Container>
  );
};

export default EmptyList;
