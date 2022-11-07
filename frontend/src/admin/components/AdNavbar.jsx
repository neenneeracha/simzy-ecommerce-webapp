import React, { useState } from "react";
import { MDBIcon } from "mdb-react-ui-kit";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Navbar = styled.div`
  height: 50px;
  border-bottom: 0.5px solid white;
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #555;
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  padding: 20px;
  align-items: center;

  justify-content: right;
`;

const Items = styled.div`
  display: flex;
`;

const Item = styled.div``;
const UserName = styled.h5`
  margin-left: 10px;

`;

const AdNavbar = () => {
  return (
    <Navbar>
      <Wrapper>
        <Items>
          <Item>
            <MDBIcon far icon="user" size = "lg"/>
          </Item>
          <Item>
            <UserName>Hi,Jack</UserName>
          </Item>
        </Items>
      </Wrapper>
    </Navbar>
  );
};

export default AdNavbar;
