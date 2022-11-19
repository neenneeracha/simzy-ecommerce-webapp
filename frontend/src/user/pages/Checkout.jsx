import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Accordion from "react-bootstrap/Accordion";
import Shipping from "../components/Shipping";
import Form from "react-bootstrap/Form";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import { useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import { MDBIcon  } from "mdb-react-ui-kit";
import { useUser } from "../../UserContext";
const publishableKey =
  "pk_test_51LchXIApEdj0AcTgW6ZKmx7Kt6z9i7Yz2FePwNv3GDXg4fv8ziF1lMFVJZIffoZUC9N1Zf1BV4orEBzsd9BovjoE00Dm08fmgu";

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

const CashText = styled.span`
  font-size: 16px;
  color: red;
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

const Checkout = () => {
  const [inputs, setInputs] = useState({
    name: "",
    surname: "",
    address: "",
    district: "",
    province: "",
    zipCode: "",
    phoneNumber: "",
    payment: ""
  });
  const [address, setAddress] = useState([]);


  const navigate = useNavigate();
  const user = useUser();

  useEffect(() => {

    const getAddress = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8080/api/v1/user/address/" + user.user_id
        );
        setAddress(res.data)
      } catch (error) {
        console.log(error)
      }
    };
    getAddress();
  }, [user.user_id]);

const handleAddress = () => {
    setInputs((prev) => ({ ...prev, name: address[0].name}))
    setInputs((prev) => ({ ...prev, surname: address[0].surname}))
    setInputs((prev) => ({ ...prev, address: address[0].address}))
    setInputs((prev) => ({ ...prev, district: address[0].district}))
    setInputs((prev) => ({ ...prev, province: address[0].province}))
    setInputs((prev) => ({ ...prev, zipCode: address[0].zip_code}))
    setInputs((prev) => ({ ...prev, phoneNumber: address[0].phone_number}))
}


  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  console.log(inputs)

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const res = await axios.post("http://localhost:8080/api/v1/auth", inputs);

  //     console.log(res.data);
  //     navigate("/login");
  //     window.location.reload();
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const onToken = async (token) => {
    try {
      const res = await axios.post("http://localhost:8080/api/v1/payment", {
        tokenId: token.id,
        amount: 2000,
      });
      if (res.data.url) {
        window.location.href = res.data.url;
        //navigate("/success", {state: {data: 1}})
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleClick = () => {
    window.history.back();
  };
  const { cartTotalAmount } = useSelector((state) => state.cart);
  return (
    <Container>
      <Navbar />
      <Wrapper>
        <Title>CHECK OUT</Title>
        <Row>
          <Col xs={12} md={8}>
            {" "}
            <Accordion defaultActiveKey={['0']} alwaysOpen style={{ margin: "2% 3%" }}>
              <Accordion.Item eventKey="0">
                <Accordion.Header>
                  <b>SHIPPING DETAILS</b>
                </Accordion.Header>
                <Accordion.Body>
                <Row>
        <Col>
          <Form
            style={{ margin: "0px 50px" }}
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
                  name="name"
                  value={inputs.name}
                  required
                  onChange={handleChange}
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
                  name="surname"
                  value={inputs.surname}
                  required
                  onChange={handleChange}
                />
                <Form.Control.Feedback type="invalid">
                  {" "}
                  Last Name is required{" "}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            
            <Form.Group
              className="d-block mx-auto"
              controlId="validationCustom01"
              
            >
              <Form.Label style={{ marginTop: "30px" }}>
                <b>Phone Number:</b>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your phone number"
                name="phoneNumber"
                required
                value={inputs.phoneNumber}
                style={{ marginBottom: "30px" }}
                onChange={handleChange}
              />
              <Form.Control.Feedback type="invalid">
                {" "}
                Phone Number is required
              </Form.Control.Feedback>
            </Form.Group>

            <Row>
              <Form.Group className="d-block mx-auto w-50" controlId="address">
                <Form.Label>
                  <b>Address: </b>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your address"
                  name="address"
                  value={inputs.address}
                  required
                  onChange={handleChange}
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
                  value={inputs.district}
                  required
                  onChange={handleChange}
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
                  value={inputs.province}
                  required
                  onChange={handleChange}
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
                  name="zipCode"
                  value={inputs.zipCode}
                  required
                  onChange={handleChange}
                />
                <Form.Control.Feedback type="invalid">
                  {" "}
                  Zipcode is required{" "}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Text style={{ margin: "2%" }} onClick={handleAddress}>
              Click here to use address from your profile
            </Text>
          </Form>
        </Col>
      </Row>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="0">
                <Accordion.Header>
                  <b>PAYMENT METHOD</b>
                </Accordion.Header>
                <Accordion.Body>
                 <Form>
                  <Form.Group style={{ margin: "20px 50px" }}>
                    <Form.Label style={{ marginBottom: "20px" }}>Please Select a payment method</Form.Label>
                    <Col>
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
                    

                    
                  </Form.Group>
                  </Form>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Col>
          <Col>
            <Summary>
              <SummaryTitle>ORDER SUMMARY</SummaryTitle>
              <SummaryItem>
                <SummaryItemText>Subtotal</SummaryItemText>
                <SummaryItemPrice>{cartTotalAmount}</SummaryItemPrice>
              </SummaryItem>
              <SummaryItem>
                <SummaryItemText>Estimated Shipping</SummaryItemText>
                <SummaryItemPrice>฿90</SummaryItemPrice>
              </SummaryItem>
              <SummaryItem type="total">
                <SummaryItemText>Total</SummaryItemText>
                <SummaryItemPrice>{cartTotalAmount + 90}</SummaryItemPrice>
              </SummaryItem>
            </Summary>
            <ButtonGroup>
            <ButtonCheck >CHECKOUT NOW</ButtonCheck>
              
              <ButtonCheck onClick={handleClick}> BACK</ButtonCheck>
            </ButtonGroup>
          </Col>
        </Row>
        {/* <StripeCheckout
          name="Simzy"
          description="Your total is 2000 THB"
          email="hi@gmail.com"
          amount={2000}
          token={onToken}
          stripeKey={publishableKey}
        > */}
        {/* <ButtonGroup>
          <Button
            className="d-block mx-auto w-25"
            type="submit"
            style={styles.customButton}
            onClick={handleClick}
          >
            <MDBIcon fas icon="fas fa-backward" style={{ marginRight: "10px" }} />{" "}
            BACK
          </Button>
          
          <Button  className="d-block mx-auto w-25"
            type="submit"
            style={styles.customButton}  
            onClick={onToken}>
            CONTINUE
            {"  "} <MDBIcon fas icon="fas fa-forward" style={{ marginLeft: "10px" }} />
          </Button>
        </ButtonGroup> */}

        {/* </StripeCheckout> */}
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Checkout;
