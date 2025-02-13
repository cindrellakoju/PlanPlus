import React from "react";
import { getWeekDates } from "../../utils/formatDate";

const DayField: React.FC = () => {
  const weekDates = getWeekDates();  // Call the function to get the week dates

  return (
    <div className="daycontainer">
      {/* Render the week dates */}
      {weekDates.map((date, index) => (
        <div key={index} className="day">
          {date}
        </div>
      ))}
    </div>
  );
};

export default DayField;
