/********************************************************************
 *
 * Login.jsx
 *
 *    This file represents the login page for SIMZY customers and
 *    admin which requires an email and password to log in to
 *    the system.
 *
 ********************************************************************
 */

import React, { useState } from "react";
import styled from "styled-components";
import { Col, Image, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import BackNavBar from "../components/BackNavBar";
import { Link, useNavigate } from "react-router-dom";
import { useUserUpdate } from "../../context/UserContext";
import axios from "axios";
import Alert from "../components/Alert";
import { useSelector } from "react-redux";

// style the components
const Container = styled.div`
  position: fixed;
  padding: 0px 15px;
  margin: 0px auto;
`;

const Title = styled.h3`
  color: #eda3b5;
  text-align: center;
  font-weight: bold;
`;

const Text = styled.div`
  text-align: center;
`;

const LinkItem = styled.span`
  color: #eda3b5;
  text-decoration: underline;

  &:hover {
    font-weight: bold;
    color: black;
  }
`;

const FieldName = styled.b``;

const styles = {
  customButton: {
    backgroundColor: "#eda3b5",
    borderColor: "#eda3b5",
    color: "white",
    borderRadius: "5px",
    marginTop: "6%",
  },
};

const Login = () => {
  const { setToken } = useUserUpdate();
  const navigate = useNavigate();
  const fontSize = useSelector((state) => state.fontSize);
  const [show, setShow] = useState(false);
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState({
    title: "",
    message: "",
    type: "",
    link: "",
  });

  // set a new state for the input
  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // get the current state value and perform input validation
  const handleSubmit = async () => {
    const checkEmail = inputs.email.split(" ").join("").length < 1;
    const checkPassword = inputs.password.split(" ").join("").length < 1;

    // check if email and password are empty
    if (checkEmail && checkPassword) {
      // display error message if empty
      setError((prev) => ({
        ...prev,
        title: "Invalid Input",
        message: "Email and Password cannot be blank, please try again!",
        type: "error",
      }));
      setShow(true);
    }
    // check if email is empty
    else if (checkEmail) {
      setError((prev) => ({
        ...prev,
        title: "Invalid Input",
        message: "Email cannot be blank, please try again!",
        type: "error",
      }));
      setShow(true);
    }
    // check if password is empty
    else if (checkPassword) {
      setError((prev) => ({
        ...prev,
        title: "Invalid Input",
        message: "Password cannot be blank, please try again!",
        type: "error",
      }));
      setShow(true);
    }
    // send input to back end
    else {
      try {
        const res = await axios.post(
          "http://localhost:8080/api/v1/auth/login",
          inputs
        );
        setToken(res.data);
        navigate("/");
        window.location.reload();
      } catch (err) {
        console.log(err);
        if (err.response.status === 500) {
          setError((prev) => ({
            ...prev,
            title: "Something went wrong",
            message: err.response.data.msg,
            type: "error",
          }));
          setShow(true);
        } else {
          setError((prev) => ({
            ...prev,
            title: "Invalid Credentials",
            message: err.response.data.msg,
            type: "error",
          }));
          setShow(true);
        }
      }
    }
  };

  return (
    <Container>
      <BackNavBar />
      {/* if an error occurs, display error alert */}
      {show ? (
        <Alert show={show} setShow={setShow} text={error} setText={setError} />
      ) : undefined}
      <Row>
        <Col xs={12} md={6}>
          <Image
            src={process.env.PUBLIC_URL + "img/login.png"}
            height="80%"
            width="80%"
            style={{ marginLeft: "10%", marginTop: "10%", objectFit: "cover" }}
          />
        </Col>
        <Col style={{ marginRight: "5%", marginTop: "5%" }}>
          <Title
            style={{
              width: "80%",
              marginLeft: "10%",
              marginTop: "10%",
              fontSize: `${32 + fontSize.fontSize}px`,
            }}
            className="center"
          >
            WELCOME TO SIMZY
          </Title>
          <Form
            style={{
              margin: "30px 100px",
              fontSize: `${16 + fontSize.fontSize}px`,
            }}
          >
            <Form.Group controlId="emailInput" style={{ marginTop: "30px" }}>
              <Form.Label>
                <FieldName>Email:</FieldName>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your email"
                name="email"
                required
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="passwordInput" style={{ marginTop: "30px" }}>
              <Form.Label>
                <FieldName>Password:</FieldName>
              </Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter your password"
                name="password"
                required
                onChange={handleChange}
              />
            </Form.Group>
            <Button
              className="d-block mx-auto w-75"
              style={styles.customButton}
              onClick={handleSubmit}
            >
              <Text
                style={{
                  fontSize: `${16 + fontSize.fontSize}px`,
                  display: " inline-block",
                }}
              >
                {" "}
                Submit
              </Text>
            </Button>
            <Text style={{ marginTop: "18px", marginBottom: "5%" }}>
              Need an account? &nbsp;
              <Link style={{ textDecoration: "none" }} to="/register">
                <LinkItem>CREATE NOW</LinkItem>
              </Link>
            </Text>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
