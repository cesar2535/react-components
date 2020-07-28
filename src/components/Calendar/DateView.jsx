import React from "react";
import PropTypes from "prop-types";
import { WEEK_DAYS } from "./config";
import calendar from "./utils";
import { isDate, isSameDay, endOfMonth, startOfMonth, isAfter } from "date-fns";

class DateView extends React.PureComponent {
  state = {
    today: new Date(),
  };

  componentDidMount() {
    console.log(this.getCalendarDates());
  }

  render() {
    return null;
  }
  renderDayLabel = (day, index) => {
    const daylabel = WEEK_DAYS[day].toUpperCase();
    return daylabel;
  };

  /**
   *
   * @param {number[]} date
   * @param {number} index
   */
  renderDate = (date, index) => {
    const { selected, month, year, today, maxdate, mindate } = this.state;

    const _date = new Date(date.join("-"));
    const isSelected = isSameDay(_date);
    const isToday = isSameDay(_date, today);

    const inMonth =
      month && year && isSameDay(_date, new Date([year, month, 1].join("-")));

    const inRange = !(isBefore(_date, mindate) || isAfter(_date, maxdate));

    const props = {
      index,
      inMonth,
      inRange,
      onClick: () => null,
      title: _date.toDateString(),
    };
  };

  calendarWithinRange(date, { maxdate, mindate } = this.state) {
    if (!isDate(date)) {
      return false;
    }

    const min = startOfMonth(+mindate);
    const max = endOfMonth(+maxdate);

    return (date >= min || !mindate) && (date <= max || !maxdate);
  }

  getCalendarDates = () => {
    const { datetime } = this.props;
    const selectedDate = new Date(datetime);
    const activeDate =
      selectedDate.toString() === "Invalid Date" ? new Date() : selectedDate;
    const calendarMonth = +activeDate.getMonth() + 1;
    const calendarYear = activeDate.getFullYear();

    return calendar(calendarMonth, calendarYear);
  };

  clickDate = (date) => (event) => {
    event && event.preventDefault();
    const { selected } = this.state;
    const { onDateChange } = this.props;
  };
}

DateView.propTypes = {
  min: PropTypes.instanceOf(Date),
  max: PropTypes.instanceOf(Date),
  date: PropTypes.instanceOf(Date),
  onDateChange: PropTypes.func,
};

export default DateView;
