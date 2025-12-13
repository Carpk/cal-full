import React, { useRef, useState } from 'react';

import { Modal, Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';



export default function JobModal({ show, handleClose, returnData}) {
  const [assignees, setAssignees] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const jobName = useRef(null);


  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      setAssignees([...assignees, inputValue])
      setInputValue('')
    }
  };

  const handleSubmit = () => {
    handleClose()

    returnData({title: jobName.current.value, assignees: assignees});

    setAssignees([])
  };


  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create Job</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formJobName">
            <Form.Control type="text" ref={jobName} placeholder='Job Name'/>
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