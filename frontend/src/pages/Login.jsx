import React, { useState } from "react";
import { Col, Image, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import styled from "styled-components";
import Button from "react-bootstrap/Button";
import BackNavBar from "../components/BackNavBar";
import { Link } from "react-router-dom";

const Container = styled.div``;
const Title = styled.h3`
  color: #eda3b5;
  text-align: center;
  font-weight: bold;
`;

const Text = styled.div`
  text-align: center;

  // &:hover {
  //   color: #eda3b5;
  //   text-decoration: underline;
  // }
`;

const LinkItem = styled.span`
  color: #eda3b5;
  text-decoration: underline;

  &:hover {
    font-weight: bold;
    color: black;
  }
`;

const styles = {
  customButton: {
    backgroundColor: "#eda3b5",
    borderColor: "#eda3b5",
    color: "white",
    borderRadius: "5px",
    marginTop: "30px",
  },
};

const Login = () => {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };
  return (
    <Container>
      {/* <Navbar /> */}
      <BackNavBar />
      <Row>
        <Col xs={6}>
          <Image
            src={process.env.PUBLIC_URL + "img/login.png"}
            height="100%"
            width="100%"
          />
        </Col>
        <Col>
          <Title
            style={{ width: "80%", marginLeft: "10%", marginTop: "10%" }}
            className="center"
          >
            WELCOME TO SIMZY
          </Title>
          <Form
            noValidate
            validated={validated}
            onSubmit={handleSubmit}
            style={{ margin: "30px" }}
          >
            <Form.Group
              controlId="validationCustom01"
              style={{ marginTop: "30px" }}
            >
              <Form.Label>
                <b>Email:</b>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your email"
                name="email"
                required
              />
              <Form.Control.Feedback type="invalid">
                {" "}
                Email is required
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group
              controlId="validationCustom02"
              style={{ marginTop: "30px" }}
            >
              <Form.Label>
                <b>Password:</b>{" "}
              </Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter your password"
                name="password"
                required
              />
              <Form.Control.Feedback type="invalid">
                {" "}
                Password is required{" "}
              </Form.Control.Feedback>
            </Form.Group>
            <Button
              className="d-block mx-auto w-75"
              type="submit"
              style={styles.customButton}
            >
              Submit
            </Button>
            <Text style={{ marginTop: "2%" }}>
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
