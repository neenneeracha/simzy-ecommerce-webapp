/********************************************************************
 *
 * Checkout.jsx
 *
 *    This file represents the checkout page of SIMZY
 *    which is used to get the shipping details and payment method
 *    of the user, as well as display the order summary
 *
 ********************************************************************
 */

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Accordion from "react-bootstrap/Accordion";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../redux/cartRedux";
import { useUser } from "../../UserContext";
import Cookie from "js-cookie";

const Container = styled.div`
  min-height: 100vh;
  position: relative;
`;

const Wrapper = styled.div`
  padding: 20px;

  .accordion-button:not(.collapsed) {
    color: #ffffff;
    background-color: #eda3b5;
  }

  .accordion-button:not(.collapsed)::after {
    background-image: url("data:image/svg+xml,%3csvg 
    xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' 
    fill='%23ffffff'%3e%3cpath fill-rule='evenodd' d='M1.646 
    4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 
    .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z
    '/%3e%3c/svg%3e");
  }
`;

const Title = styled.h1`
  font-weight: 500;
  text-align: center;
  margin: 2%;
  color: #eda3b5;
`;

const Summary = styled.div`
  flex: 1;
  border-radius: 10px;
  background-color: #fbfbfb;
  padding: 20px;
  margin-top: 4%;
`;

const SummaryTitle = styled.h3`
  font-weight: bold;
`;

const SummaryItem = styled.div`
  margin: 30px 30px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const ButtonGroup = styled.div`
  margin-top: 40px;
`;

const Text = styled.div`
  text-align: center;
  cursor: pointer;
  color: gray;

  &:hover {
    color: #eda3b5;
    text-decoration: underline;
  }
`;

const FieldName = styled.b``;
const Description = styled.span`
  font-size: 14px;
`;

const ButtonCheck = styled.h3`
  text-align: center;
  color: gray;
  font-size: 20px;
  padding: 10px 60px;
  border-radius: 5px;
  border: 2px solid gray;
  margin: 20px auto;
  cursor: pointer;
  font-weight: 500;
  width: 80%;

  &:hover {
    color: white;
    background-color: black;
    border: 2px solid black;
  }
`;

const ErrorMessage = styled.span`
  color: #dc3545;
  font-size: 17px;
