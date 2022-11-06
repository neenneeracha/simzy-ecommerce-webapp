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
  },
};

const Register = () => {
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
            height="80%"
            width="80%"
            style={{marginLeft: "10%", marginTop: "10%" }}
          />
        </Col>
        <Col>
          <Title
            style={{ width: "80%", marginLeft: "10%", marginTop: "10%" }}
            className="center"
          >
            WELCOME TO SIMZY!
          </Title>
          <Form
            noValidate
            validated={validated}
            onSubmit={handleSubmit}
            style={{ marginRight: "30px" }}
          >
            <Row>
              <Form.Group
                className="d-block mx-auto w-50"
                controlId="validationCustom01"
                style={{ marginTop: "30px" }}
              >
                <Form.Label>
                  <b>First Name:</b>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your first name"
                  name="firstname"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  {" "}
                  First Name is required
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group
                className="d-block mx-auto w-50"
                controlId="validationCustom02"
                style={{ marginTop: "30px" }}
              >
                <Form.Label>
                  <b>Last Name:</b>{" "}
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your last name"
                  name="lastname"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  {" "}
                  Last Name is required{" "}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row>
              <Form.Group
                className="d-block mx-auto w-50"
                controlId="email"
                style={{ marginTop: "30px", marginBottom: "30px" }}
              >
                <Form.Label>
                  <b>Email: </b>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your email"
                  name="email"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  {" "}
                  Please provide your email{" "}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group
                className="d-block mx-auto w-50"
                controlId="validationCustom03"
                style={{ marginTop: "30px" }}
              >
                <Form.Label>
                  <b>Password:</b>{" "}
                </Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  name="password"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  {" "}
                  Password is required{" "}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row></Row>
            <Form.Label>
              <b>Gender: </b>
            </Form.Label>
            {["radio"].map((type) => (
              <div key={`inline-${type}`} className="mb-3">
                <Form.Check
                  inline
                  label="Woman"
                  name="group1"
                  type={type}
                  id={`inline-${type}-1`}
                />
                <Form.Check
                  inline
                  label="Man"
                  name="group1"
                  type={type}
                  id={`inline-${type}-2`}
                />
                <Form.Check
                  inline
                  label="Other"
                  name="group1"
                  type={type}
                  id={`inline-${type}-1`}
                />
              </div>
            ))}

            <Row>
              <Form.Group className="d-block mx-auto w-50" controlId="address">
                <Form.Label>
                  <b>Address: </b>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your address"
                  name="address"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  {" "}
                  Address is required{" "}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group
                className="d-block mx-auto w-50"
                controlId="validationCustom03"
                style={{ marginBottom: "30px" }}
              >
                <Form.Label>
                  <b>District:</b>{" "}
                </Form.Label>
                <Form.Control
                  type="district"
                  placeholder="Enter your district"
                  name="district"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  {" "}
                  District is required{" "}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row>
              <Form.Group className="d-block mx-auto w-50" controlId="address">
                <Form.Label>
                  <b>Province: </b>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your province"
                  name="province"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  {" "}
                  Province is required{" "}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group
                className="d-block mx-auto w-50"
                controlId="validationCustom03"
                style={{ marginBottom: "30px" }}
              >
                <Form.Label>
                  <b>Zipcode:</b>{" "}
                </Form.Label>
                <Form.Control
                  type="Zipcode"
                  placeholder="Enter your Zipcode"
                  name="Zipcode"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  {" "}
                  Zipcode is required{" "}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Button
              className="d-block mx-auto w-75"
              type="submit"
              style={styles.customButton}
            >
              Submit
            </Button>
            <Text style={{ marginTop: "2%" }} type="submit">
              Already have an account? &nbsp;
              <Link style={{ textDecoration: "none" }} to="/login">
                <LinkItem>SIGN IN</LinkItem>
              </Link>
            </Text>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
