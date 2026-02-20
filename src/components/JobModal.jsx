import { useEffect, useState } from 'react';

import { Modal, Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';

import minusCircle from '../assets/dash-circle.svg'

export default function JobModal({ show, jobData, handleClose, handleReturn }) {
  const [title, setTitle] = useState('');
  const [color, setColor] = useState('#000000');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [assignees, setAssignees] = useState([]);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    setTitle(jobData.id ? (jobData.title || '') : '');
    setStartDate(jobData.start || '');
    setEndDate(jobData.end || '');
    setColor(jobData.color || '#000000');
    setAssignees(jobData.id ? (jobData.assignees || []) : []);
  }, [jobData]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      setAssignees([...assignees, inputValue]);
      setInputValue('');
    }
  };

  const rmEle = (i) => {
    setAssignees(prev => prev.filter((_, idx) => idx !== i));
  };

  const handleSubmit = () => {
    handleClose();
    handleReturn({
      title,
      startDate,
      endDate,
      color,
      assignees,
    });
    setAssignees([]);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{jobData.id ? 'Edit Job' : 'Create Job'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formJobName">
            <Form.Control
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Job Name"
              autoFocus
            />
          </Form.Group>

          <Form.Label htmlFor="colorInput">Color picker</Form.Label>
          <Form.Control
            type="color"
            id="ColorInput"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            title="Choose your color"
          />

          <Form.Group controlId="formStartDate">
            <Form.Label>Start Date</Form.Label>
            <Form.Control
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formEndDate">
            <Form.Label>End Date</Form.Label>
            <Form.Control
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </Form.Group>

          {assignees.map((name, index) => (
            <ListGroup.Item key={index}>
              {name}
              <img
                src={minusCircle}
                alt="remove a name"
                onClick={() => rmEle(index)}
                style={{ marginLeft: '4px' }}
                width="11"
              />
            </ListGroup.Item>
          ))}

          <Form.Control
            aria-label="Add employee"
            size="sm"
            type="text"
            value={inputValue}
            onKeyDown={handleKeyDown}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Add Employee"
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
  );
}
