import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import styled from "styled-components";

const Container = styled.div`
  
`;

const Alert = ({ show, setShow, error, setError }) => {

  return (
    <Container>
        <Modal 
        style={{marginTop: "100px"}}
        show={show} 
        onHide={() => {
            setError((prev) => ({ ...prev, title: "", message: ""}));
            setShow(false);
            }}>
        <Modal.Header closeButton>
          <Modal.Title
          style={{fontWeight: "bold", color: "#BF0A30"}}
          >{error.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ margin: "10px auto"}}>{error.message}</Modal.Body>
        <Modal.Footer>
          <Button 
          style={{
            backgroundColor: "#eda3b5",
            borderColor: "#eda3b5",
            color: "white",
            borderRadius: "5px"
        }}
           onClick={() => {
            setError((prev) => ({ ...prev, title: "", message: ""}));
            setShow(false);
            }}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  )
}

export default Alert