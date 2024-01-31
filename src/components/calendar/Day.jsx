import React, { useState } from "react";
import { checkBusinessDay, currentDate } from "../../helpers/utils";

export default function Day({ day, index, dateObjects }) {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [state, setState] = useState(false);

  const handleDatesChange = (index) => {
    const date = dateObjects[index];

    console.log("start", startDate, state);
    // if (!startDate || (startDate && endDate)) {

    //   setStartDate(!state);

    //   setStartDate(date);
    //   setEndDate(null);
    // } else {
    //   if (date > startDate && checkBusinessDay(date)) {
    //     console.log("lalalal");
    //     setEndDate(date);
    //   }
    // }

    setState(!state);
  };

  const handleDateChange = () => {
    setState(!state);
  };

  // console.log("states1: ", startDate, endDate);

  console.log("start", state);

  return (
    <button
      key={index}
      className={`text-center text-gray-300 p-1  ${
        day <= 0 ? "text-transparent" : ""
      } rounded-full`}
      onClick={() => handleDateChange()}
    >
      {day > 0 ? day : ""}
    </button>
  );
}
