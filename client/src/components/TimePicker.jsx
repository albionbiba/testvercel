import * as React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import dayjs from 'dayjs';

function PickTime({ onTimeChange }) {
  const handleChange = (newValue) => {
    onTimeChange(dayjs(newValue).format('HH:mm'));
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['TimePicker']}>
        <TimePicker 
          onChange={handleChange} 
          minTime={dayjs().hour(8).minute(0)} 
          maxTime={dayjs().hour(21).minute(30)} 
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}

export default PickTime;
