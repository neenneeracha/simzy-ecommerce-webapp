import React from "react";
import styled from "styled-components";
import { MDBIcon } from "mdb-react-ui-kit";
import { Link } from "react-router-dom";

const Container = styled.div`
  flex: 1;
  border-right: 0.5px solid lightgrey;
  min-height: 100vh;

  hr {
    height: 0;
    border: 0.5px solid lightgrey;
  }
`;
const Top = styled.div`
  height: 30px;
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

    span {
      font-size: 13px;
      font-weight: 600;
      color: #888;
      margin-left: 10px;
    }
  }
`;
const Logo = styled.div`
  font-size: 40px;
  font-weight: bold;
  color: pink;
  margin-top: 10px;
`;
const Title = styled.div`
  font-size: 10px;
  font-weight: bold;
  color: #999;
`;
const AdSidebar = () => {
  return (
    <Container>
      <Top>
        <Logo>SIMZY</Logo>
      </Top>
      <hr />
      <Center>
        <List>
          <ul>
          {/* <Title>MAIN</Title>
            <li>
              <Link to="/dashboard">
                <MDBIcon far icon="chart-bar" style={{ color: "pink" }} />
                <span>Dashboard</span>
              </Link>
            </li> */}
            {/* <Title>LISTS</Title> */}
            <li>
              <Link to="/users">
                <MDBIcon fas icon="user-alt" style={{ color: "pink" }} />
                <span>Users</span>
              </Link>
            </li>
            <li>
              <Link to="/products">
                <MDBIcon fas icon="shopping-bag" style={{ color: "pink" }} />

                <span>Products</span>
              </Link>
            </li>
            <li>
              <Link to="/orders">
                <MDBIcon
                  fas
                  icon="file-invoice-dollar"
                  style={{ color: "pink" }}
                />

                <span>Orders</span>
              </Link>
            </li>
          </ul>
        </List>
      </Center>
    </Container>
  );
};

export default AdSidebar;
