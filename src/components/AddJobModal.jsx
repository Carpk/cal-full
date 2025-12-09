import React, { useState } from 'react';

import { Modal, Button } from 'react-bootstrap';




export default function AddJobModal({ showAddJobs, handleClose, eventData, onDataReceived}) {
const dataToSend = "Hello from child!";

  const handleSubmit = () => {
    onDataReceived(dataToSend);
    handleClose();
  };

  return (
    <Modal show={showAddJobs} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Job</Modal.Title>
      </Modal.Header>
      <Modal.Body>

      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  )
}