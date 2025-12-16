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

// import { INITIAL_EVENTS, createEventId } from './event-utils'
import SidebarJob from './components/SidebarEvent'
import JobModal from "./components/JobModal";
import DateModal from "./components/DateModal";
import plusSquare from './assets/plus-square.svg'


// Usage of mondaySDK example, for more information visit here: https://developer.monday.com/apps/docs/introduction-to-the-sdk/
const monday = mondaySdk();
let eventGuid = 0
const App = () => {
  const [context, setContext] = useState();
  
  const [showJobModal, setShowJobModal] = useState(false);
  const [showDateModal, setShowDateModal] = useState(false);

  const [jobDate, setJobDate] = useState()
  const [manageDate, setManageDate] = useState()

  const [jobsData, setJobsData] = useState([]);
  const [dateData, setDateData] = useState([[],[],[]]);
  const [currentJobs, setCurrentJobs] = useState([]);
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

  const toggleJobsModal = () => {
    setShowJobModal(!showJobModal);
  };

  const toggleDateModal = () => {
    setShowDateModal(!showDateModal);
  };



  const handleSingleDateClick = (arg) => {
    // console.log("handle date str: ", arg.date.toISOString().replace(/T.*$/, ''))
    // arg.date.toDateString()

    const isExisting = arg.dayEl.children[0].children[1].children[0].children.length > 0

    if (isExisting) {
      const testData = arg.dayEl.children[0].children[1].children[0].children[0].children[0].children
      // setDateData(arg.dayEl.children[0].children[1].children[0].children[0].children[0].children)
      // console.log(testData)
      setDateData([
        testData[0].innerText.split('\n'), 
        testData[1].innerText.split('\n'), 
        testData[2].innerText.split('\n')
      ])
    }

    setJobDate(arg.date.toISOString().replace(/T.*$/, '')) // date string:  2025-12-15
    setManageDate(arg.date.toDateString()) //  date str:  Wed Dec 10 2025
    setShowDateModal(true)
  }


  const handleJobSubmit = (data) => {
    eventGuid = eventGuid + 1
    console.log(eventGuid)

    data.id = eventGuid
    data.color = colors[eventGuid%colors.length]
    console.log(data)
    setCurrentJobs([...currentJobs, data])
  }


  const handleDateSubmit = (assignments) => {
    // console.log(dateData)

    setDatesHash(prev => ({
      ...prev, 
      [manageDate]: {
        id: String(eventGuid),
        title: 'nTimed evet',
        start: jobDate + 'T12:00:00',
        jobs: assignments[0],
        assignees: assignments[1]
      }
    }));

    setJobsData(prev => ([
      ...prev,
      {
        id: String(eventGuid++),
        title: 'nTimed evet',
        start: jobDate + 'T12:00:00',
        jobs: assignments[0],
        assignees: assignments[1]
      }
    ]))
    
    setDateData([[],[],[]]);
    setManageDate(null)
  }


  const customRender = (args) => {
    // let val = args.event._instance.range.start
    const data = args.event.extendedProps
    // console.log("cus: ", data)

    if (data === undefined) { return (<></>) }    

    return (
      <div className="row" style={{'height': '18px'}}>
        <div className="col">
          {data.jobs.map((job) => (
            <div key={"j-"+job} className="row">
              <div className="col">
                {job}
              </div>
            </div>
          ))}
        </div>
        <div className="col">
          {data.assignees.map((assignee, index) => (
            <div key={"e-"+index} className="row">
              <div className="col">
                {assignee}
              </div>
            </div>
          ))}
        </div>
        <div className="col"></div>
      </div>
    )
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
              <button className='btn-link' style={{'float': 'right', 'marginTop': '4px'}} onClick={toggleJobsModal} type="button">
                <img src={plusSquare} 
                  alt="add a new job"
                  style={{'marginTop': '3px'}}
                  width="32" 
                  // height="32"
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
          // initialEvents={INITIAL_EVENTS}
          dateClick={handleSingleDateClick}
          // select={handleMultipleDates}
          // eventsSet={datesHash} // called after initialized/added/changed/removed
          // dayHeaderContent={(arg) => <span>{arg.text.toUpperCase()}</span>}
          eventContent={(arg) => (
            customRender(arg)
          )}
          events={jobsData} 
          //events={datesHash}
        />
      </div>

      <JobModal 
        show={showJobModal} 
        handleClose={toggleJobsModal}
        returnData={handleJobSubmit}
      />
      <DateModal 
        show={showDateModal}
        date={manageDate}
        jobsList={dateData[0]}
        assignmentsList1={dateData[1]}
        assignmentsList2={dateData[2]}
        handleClose={toggleDateModal}
        onDateSubmit={handleDateSubmit}
      />
    </div>
  );
};

export default App;




  // CODE FOR USING QUERY SELECTORS
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


  // CODE FOR CREATING FULLCAL EVENT
  // function handleMultipleDates(selectInfo) {
  //   console.log(selectInfo)
  //   setEventData(selectInfo)
  //   setShowJobModal(true)

  //   let title = prompt('Please enter a new title for your event')
  //   let calendarApi = selectInfo.view.calendar

  //   calendarApi.unselect() // clear date selection
  //   const eventId = createEventId()

  //   if (title) {
  //     calendarApi.addEvent({
  //       id: eventId,
  //       title,
  //       start: selectInfo.startStr,
  //       end: selectInfo.endStr,
  //       allDay: selectInfo.allDay,
  //       backgroundColor: colors[eventId]
  //     })
  //   }
  // }


    // HASH STRUCTURE FOR JOBS
    // console.log(val)
    // console.log("in cellstruc: ", args)
    
    // const parsedDate = Date.parse(val)
    // console.log(val.toDateString())
    // const data = datesHash[val.toDateString()] // "Sun Dec 14 2025"
    // console.log(data)

    // const data = datesHash['fc-21'] // 'fc-dom-' + ard.dom.id
    // console.log(args.el.id)

    // BUILDING HASH STRUCTURE
    // setDatesHash(prev => ({
    //   ...prev, 
    //   [manageDate]: {
    //     'jobs': [],
    //     'assignees': data,
    //     'assignees2': []
    //   }
    // }));