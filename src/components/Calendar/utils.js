import { times } from "ramda";
import { getDaysInMonth, getDay } from "date-fns";
import { THIS_MONTH, THIS_YEAR, CALENDAR_WEEKS } from "./config";

/**
 * @param {Date} date
 * @returns {boolean}
 */
export const isDate = (date) => {
  const isDate = Object.prototype.toString.call(date) === "[object Date]";
  const isValidDate = date && !Number.isNaN(date.valueOf());

  return isDate && isValidDate;
};

/**
 * checks if two date values are of the same month and year
 * @param {Date} date
 * @param {Date} baseDate
 * @returns {boolean}
 */
export const isSameMonth = (date, baseDate = new Date()) => {
  if (!(isDate(date) && isDate(baseDate))) {
    return false;
  }

  const baseDateMonth = +baseDate.getMonth() + 1;
  const baseDateYear = +baseDate.getFullYear();

  const dateMonth = +date.getMonth() + 1;
  const dateYear = +date.getFullYear();

  return baseDateMonth === dateMonth && baseDateYear === dateYear;
};

/**
 * checks if two date values are the same day
 * @param {Date} date
 * @param {Date} baseDate
 * @returns {boolean}
 */
export const isSameDay = (date, baseDate = new Date()) => {
  if (!(isDate(date) && isDate(baseDate))) {
    return false;
  }

  const baseDateDate = +baseDate.getDate();

  const dateDate = +date.getDate();

  return baseDateDate === dateDate && isSameMonth(date, baseDate);
};

/**
 *
 * @param {number} num
 * @param {number} len
 * @returns {string}
 */
const zeroPad = (num, len) => num.toString(10).padStart(len, 0);

/**
 * gets the month and year before the given month and year
 * @param {number} month
 * @param {number} year
 * @returns {{ month: number, year: number }}
 */
export const getPreviousMonth = (month, year) => {
  const prevMonth = month > 1 ? month - 1 : 12;
  const prevMonthYear = month > 1 ? year : year - 1;

  return { month: prevMonth, year: prevMonthYear };
};

/**
 * gets the month and year after the given month and year
 * @param {number} month
 * @param {number} year
 * @returns {{ month: number, year: number}}
 */
export const getNextMonth = (month, year) => {
  const nextMonth = month < 12 ? month + 1 : 1;
  const nextMonthYear = month < 12 ? year : year + 1;

  return { month: nextMonth, year: nextMonthYear };
};

export default (month = THIS_MONTH, year = THIS_YEAR) => {
  const monthDays = getDaysInMonth(new Date(year, month - 1));
  const monthFirstDay = getDay(new Date(year, month - 1, 1)) + 1;

  const daysFromPrevMonth = monthFirstDay - 1;
  const daysFromNextMonth =
    CALENDAR_WEEKS * 7 - (daysFromPrevMonth + monthDays);

  const { month: prevMonth, year: prevMonthYear } = getPreviousMonth(
    month,
    year
  );
  const { month: nextMonth, year: nextMonthYear } = getNextMonth(month, year);

  const prevMonthDays = getDaysInMonth(new Date(prevMonthYear, prevMonth - 1));

  const prevMonthDates = times((index) => {
    const day = index + 1 + (prevMonthDays - daysFromPrevMonth);
    return [prevMonthYear, zeroPad(prevMonth, 2), zeroPad(day, 2)];
  }, daysFromPrevMonth);

  const thisMonthDates = times((index) => {
    const day = index + 1;
    return [year, zeroPad(month, 2), zeroPad(day, 2)];
  }, monthDays);

  const nextMonthDates = times((index) => {
    const day = index + 1;
    return [nextMonthYear, zeroPad(nextMonth, 2), zeroPad(day, 2)];
  }, daysFromNextMonth);

  return [...prevMonthDates, ...thisMonthDates, ...nextMonthDates];
};
