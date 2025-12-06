import { useState, useEffect } from "react";

import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

export default function SidebarEvent({ event, color}) {
  console.log("event id: " + event.id )
  const [employees, setEmployees] = useState([])
  const [inputValue, setInputValue] = useState('');

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      // Perform action with inputValue, e.g., submit a form, display the value
      console.log('Enter pressed! Input value:', inputValue);
      setEmployees([...employees, inputValue])
      // clear the input after submission
      setInputValue('')
    }
  };
  
  return (
      <Card key={event.id} className='mb-5' style={{ color: color }}>
        <Card.Body>
          <Card.Title>{event.title}</Card.Title>
            { employees.map((name, index) => (
              <ListGroup.Item key={index}>{name}</ListGroup.Item>
            ))}
            <InputGroup size="sm" className="mb-3">
              {/* <InputGroup.Text id="inputGroup-sizing-sm">Small</InputGroup.Text> */}
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
            </InputGroup>

        </Card.Body>
      </Card>
  )
}