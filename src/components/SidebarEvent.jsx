import { useState, useEffect } from "react";

import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';


import gear from '../assets/gear.svg'


export default function SidebarJob({ job, editJob }) {
  

  return (
    <Card key={ job.id } className='mb-5' >
      <Card.Body>
        <Card.Title style={{ color: job.color }}>
          {job.title}
          <button className="btn-link flt-right" onClick={() => editJob(job.id)}>
            <img src={ gear } 
              alt="gear icon"
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