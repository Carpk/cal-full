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
// import NewJobModal from "./components/JobModalNew";
// import EditJobModal from "./components/JobModalEdit";
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

  // const dataStruct = [[],[],[]]
  const [modalData, setModalData] = useState({data: [[],[],[]]})
  const date = new Date()
  const [jobModalData, setJobModalData] = useState({start: date.toISOString().replace(/T.*$/, ''), end: date.toISOString().replace(/T.*$/, ''), data: []})
  // might need two, one for Jobs and one for Dates
  
  const [dailySchedule, setDailySchedule] = useState([]);
  const [currentJobs, setCurrentJobs] = useState([]);

  const colors = ["#FF0000", "#0000FF", "#00c400ff", "#c98200ff", "#800080", "#008080", "#FFD700"]
  


  useEffect(() => {
    // Notice this method notifies the monday platform that user gains a first value in an app.
    // Read more about it here: https://developer.monday.com/apps/docs/mondayexecute#value-created-for-user/
    monday.execute("valueCreatedForUser");

    // TODO: set up event listeners, Here`s an example, read more here: https://developer.monday.com/apps/docs/mondaylisten/
    // monday.listen("context", (res) => {
    //   // setContext(res.data);
    //   console.log(res.data)
    // });

    // monday.storage.instance.getItem('serialKey').then(res => {
    //   const { value, version } = res.data;
    //   // sleep(10000); // someone may overwrite serialKey during this time

    //   monday.storage.instance.setItem('serialKey', { previous_version: version }).then(res => {
    //     console.log(res);
    //   })
    // });

    // monday.storage.getItem('jobs').then(res => {
    //   if (res.data !== undefined) {
    //     // setDailySchedule(res.data)
    //   }
    //   console.log(res.data);
    // });


    // monday.storage.instance.setItem('jobs', ).then(res => {
    // console.log(res);
    // });
    monday.get("context").then(console.log);
    retrieveJobs()
  }, []);



  const storeJobs = async (jobs) => {
    await monday.storage.instance.setItem('jobs', JSON.stringify(jobs))
  }

  const storeDailySchedule = async (schedule) => {
    await monday.storage.instance.setItem('dailySchedule', JSON.stringify(schedule))
  }

  const retrieveJobs = async () => {
    const [jobsRes, schedRes] = await Promise.all([
      monday.storage.instance.getItem('jobs'),
      monday.storage.instance.getItem('dailySchedule'),
    ]);

    const rawJobs = jobsRes?.data?.value;
    if (rawJobs) setCurrentJobs(JSON.parse(rawJobs));

    const rawSched = schedRes?.data?.value;
    if (rawSched) setDailySchedule(JSON.parse(rawSched));
  }

  const toggleJobModal = () => {
    setShowJobModal(!showJobModal);
  };

  const toggleDateModal = () => {
    setShowDateModal(!showDateModal);
  };

  


  const handleDateClick = (arg) => {
    const cellNodes = arg.dayEl.children[0].children[1].children[0].children
    const startDate = arg.date.toISOString().replace(/T.*$/, '') + 'T12:00:00'
    const cellsExists = cellNodes.length > 0

    const cellId = cellsExists ? cellNodes[0].children[0].attributes.itemID.value : null;

    // check for existing cell nodes, if exists, prepare contents for Modal
    const dateData = cellsExists ? dailySchedule.find(u => u.id === cellId) : {
      id: String(eventGuid++),
      start: startDate ,
      dateStr: new Date(startDate).toDateString(),
      data: [[],[],[]]
    };

    setModalData({id: dateData.id, start: dateData.start, dateStr: dateData.dateStr, data: dateData.data})
    
    setShowDateModal(true)
  }

  const handleDateSubmit = (id, date, data) => {
    // clear the existing date assignments
    const filteredJobs = dailySchedule.filter(item => item.id !== id);

    const newSchedule = [
      ...filteredJobs,
      {
        id: id,
        start: date,
        data: data,
      }
    ]
    setDailySchedule(newSchedule)
    storeDailySchedule(newSchedule)
  }

  const handleNewJobButton = () => {
    const data = {
      start: new Date(),
      end: new Date(),
    }

    handleNewJobModal(data)
  }

  const handleNewJobModal = (selectInfo) => {
    setJobModalData({
      start: selectInfo.start.toISOString().replace(/T.*$/, ''),
      end: selectInfo.end.toISOString().replace(/T.*$/, ''),
      color: colors[jobGuid%colors.length],
      data: [[],[],[]]
    })

    // sleep(10000);
    if (!showDateModal) {
      toggleJobModal()
    }
  }

  // TODO: add code for modal edit to remove old Job
  const handleJobSubmit = (data) => {
    const endDate = new Date(data.endDate)
    let currentDate = new Date(data.startDate)
    let tempSched = dailySchedule

    const baseJobs = data.id
      ? currentJobs.filter(job => job.id !== data.id)
      : currentJobs;

    const newJobId = data.id ? data.id : String(jobGuid++)

    const newJobs = [
      ...baseJobs,
      {
        id: newJobId,
        title: data.title,
        assignees: data.assignees,
        start: data.startDate, // What format to save these in?
        end: data.endDate, // format for input: yyyy-mm-dd
        data: [...data.assignees],
        color: data.color
      }
    ]

    setCurrentJobs(newJobs)
    storeJobs(newJobs)

    while (currentDate <= endDate) {
      const formattedDate = currentDate.toISOString().replace(/T.*$/, '')
      // .toISOString().replace(/T.*$/, '')
      
      const foundData = tempSched.find(u => u.start.replace(/T.*$/, '') === formattedDate)
      const dayData = foundData !== undefined ? foundData : {
        id: String(eventGuid++),
        start: formattedDate + 'T12:00:00', // FullCal format: yyy-mm-ddT12:00:00
        textDate: new Date(currentDate).toDateString(),
        data: [[],[],[]] // rename
      };

      dayData.data[0].push({ label: data.title, jobId: newJobId, color: data.color })
      
      const filteredSched = tempSched.filter(event => event.start.replace(/T.*$/, '') !== formattedDate);
      tempSched = [...filteredSched, dayData]

      currentDate.setUTCDate(currentDate.getUTCDate() + 1);
    }
    
    setDailySchedule([...tempSched])
    storeDailySchedule([...tempSched])
  }

  const handleEditJobModal = (jobId) => {
    const job = currentJobs.find(u => u.id === jobId)
    setJobModalData({...job})
    toggleJobModal()
  }

  const handleDeleteJob = (jobId) => {
    const newJobs = currentJobs.filter(job => job.id !== jobId)
    setCurrentJobs(newJobs)
    storeJobs(newJobs)

    const newSchedule = dailySchedule.map(day => ({
      ...day,
      data: day.data.map(col => col.filter(item => item?.jobId !== jobId))
    }))
    setDailySchedule(newSchedule)
    storeDailySchedule(newSchedule)
  }


  const customRender = (args) => {
    const data = args.event.extendedProps

    const newCol = (names, pref) => {
      return (
        <div key={pref+"col"} className="col">
          {names.map((item, index) => (
            <div key={pref + index} className="row">
              <div className="col" style={item.color ? { color: item.color } : {}}>
                { item.label ?? item }
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
              <h2>Jobs ({currentJobs.length})</h2>
            </div>
            <div className="col">

              <button 
                className='btn-link flt-right' 
                style={{'marginTop': '4px'}} 
                onClick={handleNewJobButton} 
                type="button"
              >
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
                <SidebarJob 
                  job={job} 
                  editJob={handleEditJobModal}
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
          nextDayThreshold= '12:00:00'
          editable={true}
          selectable={false}
          dateClick={handleDateClick}
          select={handleNewJobModal}
          // initialEvents={INITIAL_EVENTS}
          eventContent={(arg) => (customRender(arg))}
          events={dailySchedule}
        />
      </div>
      <DateModal 
        show={showDateModal}
        dateEvent={modalData}
        handleClose={toggleDateModal}
        onDateSubmit={handleDateSubmit}
      />

      <JobModal
        show={showJobModal}
        jobData={jobModalData}
        handleClose={toggleJobModal}
        handleReturn={handleJobSubmit}
        handleDelete={handleDeleteJob}
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