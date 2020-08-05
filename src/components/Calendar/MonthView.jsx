import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { CALENDAR_MONTHS } from "./config";
import { ArrowLeft, ArrowRight, CalendarHeader, CalendarMonth } from "./styles";

class MonthView extends React.PureComponent {
  render() {
    return (
      <MonthContainer>
        {this.renderHeader()}
        <MonthGrid>
          {Object.keys(CALENDAR_MONTHS).map(this.renderMonth)}
        </MonthGrid>
      </MonthContainer>
    );
  }

  renderHeader() {
    const props = { onMouseUp: this.clearPressureTimer };

    return (
      <CalendarHeader>
        <ArrowLeft
          title="Previous"
          onMouseDown={this.handlePrevious}
          {...props}
        />
        <CalendarMonth>{this.props.year}</CalendarMonth>
        <ArrowRight title="Next" onMouseDown={this.handleNext} {...props} />
      </CalendarHeader>
    );
  }

  renderMonth = (month, index) => {
    const isSelected = this.props.month === index + 1;

    const MonthComponent = isSelected ? HighlightMonthCell : MonthCell;
    return (
      <MonthComponent key={month} index={index}>
        {CALENDAR_MONTHS[month]}
      </MonthComponent>
    );
  };

  /**
   * @param {React.MouseEvent} event
   */
  handleNext = (event) => {
    if (event) {
      event.preventDefault();
      this.handlePressure("next");
    }
  };

  /**
   * @param {React.MouseEvent} event
   */
  handlePrevious = (event) => {
    if (event) {
      event.preventDefault();
      this.handlePressure("previous");
    }
  };

  /**
   *
   * @param {"next"|"previous"} type
   */
  handlePressure = (type) => {
    if (typeof this.props.onYearChange === "function") {
      this.props.onYearChange(type);

      this.pressureTimeout = setTimeout(() => {
        this.pressureTimer = setInterval(
          () => this.props.onYearChange(type),
          100
        );
      }, 500);
    }
  };

  clearPressureTimer = () => {
    this.pressureTimer && clearInterval(this.pressureTimer);
    this.pressureTimeout && clearTimeout(this.pressureTimeout);
  };
}

MonthView.propTypes = {
  year: PropTypes.number,
  month: PropTypes.number,
  onYearChange: PropTypes.func,
};

const MonthContainer = styled.div`
  font-size: 5px;
  border: 2px solid #06c;
  border-radius: 5px;
  overflow: hidden;
`;

const MonthGrid = styled.div`
  display: grid;
  grid-template: 2 / repeat(6, auto);
`;
const MonthCell = styled.div`
  font-size: 4em;
  text-align: center;
  align-self: center;
  letter-spacing: 0.1rem;
  padding: 0.6em 0.25em;
  position: relative;
  user-select: none;
  grid-column: ${(props) => (props.index % 6) + 1} / span 1;
  transition: all 0.4s ease-out;
  :hover {
    color: #06c;
    background: rgba(0, 102, 204, 0.075);
  }
`;
const HighlightMonthCell = styled(MonthCell)`
  color: #fff !important;
  background: #06c !important;
`;

export default MonthView;
