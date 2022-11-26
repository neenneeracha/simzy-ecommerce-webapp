import React, { useState } from "react";
import styled from "styled-components";
import Button from "react-bootstrap/Button";
import Sidebar from "../components/Sidebar";
import AdNavbar from "../components/AdNavbar";
import NewNav from "../components/NewNav";
import Backbtn from "../components/Backbtn";
import Form from "react-bootstrap/Form";
import { Col, Row } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import InputGroup from "react-bootstrap/InputGroup";

/* innital default value */
const initialFValues = {
  id: 0,
  productName: "",
  category: "",
  description: "",
  details: "",
  price: "",
  mainColor: "",
  image: "",
  size: "",
};

const Home = styled.div`
  max-width: 100%;
  overflow-x: hidden;
  background-color: #fff8f9;
`;

const Container = styled.div``;
const SizeContainer = styled.div`
  justify-content: space-between;
  display: flex;
  gap: 5%;
`;

const Top = styled.div`
  justify-content: space-between;
`;

const Image = styled.img`
  height: 150px;
  width: 150px;
`;
const ImageContainer = styled.div`
  align-items: center;
  margin: 8%;
`;
const ButtonGroup = styled.div`
  display: flex;
`;
const Title = styled.h2`
  width: 100%;
  color: black;
  margin: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Buttom = styled.div``;

const NewProduct = ({ inputs }) => {
  const [values, setValues] = useState(initialFValues);
  const [validated, setValidated] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  const resetForm = () => {
    setValues(initialFValues);
    setErrors({});
  };
  return (
    <Home>
      <NewNav />
      <Container>
        <Top>
          <Backbtn />
          <Title>Add New Product</Title>
        </Top>
        <Buttom>
          <Row>
            <Col></Col>
            <Col xs={9}>
              <Form
                noValidate
                style={{ marginRight: "30px" }}
                validated={validated}
                onSubmit={handleSubmit}
              >
                <Row>
                  <Form.Group
                    className="d-block mx-auto w-50"
                    controlId="validationCustom01"
                    style={{ marginTop: "30px" }}
                  >
                    <Form.Label>
                      <b>Product Name: </b>
                    </Form.Label>

                    <Form.Control type="text" name="productName" required />
                    <Form.Control.Feedback type="invalid">
                      {" "}
                      Product Name is required
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group
                    className="d-block mx-auto w-50 mb-3"
                    controlId="category"
                    style={{ marginTop: "30px" }}
                  >
                    <Form.Label>
                      <b>Category: </b>{" "}
                    </Form.Label>
                    <Form.Control type="text" name="category" required />
                  </Form.Group>
                </Row>

                <Row>
                  <Form.Group className="mb-3" controlId="description">
                    <Form.Label>
                      <b>Description:</b>{" "}
                    </Form.Label>
                    <Form.Control as="textarea" rows={3} required />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="details">
                    <Form.Label>
                      <b>Details:</b>
                    </Form.Label>
                    <Form.Control as="textarea" rows={3} required />
                  </Form.Group>
                </Row>
                <Row>
                  <Form.Group
                    className="d-block mx-auto w-100 mb-3"
                    controlId="price"
                  >
                    <Form.Label>
                      <b>Price: </b>
                    </Form.Label>
                    <Form.Control type="text" name="price" required />
                    <Form.Control.Feedback type="invalid">
                      {" "}
                      Price is required
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>
                <Form.Group
                  className="d-block mx-auto w-100 mb-3"
                  controlId="mainColor"
                >
                  <Form.Label>
                    <b>Color: </b>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your first name"
                    name="mainColor"
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    {" "}
                    First Name is required
                  </Form.Control.Feedback>
                </Form.Group>
              </Form>
              <ImageContainer>
                {/* <Image
                  src={
                    file
                      ? URL.createObjectURL(file)
                      : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                  }
                  alt=""
                ></Image>
                Upload <MDBIcon fas icon="cloud-upload-alt" />{" "}
                <input
                  type="file"
                  onChange={(e) => setFile(e.target.files[3])}
                  style={Styles.UploadFile}
                /> */}

                <Card className="text-center">
                  <Card.Header style={{ backgroundColor: "#FFF3F6" }}>
                    Upload Picture
                  </Card.Header>
                  <Card.Body>
                    {/* <Card.Title>Special title treatment</Card.Title>
                    <Card.Text>
                      With supporting text below as a natural lead-in to
                      additional content.
                    </Card.Text> */}
                    <Form.Group controlId="formFileMultiple" className="mb-3">
                      <Form.Label> Up to 5 Pictures </Form.Label>
                      <Form.Control type="file" multiple />
                    </Form.Group>
                    {/* <Button variant="primary">Go somewhere</Button> */}
                  </Card.Body>
                  {/* <Card.Footer>
                    {" "}
                    <Image
                      src= ""
                      alt=""
                    />{" "}
                  </Card.Footer> */}
                </Card>
              </ImageContainer>
              <SizeContainer>
                <Form.Label>
                  <b>Size Information: </b>
                </Form.Label>
                <Col>
                  {" "}
                  <Row>
                    <InputGroup className="mx-auto w-100 mb-3">
                      <InputGroup.Text id="size">XS</InputGroup.Text>
                      <Form.Control
                        placeholder="Quantity"
                        aria-label="Quantity"
                        aria-describedby="size"
                        required
                      />
                    </InputGroup>

                    <InputGroup className="mx-auto w-100 mb-3">
                      <InputGroup.Text id="size">S</InputGroup.Text>
                      <Form.Control
                        placeholder="Quantity"
                        aria-label="Quantity"
                        aria-describedby="size"
                        required
                      />
                    </InputGroup>

                    <InputGroup className="mx-auto w-100 mb-3">
                      <InputGroup.Text id="size">M</InputGroup.Text>
                      <Form.Control
                        placeholder="Quantity"
                        aria-label="Quantity"
                        aria-describedby="size"
                        required
                      />
                    </InputGroup>
                  </Row>
                </Col>
                <Col>
                  <Row>
                    <InputGroup className="mx-auto w-100 mb-3">
                      <InputGroup.Text id="size">L</InputGroup.Text>
                      <Form.Control
                        placeholder="Quantity"
                        aria-label="Quantity"
                        aria-describedby="size"
                        required
                      />
                    </InputGroup>
                    <InputGroup className="mx-auto w-100 mb-3">
                      <InputGroup.Text id="size">XL</InputGroup.Text>
                      <Form.Control
                        placeholder="Quantity"
                        aria-label="Quantity"
                        aria-describedby="size"
                        required
                      />
                    </InputGroup>
                  </Row>
                </Col>
              </SizeContainer>
            </Col>
            <Col></Col>
            <ButtonGroup>
              <Button
                variant="outline-secondary"
                type="reset"
                className="d-block mx-auto w-25"
                style={{ margin: "20px" }}
                onClick={resetForm}
              >
                Rsest
              </Button>
              <Button
                variant="dark"
                type="submit"
                className="d-block mx-auto w-25"
                style={{ margin: "20px" }}
              >
                Submit
              </Button>
            </ButtonGroup>
          </Row>
        </Buttom>
      </Container>
    </Home>
  );
};

export default NewProduct;
