import React, { useState } from "react";

import { Link } from "react-router-dom";
import styled from "styled-components";
import NavbarAd from "../components/NavbarAd";
import Controls from "./../components/controls/Controls";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import PopUp from "../components/PopUp";
import { Col, Image, Row } from "react-bootstrap";
import VisibilityIcon from "@material-ui/icons/Visibility";
import ProductForm from "../components/ProductForm";

const SuccessAlert = styled.div`
  padding: 50px;
  margin: 3% 0;
`;
const Text = styled.h3`
  text-align: center;
  margin-top: 50px;
  color: #299f00;
`;

const styles = {
  customButton: {
    backgroundColor: "#eda3b5",
    borderColor: "#eda3b5",
    color: "white",
    borderRadius: "5px",
    marginLeft: "40%",
  },
};
const Container = styled.div`
  max-width: 100%;
  overflow-x: hidden;
  background-color: #fff8f9;
`;
const Wrapper = styled.div``;
const ButtonGroup = styled.div`
  margin-top: 80px;
  margin-left: 60px;
`;

const SuccessProduct = () => {
  const [openPopup, setOpenPopup] = useState(false);
  return (
    <Container>
      <NavbarAd />
      <Wrapper>
        <Row>
          <Col></Col>
          <Col xs={7}>
            <SuccessAlert>
              <Image
                className="d-block mx-auto img-fluid w-25"
                src={process.env.PUBLIC_URL + "img/success.png"}
              />
              <Text>Added New Product!</Text>

              <ButtonGroup>
                <Link to="/viewproducts" style={{ textDecoration: "none" }}>
                  <Controls.Button
                    text="viewproduct"
                    color="primary"
                    startIcon={<VisibilityIcon />}
                  />
                </Link>

                <Controls.Button
                  text="Add more color"
                  startIcon={<AddCircleIcon />}
                  style={styles.customButton}
                  onClick={() => {
                    setOpenPopup(true);
                  }}
                />
              </ButtonGroup>
            </SuccessAlert>
          </Col>
          <Col></Col>
        </Row>
        <PopUp
          title="Product Form"
          openPopup={openPopup}
          setOpenPopup={setOpenPopup}
        >
          {" "}
          <ProductForm isMainColor={false} />{" "}
        </PopUp>
      </Wrapper>
    </Container>
  );
};

export default SuccessProduct;
