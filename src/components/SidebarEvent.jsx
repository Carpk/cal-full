import { useState, useEffect } from "react";

import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

import lock from '../assets/lock.svg'
import unlock from '../assets/unlock2.svg'



export default function SidebarJob({ job, assignDates, setJobName }) {
  const [employees, setEmployees] = useState([])
  const [inputValue, setInputValue] = useState('');
  const [lockImg, setLockImg] = useState(lock)
  // const [lock, setLock] = useState("loc")

  

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      setEmployees([...employees, inputValue])
      // clear the input after submission
      setInputValue('')
    }
  };

  const toggleLock = () => {
    // if (lock === "loc") {
    //   setJobName(job.title)
    //   setLock("unl")
    // } else {
    //   setLock("loc")
    // }

    if (lockImg === lock) {
      setJobName(job.title)
      setLockImg(unlock)
    } else {
      setLockImg(lock)
    }

    assignDates()
  }
  
  return (
    <Card key={ job.id } className='mb-5' >
      <Card.Body>
        <Card.Title style={{ color: job.color }}>
          {job.title}
          <button className="btn-link flt-right" onClick={toggleLock}>
            {/* {lock} */}
            <img src={ lockImg } 
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