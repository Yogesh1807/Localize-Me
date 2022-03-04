import React from "react";
// import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

function AlertModal(props) {
  const { show, handleShow } = props;

  const onOk = () => {
    handleShow(true);
  };
  const onCancel = () => {
    handleShow(false);
  };

  return (
    <Modal show={show} onHide={handleShow} animation={false}>
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="primary" onClick={onOk}>
          Ok
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AlertModal;
