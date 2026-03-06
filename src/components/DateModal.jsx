import { useState, useEffect } from 'react';

import { Modal, Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';

import minusCircle from '../assets/dash-circle.svg'

export default function DateModal({ show, dateEvent, handleClose, onDateSubmit}) {
  const [dateContent, setDateContent] = useState([[],[],[]]);
  const [inputValue, setInputValue] = useState('');
  const [colNum, setColNum] = useState(1)

  useEffect(() => {
    setDateContent(dateEvent.data)
  }, [dateEvent])

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      setDateContent(prev => prev.map((col, i) => i === colNum ? [...col, inputValue] : col))
      setInputValue('')
    }
  };

  const handleSubmit = () => {
    onDateSubmit(dateEvent.id, dateEvent.start, dateContent);
    handleClose();
  };

  const handleOptionChange = (val) => {
    setColNum(val)
  }

  const addCol = () => {
    if (dateContent.length < 4) {
      setDateContent(prev => [...prev, []])
    }
  }

  // col 0 is reserved for job entries — cannot be removed
  const rmCol = (colIndex) => {
    if (colIndex === 0) return
    setDateContent(prev => prev.filter((_, i) => i !== colIndex))
    if (colNum >= colIndex && colNum > 1) {
      setColNum(colNum - 1)
    }
  }

  const rmEle = (c, r) => {
    setDateContent(prev => prev.map((col, i) => i === c ? col.filter((_, j) => j !== r) : col))
  }


  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{dateEvent.textDate}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <div className="row mb-5">
            { dateContent.map((dateColumn, colIndex) => (
              <div
                key={"col"+colIndex}
                className="col"
                style={{ boxShadow: colNum === colIndex ? '0px 4px 8px black' : '' }}
                onClick={() => handleOptionChange(colIndex)}
              >
                <ListGroup.Item key={"colName"+colIndex}>
                  col {colIndex}
                  {colIndex > 0 && (
                    <img src={minusCircle}
                      alt="remove column"
                      onClick={(e) => { e.stopPropagation(); rmCol(colIndex); }}
                      style={{ marginLeft: '4px' }}
                      width="11"
                    />
                  )}
                </ListGroup.Item>
                { dateColumn.map((name, index) => (
                  <ListGroup.Item key={"li"+index}>
                    <span style={name.color ? { color: name.color } : {}}>{name.label ?? name}</span>
                    <img src={minusCircle}
                      alt="remove a name"
                      onClick={(e) => { e.stopPropagation(); rmEle(colIndex, index); }}
                      style={{ marginLeft: '4px' }}
                      width="11"
                    />
                  </ListGroup.Item>
                ))}
              </div>
            ))}
          </div>

          <div className="row mb-5">
            <div className="col">
              { dateContent.map((_, colIndex) => (
                colIndex > 0 && (
                  <Form.Check
                    key={colIndex}
                    label={`Column ${colIndex}`}
                    name="group1"
                    type='radio'
                    checked={colNum === colIndex}
                    id={`radio-${colIndex}`}
                    onChange={() => handleOptionChange(colIndex)}
                  />
                )
              ))}
              {dateContent.length < 4 && (
                <Button variant="link" size="sm" className="p-0 mt-1" onClick={addCol}>
                  + Add Column
                </Button>
              )}
            </div>
            <div className="col">
              <Form.Control
                aria-label="Add employee"
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
