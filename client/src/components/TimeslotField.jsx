// TimeSlotField.js
import React from 'react';

const TimeslotField = ({ label, value, onChange }) => {
  const timeSlots = [
    { label: '9:30 AM - 11:00 AM', value: '9:30-11:00' },
    { label: '11:00 AM - 12:30 PM', value: '11:00-12:30' },
    { label: '1:00 PM - 2:30 PM', value: '13:00-14:30' },
    { label: '3:00 PM - 4:30 PM', value: '15:00-16:30' },
    { label: '5:00 PM - 6:30 PM', value: '17:00-18:30' },
    { label: '7:00 PM - 8:30 PM', value: '19:00-20:30' },
    { label: '9:00 PM - 10:30 PM', value: '21:00-22:30' }
  ];

  return (
    <div className="form-group">
      <label>{label}:</label>
      <select value={value} onChange={onChange}>
        <option value="">Select a timeslot</option>
        {timeSlots.map((slot) => (
          <option key={slot.value} value={slot.value}>
            {slot.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default TimeslotField;
