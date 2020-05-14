import React from "react";
import PropTypes from "prop-types";
import { WEEK_DAYS } from "./config";
import calendar from "./utils";

class DateView extends React.PureComponent {
  componentDidMount() {}

  render() {
    return null;
  }
  renderDayLabel = (day, index) => {
    const daylabel = WEEK_DAYS[day].toUpperCase();
    return daylabel;
  };
  renderDate = (date, index) => {};

  getCalendarDates = () => {
    const { current, datetime } = this.props;
    const selectedDate = new Date(datetime);
    const activeDate =
      selectedDate.toString() === "Invalid Date" ? current : selectedDate;
    const calendarMonth = +activeDate.getMonth() + 1;
    const calendarYear = activeDate.getFullYear();

    return calendar(calendarMonth, calendarYear);
  };
}

DateView.propTypes = {
  current: PropTypes.instanceOf(Date),
  datetime: PropTypes.string,
};

export default DateView;
