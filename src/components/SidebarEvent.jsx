import { useState, useEffect } from "react";

import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';


export default function SidebarJob({ job, assignDates }) {
  // console.log("event id: " + job.id )
  const [employees, setEmployees] = useState([])
  const [inputValue, setInputValue] = useState('');
  const [lock, setLock] = useState("locked")

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {

      setEmployees([...employees, inputValue])
      // clear the input after submission
      setInputValue('')
    }
  };

  const toggleLock = () => {
    if (lock === "locked") {
      setLock("unlocked")
    } else {
      setLock("locked")
    }

    assignDates()
  }
  
  return (
      <Card key={ job.id } className='mb-5' >
        <Card.Body>
          <Card.Title style={{ color: job.color }}>
            {job.title}
            <button onClick={toggleLock}>{lock}</button>
          </Card.Title>
            { job.assignees.map((name, index) => (
              <ListGroup.Item key={index}>{name}</ListGroup.Item>
            ))}

        </Card.Body>
      </Card>
  )
}