/********************************************************************
 *
 * PasswordModal.jsx
 *
 *    This file represents the Edit Password component, which allows 
 *    the user to change a new password. This components can be 
 *    accessed from the profile page 
 *    
 ********************************************************************
 */

import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import styled from "styled-components";
import { useUser } from "../../UserContext";
import axios from "axios";
import { toast } from "react-toastify";

const styles = {
  customButton: {
    backgroundColor: "#eda3b5",
    borderColor: "#eda3b5",
    color: "white",
    borderRadius: "5px",
  },
};

const Container = styled.div``;

const PasswordModal = ({show, handleChange}) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const user = useUser();

  const handleSubmit = async () => {
    if (currentPassword.split(' ').join('').length < 1) {
      toast.error("Please enter your current password",
        {
          position: "top-center",
        }
      );
    } else if (newPassword.split(' ').join('').length < 1) {
       toast.error("Please enter your new password",
        {
          position: "top-center",
        }
      );
    } else if (currentPassword === newPassword) {
      toast.error("You entered the same password for both fields !!",
        {
          position: "top-center",
        }
      );
    } else if (newPassword.split(' ').join('').length < 6) {
      toast.error("Password should be at least 6 characters long",
        {
          position: "top-center",
        }
      );
    } else {
      try {
        const res = await axios.patch("http://localhost:8080/api/v1/user/update-password/" + user.user_id, {
          currentPW: currentPassword,
          newPW: newPassword
        });
      
        if (res.status === 200) {
           toast.success(res.data.msg,
        {
          position: "top-center",
        }
      );
          handleChange(false)
        }
      } catch (err) {
      if (err.request.status === 403) {
          toast.error(err.response.data.msg, {
            position: "top-center",
          });
        } else {
          toast.error("Something went wrong, please try again !!", {
            position: "top-center",
          });
        }
        console.log(err);
      }
    }
  };

    return (
        <Container>    
          <Modal
            show={show}
            onHide={() => {
              toast.dismiss();
              handleChange(false)
            }}
            dialogClassName="modal-90w"
            aria-labelledby="passwordModal"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title id="modalTitle">
                Change Password
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formCurrentPassword">
              <Form.Label style={{ color: 'black' }}>Current Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Please enter your current password"
                style={{ marginBottom: "25px" }}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
            </Form.Group>
            
            <Form.Group className="mb-3" controlId="formNewPassword">
              <Form.Label style={{ color: 'black' }}>New Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Please enter your new password"
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => {
              toast.dismiss();
              handleChange(false)
            }}>
            Close
          </Button>
          <Button style={styles.customButton} onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
          </Modal>
        </Container>
      );
}

export default PasswordModal