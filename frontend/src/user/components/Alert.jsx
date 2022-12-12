/********************************************************************
 *
 * Alert.jsx
 *
 *    This file represents the alert components
 *    use for display status messages like warnings, errors, 
 *    success messages, and information
 *
 ********************************************************************
 */

import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

// style the components
const Container = styled.div``;

const Alert = ({ show, setShow, text, setText }) => {
  const [color, setColor] = useState("black");
  const navigate = useNavigate();
  const fontSize = useSelector((state) => state.fontSize);

  // handle the type of alert
  useEffect(() => {
    const setMessageColor = () => {
      if (text.type === "error") {
        setColor("#BF0A30");
      }
      if (text.type === "success") {
        setColor("green");
      }
    };
    setMessageColor();
  }, [text.type]);

  // close the alert box
  const handleClose = () => {
    setText((prev) => ({
      ...prev,
      title: "",
      message: "",
      type: "",
      link: "",
    }));
    setShow(false);
  };

  // handle the OK button of the alert box
  const handleProceed = () => {
    if (text.link !== "") {
      setShow(false);
      navigate(text.link);
    } else {
      setText((prev) => ({
        ...prev,
        title: "",
        message: "",
        type: "",
        link: "",
      }));
      setShow(false);
    }
  };

  return (
    <Container>
      <Modal style={{ marginTop: "100px" }} show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title
            style={{
              fontWeight: "bold",
              color: color,
              fontSize: `${16 + fontSize.fontSize}px`,
            }}
          >
            {text.title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{
            margin: "10px auto",
            fontSize: `${16 + fontSize.fontSize}px`,
          }}
        >
          {text.message}
        </Modal.Body>
        <Modal.Footer>
          <Button
            style={{
              backgroundColor: "#eda3b5",
              borderColor: "#eda3b5",
              color: "white",
              borderRadius: "5px",
            }}
            onClick={handleProceed}
          >
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Alert;
