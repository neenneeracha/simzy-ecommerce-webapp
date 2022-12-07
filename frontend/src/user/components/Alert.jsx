import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  
`;

const Alert = ({ show, setShow, text, setText }) => {
  const [color, setColor] = useState("black");
  const navigate = useNavigate();

  useEffect(() => {
    const setMessageColor = () => {
      if (text.type === "error") {
        setColor("#BF0A30")
      } 
      if (text.type === "success") {
        setColor("green")
      }
    }
    setMessageColor()
  }, [text.type])

  const handleClose = () => {
      setText((prev) => ({ ...prev, title: "", message: "", type:"", link: ""}));
      setShow(false);
    }

  const handleProceed = () => {
    if (text.link !== "") {
      setShow(false);
      navigate(text.link);
    } else {
      setText((prev) => ({ ...prev, title: "", message: "", type:"", link: ""}));
      setShow(false);
    }
  }
  return (
    <Container>
        <Modal 
        style={{marginTop: "100px"}}
        show={show} 
        onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title
          style={{fontWeight: "bold", color: color}}
          >{text.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ margin: "10px auto"}}>{text.message}</Modal.Body>
        <Modal.Footer>
          <Button 
          style={{
            backgroundColor: "#eda3b5",
            borderColor: "#eda3b5",
            color: "white",
            borderRadius: "5px"
        }}
           onClick={handleProceed}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  )
}

export default Alert