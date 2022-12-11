import {
  Search,
  AccountCircle,
  ShoppingCartOutlined,
} from "@material-ui/icons";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import NavDropdown from "react-bootstrap/NavDropdown";
import Badge from "react-bootstrap/Badge";
import { useSelector, useDispatch } from "react-redux";
import { getTotals } from "../redux/cartRedux";
import { useUser, useUserUpdate } from "../../UserContext";
import Alert from "./Alert";
import Button from "react-bootstrap/Button";
import { increaseFontSize, decreaseFontSize } from "../redux/fontRedux";
const Container = styled.div`
  height: 60px;
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex; /* shoe horizontal */
  align-items: center;
  justify-content: space-between; /* space */
  margin-bottom: 30px;
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  font-weight: bold;
`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;

  &:hover {
    color: #eda3b5;
    text-decoration: underline;
  }
`;

const Input = styled.input`
  border: none;
  color: black;
  font-size: 16px;
  padding-left: 10px;
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
  padding-top: 5px;
`;

const Logo = styled.h1`
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

  #basic-nav-dropdown {
    color: black;

    &:hover {
      color: #eda3b5;
      text-decoration: underline;
    }
  }
`;

const LinkItem = styled.div`
  color: black;
  text-decoration: none;

  &:hover {
    color: #eda3b5;
    text-decoration: underline;
  }
`;

const LinkCat = styled.div`
  color: black;
  text-decoration: none;
