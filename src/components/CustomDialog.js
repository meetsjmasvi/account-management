import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

function CustomDialog(props) {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);

  return (
    <Modal
      centered
      show={props.show}
      animation={false}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{props.message}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}


export default CustomDialog;

