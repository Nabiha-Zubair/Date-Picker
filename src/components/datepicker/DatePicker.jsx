import React, { useState } from "react";

import MonthSelector from "../selectors/MonthSelector";
import YearSelector from "../selectors/YearSelector";
import Calendar from "../calendar/Calendar";

export default function DatePicker() {
  const currentDate = new Date();
  const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());
  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());

  return (
    <div className="mx-auto max-w-screen-md mt-8 p-5">
      <YearSelector currentYear={currentYear} setCurrentYear={setCurrentYear} />
      <MonthSelector
        currentMonth={currentMonth}
        setCurrentMonth={setCurrentMonth}
      />
      <Calendar currentMonth={currentMonth} currentYear={currentYear} />
    </div>
  );
}
