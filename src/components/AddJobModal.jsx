import React, { useState } from 'react';

import { Modal, Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';



export default function AddJobModal({ showAddJobs, handleClose, eventData, onDataReceived, existingJobs}) {
  const [assignees, setAssignees] = useState([]);
  const [inputValue, setInputValue] = useState('');




  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      setAssignees([...assignees, inputValue])
      setInputValue('')
    }
  };

  const handleSubmit = () => {
    onDataReceived(eventData);
    handleClose();
  };


  return (
    <Modal show={showAddJobs} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Job</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formJobName">
            <Form.Label>Job name</Form.Label>
            <Form.Control type="text"  />
          </Form.Group>

          { assignees.map((name, index) => (
              <ListGroup.Item key={index}>{name}</ListGroup.Item>
          ))}

          <Form.Control
            aria-label="Small"
            aria-describedby="inputGroup-sizing-sm"
            size="sm"
            type="text"
            value={inputValue}
            // onSubmit={(e) => console.log(e)}
            onKeyDown={handleKeyDown}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </Form>

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