import React from "react";
import { CALENDAR_YEARS } from "../../helpers/utils";

export default function YearSelector({ currentYear, setCurrentYear }) {
  const handleYearChange = (e) => {
    setCurrentYear(e.target.value);
  };
  return (
    <div className="flex text-center items-center justify-center m-1">
      <select
        id="year"
        value={currentYear}
        onChange={handleYearChange}
        className="text-3xl font-bold bg-transparent text-white"
      >
        {CALENDAR_YEARS.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
    </div>
  );
}
