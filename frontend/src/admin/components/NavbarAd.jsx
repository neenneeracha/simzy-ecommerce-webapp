/********************************************************************
 *
 * NavbarAd.jsx
 *
 *   This file represents the navigation bar component of SIMZY admin
 *   Provides Order information, user information and
 *   product information
 *
 ********************************************************************
 */

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useUserUpdate } from "../../context/UserContext";
import NavDropdown from "react-bootstrap/NavDropdown";
import Confirmation from "../components/Confirmation";
import { ExitToApp } from "@material-ui/icons";
import { Link } from "react-router-dom";
import axios from "axios";

const Navbar = styled.div`
  height: 70px;
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
  color: #eda3b5;

  &:hover {
    color: pink;
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

  &:hover {
    color: pink;
  }
`;

const Status = styled.div`
  color: black;
  text-decoration: none;
`;

const NavbarAd = () => {
  const navigate = useNavigate();
  const { removeToken } = useUserUpdate();
  const [orderStatus, setOrderStatus] = useState([]);
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
  });

  // handle user account logout
  const handleLogout = () => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    removeToken();
    navigate("/");
    window.location.reload();
  };

  // get order status
  useEffect(() => {
    const getStatus = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8080/api/v1/order/status"
        );
        res.data.push({ status_id: "6", description: "View All Orders" });
        setOrderStatus(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getStatus();
  }, []);

  return (
    <Navbar>
      <Wrapper>
        <Left>
          <MenuItem>
            {/* <Link to="/vieworders" style={Styles.customtext}>
              <LinkCat>ORDERS</LinkCat>
            </Link> */}
            <NavDropdown title="ORDER" id="basic-nav-dropdown">
              {orderStatus.map((status, index) => (
                <NavDropdown.Item as="li" key={index}>
                  <Link
                    style={{ textDecoration: "none" }}
                    to={`/vieworders?status_id=${status.status_id}`}
                  >
                    <Status>
                      {status.status_id} : {status.description}
                    </Status>
                  </Link>
                </NavDropdown.Item>
              ))}
            </NavDropdown>
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
            <LinkCat
              onClick={() => {
                setConfirmDialog({
                  isOpen: true,
                  title: `Are you sure that you want to log out of the system?`,
                  onConfirm: () => {
                    handleLogout();
                  },
                });
              }}
            >
              <ExitToApp style={{ fontSize: 32 }} />
            </LinkCat>
          </MenuItem>
        </Right>
        <Confirmation
          confirmDialog={confirmDialog}
          setConfirmDialog={setConfirmDialog}
        />
      </Wrapper>
    </Navbar>
  );
};

export default NavbarAd;
