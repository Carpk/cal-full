import React, { useEffect, useRef, useState } from 'react';

import { Modal, Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';



export default function NewJobModal({show, dateEvent, handleClose, handleReturn}) {
  const [assignees, setAssignees] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [color, setColor] = useState('#000000')
  const jobName = useRef(null);


  //crashing on date select 
  useEffect(() => {
    setStartDate(dateEvent.start.toISOString().replace(/T.*$/, ''))
    setEndDate(dateEvent.end.toISOString().replace(/T.*$/, ''))
    setColor(dateEvent.color)
  }, [dateEvent]);




  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      setAssignees([...assignees, inputValue])
      setInputValue('')
    }
  };



  const changeStartDate = (event) => {
    setStartDate(event.target.value);
  };

  const changeEndDate = (event) => {
    setEndDate(event.target.value);
  };

  const changeColor = (event) => {
    // datesEvent.color = event.target.value;
    console.log("COLOR: ", event.target.value)
    setColor(event.target.value);
  };

  const handleSubmit = () => {
    handleClose()

    handleReturn({
      title: jobName.current.value, 
      startDate: startDate, 
      endDate: endDate, 
      color: color,
      assignees: assignees
    });

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
            <Form.Control type="text" ref={jobName} placeholder='Job Name' autoFocus/>
          </Form.Group>

          <Form.Label htmlFor="colorInput">Color picker</Form.Label>
          <Form.Control
            type="color"
            id="ColorInput"
            defaultValue={dateEvent.color}
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
            placeholder='Add Employee'
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