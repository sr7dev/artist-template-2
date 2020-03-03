import React from "react";
import {Button, Modal, ModalBody} from "reactstrap";

function Confirmation({open, message, onRequestClose}) {
  return (
    <Modal className="modal-dialog" centered isOpen={open} toggle={onRequestClose}>
      <ModalBody>{message}</ModalBody>
      <Button
        color="dark"
        outline
        className="btn-pill artist-btn"
        onClick={onRequestClose}
      >
        Okay
      </Button>
    </Modal>
  );
}

export default Confirmation;
