const months31 = [1, 3, 5, 7, 8, 10, 12];

export const DAYS_OF_WEEK = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export const CALENDAR_MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const isLeapYear = (year) => {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
};

export const firstDayOfMonth = (year, selectedMonth) =>
  new Date(year, selectedMonth, 1);

export const firstDayOfWeek = (year, selectedMonth) =>
  firstDayOfMonth(year, selectedMonth).getDay();

export const getDaysInMonth = (year, month) => {
  const isMonth31 = months31.includes(month);
  const daysInMonth = isMonth31 ? 31 : 30;

  if (month === 1) {
    return isLeapYear(year) ? 29 : 28;
  }

  return daysInMonth;
};

export const getMonthName = (CALENDAR_MONTHS, monthNumber) => {
  const validMonthNumber = Math.max(0, Math.min(11, monthNumber));

  return CALENDAR_MONTHS[validMonthNumber];
};

function getAllYearsInRange(startYear, endYear) {
  const years = [];

  for (let year = endYear; year >= startYear; year--) {
    years.push(year);
  }

  return years;
}

const startYear = 1899;
const endYear = 2024;

export const CALENDAR_YEARS = getAllYearsInRange(startYear, endYear);
