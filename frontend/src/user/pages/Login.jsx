<<<<<<< HEAD
import React, { useState } from "react";
import { Col, Image, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import styled from "styled-components";
import Button from "react-bootstrap/Button";
import BackNavBar from "../components/BackNavBar";
import { Link, useNavigate } from "react-router-dom";
import { useUserUpdate } from "../../UserContext";
import axios from "axios";

const Container = styled.div`
  position: fixed;
`;
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
  const { setToken } = useUserUpdate();
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    // if (e.currentTarget.checkValidity() === false) {
    //   e.stopPropagation();
    // }
    // setValidated(true)
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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
    }
  };

  return (
    <Container>
      <BackNavBar />
      <Row>
        <Col xs={12} md={6}>
          <Image
            src={process.env.PUBLIC_URL + "img/login.png"}
            height="80%"
            width="80%"
            style={{ marginLeft: "10%", marginTop: "10%" }}
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
            style={{ margin: "30px 100px" }}
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
                onChange={handleChange}
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
                onChange={handleChange}
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
=======
import React, { useState } from "react";
import { Col, Image, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import styled from "styled-components";
import Button from "react-bootstrap/Button";
import BackNavBar from "../components/BackNavBar";
import { Link, useNavigate } from "react-router-dom";
import { useUserUpdate } from "../../UserContext";
import axios from "axios";
import ErrorAlert from "../components/ErrorAlert";

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
  const { setToken } = useUserUpdate();
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState({
    title: "",
    message: "",
  });

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    const checkEmail = inputs.email.split(' ').join('').length < 1
    const checkPassword = inputs.password.split(' ').join('').length < 1
    
    if (checkEmail && checkPassword) {
      setError((prev) => ({ ...prev, title: "Invalid Input", message: "Email and Password cannot be blank, please try again!"}));
      setShow(true);
    } else if (checkEmail) {
      setError((prev) => ({ ...prev, title: "Invalid Input", message: "Email cannot be blank, please try again!"}));
      setShow(true);
    } else if (checkPassword) {
      setError((prev) => ({ ...prev, title: "Invalid Input", message: "Password cannot be blank, please try again!"}));
      setShow(true);
    } else {
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
        setError((prev) => ({ ...prev, title: "Wrong Credentials", message: err.response.data.msg}));
        setShow(true);
      }
    }
    
  };

  return (
    <Container>
      <BackNavBar />
      {
        show ? <ErrorAlert show={show} setShow={setShow} error={error} setError={setError} />
        : undefined
      }
      <Row>
        <Col xs={12} md={6}>
          <Image
            src={process.env.PUBLIC_URL + "img/login.png"}
            height="80%"
            width="80%"
            style={{ marginLeft: "10%", marginTop: "10%", objectFit: "cover" }}
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
            style={{ margin: "30px 100px" }}
          >
            <Form.Group
              controlId="emailInput"
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
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group
              controlId="passwordInput"
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
                onChange={handleChange}
              />
            </Form.Group>
            <Button
              className="d-block mx-auto w-75"
              style={styles.customButton}
              onClick={handleSubmit}
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
>>>>>>> dead63f83451be9835834e2b5d9a6eeb7a78205b
