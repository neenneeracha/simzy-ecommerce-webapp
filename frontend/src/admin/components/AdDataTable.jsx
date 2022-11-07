import React from "react";
import styled from "styled-components";

const Container = styled.div`
  height: 600px;
  padding: 20px;
`;
const Title = styled.div`
  width: 100%;
  font-size: 24px;
  color: black;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const AdDataTable = () => {
  return (
    <Container>
      <Title>Orders List</Title>
    </Container>
  );
};

export default AdDataTable;
