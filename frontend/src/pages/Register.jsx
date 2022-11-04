import React, { useState } from "react";
import { Col, Image, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Navbar from "../components/Navbar";
import styled from "styled-components";
import Button from "react-bootstrap/Button";
import BackBtn from "../components/BackBtn";
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
      <BackBtn/>
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
            WELCOME TO SIMZY!
          </Title>
          <Form noValidate validated={validated} onSubmit={handleSubmit} style = {{margin: "30px"}}>
            
            <Form.Group className="d-block mx-auto w-50" controlId="validationCustom01" style={{ marginTop: "30px" }} >
              <Form.Label><b>First Name:</b></Form.Label>
              <Form.Control type="text" placeholder="Enter your first name" name = "firstname"  required />
              <Form.Control.Feedback type="invalid"> Please provide your first name</Form.Control.Feedback>
            </Form.Group>

              <Form.Group className="d-block mx-auto w-50" controlId="validationCustom02" style={{ marginTop: "30px" }} >
              <Form.Label><b>Last Name:</b> </Form.Label>
              <Form.Control type="text" placeholder="Enter your last name" name = "lastname" required />
              <Form.Control.Feedback type="invalid"> Please provide your last name </Form.Control.Feedback>
            </Form.Group>


           <Form.Group className="d-block mx-auto w-50" controlId="email" style={{ marginTop: "30px" }} >
              <Form.Label><b>Email: </b></Form.Label>
              <Form.Control type="text" placeholder="Enter your email" name = "email" required />
              <Form.Control.Feedback type="invalid"> Please provide your email </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="d-block mx-auto w-50" controlId="validationCustom03" style={{ marginTop: "30px" }} >
              <Form.Label><b>Password:</b> </Form.Label>
              <Form.Control type="password" placeholder="Password" name = "password"  required />
              <Form.Control.Feedback type="invalid"> Please provide a valid state </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="d-block mx-auto w-50" controlId="validationCustom04" style={{ marginTop: "30px", marginBottom: "30px" }} >
              <Form.Label><b>Address:</b> </Form.Label>
              <Form.Control as="textarea" rows={3} placeholder="Enter your Address" name = "address"  required />
              <Form.Control.Feedback type="invalid"> Please provide a valid state </Form.Control.Feedback>
            </Form.Group>

            
            <Button className="d-block mx-auto w-50" type="submit" style={styles.customButton}>Submit form</Button>
            <Text style={{ marginTop: "2%" }} type="submit" >Already have an account? &nbsp;
            <Link style={{ textDecoration: "none" }} to="/login">
              <LinkItem>CREATE NOW</LinkItem>
            </Link>
            </Text>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
