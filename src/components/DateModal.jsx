import React, { useState, useEffect } from 'react';

import { Modal, Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';



export default function DateModal({ show, date, data, handleClose, onDateSubmit}) {
  // const [jobs, setJobs] = useState([]);
  const [jobData, setJobData] = useState(data);
  // const [assignments, setAssignments
  // const [assignments1, setAssignments1] = useState([]);
  // const [assignments2, setAssignments2] = useState([]);
  const [inputValue, setInputValue] = useState('');


  const [colOne, setColOne] = useState(true) // user colNum instead
  const [colNum, setColNum] = useState(1)


  useEffect(() => {
    setJobData(data)

    // setJobs(data[0])
    // setAssignments1(data[1])
    // setAssignments2(data[2])
  }, [data])



  const handleKeyDown = (e) => {
    
    if (e.key === 'Enter') {
      e.preventDefault();
      // colOne ? setAssignments1([...assignments1, inputValue]) : setAssignments2([...assignments2, inputValue])
      data[colNum].push(inputValue)
      setInputValue('')
    }
  };

  const handleSubmit = () => {
    // console.log("data handle submit", data)
    onDateSubmit(data);
    // setAssignments([[],[],[]]);
    setColOne(true)

    handleClose();
  };

  const handleOptionChange = (val) => {
    setColOne(!colOne)
    setColNum(val)
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
            { jobData.map((section, index) => (
              <div
                key={"col"+index}
                className="col" 
                style={{ 'boxShadow': colNum === index ? '0px 4px 8px black': ''}}
                onClick={() => handleOptionChange(index)}
              >
                { section.map((name, index) => (
                  <ListGroup.Item key={"li"+index}>{name}</ListGroup.Item>
                ))}
              </div>
            ))}
          </div>
          
          <div className="row mb-5">
            
            <div className="col">
              <Form.Check
                label="Column 1"
                name="group1"
                type='radio'
                checked={colOne}
                id={`radio-1`}
                onChange={() => handleOptionChange(1)}
              />
              <Form.Check
                label="Column 2"
                name="group1"
                type='radio'
                checked={!colOne}
                id={`radio-2`}
                onChange={() => handleOptionChange(2)}
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



            // {/* <div className="col" >
            //   { jobs.map((name, index) => (
            //     <ListGroup.Item key={index}>{name}</ListGroup.Item>
            //   ))}
            // </div>
            // <div className="col nb-height" 
            //   style={{ 'boxShadow': colNum === 1 ? '0px 4px 8px black': ''}}
            //   onClick={() => handleOptionChange(1)}
            // >
            //   { assignments1.map((name, index) => (
            //     <ListGroup.Item key={index}>{name}</ListGroup.Item>
            //   ))}
            // </div>
            // <div 
            //   className="col nb-height" 
            //   style={{ 'boxShadow': colNum === 2 ? '0px 4px 8px black': ''}}
            //   onClick={() => handleOptionChange(2)}
            // >
            //   { assignments2.map((name, index) => (
            //     <ListGroup.Item key={index}>{name}</ListGroup.Item>
            //   ))}
            // </div> */}


 //             {/* style={{ box-shadow: !colOne ? '0px 4px 8px blue': ''}} */}


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



          // box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px;
          // box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;