import { Inject, ScheduleComponent, Day, Week, WorkWeek, Month, Agenda } from "@syncfusion/ej2-react-schedule";
import axios from "axios";
import "../css/schedular.css";
import { useEffect, useState } from "react";
export default function Scheduler() {
  const [meetings, setMeetings] = useState([]);
  const [status, setStatus] = useState(null);

  const fetchMeetings = async () => {
    axios.get("http://localhost:5000/fetchMeetings",{
      headers:{
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    } )
    .then((response)=>{
      console.log(response.data);
      setStatus(response.data.status);
      if (response.data.status) {
        const transformedData = response.data.meetings.map(meeting => {
          const startTime = new Date(meeting.start);
          const endTime = new Date(meeting.end);
      
          return {
            Id: meeting._id,
            Subject: meeting.title,
            StartTime: startTime,
            EndTime: endTime,
            Description: meeting.description,
            IsAllDay: false
          };
        });
        console.log(transformedData);
        setMeetings(transformedData);
      }
      
      
    })
    .catch((error)=>{
      console.error("Error fetching meetings:", error);
    });
  }

  useEffect(()=>{
    fetchMeetings();
  },[]);
  return (
    <div className="scheduler-container">
    <ScheduleComponent 
      currentView="Week" 
      eventSettings={{ dataSource:meetings, allowAdding: false, allowEditing: false, allowDeleting: false}}
      views={['Week']}
      // interval={60}
      startHour='08:00'
      endHour='21:30'
      timeScale={{ interval: 30, slotCount: 1 }}
    >
      <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
    </ScheduleComponent>
    </div>
  );
}
