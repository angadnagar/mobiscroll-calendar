
import React, { useState } from 'react';

import moment from 'moment';
import { Calendar } from './Calendar';


interface NavbarProps {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
}



export const Navbar: React.FC<NavbarProps> = ({selectedDate,onDateChange}) => {
  const [openDatepicker, setOpenDatepicker] = useState(false);
  // const [selectedDate, setSelectedDate] = useState(new Date());
  // const [displayedMonth, setDisplayedMonth] = useState(moment(selectedDate).month());
  // const [displayedYear, setDisplayedYear] = useState(moment(selectedDate).year());
  

  const toggleDatepicker = () => {
    setOpenDatepicker(!openDatepicker);
  };

  // const handleDateChange = (date: Date) => {
  //   setSelectedDate(date);
  //   setOpenDatepicker(false);
  // };

  const handlePreviousMonth = () => {
    const previousMonth = moment(selectedDate).subtract(1, 'month').toDate();
    // setDisplayedMonth(previousMonth.month());
    // setDisplayedYear(previousMonth.year());
    // setSelectedDate(previousMonth.toDate());
    onDateChange(previousMonth)
  };

  const handleNextMonth=()=>{
    const nextMonth=moment(selectedDate).add(1, 'month').toDate();
    // setDisplayedMonth(nextMonth.month())
    // setDisplayedYear(nextMonth.year());
    // setSelectedDate(nextMonth.toDate());
    onDateChange(nextMonth)
  }

  const handleToday = () => {
    const today = new Date();
    // setSelectedDate(today);
    // setDisplayedMonth(moment(today).month());
    // setDisplayedYear(moment(today).year());
    onDateChange(today)
  };

  

  return (
    <div className="flex justify-between items-center p-4 bg-gray-100 relative">
      <div className="relative flex items-center">

        <div
          onClick={toggleDatepicker}
          className="text-xl text-blue-600 font-medium cursor-pointer hover:text-blue-400"
        >
          {moment(selectedDate).format('MMMM YYYY')}
        </div>
        {openDatepicker && (
          <div className="absolute top-12 left-0 z-50 bg-white shadow-lg p-2 rounded-lg border border-gray-300">
            <Calendar selectedDate={selectedDate} onDateChange={onDateChange} />
          </div>
        )}
      </div>
      
      <div className="flex items-center">
        <button
          onClick={handlePreviousMonth}
          className=" text-3xl mr-2 text-blue-600"
        >
          &lt;
        </button>
          <span className='text-blue-600 font-medium cursor-pointer' onClick={handleToday}> Today </span>
        <button
          onClick={handleNextMonth}
          className="text-3xl ml-2 text-blue-600"
        >
          &gt;
        </button>
      </div>
    </div>
  );
};































