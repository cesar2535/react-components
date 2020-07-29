import React from "react";
import PropTypes from "prop-types";
import { WEEK_DAYS, CALENDAR_MONTHS } from "./config";
import calendar, {
  getDateArray,
  getNextMonth,
  getPreviousMonth,
} from "./utils";
import {
  isDate,
  isSameDay,
  isSameMonth,
  isAfter,
  isBefore,
  formatISO,
  endOfMonth,
  startOfMonth,
  startOfTomorrow,
  differenceInMilliseconds,
} from "date-fns";
import {
  ArrowLeft,
  ArrowRight,
  CalendarContainer,
  CalendarHeader,
  CalendarMonth,
  CalendarGrid,
  CalendarDay,
  CalendarDate,
  HighlightedCalendarDate,
  TodayCalendarDate,
} from "./styles";

class DateView extends React.PureComponent {
  state = {
    ...this.stateFromProps(),
    today: new Date(),
  };

  componentDidMount() {
    const today = new Date();
    const tomorrow = startOfTomorrow();
    this.daytimeout = setTimeout(() => {
      this.setState({ today: new Date() }, this.clearDayTimeout);
    }, differenceInMilliseconds(tomorrow, today));
  }

  componentWillUnmount() {
    this.clearDayTimeout();
  }

  render() {
    return (
      <CalendarContainer>
        {this.renderMonthAndYear()}
        <CalendarGrid>
          <>{Object.keys(WEEK_DAYS).map(this.renderDayLabel)}</>
          <>{this.getCalendarDates().map(this.renderDate)}</>
        </CalendarGrid>
      </CalendarContainer>
    );
  }

  renderMonthAndYear() {
    const { month, year } = this.state;
    const monthname = Object.keys(CALENDAR_MONTHS)[
      Math.max(0, Math.min(month - 1, 11))
    ];
    const props = { onMouseUp: this.clearPressureTimer };

    return (
      <CalendarHeader>
        <ArrowLeft
          title="Previous"
          onMouseDown={this.handlePrevious}
          {...props}
        />
        <CalendarMonth>
          {monthname} {year}
        </CalendarMonth>
        <ArrowRight title="Next" onMouseDown={this.handleNext} {...props} />
      </CalendarHeader>
    );
  }

  renderDayLabel = (day, index) => {
    const daylabel = WEEK_DAYS[day].toUpperCase();
    return (
      <CalendarDay key={daylabel} index={index}>
        {daylabel}
      </CalendarDay>
    );
  };

  /**
   *
   * @param {number[]} date
   * @param {number} index
   */
  renderDate = (date, index) => {
    const { selected, month, year, today, maxdate, mindate } = this.state;

    const _date = new Date(date.join("-"));
    const isSelected = isSameDay(_date, selected);
    const isToday = isSameDay(_date, today);

    const inMonth =
      month && year && isSameMonth(_date, new Date([year, month, 1].join("-")));

    const inRange = !(isBefore(_date, mindate) || isAfter(_date, maxdate));

    const props = {
      index,
      inMonth,
      inRange,
      onClick: () => null,
      title: _date.toDateString(),
    };

    const DateComponent = isSelected
      ? HighlightedCalendarDate
      : isToday
      ? TodayCalendarDate
      : CalendarDate;

    return (
      <DateComponent
        key={formatISO(_date, { representation: "date" })}
        {...props}
      >
        {_date.getDate()}
      </DateComponent>
    );
  };

  stateFromDate({ date, max, min }) {
    const {
      mindate: stateMinDate,
      maxdate: stateMaxDate,
      selected: stateSelected,
    } = this.state || {};

    const minDate = min || stateMinDate;
    const maxDate = max || stateMaxDate;
    const selectedDate = date || stateSelected;

    const mindate = isAfter(minDate, maxDate) ? null : minDate;
    const maxdate = isBefore(maxDate, minDate) ? null : maxDate;
    const selected = this.calendarWithinRange(selectedDate, {
      maxdate,
      mindate,
    })
      ? selectedDate
      : null;

    const calendarDate = selected || new Date();

    const [year, month] = getDateArray(
      this.calendarWithinRange(calendarDate, { maxdate, mindate })
        ? calendarDate
        : maxdate
    );

    return { selected, month, year, maxdate, mindate };
  }

