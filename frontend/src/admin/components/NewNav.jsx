import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useUserUpdate } from "../../UserContext";
import NavDropdown from "react-bootstrap/NavDropdown";
import { AccountCircle } from "@material-ui/icons";
import { MDBIcon } from "mdb-react-ui-kit";
import { Link } from "react-router-dom";

const Navbar = styled.div`
  height: 60px;
  border-bottom: 0.5px solid rgb(231, 228, 228);
  display: flex;
  align-items: center;
  font-size: 14px;
  background-color: black;
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;
const Logo = styled.h1`
  font-weight: bold;
  color: #eda3b5;
`;

const Wrapper = styled.div`
  width: 100%;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: right;
  margin-top: 10px;
`;
const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
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
  margin-bottom: 10px;

  #basic-nav-dropdown {
    color: pink;

    &:hover {
      color: #eda3b5;
      text-decoration: underline;
    }
  }
`;

const Styles = {
  customtext: {
    textDecoration: "none",
    color: "black",
  },
};

const LinkCat = styled.div`
  color: #eda3b5;
  text-decoration: none;
`;

const NewNav = () => {
  const navigate = useNavigate();
  const { removeToken } = useUserUpdate();

  const handleLogout = () => {
    removeToken();
    navigate("/");
    window.location.reload();
  };

  return (
    <Navbar>
      <Wrapper>
        <Left>
          <MenuItem>
            <Link to="/vieworders" style={Styles.customtext}>
              <LinkCat>ORDERS</LinkCat>
            </Link>
          </MenuItem>
          <MenuItem>
            {" "}
            <Link to="/viewproducts" style={Styles.customtext}>
              <LinkCat>PRODUCTS</LinkCat>
            </Link>
          </MenuItem>
          <MenuItem>
            {" "}
            <Link to="/viewusers" style={Styles.customtext}>
              <LinkCat>USERS</LinkCat>
            </Link>
          </MenuItem>
        </Left>
        <Center>
          <Logo>SIMZY</Logo>
        </Center>
        <Right>
          <MenuItem>
            <NavDropdown
              title={
                <AccountCircle style={{ fontSize: 32, marginBottom: 6 }} />
              }
              id="basic-nav-dropdown"
            >
              <NavDropdown.Item as="li"></NavDropdown.Item>
              <NavDropdown.Item as="li">
                <LinkCat onClick={handleLogout}>Logout</LinkCat>
              </NavDropdown.Item>
            </NavDropdown>
          </MenuItem>
        </Right>
      </Wrapper>
    </Navbar>
  );
};

export default NewNav;
