/********************************************************************
 *
 * SizeChartModal.jsx
 *
 *    This file represents the size information component 
 *    display the product's size detail
 * 
 ********************************************************************
 */

import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import styled from "styled-components";

const Container = styled.div``;

const Image = styled.img``;

const SizeChartModal = ({ show, onHide }) => {
  return (
    <Container>
      <Modal show={show} onHide={onHide} size="lg" centered>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body style={{ margin: "10px auto" }}>
          <Image
            src={process.env.PUBLIC_URL + "../img/size-chart.jpg"}
            alt=""
          />
        </Modal.Body>
        <Modal.Footer>
          <Button
            style={{
              backgroundColor: "#57574F",
              borderColor: "#57574F",
              color: "white",
              borderRadius: "5px",
            }}
            onClick={onHide}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default SizeChartModal;
