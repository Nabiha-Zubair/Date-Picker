import React from "react";
import { CALENDAR_YEARS } from "../../helpers/utils";

export default function YearSelector({ currentYear, setCurrentYear }) {
  const handleYearChange = (e) => {
    setCurrentYear(e.target.value);
  };
  return (
    <div className="flex text-center items-center justify-center m-3">
      <select
        id="year"
        value={currentYear}
        onChange={handleYearChange}
        className="text-xl font-bold"
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
