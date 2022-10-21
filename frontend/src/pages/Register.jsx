import React from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import { Col, Image, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";

const Container = styled.div``;

const Title = styled.h3`
  color: #eda3b5;
  text-align: center;
  font-weight: bold;
`;

const Text = styled.div`
    text-align: center;

    &:hover {
    color: #eda3b5;
    text-decoration: underline;
  }
`;

const Button = styled.h3`
  text-align: center;
  color: #eda3b5;
  font-size: 15px;
  padding: 10px 60px;
  border-radius: 5px;
  border: 1px solid #eda3b5;
  margin: 10px 0px;
  cursor: pointer;

  &:hover {
    color: white; 
    background-color: #eda3b5;
    opacity: 0.7;
    cursor: default;
  }
`;

const Register = () => {

  return (
    <Container>
      <Navbar />
      <Row>
      <Col>
        <Image src={process.env.PUBLIC_URL+"img/login.png"} height = "100%" width= "100%" />
      </Col>
        <Col>
          {" "}
          <Title
            style={{ width: "80%", marginLeft: "10%", marginTop: "10%" }}
            class="center"
          >
            WELCOME TO SIMZY!
          </Title>
          <Form style={{ width: "80%", marginLeft: "10%", marginTop: "5%" }}>
            <Form.Group className="mb-3" controlId="firstName" required>
              <Form.Label>First Name: </Form.Label>
              <Form.Control type="text" placeholder="Enter your first name" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="lastName">
              <Form.Label>Last Name: </Form.Label>
              <Form.Control type="text" placeholder="Enter your last name" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email: </Form.Label>
              <Form.Control type="text" placeholder="Enter your email" />
              {/* <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text> */}
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password: </Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="text">
              <Form.Label>Address: </Form.Label>
              <Form.Control type="text" placeholder="Enter your Address" />

              <Form.Group className="mb-3" controlId="formBasicCheckbox" style = {{marginTop: "5%", marginBottom: "5%"}}>
              <Form.Check type="checkbox" label="I have read the policy" />
            </Form.Group>

            </Form.Group>

            <Button type="create" style = {{marginTop: "5%"}}>CREATE NEW ACCOUNT</Button>
            <Text style = {{marginTop: "5%"}}>Already have an account? </Text>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
