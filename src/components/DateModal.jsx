import React, { useState } from 'react';

import { Modal, Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';



export default function DateModal({ show, date, handleClose, onDateSubmit}) {
  const [assignees, setAssignees] = useState([["msi"], [], []]);
  const [inputValue, setInputValue] = useState('');

  // const [assignees0, setAssignees0] = useState([]);
  // const [assignees1, setAssignees1] = useState([]);
  // const [assignees2, setAssignees2] = useState([]);


  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      // setAssignees([...assignees, inputValue])
      setInputValue('')
    }
  };

  const handleSubmit = () => {
    onDateSubmit(assignees);
    handleClose();
  };


  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{date}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formJobName">
            <Form.Control type="text"  placeholder='Job Name'/>
          </Form.Group>
          <div className="row">
            <div className="col">
              { assignees[0].map((name, index) => (
                <ListGroup.Item key={index}>{name}</ListGroup.Item>
              ))}
            </div>
            <div className="col">

            </div>
            <div className="col">

            </div>
          </div>
          

          <Form.Control
            aria-label="Small"
            aria-describedby="inputGroup-sizing-sm"
            size="sm"
            type="text"
            value={inputValue}
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