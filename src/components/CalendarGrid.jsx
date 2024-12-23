import React, { useState } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isToday,
} from "date-fns";

function CalendarGrid({ events, onDayClick }) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(null);

  const days = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth),
  });

  const startOfCurrentMonth = startOfMonth(currentMonth);

  const firstDayOfWeek = (startOfCurrentMonth.getDay() - 1 + 7) % 7;

  const emptyCells = Array(firstDayOfWeek).fill(null);

  const nextMonth = () =>
    setCurrentMonth(
      new Date(currentMonth.setMonth(currentMonth.getMonth() + 1))
    );
  const prevMonth = () =>
    setCurrentMonth(
      new Date(currentMonth.setMonth(currentMonth.getMonth() - 1))
    );

  const handleDayClick = (day) => {
    const formattedDay = format(day, "dd-MM-yyyy");
    setSelectedDay(formattedDay);
    onDayClick(formattedDay);
  };

  return (
    <div className="w-7/12 mx-auto p-4 mr-20 ml-20 border">
      <div className="flex justify-between items-center mb-4">
        <button
          className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
          onClick={prevMonth}
        >
          Previous
        </button>
        <span className="text-xl font-semibold text-center">
          {format(currentMonth, "MMMM yyyy")}
        </span>
        <button
          className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
          onClick={nextMonth}
        >
          Next
        </button>
      </div>
      <div className="grid grid-cols-7 gap-2 text-center">
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, index) => (
          <div
            key={index}
            className={
              day === "Sun" || day === "Sat"
                ? "text-center font-bold bg-red-600 text-white hover:bg-red-500 border"
                : "text-center font-bold bg-gray-100 text-black hover:bg-gray-200 border"
            }
          >
            {day}
          </div>
        ))}

        {emptyCells.map((_, index) => (
          <div key={index} className="p-4 rounded-lg text-center"></div>
        ))}
        {days.map((day) => {
          const formattedDay = format(day, "dd-MM-yyyy");

          return (
            <div
              key={formattedDay}
              className={`relative flex items-center justify-center p-3 border rounded-lg cursor-pointer transition-all duration-300 
                ${
                  isToday(day) ? "bg-blue-200 text-white" : "hover:bg-gray-100"
                } 
                  ${
                    selectedDay === formattedDay ? "bg-blue-500 text-white" : ""
                  } 
              ${
                isToday(day) && selectedDay === formattedDay
                  ? " border-1 border-blue-600"
                  : ""
              }
                `}
              onClick={() => handleDayClick(day)}
            >
              {format(day, "d")}
              {events[formattedDay] && (
                <span className="text-xs text-red-500">📅</span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CalendarGrid;
