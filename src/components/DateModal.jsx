import { useState, useEffect } from 'react';

import { Modal, Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';

import minusCircle from '../assets/dash-circle.svg'
import gear from '../assets/gear.svg'

const COL_LABELS = ['Jobs', '1', '2', '3']

export default function DateModal({ show, dateEvent, handleClose, onDateSubmit }) {
  const [dateContent, setDateContent] = useState([[],[],[]]);
  const [inputValue, setInputValue] = useState('');
  const [colNum, setColNum] = useState(1);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    setDateContent(dateEvent.data)
    setEditMode(false)
  }, [dateEvent])

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (!inputValue) return;
      setDateContent(prev => prev.map((col, i) => i === colNum ? [...col, inputValue] : col))
      setInputValue('')
    }
  };

  const handleSubmit = () => {
    onDateSubmit(dateEvent.id, dateEvent.start, dateContent);
    handleClose();
  };

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

  const modalSize = dateContent.length >= 4 ? 'xl' : 'lg'

  return (
    <Modal show={show} onHide={handleClose} size={modalSize} centered>
      <Modal.Header closeButton>
        <Modal.Title>{dateEvent.textDate}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div style={{ display: 'flex', gap: '8px' }}>
          {dateContent.map((dateColumn, colIndex) => (
            <div
              key={"col" + colIndex}
              className="col"
              style={{
                cursor: colIndex > 0 ? 'pointer' : 'default',
                boxShadow: colNum === colIndex ? '0px 4px 8px rgba(0,0,0,0.3)' : '',
                borderRadius: '6px',
                padding: '8px',
                minHeight: '80px',
              }}
              onClick={() => colIndex > 0 && setColNum(colIndex)}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <strong style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {COL_LABELS[colIndex] ?? colIndex}
                </strong>
                {editMode && colIndex > 0 && (
                  <button
                    className="btn-link"
                    style={{ color: '#dc3545', fontSize: '1rem', lineHeight: 1 }}
                    onClick={(e) => { e.stopPropagation(); rmCol(colIndex); }}
                    title="Remove column"
                  >
                    ×
                  </button>
                )}
              </div>

              <ListGroup variant="flush">
                {dateColumn.map((name, index) => (
                  <ListGroup.Item
                    key={"li" + index}
                    style={{ background: 'transparent', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '4px 0' }}
                  >
                    <span style={name.color ? { color: name.color } : {}}>
                      {name.label ?? name}
                    </span>
                    {editMode && (
                      <img
                        src={minusCircle}
                        alt="remove"
                        onClick={(e) => { e.stopPropagation(); rmEle(colIndex, index); }}
                        style={{ marginLeft: '6px', cursor: 'pointer', flexShrink: 0 }}
                        width="11"
                      />
                    )}
                  </ListGroup.Item>
                ))}
              </ListGroup>

              {colIndex === colNum && (
                <Form.Control
                  style={{ marginTop: '8px' }}
                  size="sm"
                  type="text"
                  value={inputValue}
                  onKeyDown={handleKeyDown}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Add name..."
                  onClick={(e) => e.stopPropagation()}
                  autoFocus
                />
              )}
            </div>
          ))}
        </div>

        {dateContent.length < 4 && (
          <div style={{ marginTop: '12px' }}>
            <Button variant="link" size="sm" style={{ padding: 0 }} onClick={addCol}>
              + Add Column
            </Button>
          </div>
        )}
      </Modal.Body>

      <Modal.Footer style={{ display: 'flex', justifyContent: 'space-between' }}>
        <button
          className="btn-link"
          onClick={() => setEditMode(prev => !prev)}
          title="Toggle edit mode"
        >
          <img
            src={gear}
            alt="toggle edit mode"
            width="20"
            style={{ opacity: editMode ? 1 : 0.35 }}
          />
        </button>
        <div>
          <Button variant="secondary" onClick={handleClose} style={{ marginRight: '8px' }}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  )
}
