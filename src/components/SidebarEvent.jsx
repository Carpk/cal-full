import { useState, useEffect } from "react";

import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

export default function SidebarEvent({ event }) {
  console.log("event id: " + event.id )
  const [employees, setEmployees] = useState([])
  const [inputValue, setInputValue] = useState('');
  // const colors = ["red", "green", "#848400", "blue"]
const colors = ["#FF0000", "#0000FF", "#00FF00", "#FFA500", "#800080", "#008080", "#FFD700"]


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
      <Card key={event.id} className='mb-5' style={{width: '10rem', color: colors[event.id] }}>
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