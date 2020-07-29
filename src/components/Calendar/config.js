export const THIS_YEAR = +new Date().getFullYear();
export const THIS_MONTH = +new Date().getMonth() + 1;

export const WEEK_DAYS = {
  Sunday: "Sun",
  Monday: "Mon",
  Tuesday: "Tue",
  Wednesday: "Wed",
  Thursday: "Thu",
  Friday: "Fri",
  Saturday: "Sat",
};

export const CALENDAR_MONTHS = {
  January: "Jan",
  February: "Feb",
  March: "Mar",
  April: "Apr",
  May: "May",
  June: "Jun",
  July: "Jul",
  August: "Aug",
  September: "Sep",
  October: "Oct",
  November: "Nov",
  December: "Dec",
};

// Since a month typically spans through 4 weeks,
// this allows the calendar to accommodate at least the last week from the previous month,
// and the first week from the next month.
export const CALENDAR_WEEKS = 6;
