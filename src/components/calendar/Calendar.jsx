import React, { useEffect, useState } from "react";
import {
  DAYS_OF_WEEK,
  calculateRanges,
  calculateDays,
} from "../../helpers/utils";
import Day from "./Day";
import PredefinedRanges from "./PredefinedRanges";
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
    { label: "Yesterday", days: 1 },
    { label: "Last 7 days", days: 7 },
    { label: "Last 30 days", days: 30 },
  ];

  useEffect(() => {
    calculateDays({ currentYear, currentMonth, setDateObj, setCalendarDays });
  }, [currentMonth, currentYear]);

  return (
    <div className="mx-auto max-w-screen-md mt-8 p-5">
      <div className="flex flex-col md:flex-row ">
        <PredefinedRanges
          setStartDate={setStartDate}
          setEndDate={setEndDate}
          predefinedRanges={predefinedRanges}
          setBusinessRanges={setBusinessRange}
          setWeekendRanges={setWeekendRange}
        />
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