`;

const Navbar = () => {
  const [searchInput, setSearchInput] = useState("");
  const [womenCats, setWomenCats] = useState([]);
  const [menCats, setMenCats] = useState([]);
  const [kidsCats, setKidsCats] = useState([]);
  const [show, setShow] = useState(false);
  const [error, setError] = useState({
    title: "",
    message: "",
    type: "",
    link: "",
  });
  const navigate = useNavigate();
  const { removeToken } = useUserUpdate();
  const user = useUser();
  const [action, setAction] = useState("increase");
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const fontSize = useSelector((state) => state.fontSize);

  useEffect(() => {
    dispatch(getTotals());
  }, [cart, dispatch]);

  useEffect(() => {
    const getWomenCat = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8080/api/v1/category?category=Women"
        );
        setWomenCats(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    const getMenCat = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8080/api/v1/category?category=Men"
        );
        setMenCats(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    const getKidsCat = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8080/api/v1/category?category=Kids"
        );
        setKidsCats(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    getWomenCat();
    getMenCat();
    getKidsCat();
  }, []);

  const handleSearch = () => {
    if (searchInput.split(" ").join("").length < 1) {
      setError((prev) => ({
        ...prev,
        title: "Invalid Input",
        message: "Please enter the word that you want to search",
        type: "",
      }));
      setShow(true);
    } else {
      navigate(`/products?search_input=${searchInput}`);
      window.location.reload();
    }
  };

  const handleLogout = () => {
    removeToken();
    navigate("/");
    window.location.reload();
  };

  return (
    <Container>
      <Wrapper>
        {show ? (
          <Alert
            show={show}
            setShow={setShow}
            text={error}
            setText={setError}
          />
        ) : undefined}
        <Left>
          <MenuItem>
            <Link
              style={{
                textDecoration: "none",
                fontSize: `${16 + fontSize.fontSize}px`,
              }}
              to="/"
            >
              <LinkItem>HOME</LinkItem>
            </Link>
          </MenuItem>
          <MenuItem>
            <NavDropdown
              title="WOMEN"
              id="basic-nav-dropdown"
              style={{ fontSize: `${16 + fontSize.fontSize}px` }}
            >
              {womenCats.map((cat, index) => (
                <NavDropdown.Item as="li" key={index}>
                  <Link
                    style={{
                      textDecoration: "none",
                      fontSize: `${16 + fontSize.fontSize}px`,
                    }}
                    to={`/products?main_category=Women&sub_category=${cat.sub_category}`}
                  >
                    <LinkCat>{cat.sub_category}</LinkCat>
                  </Link>
                </NavDropdown.Item>
              ))}
            </NavDropdown>
          </MenuItem>
          <MenuItem>
            <NavDropdown
              title="MEN"
              id="basic-nav-dropdown"
              style={{ fontSize: `${16 + fontSize.fontSize}px` }}
            >
              {menCats.map((cat, index) => (
                <NavDropdown.Item as="li" key={index}>
                  <Link
                    style={{
                      textDecoration: "none",
                      fontSize: `${16 + fontSize.fontSize}px`,
                    }}
                    to={`/products?main_category=Men&sub_category=${cat.sub_category}`}
                  >
                    <LinkCat>{cat.sub_category}</LinkCat>
                  </Link>
                </NavDropdown.Item>
              ))}
            </NavDropdown>
          </MenuItem>
          <MenuItem>
            <NavDropdown
              title="KIDS"
              id="basic-nav-dropdown"
              style={{ fontSize: `${16 + fontSize.fontSize}px` }}
            >
              {kidsCats.map((cat, index) => (
                <NavDropdown.Item as="li" key={index}>
                  <Link
                    style={{
                      textDecoration: "none",
                      fontSize: `${16 + fontSize.fontSize}px`,
                    }}
                    to={`/products?main_category=Kids&sub_category=${cat.sub_category}`}
                  >
                    <LinkCat>{cat.sub_category}</LinkCat>
                  </Link>
                </NavDropdown.Item>
              ))}
            </NavDropdown>
          </MenuItem>
        </Left>
        <Center>
          <Logo style={{ fontSize: `${40 + fontSize.fontSize}px` }}>SIMZY</Logo>
        </Center>
        <Right>
          <Button
            variant="light"
            onClick={() => dispatch(increaseFontSize())}
            style={{
              fontSize: `${16 + fontSize.fontSize}px`,
              whiteSpace: "nowrap",
            }}
          >
            + A
          </Button>
          <Button
            variant="light"
            onClick={() => dispatch(decreaseFontSize())}
            style={{
              fontSize: `${16 + fontSize.fontSize}px`,
              whiteSpace: "nowrap",
            }}
          >
            {" "}
            - A
          </Button>
          <SearchContainer style={{ textDecoration: "none" }}>
            <Input
              placeholder="search product"
              onChange={(e) => setSearchInput(e.target.value)}
              style={{ fontSize: `${16 + fontSize.fontSize}px` }}
            />
            <Search
              style={{ color: "gray", fontsize: 16, cursor: "pointer" }}
              onClick={handleSearch}
            />
          </SearchContainer>
          <MenuItem>
            <Link
              style={{
                textDecoration: "none",
                fontSize: `${16 + fontSize.fontSize}px`,
                whiteSpace: "nowrap",
              }}
              to="/cart"
            >
              <LinkItem>
                CART <Badge bg="danger">{cart.cartTotalQuantity}</Badge>
                {/* <Badge overlap="rectangular" badgeContent={cart.cartTotalQuantity} color="secondary" style={{ marginTop: 5 }}>
                    <ShoppingCartOutlined/>
                </Badge> */}
              </LinkItem>
            </Link>
          </MenuItem>
          <MenuItem>
            <NavDropdown
              title={
                <AccountCircle
                  style={{ fontSize: `${32 + fontSize.fontSize}px` }}
                />
              }
              id="basic-nav-dropdown"
            >
              {user == null ? (
                <>
                  <NavDropdown.Item as="li">
                    <Link
                      style={{
                        textDecoration: "none",
                        fontSize: `${16 + fontSize.fontSize}px`,
                      }}
                      to="/login"
                    >
                      <LinkCat>Login</LinkCat>
                    </Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item as="li">
                    <Link
                      style={{
                        textDecoration: "none",
                        fontSize: `${16 + fontSize.fontSize}px`,
                      }}
                      to="/register"
                    >
                      <LinkCat>Register</LinkCat>
                    </Link>
                  </NavDropdown.Item>
                </>
              ) : (
                <>
                  <NavDropdown.Item as="li">
                    <Link
                      style={{
                        textDecoration: "none",
                        fontSize: `${16 + fontSize.fontSize}px`,
                      }}
                      to="/profile"
                    >
                      <LinkCat>Profile</LinkCat>
                    </Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item as="li">
                    <LinkCat
                      onClick={handleLogout}
                      style={{
                        textDecoration: "none",
                        fontSize: `${16 + fontSize.fontSize}px`,
                      }}
                    >
                      Logout
                    </LinkCat>
                  </NavDropdown.Item>
                </>
              )}
            </NavDropdown>
          </MenuItem>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
