import React from "react";
import { calculateRanges } from "../../helpers/utils";

export default function PredefinedRanges({
  setStartDate,
  setEndDate,
  predefinedRanges,
  setBusinessRange,
  setWeekendRange,
}) {
  const handlePredefinedRanges = (days) => {
    const today = Date.now();

    // days += 1;
    const daysRange = days * 24 * 60 * 60 * 1000;
    const previousDate = new Date(today - daysRange);
    previousDate.setHours(0, 0, 0, 0);

    let current = new Date(today);
    const endDate = new Date(current.setDate(current.getDate() - 1));
    setStartDate(previousDate);
    setEndDate(new Date(today));
    calculateRanges({
      startDate: previousDate,
      endDate,
      setBusinessRange,
      setWeekendRange,
    });
  };

  return (
    <div className="flex flex-col mx-3 mb-2 md:mb-0">
      {predefinedRanges.map((range, index) => (
        <button
          className="p-2 bg-transparent text-underline text-blue-300"
          key={`${range.days}-${index}`}
          onClick={() => handlePredefinedRanges(range.days)}
        >
          {range.label}
        </button>
      ))}
    </div>
  );
}
