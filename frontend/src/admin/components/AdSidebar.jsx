import React from "react";
import styled from "styled-components";
import { MDBIcon } from "mdb-react-ui-kit";
import { Link } from "react-router-dom";

const Container = styled.div`
  flex: 1;
  border-right: 0.5px solid lightgrey;
  min-height: 100vh;
  background-color: white;
`;
const Top = styled.div`
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Center = styled.div`
  padding-left: 20px;

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
`;
const List = styled.div`
  li {
    display: flex;
    align-items: center;
    padding: 5px;
    cursor: pointer;

    &:hover {
      background: #ffe7ed;
    }
  }
`;
const Logo = styled.div`
  font-size: 35px;
  font-weight: bold;
  color: black;
`;
const Topic = styled.h6`
  font-size: 13px;
  font-weight: 600;
  color: black;
  margin-left: 10px;
  text-decoration: none;
`;

const Title = styled.div`
  font-size: 10px;
  font-weight: bold;
  color: #999;
  margin-top: 15px;
  margin-bottom: 5px;
`;

const Custom = {
  text: {
    textDecoration: "none",
  },
};
const AdSidebar = () => {
  return (
    <Container>
      <Top>
        <Link to="/admin" style={Custom.text}>
          <Logo>SIMZY</Logo>
        </Link>
      </Top>

      <Center>
        <List>
          <ul>
            <Title>LISTS</Title>

            <Link to="/admin">
              <li>
                <MDBIcon fas icon="user-alt" style={{ color: "pink" }} />
                <Topic>Users</Topic>
              </li>
            </Link>

            <Link to="/viewproducts">
              {" "}
              <li>
                <MDBIcon fas icon="shopping-bag" style={{ color: "pink" }} />
                <Topic>Products</Topic>{" "}
              </li>
            </Link>

            <Link to="/vieworders">
              <li>
                <MDBIcon
                  fas
                  icon="file-invoice-dollar"
                  style={{ color: "pink" }}
                />

                <Topic>Orders</Topic>
              </li>
            </Link>
            <Title>USER</Title>

            <Link to="/orders">
              <li>
                <MDBIcon far icon="user-circle" style={{ color: "pink" }} />

                <Topic>Profile</Topic>
              </li>
            </Link>

            <Link to="/orders">
              <li>
                <MDBIcon fas icon="sign-out-alt" style={{ color: "pink" }} />

                <Topic>Logout</Topic>
              </li>
            </Link>
          </ul>
        </List>
      </Center>
    </Container>
  );
};

export default AdSidebar;
