import { checkBusinessDay } from "../../helpers/utils";

export const checkDateRange = (day, date, startDate, endDate) => {
  if (day <= 0) return false;
  if (startDate === date) {
    return true;
  } else if (startDate && endDate && startDate <= date && date <= endDate) {
    if (!checkBusinessDay(date)) {
      return false;
    }
    return true;
  }
};

export const container = "mx-auto max-w-screen-md mt-8 p-5";

export const calendarBox = "flex flex-col md:flex-row";

export const calendarGrid = "grid grid-cols-7 gap-4 mb-4";

export const calendarDateText = "text-center font-bold text-white";

export const calculateButtonClass =
  "rounded p-2 px-3 bg-blue-600 self-end text-white";

export const alignToEndClass = "flex flex-col justify-end items-end";

export const primayTextClass = "text-gray-300";

export const lightTextClass = "text-gray-400";

export const mutedTextClass = "text-gray-600";

export const dateClass = (day, dateObj, startDate, endDate) => {
  return `p-1 rounded-full hover:bg-[#DF6E8A]   ${
    checkDateRange(day, dateObj, startDate, endDate) && "bg-[#C6495D]"
  } 
  ${day <= 0 && "text-transparent bg-transparent"}
${checkBusinessDay(dateObj) ? primayTextClass : mutedTextClass}`;
};
