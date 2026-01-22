import React, { useState, useEffect } from 'react';

import { Modal, Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';

import minusCircle from '../assets/dash-circle.svg'

export default function DateModal({ show, dateEvent, handleClose, onDateSubmit}) {
  const [jobData, setJobData] = useState([[],[],[]]);
  const [inputValue, setInputValue] = useState('');
  const [colNum, setColNum] = useState(1)


  useEffect(() => {
    setJobData(dateEvent.data)

  }, [dateEvent])

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      jobData[colNum].push(inputValue)

      setInputValue('')
    }
  };

  const handleSubmit = () => {
    onDateSubmit(dateEvent.id, dateEvent.start, jobData);

    handleClose();
  };

  const handleOptionChange = (val) => {
    setColNum(val)
  }

  const addCol = () => {
    jobData.push([])
  }

  const rmEle = (c, r) => {
    jobData[c].splice(r, 1)

    // setJobData(jobData)
  }


  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{dateEvent.dateStr}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <div className="row mb-5">
            { jobData.map((dateColumn, colIndex) => (
              <div
                key={"col"+colIndex}
                className="col" 
                style={{ 'boxShadow': colNum === colIndex ? '0px 4px 8px black': ''}}
                onClick={() => handleOptionChange(colIndex)}
              >
                <ListGroup.Item key={"colName"+colIndex}>col {colIndex}</ListGroup.Item>
                { dateColumn.map((name, index) => (
                  <ListGroup.Item  key={"li"+index}>
                    {name}
                    <img src={minusCircle} 
                      alt="remove a name"
                      onClick={() => rmEle(colIndex, index)}
                      style={{'marginLeft': '4px'}}
                      width="11" 
                    />
                  </ListGroup.Item>
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
                checked={ colNum === 1}
                id={`radio-1`}
                onChange={() => handleOptionChange(1)}
              />
              <Form.Check
                label="Column 2"
                name="group1"
                type='radio'
                checked={colNum === 2}
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