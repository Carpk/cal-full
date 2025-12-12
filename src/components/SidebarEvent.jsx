import { useState, useEffect } from "react";

import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';


export default function SidebarJob({ job }) {
  // console.log("event id: " + job.id )
  const [employees, setEmployees] = useState([])
  const [inputValue, setInputValue] = useState('');

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {

      setEmployees([...employees, inputValue])
      // clear the input after submission
      setInputValue('')
    }
  };
  
  return (
      <Card key={ job.id } className='mb-5' >
        <Card.Body>
          <Card.Title style={{ color: job.color }}>{job.title}</Card.Title>
            { job.assignees.map((name, index) => (
              <ListGroup.Item key={index}>{name}</ListGroup.Item>
            ))}
            <InputGroup size="sm" className="mb-3">
              {/* <InputGroup.Text id="inputGroup-sizing-sm">Small</InputGroup.Text> */}
              {/* <Form.Control
                aria-label="Small"
                aria-describedby="inputGroup-sizing-sm"
                size="sm"
                type="text"
                value={inputValue}
                // onSubmit={(e) => console.log(e)}
                onKeyDown={handleKeyDown}
                onChange={(e) => setInputValue(e.target.value)}
              /> */}
            </InputGroup>

        </Card.Body>
      </Card>
  )
}