import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

const PasswordModal = ({show, handleChange}) => {
    
    return (
        <>    
          <Modal
            show={show}
            onHide={() => handleChange(false)}
            dialogClassName="modal-90w"
            aria-labelledby="example-custom-modal-styling-title"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title id="example-custom-modal-styling-title">
                Change Password
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Current Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Please enter your current password"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Please enter your new password"
                autoFocus
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleChange(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleChange(false)}>
            Save Changes
          </Button>
        </Modal.Footer>
          </Modal>
        </>
      );
}

export default PasswordModal