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

import { INITIAL_EVENTS } from './event-utils'
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
  const [assignJobDates, setAssignJobDates] = useState(false);

  const [jobDate, setJobDate] = useState()
  const [modalEvent, setModalEvent] = useState()


  const [jobsData, setJobsData] = useState([]);
  const [modalData , setModalData] = useState([[],[],[]]);
  const [jobsListing, setJobsListing] = useState([]);

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

  const toggleAssignJobDates = () => {
    setAssignJobDates(!assignJobDates);
  };



  const handleDateClick = (arg) => {
    const cellNodes = arg.dayEl.children[0].children[1].children[0].children
    const startDate = arg.date.toISOString().replace(/T.*$/, '')
    console.log("startdate", startDate)
    const cellsExists = cellNodes.length > 0
    console.log("cellNodes", arg.dayEl.children[0].children)
    console.log("jobsData", jobsData)

    const cellId = cellsExists ? cellNodes[0].children[0].attributes.itemID.value : null;

    // let job = []
    // let as1 = []
    // let as2 = []

    // check for existing cell nodes, if exists, prepare contents for Modal
    const existingEvent = cellsExists ? jobsData.find(u => u.id === cellId) : {
          id: String(eventGuid++),
          title: 'nTimed evet',
          start: startDate + 'T12:00:00',
          data: [[],[],[]],
        };
    // console.log("existingJob", existingEvent)


    // if (cellsExists) {
    //   // TODO: instead, get data from jobsData
    //   // const existingJob = jobsData.find(u => u.id === cellId);

    //   // const foundData = jobsData.find((item) => {
    //   //   if (item.start === startDate + 'T12:00:00') {
    //   //     job = item.jobs
    //   //     as1 = item.assignees
    //   //     as2 = item.assignees2
    //   //   }
    //   // })

    //   const textNodes = cellNodes[0].children[0].children 

    //   job = textNodes[0].innerText.split('\n') 
    //   as1 = textNodes[1].innerText.split('\n') 
    //   as2 = textNodes[2].innerText.split('\n')
    // } 


    // if (assignJobDates) {
    //   // assigning job name to a date
    //   if (cellId !== null) {
    //     const updatedItems = jobsData.filter(item => item.id !== cellId);
    //     setJobsData(updatedItems)
    //   }

    //   setJobsData(prev => ([
    //     ...prev,
    //     {
    //       id: String(eventGuid++),
    //       title: 'nTimed evet',
    //       start: startDate + 'T12:00:00',
    //       // end: startDate,
    //       data: existingData,
    //       jobs: [...job, jobName],
    //       assignees: as1,
    //       assignees2: as2
    //     }
    //   ]))

    // } else {
      setJobDate(startDate)
      setModalEvent(existingEvent)
      // setModalData([job, as1, as2])
      setShowDateModal(true)
    // }
  }


  const handleJobSubmit = (data) => {
    eventGuid = eventGuid + 1

    data.id = eventGuid
    data.color = colors[eventGuid%colors.length]
    setJobsListing([...jobsListing, data])
  }


  const handleDateSubmit = (data) => {
    // clear the existing date assignments
    // const filteredJobs = jobsData
    const filteredJobs = jobsData.filter(item => item.start !== jobDate + 'T12:00:00');

    setJobsData([
      ...filteredJobs,
      {
        id: String(eventGuid++),
        title: 'nTimed evet',
        start: jobDate + 'T12:00:00',
        data: data,
      }
    ])
    
    setModalData([[],[],[]]);
  }

  // const handleMultipleDates = (selectInfo) => {
  //   // TODO: open jobs modal
  //   const title = "MULTI"
  //   multipleDatesModalReturn(title, selectInfo)
  // }

  // const multipleDatesModalReturn = (title,data) => {
  //   let currentDate = data.start;
  //   const dates = [];

  //   while (currentDate <= data.end) {
  //     dates.push(new Date(currentDate));
  //     // start: arg.date.toISOString().replace(/T.*$/, '')
  //     let existingData = null

  //     // get cell
  //     jobsData.map((item) => {
  //       if (item.start == currentDate) {
  //         existingData = item
  //       }
  //       // item.start == currentDate ? console.log(item) : null;
  //     })

  //     const jobs = []
  //     const as1 = []
  //     const as2 = []

  //     const filteredItems = jobsData.filter(item => item.start !== jobDate + 'T12:00:00');

  //     setJobsData([
  //       ...filteredItems,
  //       {
  //         id: String(eventGuid++),
  //         title: 'nTimed evet',
  //         start: currentDate + 'T12:00:00',
  //         data: [jobs, as1, as2],
  //       }
  //     ])
      
  //     currentDate.setDate(currentDate.getDate() + 1); 
  //   }
  //   // console.log(data)
  // }


  const customRender = (args) => {
    const data = args.event.extendedProps
    console.log(data)

    const newCol = (names, pref) => {
      return (
        <div key={pref+"col"} className="col">
          {names.map((name, index) => (
            <div key={pref + index} className="row">
              <div className="col">
                { name }
              </div>
            </div>
          ))}
        </div>
      )
    }

    if (data === undefined) { return (<></>) }
    
    return (
      <div className="row" itemID={args.event._def.publicId} style={{'height': '18px'}}>
          { data.data.map((empList, index) => (
            newCol (empList, "c"+index+"-")
          ))}
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
              <h2>Jobs ({jobsListing.length})</h2>
            </div>
            <div className="col">
              <button className='btn-link flt-right' style={{'marginTop': '4px'}} onClick={toggleJobsModal} type="button">
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
            { jobsListing.map((job) => (
              <div key={job.id} className="col">
                <SidebarJob 
                  job={job} 
                  assignDates={toggleAssignJobDates} 
                  // setJobName={setJobName}  
                />
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
          // select={handleMultipleDates}
          dateClick={handleDateClick}
          eventContent={(arg) => (customRender(arg))}
          events={jobsData}
        />
      </div>


      <JobModal 
        show={showJobModal} 
        // setJobTitle={setJobTitle}
        handleClose={toggleJobsModal}
        returnData={handleJobSubmit}
      />
      <DateModal 
        show={showDateModal}
        date={jobDate}
        dateEvent={modalEvent}
        data={modalData}
        handleClose={toggleDateModal}
        onDateSubmit={handleDateSubmit}
      />
    </div>
  );
};

export default App;

          // {/* { newCol (data.jobs, "jo-") }
          // { newCol (data.assignees, "a1-") }
          // { newCol (data.assignees2, "a2-") }
          // { newCol (data.assignees2, "a2-") } */}

    // DATE FORMATTING
    // setJobDate(arg.date.toISOString().replace(/T.*$/, ''))
    // arg.date.toDateString() // for modal display

        // <FullCalendar
        //   plugins={[ dayGridPlugin, interactionPlugin ]}
        //   initialView="dayGridMonth"
        //   editable={true}
        //   selectable={true}
        //   // initialEvents={INITIAL_EVENTS}
        //   dateClick={handleSingleDateClick}
        //   // select={handleMultipleDates}
        //   // eventsSet={datesHash} // called after initialized/added/changed/removed
        //   // dayHeaderContent={(arg) => <span>{arg.text.toUpperCase()}</span>}
        //   eventContent={(arg) => (customRender(arg))}
        //   events={jobsData} 
        //   //events={datesHash}
        // />

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


        // setDatesHash(prev => ({
    //   ...prev, 
    //   [manageDate]: {
    //     id: String(eventGuid),
    //     title: 'nTimed evet',
    //     start: jobDate + 'T12:00:00',
    //     jobs: jobs,
    //     assignees: assignments1,
    //     assignees2: assignments2
    //   }
    // }));


    // console.log("handle date str: ", arg.date.toISOString().replace(/T.*$/, ''))
    // arg.date.toDateString()