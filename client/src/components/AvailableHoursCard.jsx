import React, { useState } from "react";
import ToggleSwitch from "./ToggleSwitch";
import clock from "../images/clock.png";
import "../css/availableHoursCard.css";
import PickTime from "../components/TimePicker";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import axios from 'axios';

const MySwal = withReactContent(Swal);

export default function AvailableHoursCard({ day }) {
  const [dayData, setDayData] = useState({
    day: day,
    from: "",
    to: "",
    isActive: true,
  });

  const handleTimeChange = (time, type) => {
    setDayData(prevData => ({
      ...prevData,
      [type]: time,
    }));
  };

  const handleToggle = (isActive) => {
    console.log('Toggle state in ToggleSwitch in card:', isActive);
    setDayData(prevData => ({
      ...prevData,
      isActive: isActive,
    }));
  };

  const saveChanges = () => {
    console.log("Data saved successfully");
    console.log(dayData);
    
    if (dayData.from === "" || dayData.to === "") {
      MySwal.fire({
        title: '<strong>Missing Time Slot</strong>',
        html: '<p>Please select a time slot for both <strong>From</strong> and <strong>To</strong>.</p>',
        icon: 'warning',
        confirmButtonText: '<i class="fa fa-thumbs-up"></i> Ok',
        confirmButtonColor: '#3085d6',
        background: '#f9f9f9',
        customClass: {
          popup: 'custom-popup',
          confirmButton: 'btn btn-primary',
        },
        buttonsStyling: false,
      });
      return;
    }
  
    axios.post('http://localhost:5000/availableHours', dayData, {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    })
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
      console.log(error);
    });
  };
  
  return (
    <div className="card-container">
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-center">
          <img src={clock} alt="clock" className="clock-img"/>
          <p className="text-sm px-1">Date & Time</p>
        </div>
        <ToggleSwitch onToggle={handleToggle} />
      </div>
      <div className="flex flex-row items-center">
        <div className="day">
          <p className="ml-8 text-sm">Day</p>
        </div>
        <div className="d flex flex-row items-center justify-around border-gray-300 rounded-lg py-1 px-7">
          <p className="text-sm">{day}</p>
        </div>
      </div>

      <div className="from flex flex-row items-center">
        <div className="day">
          <p className="ml-8 text-sm">From</p>
        </div>
        <div className="d">
          <PickTime onTimeChange={(time) => handleTimeChange(time, 'from')} />
        </div>
      </div>

      <div className="to flex flex-row items-center">
        <div className="day">
          <p className="ml-8 text-sm">To</p>
        </div>
        <div className="d">
          <PickTime onTimeChange={(time) => handleTimeChange(time, 'to')} />
        </div>
      </div>

      <button onClick={saveChanges}
              className="submit-button" 
              disabled={!dayData.isActive}>
              Save Changes
              </button>
    </div>
  );
}
