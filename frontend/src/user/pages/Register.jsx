import React, { useState } from "react";
import { Col, Image, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import styled from "styled-components";
import Button from "react-bootstrap/Button";
import BackNavBar from "../components/BackNavBar";
import { Link } from "react-router-dom";
import Alert from "../components/Alert";
import axios from "axios";
import OptionAlert from "../components/OptionAlert";

const Container = styled.div`
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

const Radio = styled.div`
color: ${(props) => props.color};
`;

const ErrorMessage = styled.span`
color: #dc3545;
font-size: 14px;
`
const FieldName = styled.b`
  
`
const Description = styled.span`
font-size: 14px;
`
const styles = {
  customButton: {
    backgroundColor: "#eda3b5",
    borderColor: "#eda3b5",
    color: "white",
    borderRadius: "5px",
    marginTop: "3%"
  },
};

const Register = () => {
  const [show, setShow] = useState(false);
  const [text, setText] = useState({
    title: "",
    message: "",
    type: "",
    link: ""
  });
  const [errors, setErrors] = useState({});
  const [showOption, setShowOption] = useState({});
  const [inputs, setInputs] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    gender: "",
    address: "",
    district: "",
    province: "",
    zipCode: "",
    phoneNumber: "",
  });

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    
    if (!!errors[e.target.name]) {
      setErrors((prev) => ({ ...prev, [e.target.name]: null }));
    }
  };

  const validateForm = () => {
    
    const newErrors = {}
    if (inputs.firstname.split(' ').join('').length < 1) {
      newErrors.firstname = "Please provide firstname"
    } else if (!Boolean(inputs.firstname.split(' ').join('').match(/^[A-Za-z]*$/))) {
      newErrors.firstname = "Firstname should contain only letters"
    }
    if (inputs.lastname.split(' ').join('').length < 1) {
      newErrors.lastname = "Please provide lastname"
    } else if (!Boolean(inputs.lastname.split(' ').join('').match(/^[A-Za-z]*$/))) {
      newErrors.firstname = "Lastname should contain only letters"
    }
    if (inputs.email.split(' ').join('').length < 1) {
      newErrors.email = "Please provide email"
    } else if (!Boolean(inputs.email.match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    ))) {
      newErrors.email = "Please enter a valid email"
    }
    if (inputs.password.split(' ').join('').length < 1) {
      newErrors.password = "Please provide password"
    } else if (inputs.password.split(' ').join('').length < 6) {
      newErrors.password = "Password should be at least 6 characters long"
    }

    if (inputs.phoneNumber.split(' ').join('').length < 1) {
      newErrors.phoneNumber = "Please provide phone number"
    } else if (!Boolean(inputs.phoneNumber.split(' ').join('').match(/^[0-9]*$/))) {
      newErrors.phoneNumber = "Phone number should contain only numbers"
    } else  if (inputs.phoneNumber.split(' ').join('').length > 10) {
      newErrors.phoneNumber = "Phone number should not exceed 10 digits"
    } else if (inputs.phoneNumber.split(' ').join('').length < 10) {
      newErrors.phoneNumber = "Phone number should be 10 digits"
    }
    if (inputs.gender.split(' ').join('').length < 1) {
      newErrors.gender = "Please provide gender"
    }
    if (inputs.address.split(' ').join('').length < 1) {
      newErrors.address = "Please provide address"
    }
    if (inputs.district.split(' ').join('').length < 1) {
      newErrors.district = "Please provide district"
    } else if (!Boolean(inputs.district.split(' ').join('').match(/^[A-Za-z]*$/))) {
      newErrors.district = "District should contain only letters"
    }
    if (inputs.province.split(' ').join('').length < 1) {
      newErrors.province = "Please provide province"
    } else if (!Boolean(inputs.province.split(' ').join('').match(/^[A-Za-z]*$/))) {
      newErrors.province = "Province should contain only letters"
    }
    if (inputs.zipCode.split(' ').join('').length < 1) {
      newErrors.zipCode = "Please provide zipcode"
    }

    return newErrors;
  }
  

  const handleSubmit = async () => {
    const formErrors = validateForm()

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors)
    } else {
      try {
        await axios.post("http://localhost:8080/api/v1/auth", inputs);
        setText((prev) => ({ ...prev, title: "Success", message: "Your account has been created, please login", type: "success", link: "/login" }));
        setShow(true);
      } catch (err) {
        console.log(err);
        if (err.response.status !== 409) {
          setText((prev) => ({ ...prev, title: "Something went wrong", message: err.response.data.msg, type: "error"}));
          setShow(true);
        } else {
          const newText = {}
          newText.title = "Invalid Email"
          newText.message = err.response.data.msg
          newText.backBtn = "Continue registering"
          newText.proceedBtn = "Login now"
          newText.proceedLink = "/login"
          setShowOption(newText);
          setShow(true);
        }
      }
    }
  };


  return (
    <Container>
      <BackNavBar />
      {
        show ? 
        (showOption.title === undefined || showOption.title === "") ? 
        <Alert show={show} setShow={setShow} text={text} setText={setText} />
        : <OptionAlert show={show} setShow={setShow} text={showOption} setText={setShowOption} />
        : undefined
      }
      <Row >
        <Col xs={12} md={6}>
          <Image
            src={process.env.PUBLIC_URL + "img/register.png"}
            height="80%"
            width="80%"
            style={{ marginLeft: "10%", marginTop: "10%", objectFit: "cover" }}
          />
        </Col>
        <Col style={{ marginRight: "5%" }}>
          <Title
            style={{ width: "80%", margin: "8% 10% 5%" }}
            className="center"
          >
            WELCOME TO SIMZY
          </Title>
          <Form
            style={{ marginRight: "50px" }}
          >
            <Row>
              <Form.Group
                className="d-block mx-auto w-50"
                controlId="firstname"
                style={{ marginBottom: "30px" }}
              >
                <Form.Label>
                  <FieldName>First Name:</FieldName> <Description>(only characters are allowed)</Description>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your first name"
                  name="firstname"
                  required
                  onChange={handleChange}
                  value={inputs.firstname}
                  isInvalid={!!errors.firstname}
                />
                <Form.Control.Feedback 
                style={{ maxWidth: "400px", margin: "0px 2px 10px"}}
                type="invalid">
                  {errors.firstname}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group
                className="d-block mx-auto w-50"
                controlId="lastname"
                style={{ marginBottom: "30px" }}
              >
                <Form.Label>
                  <FieldName>Last Name:</FieldName> <Description>(only characters are allowed)</Description>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your last name"
                  name="lastname"
                  required
                  onChange={handleChange}
                  value={inputs.lastname}
                  isInvalid={!!errors.lastname}
                />
                <Form.Control.Feedback 
                style={{ maxWidth: "400px", margin: "0px 2px 10px"}}
                type="invalid">
                  {errors.lastname}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row>
              <Form.Group
                className="d-block mx-auto w-50"
                controlId="email"
                style={{ marginBottom: "30px" }}
              >
                <Form.Label>
                  <FieldName>Email: </FieldName>
                </Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  name="email"
                  required
                  onChange={handleChange}
                  value={inputs.email}
                  isInvalid={!!errors.email}
                />
                <Form.Control.Feedback 
                style={{ maxWidth: "400px", margin: "0px 2px 10px"}}
                type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group
                className="d-block mx-auto w-50"
                controlId="password"
                style={{ marginBottom: "30px" }}
              >
                <Form.Label>
                  <FieldName>Password:</FieldName> <Description>(at least 6 characters long)</Description>
                </Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  name="password"
                  required
                  onChange={handleChange}
                  value={inputs.password}
                  isInvalid={!!errors.password}
                />
                <Form.Control.Feedback 
                style={{ maxWidth: "400px", margin: "0px 2px 10px"}}
                type="invalid">
                  {errors.password}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row>
            <Form.Group
              className="d-block mx-auto w-50"
              controlId="phoneNumber"
              style={{ marginBottom: "30px" }}
            >
              <Form.Label>
                <FieldName>Phone Number:</FieldName>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your phone number"
                name="phoneNumber"
                required
                onChange={handleChange}
                value={inputs.phoneNumber}
                  isInvalid={!!errors.phoneNumber}
              />
              <Form.Control.Feedback 
              style={{ maxWidth: "400px", margin: "0px 2px 10px"}}
              type="invalid">
                {errors.phoneNumber}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group
              className="d-block mx-auto w-50"
              controlId="gender"
              style={{ marginBottom: "20px" }}
            >
            <Form.Label style={{ paddingBottom: "10px" }}>
              <FieldName>Gender: </FieldName>
            </Form.Label>
            {["radio"].map((type) => (
              <Radio color={!!errors.gender? "#d9534f": "black"} key={`inline-${type}`} className="mb-3">
                <Form.Check
                  inline
                  label="Woman"
                  name="gender"
                  value="W"
                  type={type}
                  id={`inline-${type}-1`}
                  onChange={handleChange}
                />
                <Form.Check
                  inline
                  label="Man"
                  name="gender"
                  value="M"
                  type={type}
                  id={`inline-${type}-2`}
                  onChange={handleChange}
                />
                <Form.Check
                  inline
                  label="Other"
                  name="gender"
                  value="O"
                  type={type}
                  id={`inline-${type}-3`}
                  onChange={handleChange}
                />
              </Radio>    
            ))}
            {
              errors.gender ? 
              <ErrorMessage>{errors.gender}</ErrorMessage>
              :
              undefined
            }
            
            </Form.Group>
            </Row>
            

            <Row>
              <Form.Group 
              className="d-block mx-auto w-50" 
              controlId="address"
              style={{ marginBottom: "30px" }}>
                <Form.Label>
                  <FieldName>Address: </FieldName> <Description>(e.g., 126 Pracha Uthit Rd, Bang Mot)</Description>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your address"
                  name="address"
                  required
                  onChange={handleChange}
                  value={inputs.address}
                  isInvalid={!!errors.address}
                />
                <Form.Control.Feedback 
                style={{ maxWidth: "400px", margin: "0px 2px 10px"}}
                type="invalid">
                  {errors.address}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group
                className="d-block mx-auto w-50"
                controlId="district"
                style={{ marginBottom: "30px" }}
              >
                <Form.Label>
                  <FieldName>District:</FieldName>
                </Form.Label>
                <Form.Control
                  type="district"
                  placeholder="Enter your district"
                  name="district"
                  required
                  onChange={handleChange}
                  value={inputs.district}
                  isInvalid={!!errors.district}
                />
                <Form.Control.Feedback 
                style={{ maxWidth: "400px", margin: "0px 2px 10px"}}
                type="invalid">
                  {errors.district}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row>
              <Form.Group 
              className="d-block mx-auto w-50" 
              controlId="province"
              style={{ marginBottom: "30px" }}
              >
                <Form.Label>
                  <FieldName>Province: </FieldName>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your province"
                  name="province"
                  required
                  onChange={handleChange}
                  value={inputs.province}
                  isInvalid={!!errors.province}
                />
                <Form.Control.Feedback 
                style={{ maxWidth: "400px", margin: "0px 2px 10px"}}
                type="invalid">
                  {errors.province}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group
                className="d-block mx-auto w-50"
                controlId="zipCode"
                style={{ marginBottom: "30px" }}
              >
                <Form.Label>
                  <FieldName>Zipcode:</FieldName>
                </Form.Label>
                <Form.Control
                  type="Zipcode"
                  placeholder="Enter your Zipcode"
                  name="zipCode"
                  required
                  onChange={handleChange}
                  value={inputs.zipCode}
                  isInvalid={!!errors.zipCode}
                />
                <Form.Control.Feedback 
                style={{ maxWidth: "400px", margin: "0px 2px 10px"}}
                type="invalid">
                  {errors.zipCode}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Button
              className="d-block mx-auto w-75"
              style={styles.customButton}
              onClick={handleSubmit}
            >
              Submit
            </Button>
            <Text style={{ marginTop: "2%", marginBottom: "5%" }}>
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
