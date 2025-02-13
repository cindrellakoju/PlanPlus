import React from "react";
import { getWeekDates, today_date, today_day } from "../../utils/formatDate";
import "../../styles/Header.css";

const DayField: React.FC = () => {
  const weekDays: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const weekDates = getWeekDates();  // Call the function to get the week dates

  return (
    <div className="daycontainer">
      <div className="days">
        {weekDays.map((day, index) => (
          <div
            key={index}
            className={`day ${day === today_day ? "highlight" : ""}`}
          >
            {day}
          </div>
        ))}
      </div>
      <div className="dates">
        {weekDates.map((date, index) => (
          <div
            key={index}
            className={`date ${date === today_date ? "highlight" : ""}`}
          >
            {date}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DayField;
