import { checkBusinessDay } from "../../helpers/utils";

export const checkDateRange = (day, date, startDate, endDate) => {
  if (day <= 0) return false;
  if (startDate?.getTime() === date?.getTime()) {
    return true;
  } else if (startDate <= date && date <= (endDate || startDate)) {
    if (!checkBusinessDay(date)) {
      return false;
    }
    return true;
  }
  return startDate <= date && date <= (endDate || startDate);
};

export const calculateButtonClass =
  "rounded p-2 px-3 bg-blue-600 self-end justify-end text-white";

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