  stateFromProps() {
    return this.stateFromDate(this.props);
  }

  clearDayTimeout = () => {
    this.daytimeout && clearTimeout(this.daytimeout);
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
    const { selected, month, year } = this.state;
    const [selectedYear, selectedMonth] = selected
      ? getDateArray(selected)
      : [];
    return calendar(month || selectedMonth, year || selectedYear);
  };

  gotoDate = (date) => (evt) => {
    evt && evt.preventDefault();
    const { selected, maxdate, mindate } = this.state;
    const isSelected = selected && isSameDay(date, selected);
    const outOfRange = isBefore(date, mindate) || isAfter(date, maxdate);

    !(isSelected || outOfRange) &&
      this.setState(this.stateFromDate({ date }), this.changeHandler(date));
  };

  gotoPreviousMonth = () => {
    const { month, year } = this.state;
    const previousMonth = getPreviousMonth(month, year);
    const previous = new Date([previousMonth.year, previousMonth.month]);

    this.calendarWithinRange(previous) && this.setState(previousMonth);
  };

  gotoNextMonth = () => {
    const { month, year } = this.state;
    const nextMonth = getNextMonth(month, year);
    const next = new Date([nextMonth.year, nextMonth.month]);

    this.calendarWithinRange(next) && this.setState(nextMonth);
  };

  gotoPreviousYear = () => {
    const { month, year } = this.state;
    const previous = new Date([year - 1, month]);
    this.calendarWithinRange(previous) && this.setState({ year: year - 1 });
  };

  gotoNextYear = () => {
    const { month, year } = this.state;
    const next = new Date([year + 1, month]);
    this.calendarWithinRange(next) && this.setState({ year: year + 1 });
  };

  handlePressure = (event) => (fn, fnShift) => {
    if (typeof fn === "function" && typeof fnShift === "function") {
      this.pressureShift = event.shiftKey;
      this.pressureShift ? fnShift() : fn();

      this.pressureTimeout = setTimeout(() => {
        this.pressureTimer = setInterval(
          () => (this.pressureShift ? fnShift() : fn()),
          100
        );
      }, 500);

      document.addEventListener("keyup", this.handlePressureKeyup);
      document.addEventListener("keydown", this.handlePressureKeydown);
    }
  };

  handlePressureKeyup = (event) => {
    event.preventDefault();
    !event.shiftKey && (this.pressureShift = !event.shiftKey && false);
  };

  handlePressureKeydown = (event) => {
    event.preventDefault();
    event.shiftKey && (this.pressureShift = true);
  };

  clearPressureTimer = () => {
    this.pressureTimer && clearInterval(this.pressureTimer);
    this.pressureTimeout && clearTimeout(this.pressureTimeout);

    this.pressureShift = false;

    document.removeEventListener("keyup", this.handlePressureKeyup);
    document.removeEventListener("keydown", this.handlePressureKeydown);
  };

  handlePrevious = (event) => {
    if (event) {
      event.preventDefault();
      this.handlePressure(event)(this.gotoPreviousMonth, this.gotoPreviousYear);
    }
  };

  handleNext = (event) => {
    if (event) {
      event.preventDefault();
      this.handlePressure(event)(this.gotoNextMonth, this.gotoNextYear);
    }
  };
}

DateView.propTypes = {
  min: PropTypes.instanceOf(Date),
  max: PropTypes.instanceOf(Date),
  date: PropTypes.instanceOf(Date),
  onDateChange: PropTypes.func,
};

export default DateView;
