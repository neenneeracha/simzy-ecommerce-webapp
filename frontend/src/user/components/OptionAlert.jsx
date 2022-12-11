import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  
`;

const OptionAlert = ({ show, setShow, text, setText }) => {
    const navigate = useNavigate();

    const handleClose = () => {
        setText((prev) => ({ ...prev, title: "", message: "", backBtn: "", proceedBtn: "", proceedLink: ""}));
        setShow(false);
    }

    const handleProceed = () => {
      setShow(false);
      navigate(text.proceedLink);
    }

  return (
    <Container>
        <Modal 
        size="lg"
        style={{marginTop: "100px"}}
        show={show} 
        onHide={handleClose}
        >
        <Modal.Header closeButton>
          <Modal.Title style={{fontWeight: "bold" }}>{text.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ margin: "10px auto", fontSize: "20px"}}>{text.message}</Modal.Body>
        <Modal.Footer>
          <Button style={{
            backgroundColor: "#9e9e9e",
            borderColor: "#9e9e9e",
            color: "white",
            borderRadius: "5px",
            marginLeft: "10px"
        }}
         onClick={handleClose}>
          {text.backBtn}
          </Button>
          <Button style={{
            backgroundColor: "#eda3b5",
            borderColor: "#eda3b5",
            color: "white",
            borderRadius: "5px",
            marginLeft: "10px"
        }}
         onClick={handleProceed}>
            {text.proceedBtn}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  )
}

export default OptionAlert