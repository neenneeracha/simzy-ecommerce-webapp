import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useUserUpdate } from "../../UserContext";
import NavDropdown from "react-bootstrap/NavDropdown";
import { AccountCircle } from "@material-ui/icons";

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

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  margin-bottom: 10px;

  #basic-nav-dropdown {
    color: black;

    &:hover {
      color: #eda3b5;
      text-decoration: underline;
    }
  }
`;

const LinkCat = styled.div`
  color: black;
  text-decoration: none;
`;

const AdNavbar = () => {
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
        {/* <Items>
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
        </Items> */}
        <MenuItem>
          <NavDropdown
            title={<AccountCircle style={{ fontSize: 32, marginBottom: 6 }} />}
            id="basic-nav-dropdown"
          >
            <NavDropdown.Item as="li">
              {/* <Link
                    style={{ textDecoration: "none" }}
                    to="/userinfo"
                  >
                    <LinkCat>Profile</LinkCat>
                  </Link> */}
            </NavDropdown.Item>
            <NavDropdown.Item as="li">
              <LinkCat onClick={handleLogout}>Logout</LinkCat>
            </NavDropdown.Item>
          </NavDropdown>
        </MenuItem>
      </Wrapper>
    </Navbar>
  );
};

export default AdNavbar;
