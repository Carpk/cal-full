import React from "react";
import { useState, useEffect } from "react";
import "./App.css";
import mondaySdk from "monday-sdk-js";
// import "@vibe/core/tokens";
// import { AttentionBox } from "@vibe/core";


import { formatDate } from '@fullcalendar/core'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction"

import { INITIAL_EVENTS, createEventId } from './event-utils'
import SidebarJob from './components/SidebarEvent'
import AddJobModal from "./components/AddJobModal";
import plusSquare from './assets/plus-square.svg'

// Usage of mondaySDK example, for more information visit here: https://developer.monday.com/apps/docs/introduction-to-the-sdk/
const monday = mondaySdk();
let eventGuid = 0
const App = () => {
  const [context, setContext] = useState();
  const [currJobs, setCurrJobs] = useState([]);
  const [currentJobs, setCurrentJobs] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [showAddJobModal, setShowAddJobModal] = useState(false);
  const [eventData, setEventData] = useState({})
  const [datesHash, setDatesHash] = useState({'Sun Dec 14 2025': {'jobs': ['msi', 'msu'], 'assignees': ['jim', 'bob', 'joe','bert','larry'], 'assignees2': []}})
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

  function handleMultipleDates(selectInfo) {
    // console.log(selectInfo)
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

  const handleSingleDate = (arg) => {
    // alert(arg.dateStr)
  }



  // function handleEvents(events) {
  //   setCurrJobs(events)
  // }



  const toggleJobsModal = () => {
    setShowAddJobModal(!showAddJobModal);
  };

  const sampleDiv = (args) => {

    let val = args.event._instance.range.start
    // const parsedDate = Date.parse(val)
    console.log(val.toDateString())
    const data = datesHash[val.toDateString()] // "Sun Dec 14 2025"
    console.log(data)

    // const data = datesHash['fc-21'] // 'fc-dom-' + ard.dom.id
    // console.log(args.el.id)
    
    if (data === undefined) {
      return (<></>)
    }    

    return (
      <div className="row" style={{'height': '18px'}}>
        <div className="col">
          {data.jobs.map((job) => (
            <div key={"c0"+job} className="row">
              <div className="col">
                {job}
              </div>
            </div>
          ))}
        </div>
        <div className="col">
          {data.assignees.map((assignee, index) => (
            <div key={"c1"+index} className="row">
              <div className="col">
                {assignee}
              </div>
            </div>
          ))}
        </div>
        <div className="col">
          test
        </div>
      </div>
    )
  }

  // const handleJobData = (data) => {
  //   const targetDate = data['startStr']
  //   const elements = document.querySelectorAll(`[data-date="${targetDate}"]`);

  //   const template = '<div class="col"></div><div class="col"></div><div class="col"></div>';
  //   const jobBox = elements[0].lastChild.childNodes[1]
  //   // elements[0].lastChild.lastChild.innerHTML = "hi";
  //   jobBox.classList.add("row");
  //   jobBox.innerHTML = template
    
  //   console.log(jobBox);
  // };

  const handleNewJobData = (data) => {
    eventGuid = eventGuid + 1
    console.log(eventGuid)

    data.id = eventGuid
    data.color = colors[eventGuid%colors.length]
    console.log(data)
    setCurrentJobs([...currentJobs, data])
  }


  return (
    <div className='cal-app'>
      <div className='app-sidebar'>
        <div className='app-sidebar-section'>
          <h2>BWS Scheduling</h2>
        </div>

        <div className='app-sidebar-section'>
        </div>
        <div className='app-sidebar-section'>
          <div className="row">
            <div className="col">
              <h2>Jobs ({currentJobs.length})</h2>
            </div>
            <div className="col">
              <button className='btn-link' style={{'float': 'right'}} onClick={toggleJobsModal} type="button">
                <img src={plusSquare} 
                  alt="add a new job"
                  width="35" 
                  height="35"
                />
              </button> 
            </div>
          </div>
          <div className="row">
            { currentJobs.map((job) => (
              <div key={job.id} className="col">
                <SidebarJob job={job} />
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
          dateClick={handleSingleDate}
          select={handleMultipleDates}
          // eventsSet={handleEvents} // called after initialized/added/changed/removed
          // dayHeaderContent={(arg) => <span>{arg.text.toUpperCase()}</span>}
          eventContent={(arg) => (
            sampleDiv(arg)
          )}
        />
      </div>
      {/* <AddJobModal 
        showAddJobs={showAddJobModal} 
        handleClose={toggleModal}
        eventData={eventData}
        onDataReceived={handleJobData}
        existingJobs={currentJobs}
      /> */}
      <AddJobModal 
        showAddJobs={showAddJobModal} 
        handleClose={toggleJobsModal}
        returnData={handleNewJobData}
      />
    </div>
  );
};

export default App;
