import React, { useState } from "react";
import { MDBIcon } from "mdb-react-ui-kit";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Navbar = styled.div`
  height: 50px;
  border-bottom: 0.5px solid rgb(231, 228, 228);
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #555;
`;

const Wrapper = styled.div`
  width: 100%;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: right;
`;

const Items = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;
const UserName = styled.div`
  font-size: 20px;
  margin-bottom: 20px;
  margin-right: 10px;
`;

const AdNavbar = () => {
  return (
    <Navbar>
      <Wrapper>
        <Items>
          <Item>
            <UserName>
              <b>Hi, Jack</b>
            </UserName>
          </Item>
          <Item>
            <MDBIcon
              fas
              icon="user-circle"
              size="2x"
              style = {{marginBottom: "20px"}}
            />
          </Item>
        </Items>
      </Wrapper>
    </Navbar>
  );
};

export default AdNavbar;
