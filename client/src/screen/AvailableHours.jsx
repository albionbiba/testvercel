import React from 'react';
import AvailableHoursCard from '../components/AvailableHoursCard';
import '../css/availableHours.css';
import { Link } from 'react-router-dom';

export default function AvailableHours() {
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  return (
    <div className='flex flex-col items-center justify-around time-container'>
    <p className='text-white text-lg mt-5'>Please select your available Time Slots</p>
      <div className='flex flex-wrap items-center justify-around p-4'>
      {daysOfWeek.map(day => (
      <div className="c-container mt-4" key={day}>
        <AvailableHoursCard day={day} />
        </div>
      ))}
      </div>
      <div className='flex flex-row justify-end my-4'>
      <Link to="/salesAgentDashboard" className="submit-button text-white">Go Back</Link>
        {/* <button className="submit-button">Save changes</button> */}
      </div>
    </div>
  );
}
