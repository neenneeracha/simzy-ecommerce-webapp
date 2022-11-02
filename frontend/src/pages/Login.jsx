import React from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import BackBtn from "../components/BackBtn";
import { Col, Image, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";


const Container = styled.div``;

const Title = styled.h3`
  color: #eda3b5;
  text-align: center;
  font-weight: bold;
  font-size: 30px;
`;

const Text = styled.div`
    text-align: center;

  //   &:hover {
  //   color: #eda3b5;
  //   text-decoration: underline;
  // }
`;



const Button = styled.h3`
  text-align: center;
  color: #eda3b5;
  font-size: 20px;
  padding: 10px 60px;
  border-radius: 5px;
  border: 2px solid #eda3b5;
  margin: 10px 0px;
  cursor: pointer;
  font-weight: 500;


  &:hover {
    color: white; 
    background-color: #eda3b5;
    opacity: 0.7;
    // cursor: default;
  }
`;

const LinkItem = styled.span`
color: #EDA3B5;
text-decoration: underline;

&:hover {
  font-weight: bold;
  color: black;
}
`;


const Login = () => {
  return (
    <Container>
    {/* <Navbar /> */}
    <BackBtn/>
    <Row>
      <Col>
        <Image src={process.env.PUBLIC_URL+"img/login.png"} height = "100%" width= "100%" />
      </Col>
      <Col>
        {" "}
        <Title
          style={{ width: "80%", marginLeft: "10%", marginTop: "10%" }}
          className="center"
        >
          WELCOME TO SIMZY!
        </Title>
        <Form style={{ width: "80%", marginLeft: "10%", marginTop: "5%" }}>
          
          <Form.Group className="mb-3" controlId="email">
            <Form.Label >Email: </Form.Label>
            <Form.Control type="text" placeholder="Enter your email" />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password: </Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>

     
          <Button type="create" style = {{marginTop: "5%"}}>SIGN IN</Button>
          <Text style = {{marginTop: "5%"}}>NEED AN ACCOUNT? &nbsp;
          <Link style={{ textDecoration: "none" }} to="/register">
            <LinkItem>CREATE NOW</LinkItem>
          </Link>
          </Text>
        </Form>
      </Col>
    </Row>
  </Container>
  )
}

export default Login