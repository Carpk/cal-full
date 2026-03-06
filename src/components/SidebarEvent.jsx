import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

import gear from '../assets/gear.svg'


export default function SidebarJob({ job, editJob }) {

  return (
    <Card key={ job.id } style={{ marginBottom: '20px' }} >
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
