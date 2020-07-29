import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { CALENDAR_MONTHS } from "./config";

class MonthView extends React.PureComponent {
  render() {
    const { year } = this.props;
    return (
      <MonthContainer>
        <MonthHeader>{year}</MonthHeader>
        <MonthGrid>
          {Object.keys(CALENDAR_MONTHS).map(this.renderMonth)}
        </MonthGrid>
      </MonthContainer>
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
}

MonthView.propTypes = {
  year: PropTypes.number,
  month: PropTypes.number,
};

const MonthContainer = styled.div`
  font-size: 5px;
  border: 2px solid #06c;
  border-radius: 5px;
  overflow: hidden;
`;

const MonthHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  font-weight: 500;
  font-size: 5em;
  color: #06c;
  text-align: center;
  padding: 0.5em 0.25em;
  word-spacing: 5px;
  user-select: none;
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