`;

const Checkout = () => {
  const [address, setAddress] = useState([]);
  const [errors, setErrors] = useState({});
    const [inputs, setInputs] = useState({
    name: "",
    surname: "",
    address: "",
    district: "",
    province: "",
    zipCode: "",
    phoneNumber: "",
    payment: "",
  });
  const navigate = useNavigate();
  const user = useUser();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const fontSize = useSelector((state) => state.fontSize);

  // used to get the user's registered address
  useEffect(() => {
    const getAddress = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8080/api/v1/user/address/" + user.user_id
        );
        setAddress(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getAddress();
  }, [user.user_id]);

  // handle user-entered addresses
  const handleAddress = () => {
    setInputs((prev) => ({ ...prev, name: address[0].name }));
    if (!!errors.name) {
      setErrors((prev) => ({ ...prev, name: null }));
    }
    setInputs((prev) => ({ ...prev, surname: address[0].surname }));
    if (!!errors.surname) {
      setErrors((prev) => ({ ...prev, surname: null }));
    }
    setInputs((prev) => ({ ...prev, address: address[0].address }));
    if (!!errors.address) {
      setErrors((prev) => ({ ...prev, address: null }));
    }
    setInputs((prev) => ({ ...prev, district: address[0].district }));
    if (!!errors.district) {
      setErrors((prev) => ({ ...prev, district: null }));
    }
    setInputs((prev) => ({ ...prev, province: address[0].province }));
    if (!!errors.province) {
      setErrors((prev) => ({ ...prev, province: null }));
    }
    setInputs((prev) => ({ ...prev, zipCode: address[0].zip_code }));
    if (!!errors.zipCode) {
      setErrors((prev) => ({ ...prev, zipCode: null }));
    }
    setInputs((prev) => ({ ...prev, phoneNumber: address[0].phone_number }));
    if (!!errors.phoneNumber) {
      setErrors((prev) => ({ ...prev, phoneNumber: null }));
    }
  };

  // used to set a new state for the input
  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));

    if (!!errors[e.target.name]) {
      setErrors((prev) => ({ ...prev, [e.target.name]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (inputs.name.split(" ").join("").length < 1) {
      newErrors.name = "Please provide firstname";
    } else if (
      !Boolean(
        inputs.name
          .split(" ")
          .join("")
          .match(/^[A-Za-z]*$/)
      )
    ) {
      newErrors.name = "Firstname should contain only letters";
    }
    if (inputs.surname.split(" ").join("").length < 1) {
      newErrors.surname = "Please provide surname";
    } else if (
      !Boolean(
        inputs.surname
          .split(" ")
          .join("")
          .match(/^[A-Za-z]*$/)
      )
    ) {
      newErrors.surname = "Lastname should contain only letters";
    }
if (inputs.payment.split(" ").join("").length < 1) {
      newErrors.payment = "Please select payment type";
    }
    if (inputs.phoneNumber.split(" ").join("").length < 1) {
      newErrors.phoneNumber = "Please provide phone number";
    } else if (
      !Boolean(
        inputs.phoneNumber
          .split(" ")
          .join("")
          .match(/^[0-9]*$/)
      )
    ) {
      newErrors.phoneNumber = "Phone number should contain only numbers";
    } else if (inputs.phoneNumber.split(" ").join("").length > 10) {
      newErrors.phoneNumber = "Phone number should not exceed 10 digits";
    } else if (inputs.phoneNumber.split(" ").join("").length < 10) {
      newErrors.phoneNumber = "Phone number should be 10 digits";
    }
    if (inputs.address.split(" ").join("").length < 1) {
      newErrors.address = "Please provide address";
    }
    if (inputs.district.split(" ").join("").length < 1) {
      newErrors.district = "Please provide district";
    } else if (
      !Boolean(
        inputs.district
          .split(" ")
          .join("")
          .match(/^[A-Za-z]*$/)
      )
    ) {
      newErrors.district = "District should contain only letters";
    }
    if (inputs.province.split(" ").join("").length < 1) {
      newErrors.province = "Please provide province";
    } else if (
      !Boolean(
        inputs.province
          .split(" ")
          .join("")
          .match(/^[A-Za-z]*$/)
      )
    ) {
      newErrors.province = "Province should contain only letters";
    }
    if (inputs.zipCode.split(" ").join("").length < 1) {
      newErrors.zipCode = "Please provide zipcode";
    }

    return newErrors;
  };

  // gets the current value of state
  const handleSubmit = async () => {
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
    if (inputs.payment === "1") {
      // cash on delivery
      try {
        let res = await axios.post("http://localhost:8080/api/v1/payment/new", {
          payment: inputs.payment,
          status: "0",
        });
        const payment_id = res.data.insertId;

        res = await axios.post("http://localhost:8080/api/v1/order/neworder", [
          inputs,
          { user_id: user.user_id, payment_id: payment_id },
        ]);
        const order_id = res.data.insertId;

        res = await axios.post(
          "http://localhost:8080/api/v1/order/orderhistory",
          [cart.products, { order_id: order_id }]
        );
        dispatch(clearCart());
        Cookie.set("orderID", order_id, { path: "/", expires: 2 / (24 * 60) });
        navigate("/success");
      } catch (error) {
        console.log(error);
      }
    } else if (inputs.payment === "2") {
      // card payment
      try {
        const res = await axios.post(
          "http://localhost:8080/api/v1/payment/stripe",
          { amount: cart.cartTotalAmount + 90, email: address[0].email, inputs }
        );
        if (res.data.url) {
          window.location.href = res.data.url;
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("Please select payment type first!");
    }
  }
  };

  // handle with back button action
  const handleClick = () => {
    window.history.back();
  };

  return (
    <Container>
      <Navbar />
      <Wrapper>
        <Title style={{ fontSize: `${36 + fontSize.fontSize}px` }}>
          CHECK OUT
        </Title>
        <Row>
          <Col xs={12} md={8}>
            {" "}
            <Accordion
              defaultActiveKey={["0"]}
              alwaysOpen
              style={{
                margin: "2% 3%",
                fontSize: `${18 + fontSize.fontSize}px`,
              }}
            >
              <Accordion.Item eventKey="0">
                <Accordion.Header>
                  <b style={{ fontSize: `${20 + fontSize.fontSize}px` }}>
                    SHIPPING DETAILS
                  </b>
                </Accordion.Header>
                <Accordion.Body>
                  <Row>
                    <Col>
                      <Form
                        style={{
                          margin: "0px 50px",
                          fontSize: `${20 + fontSize.fontSize}px`,
                        }}
                      >
                        <Row>
                          <Form.Group
                            className="d-block mx-auto w-50"
                            controlId="validationCustom01"
                            style={{ marginTop: "30px", marginBottom: "20px" }}
                          >
                            <Form.Label>
                              <FieldName>First Name: </FieldName>
                              <Description> (only characters are allowed)</Description>
                            </Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Enter your first name"
                              name="name"
                              required
                              onChange={handleChange}
                              value={inputs.name}
                              isInvalid={!!errors.name}
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.name}
                            </Form.Control.Feedback>
                          </Form.Group>

                          <Form.Group
                            className="d-block mx-auto w-50"
                            controlId="validationCustom02"
                            style={{ marginTop: "30px", marginBottom: "20px"  }}
                          >
                            <Form.Label>
                              <FieldName>Last Name: </FieldName>
                  <Description>(only characters are allowed)</Description>
                            </Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Enter your last name"
                              name="surname"
                              value={inputs.surname}
                              required
                              onChange={handleChange}
                              isInvalid={!!errors.surname}
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.surname}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Row>

                        <Form.Group
                          className="d-block mx-auto"
                          controlId="validationCustom01"
                          style={{ marginTop: "30px", marginBottom: "30px"  }}
                        >
                          <Form.Label>
                             <FieldName>Phone Number:</FieldName>
                          </Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter your phone number"
                            name="phoneNumber"
                            required
                            value={inputs.phoneNumber}
                            onChange={handleChange}
                            isInvalid={!!errors.phoneNumber}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.phoneNumber}
                          </Form.Control.Feedback>
                        </Form.Group>

                        <Row>
                          <Form.Group
                            className="d-block mx-auto w-50"
                            controlId="address"
                            style={{ marginTop: "30px", marginBottom: "20px"  }}
                          >
                            <Form.Label>
                              <FieldName>Address: </FieldName> <Description>(e.g., 126 Pracha Uthit Rd)</Description>
                            </Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Enter your address"
                              name="address"
                              value={inputs.address}
                              required
                              onChange={handleChange}
                              isInvalid={!!errors.address}
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.address}
                            </Form.Control.Feedback>
                          </Form.Group>

                          <Form.Group
                            className="d-block mx-auto w-50"
                            controlId="validationCustom03"
                            style={{ marginTop: "30px", marginBottom: "20px"  }}
                          >
                            <Form.Label>
                             <FieldName>District:</FieldName>
                            </Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Enter your district"
                              name="district"
                              value={inputs.district}
                              required
                              onChange={handleChange}
                              isInvalid={!!errors.district}
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.district}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Row>

                        <Row>
                          <Form.Group
                            className="d-block mx-auto w-50"
                            controlId="address"
                            style={{ marginTop: "30px", marginBottom: "20px"  }}
                          >
                            <Form.Label>
                              <FieldName>Province: </FieldName>
                            </Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Enter your province"
                              name="province"
                              value={inputs.province}
                              required
                              onChange={handleChange}
                               isInvalid={!!errors.province}
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.province}
                            </Form.Control.Feedback>
                          </Form.Group>

                          <Form.Group
                            className="d-block mx-auto w-50"
                            controlId="validationCustom03"
                            style={{ marginTop: "30px", marginBottom: "20px"  }}
                          >
                            <Form.Label>
                              <FieldName>Zipcode:</FieldName>
                            </Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Enter your Zipcode"
                              name="zipCode"
                              value={inputs.zipCode}
                              required
                              onChange={handleChange}
                              isInvalid={!!errors.zipCode}
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.zipCode}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Row>
                        <Text style={{ margin: "3%" }} onClick={handleAddress}>
                          Click here to use address from your profile
                        </Text>
                      </Form>
                    </Col>
                  </Row>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="0">
                <Accordion.Header>
                  <b style={{ fontSize: `${20 + fontSize.fontSize}px` }}>
                    PAYMENT METHOD
                  </b>
                </Accordion.Header>
                <Accordion.Body>
                  <Form>
                    <Form.Group style={{ margin: "20px 50px" }}>
                      <Form.Label style={{ marginBottom: "20px" }}>
                        Please Select a payment method
                      </Form.Label>
                      <Col style={{marginBottom: "15px"}}>
                        <Form.Check
                          name="payment"
                          label="Cash On Delivery"
                          value="1"
                          inline
                          type="radio"
                          onChange={handleChange}
                          style={{ marginRight: "5%" }}
                        />
                        <Form.Check
                          name="payment"
                          label="Credit/Debit Card"
                          value="2"
                          inline
                          type="radio"
                          onChange={handleChange}
                        />
                      </Col>
                      {errors.payment ? (
                  <ErrorMessage>{errors.payment}</ErrorMessage>
                ) : undefined}
                    </Form.Group>
                  </Form>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Col>
          <Col>
            <Summary>
              <SummaryTitle style={{ fontSize: `${28 + fontSize.fontSize}px` }}>
                ORDER SUMMARY
              </SummaryTitle>
              <SummaryItem>
                <SummaryItemText
                  style={{ fontSize: `${20 + fontSize.fontSize}px` }}
                >
                  Subtotal
                </SummaryItemText>
                <SummaryItemPrice
                  style={{ fontSize: `${20 + fontSize.fontSize}px` }}
                >
                  {cart.cartTotalAmount}
                </SummaryItemPrice>
              </SummaryItem>
              <SummaryItem>
                <SummaryItemText
                  style={{ fontSize: `${20 + fontSize.fontSize}px` }}
                >
                  Estimated Shipping
                </SummaryItemText>
                <SummaryItemPrice
                  style={{ fontSize: `${20 + fontSize.fontSize}px` }}
                >
                  ฿90
                </SummaryItemPrice>
              </SummaryItem>
              <SummaryItem type="total">
                <SummaryItemText
                  style={{ fontSize: `${28 + fontSize.fontSize}px` }}
                >
                  Total
                </SummaryItemText>
                <SummaryItemPrice
                  style={{ fontSize: `${28 + fontSize.fontSize}px` }}
                >
                  {cart.cartTotalAmount + 90}
                </SummaryItemPrice>
              </SummaryItem>
            </Summary>
            <ButtonGroup>
              <ButtonCheck onClick={handleSubmit}>
                {" "}
                <SummaryItemText
                  style={{ fontSize: `${20 + fontSize.fontSize}px` }}
                >
                  {" "}
                  CHECKOUT NOW
                </SummaryItemText>
              </ButtonCheck>

              <ButtonCheck onClick={handleClick}>
                {" "}
                <SummaryItemText
                  style={{ fontSize: `${20 + fontSize.fontSize}px` }}
                >
                  {" "}
                  BACK
                </SummaryItemText>
              </ButtonCheck>
            </ButtonGroup>
          </Col>
        </Row>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Checkout;
