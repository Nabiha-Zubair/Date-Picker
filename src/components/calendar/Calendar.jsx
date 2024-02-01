import React, { useEffect, useState } from "react";
import {
  DAYS_OF_WEEK,
  getDaysInMonth,
  firstDayOfWeek,
  calculateRanges,
} from "../../helpers/utils";
import Day from "./Day";
import {
  alignToEndClass,
  calculateButtonClass,
  lightTextClass,
} from "./styles";

export default function Calendar({ currentYear, currentMonth }) {
  const [calendarDays, setCalendarDays] = useState([]);
  const [dateObjects, setDateObj] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [weekendRange, setWeekendRange] = useState([]);
  const [businessRange, setBusinessRange] = useState([]);

  const predefinedRanges = [
    { label: "Last 7 days", days: 7 },
    { label: "Last 30 days", days: 30 },
    // Add more predefined ranges as needed
  ];

  useEffect(() => {
    const totalDaysInCalendar = getDaysInMonth(currentYear, currentMonth);
    const firstDay = firstDayOfWeek(currentYear, currentMonth);
    const extraDays = firstDay % 7;
    const days = Array.from(
      {
        length: totalDaysInCalendar + extraDays || 0,
      },
      (_, index) => index - firstDayOfWeek(currentYear, currentMonth) + 1
    );
    const monthDays = days.map(
      (day) => new Date(currentYear, currentMonth, day)
    );
    setDateObj(monthDays);
    setCalendarDays(days);
  }, [currentMonth, currentYear]);

  const handlePredefinedRanges = (days) => {
    const today = Date.now();
    const daysRange = days * 24 * 60 * 60 * 1000;
    const previousDate = new Date(today - daysRange);
    //  initialDate.setDate();

    setStartDate(previousDate);
    setEndDate(new Date(today));
    calculateRanges(previousDate, new Date(today));
  };

  return (
    <div className="mx-auto max-w-screen-md mt-8 p-5">
      <div className="flex flex-row ">
        <div className="flex flex-col  mx-3">
          {/* {predefinedRanges.map((range, index) => (
            <button
              className="p-2 bg-transparent text-underline text-blue-300"
              key={`${range.days}-${index}`}
              // onClick={() => handlePredefinedRanges(range.days)}
            >
              {range.label}
            </button>
          ))} */}
        </div>

        <div>
          <div className="grid grid-cols-7 gap-4 mb-4">
            {DAYS_OF_WEEK.map((day) => (
              <button key={day} className="text-center font-bold text-white">
                {day}
              </button>
            ))}
          </div>
          <Day
            startDate={startDate}
            endDate={endDate}
            dateObjects={dateObjects}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
            calendarDays={calendarDays}
            setBusinessRange={setBusinessRange}
            setWeekendRange={setWeekendRange}
          />
        </div>
      </div>
      <div className={alignToEndClass}>
        {endDate && (
          <div className="my-2">
            <button
              className={calculateButtonClass}
              onClick={() =>
                calculateRanges({
                  startDate,
                  endDate,
                  setBusinessRange,
                  setWeekendRange,
                })
              }
            >
              Done
            </button>
            <p className={lightTextClass}>Weekends: ({weekendRange.length})</p>
          </div>
        )}
      </div>
    </div>
  );
}
