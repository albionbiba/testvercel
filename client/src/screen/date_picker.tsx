import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import { useState } from "react";
import { Value } from "react-date-picker/dist/cjs/shared/types";

export interface AvailableTime {
  id: number;
  startTime: number;
  endTime: number;
}

function genAvaialableTime(hourOffset: number): AvailableTime {
  const start = new Date().getTime() + hourOffset * 60 * 60 * 1000;

  return {
    id: hourOffset,
    startTime: start,
    endTime: start + (1 * 60 * 60 * 1000 + 30 * 60 * 1000),
  };
}
const sampleAvailableTimes: AvailableTime[] = [
  genAvaialableTime(0),
  genAvaialableTime(1.5),
  genAvaialableTime(3),
  genAvaialableTime(4.5),
];

interface TimeOfDayPickerProps {
  availableTimes: AvailableTime[];
  onAvailableTimePicked: (time: AvailableTime) => void;
}
const TimeOfDayPicker: React.FC<TimeOfDayPickerProps> = ({
  availableTimes,
  onAvailableTimePicked,
}) => {
  const [selectedTime, setSelectedTime] = useState<AvailableTime | null>(null);
  const timeRadios = availableTimes.map((availableTime) => {
    const startTimeRepr = new Date(
      availableTime.startTime
    ).toLocaleTimeString();
    const endTimeRepr = new Date(availableTime.endTime).toLocaleTimeString();

    return (
      <label key={availableTime.id}>
        <input
          type="radio"
          checked={availableTime.id == selectedTime?.id}
          onChange={() => {
            setSelectedTime(availableTime);
            onAvailableTimePicked(availableTime);
          }}
        />
        <span>{startTimeRepr + "->" + endTimeRepr}</span>
      </label>
    );
  });

  return timeRadios;
};

interface WFDatePickerProps {
  onDateTimeAvailableSubmit: (res: AvailableTime) => void;
}
export const WFDatePicker: React.FC<WFDatePickerProps> = ({
  onDateTimeAvailableSubmit,
}) => {
  const [selectedDate, setSelectedDate] = useState<Value>(null);
  const [selectedAvailableTime, setSelectedAvailableTime] =
    useState<AvailableTime | null>(null);

  const picker = (
    <DatePicker
      calendarIcon={null}
      isOpen={true}
      value={selectedDate}
      onChange={(val) => setSelectedDate(val)}
    ></DatePicker>
  );

  const timePicker =
    selectedDate == null ? (
      <div></div>
    ) : (
      <TimeOfDayPicker
        availableTimes={sampleAvailableTimes}
        onAvailableTimePicked={setSelectedAvailableTime}
      ></TimeOfDayPicker>
    );

  const submitButton =
    selectedAvailableTime == null || selectedAvailableTime == null ? (
      <div></div>
    ) : (
      <button onClick={() => onDateTimeAvailableSubmit(selectedAvailableTime)}>
        Submit
      </button>
    );

  return [picker, timePicker, submitButton];
};
