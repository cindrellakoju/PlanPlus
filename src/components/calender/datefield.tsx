import React, { useState } from 'react';
import sticker from "../../../public/sticker1.png";

type CalendarProps = {
    setUserSelectedDate: React.Dispatch<React.SetStateAction<string>>;
  };

const Calendar: React.FC<CalendarProps> = ({ setUserSelectedDate}) => {
  // Default to current date
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  // Extract year and month from the current date
  const year = selectedDate.getFullYear();
  const month = selectedDate.getMonth(); // 0-based (0 for Jan, 1 for Feb, etc.)

  // Days of the week (Sunday - Saturday)
  const days = ['Sun', 'Mon', 'Tue', 'Wed', "Thur", 'Fri', 'Sat'];

  // Function to generate the calendar dates for the given month and year
  const getCalendarDates = (year: number, month: number) => {
    const firstDay = new Date(year, month, 1);
    const startDay = firstDay.getDay();  // Day of the week the month starts on
    const daysInMonth = new Date(year, month + 1, 0).getDate(); // Days in the current month

    // Generate the calendar days
    const dates = [];

    // Add empty cells for the previous month's days
    for (let i = 0; i < startDay; i++) {
      dates.push(null); // Empty placeholder
    }

    // Add the current month's days
    for (let i = 1; i <= daysInMonth; i++) {
      dates.push(i);
    }

    return dates;
  };

  const dates = getCalendarDates(year, month);

  // Handle month change
  const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedMonth = parseInt(event.target.value, 10);
    setSelectedDate(new Date(year, selectedMonth, 1));
  };

  // Handle year change
  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedYear = parseInt(event.target.value, 10);
    setSelectedDate(new Date(selectedYear, month, 1));
  };

  // Generate a list of years for the dropdown
  const generateYears = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let i = currentYear - 5; i <= currentYear + 5; i++) {
      years.push(i);
    }
    return years;
  };

  // Generate the list of months
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
  ];

  return (
    <>
      <div className="calenderssss">
        <div className="planner">
          <div className="planner-header">
            <h1>{`${months[month]} ${year}`}</h1>
            <img src={sticker} alt="sticker" className="planner-img" />
          </div>
            <div className="selection">
                <div className="month-selection">
                    <select value={month} onChange={handleMonthChange}>
                    {months.map((monthName, index) => (
                        <option key={index} value={index}>
                        {monthName}
                        </option>
                    ))}
                    </select>
                </div>

                <div className="year-selection">
                    <select value={year} onChange={handleYearChange}>
                    {generateYears().map((yearOption) => (
                        <option key={yearOption} value={yearOption}>
                        {yearOption}
                        </option>
                    ))}
                    </select>
                </div>
            </div>


          <div className="weekdays">
            {days.map((day) => (
              <div key={day}>{day}</div>
            ))}
          </div>

          <div className="days">
            {dates.map((date, index) => (
              <div key={index} className={`day ${date ? '' : 'empty'}`} onClick={() => {
                if (date) {
                    const fullDate = new Date(year, month, date);
                    const formattedDate = fullDate.toLocaleDateString('en-CA');// YYYY-MM-DD format
                    setUserSelectedDate(formattedDate)
                    // alert(`Selected date: ${formattedDate}`);
                  }
              }}>
                {date ? <h1>{date}</h1> : null}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Calendar;
