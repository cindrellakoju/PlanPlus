import React from "react";
import { getWeekDates } from "../../utils/formatDate";

const DayField: React.FC = () => {
  const weekDays: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const weekDates = getWeekDates();  // Call the function to get the week dates

  return (
    <div className="daycontainer">
      {weekDays.map((day, index) => (
        <div key={index} className="day">
          {day}
        </div>
      ))}
      {weekDates.map((date, index) => (
        <div key={index} className="date">
          {date}
        </div>
      ))}
    </div>
  );
};

export default DayField;
