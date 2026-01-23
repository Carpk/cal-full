import { useState, useEffect } from "react";

import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';


import gear from '../assets/gear.svg'


export default function SidebarJob({ job, assignDates, setJobName }) {
  const [employees, setEmployees] = useState([])
  const [inputValue, setInputValue] = useState('');
  // const [lock, setLock] = useState("loc")

  

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      setEmployees([...employees, inputValue])
      // clear the input after submission
      setInputValue('')
    }
  };

  const toggleLock = () => {

    //open edit modal
    assignDates()
  }
  
  return (
    <Card key={ job.id } className='mb-5' >
      <Card.Body>
        <Card.Title style={{ color: job.color }}>
          {job.title}
          <button className="btn-link flt-right" onClick={toggleLock}>
            {/* {lock} */}
            <img src={ gear } 
              alt="lock icon"
              style={{'marginTop': '-4px'}}
              width="22"
            />
          </button>
        </Card.Title>
          { job.assignees.map((name, index) => (
            <ListGroup.Item key={index}>{name}</ListGroup.Item>
          ))}

      </Card.Body>
    </Card>
  )
}