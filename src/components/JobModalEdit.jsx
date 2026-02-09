import React, { useRef, useState, useEffect } from 'react';

import { Modal, Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';

import minusCircle from '../assets/dash-circle.svg'

export default function EditJobModal({ show, existingJob, handleClose, handleReturn}) {
  const [title, setTitle] = useState("")
  const [color, setColor] = useState('#000000')
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [assignees, setAssignees] = useState([]);

  const [inputValue, setInputValue] = useState('');
  // const jobName = useRef(null);

  useEffect(() => {
    setTitle(existingJob.title)
    setStartDate(existingJob.start)
    setEndDate(existingJob.end)
    setColor(existingJob.color)
    setAssignees(existingJob.data)

  }, [existingJob])

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      setAssignees([...assignees, inputValue])
      setInputValue('')
    }
  };

  const handleSubmit = () => {
    handleClose()

    handleReturn({
      title: title, 
      startDate: startDate, 
      endDate: endDate, 
      color: color,
      assignees: assignees
    });

    setAssignees([])
  };

  const changeTitle = (event) => {
    setTitle(event.target.value);
  };


  const changeStartDate = (event) => {
    setStartDate(event.target.value);
  };

  const changeEndDate = (event) => {
    setEndDate(event.target.value);
  };

  const changeColor = (event) => {
    setColor(event.target.value);
  };

  const rmEle = ( r) => {
    assignees.splice(r, 1)
  }


  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Job</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formJobName">
            <Form.Control type="text" defaultValue={title} onChange={changeTitle}/>
          </Form.Group>

          <Form.Label htmlFor="colorInput">Color picker</Form.Label>
          <Form.Control
            type="color"
            id="ColorInput"
            defaultValue={color}
            onChange={changeColor}
            title="Choose your color"
          />

          <Form.Group controlId="formDate">
            <Form.Label>Start Date</Form.Label>
            <Form.Control
              type="date"
              value={startDate}
              onChange={changeStartDate}
              name="date"
              placeholder="Start date"
            />
          </Form.Group>

          <Form.Group controlId="formDate">
            <Form.Label>End Date</Form.Label>
            <Form.Control
              type="date"
              value={endDate}
              onChange={changeEndDate}
              name="date"
              placeholder="End date"
            />
          </Form.Group>

          { assignees.map((name, index) => (
            <ListGroup.Item key={index}>
              {name}
              <img src={minusCircle} 
                alt="remove a name"
                onClick={() => rmEle(index)}
                style={{'marginLeft': '4px'}}
                width="11" 
              />
            </ListGroup.Item>
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