import React, { useState, useEffect } from 'react';

import { Modal, Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';



export default function DateModal({ show, date, jobsList, assignmentsList1, assignmentsList2, handleClose, onDateSubmit}) {
  const [jobs, setJobs] = useState([]);
  const [assignments1, setAssignments1] = useState([]);
  const [assignments2, setAssignments2] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [colOne, setColOne] = useState(true)

  useEffect(() => {
    setJobs(jobsList)
    setAssignments1(assignmentsList1)
    setAssignments2(assignmentsList2)
  }, [jobsList, assignmentsList1, assignmentsList2])



  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      colOne ? setAssignments1([...assignments1, inputValue]) : setAssignments2([...assignments2, inputValue])
      setInputValue('')
    }
  };

  const handleSubmit = () => {
    onDateSubmit(jobs,assignments1, assignments2);
    // setAssignments([[],[],[]]);
    setColOne(true)
    setJobs([])
    setAssignments1([])
    setAssignments2([])
    handleClose();
  };

  const handleOptionChange = () => {
    setColOne(!colOne)
  }

  const addEle = (index) => {

  }

  const removeEle = (index) => {

  }


  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{date}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          
          <div className="row mb-5">
            <div className="col">
              { jobs.map((name, index) => (
                <ListGroup.Item key={index}>{name}</ListGroup.Item>
              ))}
            </div>
            <div className="col">
              { assignments1.map((name, index) => (
                <ListGroup.Item key={index}>{name}</ListGroup.Item>
              ))}
            </div>
            <div className="col">
              { assignments2.map((name, index) => (
                <ListGroup.Item key={index}>{name}</ListGroup.Item>
              ))}
            </div>
          </div>
          
          <div className="row mb-5">
            <div className="col">
              <Form.Check
                label="Column 1"
                name="group1"
                type='radio'
                checked={colOne}
                id={`radio-1`}
                onChange={handleOptionChange}
              />
              <Form.Check
                label="Column 2"
                name="group1"
                type='radio'
                checked={!colOne}
                id={`radio-2`}
                onChange={handleOptionChange}
              />
            </div>
            <div className="col">
              <Form.Control
                aria-label="Small"
                aria-describedby="inputGroup-sizing-sm"
                size="sm"
                type="text"
                value={inputValue}
                onKeyDown={handleKeyDown}
                onChange={(e) => setInputValue(e.target.value)}
                autoFocus
              />
              <Form.Group className="mb-3" controlId="formJobName">
                <Form.Control type="text"  placeholder='not here'/>
              </Form.Group>
            </div>
            <div className="col"></div>
          </div>
          
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


          // <div className="row mb-5">
          //   <div className="col">
          //     { assignments.map((name, index) => (
          //       <ListGroup.Item key={index}>{name}</ListGroup.Item>
          //     ))}
          //   </div>
          //   <div className="col">
          //     { assignments.map((name, index) => (
          //       <ListGroup.Item key={index}>{name}</ListGroup.Item>
          //     ))}
          //   </div>
          // </div>