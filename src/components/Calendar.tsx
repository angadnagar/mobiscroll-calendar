// Calendar.tsx
import React, { useState } from 'react';
import moment from 'moment';

interface CalendarProps {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
}

export const Calendar: React.FC<CalendarProps> = ({ selectedDate, onDateChange }) => {
  const currentYear = moment().year();
  const years = Array.from({ length: 20 }, (_, i) => currentYear - 10 + i);
  const months = moment.months();

  const [displayedMonth, setDisplayedMonth] = useState(moment(selectedDate).month());
  const [displayedYear, setDisplayedYear] = useState(moment(selectedDate).year());

  const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setDisplayedMonth(moment().month(event.target.value).month());
  };

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setDisplayedYear(parseInt(event.target.value, 10));
  };

  const handleDateClick = (date: Date) => {
    onDateChange(date);
  };

  const startOfMonth = moment([displayedYear, displayedMonth]);
  const daysInMonth = startOfMonth.daysInMonth();
  const firstDayOfMonth = startOfMonth.day();

  const dates = [];
  for (let i = 0; i <firstDayOfMonth; i++) {
    dates.push(null);
  }
  for (let i = 1; i <=daysInMonth; i++) {
    dates.push(new Date(displayedYear, displayedMonth, i));
  }

  return (
    <div className="bg-white p-4 rounded shadow-lg w-64">
      <div className="mb-2 flex justify-between">
        <select
          value={months[displayedMonth]}
          onChange={handleMonthChange}
          className="block w-1/2 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        >
          {months.map((month) => (
            <option key={month} value={month}>
              {month}
            </option>
          ))}
        </select>
        <select
          value={displayedYear}
          onChange={handleYearChange}
          className="block w-1/2 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        >
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="font-medium text-gray-600">
            {day}
          </div>
        ))}
        {dates.map((date, index) =>
          date ? (
            <button
              key={index}
              onClick={() => handleDateClick(date)}
              className={`p-1 rounded-full ${
                moment(date).isSame(selectedDate, 'day')
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-700 hover:bg-blue-200'
              }`}
            >
              {moment(date).date()}
            </button>
          ) : (
            <div key={index} />
          )
        )}
      </div>
    </div>
  );
};


