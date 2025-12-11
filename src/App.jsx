import React from "react";
import { useState, useEffect } from "react";
import "./App.css";
import mondaySdk from "monday-sdk-js";
// import "@vibe/core/tokens";
// import { AttentionBox } from "@vibe/core";

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
import AddJobModal from "./components/AddJobModal";

// Usage of mondaySDK example, for more information visit here: https://developer.monday.com/apps/docs/introduction-to-the-sdk/
const monday = mondaySdk();

const App = () => {
  const [context, setContext] = useState();
  const [currJobs, setCurrJobs] = useState([]);
  const [currentJobs, setCurrentJobs] = useState(["MSI", "MSU"]);
  const [assignments, setAssignments] = useState([]);
  const [showAddJobModal, setShowAddJobModal] = useState(false);
  const [eventData, setEventData] = useState({})
  // const colors = ["red", "green", "#848400", "blue"]
  const colors = ["#FF0000", "#0000FF", "#00c400ff", "#c98200ff", "#800080", "#008080", "#FFD700"]
 


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
    console.log(selectInfo)
    setEventData(selectInfo)
    setShowAddJobModal(true)

    // let title = prompt('Please enter a new title for your event')
    // let calendarApi = selectInfo.view.calendar

    // calendarApi.unselect() // clear date selection
    // const eventId = createEventId()

    // if (title) {
    //   calendarApi.addEvent({
    //     id: eventId,
    //     title,
    //     start: selectInfo.startStr,
    //     end: selectInfo.endStr,
    //     allDay: selectInfo.allDay,
    //     backgroundColor: colors[eventId]
    //   })
    // }
  }

  const handleDateClick = (arg) => {
    // alert(arg.dateStr)
  }

  function handleEvents(events) {
    setCurrJobs(events)
  }

  function handleModalClose() {
    setShowAddJobModal(false)
  }

  const toggleModal = () => {
    setShowAddJobModal(!showAddJobModal);
  };

  const sampleDiv = () => {
    return (
      <div className="row">
        <div className="col">
          test
        </div>
        <div className="col">
          test
        </div>
        <div className="col">
          test
        </div>
      </div>
    )
  }
  const handleJobData = (data) => {
    const targetDate = data['startStr']
    const elements = document.querySelectorAll(`[data-date="${targetDate}"]`);

    const template = '<div class="col"></div><div class="col"></div><div class="col"></div>';
    const jobBox = elements[0].lastChild.childNodes[1]
    // elements[0].lastChild.lastChild.innerHTML = "hi";
    jobBox.classList.add("row");
    jobBox.innerHTML = template
    
    console.log(jobBox);
  };


  return (
    <div className='cal-app'>
      <div className='app-sidebar'>
        <div className='app-sidebar-section'>
          <h2>BWS Scheduling</h2>
        </div>

        <div className='app-sidebar-section'>
        </div>
        <div className='app-sidebar-section'>
          <h2>Jobs ({ currJobs.length})</h2>
          <div className="row">
            { currJobs.map((event) => (
              <div className="col">
                <SidebarEvent key={event.id} event={event} divor={colors[event.id]}/>
              </div>
            ))}
          </div>
        </div>
      </div>
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
       <AddJobModal 
        showAddJobs={showAddJobModal} 
        handleClose={toggleModal}
        eventData={eventData}
        onDataReceived={handleJobData}
        existingJobs={currentJobs}
      />
    </div>
  );
};

export default App;
