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
import NewJobModal from "./components/JobModalNew";
import EditJobModal from "./components/JobModalEdit";
import DateModal from "./components/DateModal";
import plusSquare from './assets/plus-square.svg'


// Usage of mondaySDK example, for more information visit here: https://developer.monday.com/apps/docs/introduction-to-the-sdk/
const monday = mondaySdk();
let eventGuid = 0
let jobGuid = 0
const App = () => {
  const [context, setContext] = useState();
  
  const [showJobModal, setShowJobModal] = useState(false);
  const [showDateModal, setShowDateModal] = useState(false);
  const [assignJobDates, setAssignJobDates] = useState(false);

  const [showNewJobModal, setShowNewJobModal] = useState(false);
  const [showEditJobModal, setShowEditJobModal] = useState(false);

  const dataStruct = [[],[],[]]
  const [modalData, setModalData] = useState({data: [...dataStruct], start: new Date(), end: new Date()})

  
  const [jobsData, setJobsData] = useState([]);
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

  const toggleNewJobModal = () => {
    setShowNewJobModal(!showNewJobModal);
  };


  const toggleDateModal = () => {
    setShowDateModal(!showDateModal);
  };

  const toggleAssignJobDates = () => {
    setAssignJobDates(!assignJobDates);
  };



  const handleDateClick = (arg) => {
    const cellNodes = arg.dayEl.children[0].children[1].children[0].children
    const startDate = arg.date.toISOString().replace(/T.*$/, '') + 'T12:00:00'
    const cellsExists = cellNodes.length > 0

    const cellId = cellsExists ? cellNodes[0].children[0].attributes.itemID.value : null;

    // check for existing cell nodes, if exists, prepare contents for Modal
    const dateData = cellsExists ? jobsData.find(u => u.id === cellId) : {
      id: String(eventGuid++),
      start: startDate ,
      dateStr: new Date(startDate).toDateString(),
      data: [...dataStruct]
    };

    setModalData({id: dateData.id, start: dateData.start, dateStr: dateData.dateStr, data: dateData.data})
    
    setShowDateModal(true)
  }

  const handleDateSubmit = (id, date, data) => {
    // clear the existing date assignments
    const filteredJobs = jobsData.filter(item => item.id !== id);

    setJobsData([
      ...filteredJobs,
      {
        id: id,
        start: date,
        data: data,
      }
    ])
    
  }

  const handleNewJobModal = (selectInfo) => {
    // console.log(selectInfo.view.calendar)

    setModalData({
      start: selectInfo.start, 
      end: selectInfo.end, 
      color: colors[jobGuid%colors.length], 
      data: [...dataStruct]
    })
    toggleNewJobModal()
  }

  const handleJobSubmit = (data) => {
    const endDate = data.endDate
    let currentDate = data.startDate;

     setJobsListing([
      ...jobsListing,
      {
        id: String(jobGuid++),
        title: data.title,
        assignees: data.assignees,
        start: currentDate, //
        end: endDate,
        dateStr: new Date(currentDate).toDateString(),
        data: [...data.assignees],
        color: data.color
      }
    ])

    

    while (currentDate <= endDate) {
      const item = jobsData.find(u => u.start === currentDate)
      const dateData = item !== undefined ? item : {
        id: String(eventGuid++),
        start: currentDate, // May need to format date
        dateStr: new Date(currentDate).toDateString(),
        data: [...dataStruct]
      };

      dateData.data[0].push(data.title)
      

      // const filteredItems = jobsData.filter(item => item.start !== jobDate );

      // setJobsData([
      //   ...filteredItems,
      //   {
      //     id: String(eventGuid++),
      //     title: 'nTimed evet',
      //     start: currentDate + 'T12:00:00',
      //     data: data,
      //   }
      // ])
      
      currentDate.setDate(currentDate.getDate() + 1); 
    }
    // console.log(data)
  }

   const handleEditJobModal = (selectInfo) => {
    // console.log(selectInfo.view.calendar)

    // find job in jobList > build modal data

    setModalData({ start: selectInfo.start, end: selectInfo.end, data: [...dataStruct]})
    // toggleEditJobModal()
  }


  // const handleJobSubmit = (data) => {
  //   jobGuid = jobGuid + 1

  //   data.id = jobGuid
  //   data.color = colors[jobGuid%colors.length]
  //   setJobsListing([...jobsListing, data])
  // }

  const customRender = (args) => {
    const data = args.event.extendedProps

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
          select={handleNewJobModal}
          dateClick={handleDateClick}
          eventContent={(arg) => (customRender(arg))}
          events={jobsData}
        />
      </div>
      <DateModal 
        show={showDateModal}
        dateEvent={modalData}
        handleClose={toggleDateModal}
        onDateSubmit={handleDateSubmit}
      />
      {/* <JobModal 
        show={showJobModal} 
        // setJobTitle={setJobTitle}
        dateEvent={modalData}
        handleClose={toggleJobsModal}
        returnData={handleJobSubmit}
      /> */}
      <NewJobModal 
        show={showNewJobModal} 
        datesEvent={modalData}
        handleClose={toggleNewJobModal}
        handleReturn={handleJobSubmit}
      />
      <EditJobModal 
        show={showEditJobModal} 
        // setJobTitle={setJobTitle}
        dateEvent={modalData}
        handleClose={toggleJobsModal}
        handleReturn={handleJobSubmit}
      />
    </div>
  );
};

export default App;







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



    
    // const parsedDate = Date.parse(val)
    // console.log(val.toDateString())
    // const data = datesHash[val.toDateString()] // "Sun Dec 14 2025"
    // console.log("handle date str: ", arg.date.toISOString().replace(/T.*$/, ''))
    // arg.date.toDateString()