import React, { useEffect, useState } from "react";

import CalculateButton from "./CalculateButton";
import Day from "./Day";
import PredefinedRanges from "./PredefinedRanges";
import { calculateDays, DAYS_OF_WEEK } from "../../helpers/utils";
import { calendarBox, calendarDateText, calendarGrid, container } from "./styles";

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
  ];

  useEffect(() => {
    calculateDays({ currentYear, currentMonth, setDateObj, setCalendarDays });
  }, [currentMonth, currentYear]);

  return (
    <div className={container}>
      <div className={calendarBox}>
        <PredefinedRanges
          setStartDate={setStartDate}
          setEndDate={setEndDate}
          predefinedRanges={predefinedRanges}
          setBusinessRange={setBusinessRange}
          setWeekendRange={setWeekendRange}
        />
        <div>
          <div className={calendarGrid}>
            {DAYS_OF_WEEK.map((day) => (
              <button key={day} className={calendarDateText}>
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
      <CalculateButton
        startDate={startDate}
        endDate={endDate}
        setBusinessRange={setBusinessRange}
        setWeekendRange={setWeekendRange}
        businessRange={businessRange}
        weekendRange={weekendRange}
      />
    </div>
  );
}
