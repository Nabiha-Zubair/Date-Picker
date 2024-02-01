import React from "react";
import { calculateRanges } from "../../helpers/utils";

export default function PredefinedRanges({
  setStartDate,
  setEndDate,
  predefinedRanges,
  setBusinessRanges,
  setWeekendRanges,
}) {
  const handlePredefinedRanges = (days) => {
    const today = Date.now();
    const daysRange = days * 24 * 60 * 60 * 1000;
    const previousDate = new Date(today - daysRange);
    //  initialDate.setDate();

    setStartDate(previousDate);
    setEndDate(new Date(today));
    calculateRanges({
      startDate: previousDate,
      endDate: new Date(today),
      setBusinessRanges,
      setWeekendRanges,
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
