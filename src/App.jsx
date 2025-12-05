import React from "react";
import { useState, useEffect } from "react";
import "./App.css";
import mondaySdk from "monday-sdk-js";
import "@vibe/core/tokens";
import { AttentionBox } from "@vibe/core";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

import { formatDate } from '@fullcalendar/core'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction"

import { INITIAL_EVENTS, createEventId } from './event-utils'
import SidebarEvent from './components/SidebarEvent'

// Usage of mondaySDK example, for more information visit here: https://developer.monday.com/apps/docs/introduction-to-the-sdk/
const monday = mondaySdk();

const App = () => {
  const [context, setContext] = useState();
  const [currEvents, setCurrEvents] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const colors = ["red", "green", "#848400", "blue"]
 


  useEffect(() => {
    // Notice this method notifies the monday platform that user gains a first value in an app.
    // Read more about it here: https://developer.monday.com/apps/docs/mondayexecute#value-created-for-user/
    monday.execute("valueCreatedForUser");

    // TODO: set up event listeners, Here`s an example, read more here: https://developer.monday.com/apps/docs/mondaylisten/
    monday.listen("context", (res) => {
      setContext(res.data);
    });
  }, []);

  function handleDateSelect(selectInfo) {
    let title = prompt('Please enter a new title for your event')
    let calendarApi = selectInfo.view.calendar

    calendarApi.unselect() // clear date selection
    const eventId = createEventId()

    if (title) {
      calendarApi.addEvent({
        id: eventId,
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
        backgroundColor: colors[eventId]
      })
    }
  }

  const handleDateClick = (arg) => {
    alert(arg.dateStr)
  }

  function handleEvents(events) {
    setCurrEvents(events)
  }

  return (
    <div className='cal-app'>
      <Sidebar
        currEvents={currEvents}
      />
      <div className='cal-app-main'>
        <FullCalendar
          plugins={[ dayGridPlugin, interactionPlugin ]}
          initialView="dayGridMonth"
          editable={true}
          selectable={true}
          initialEvents={INITIAL_EVENTS}
          dateClick={handleDateClick}
          select={handleDateSelect}
          eventsSet={handleEvents} // called after events are initialized/added/changed/removed
        />
      </div>
    </div>
  );

  function renderEventContent(eventInfo) {
    return (
      <>
        <b>{eventInfo.timeText}</b>
        <i>{eventInfo.event.title}</i>
      </>
    )
  }

  function Sidebar({ currEvents }) {
    return (
      <div className='app-sidebar'>
        <div className='app-sidebar-section'>
          <h2>Instructions</h2>
          <ul>
            <li>Select dates and you will be prompted to create a new event</li>
            <li>Drag, drop, and resize events</li>
            <li>Click an event to delete it</li>
          </ul>
        </div>

        <div className='app-sidebar-section'>
        </div>
        <div className='app-sidebar-section'>
          <h2>Jobs ({ currEvents.length})</h2>
          <Row>
            { currEvents.map((event) => (
              <Col>
                <SidebarEvent key={event.id} event={event} />
              </Col>
            ))}
          </Row>
        </div>

      </div>
    )
  }
};

export default App;
