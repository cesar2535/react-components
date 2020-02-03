export const THIS_YEAR = +new Date().getFullYear();
export const THIS_MONTH = +new Date().getMonth() + 1;

export const WEEK_DAYS = {
  Sunday: 'Sun',
  Monday: 'Mon',
  Tuesday: 'Tue',
  Wednesday: 'Wed',
  Thursday: 'Thu',
  Friday: 'Fri',
  Saturday: 'Sat'
};

// Since a month typically spans through 4 weeks, 
// this allows the calendar to accommodate at least the last week from the previous month,
// and the first week from the next month.
export const CALENDAR_WEEKS = 6;
