import React from "react";
import PropTypes from "prop-types";
import SingleOtp from "./SingleOtp";

const Rgx = {
  decimal: /^[0-9]*\.?[0-9]*$/,
};

const KeyCode = {
  BACKSPACE: 8,
  LEFT_ARROW: 37,
  RIGHT_ARROW: 39,
  DELETE: 46,
  SPACEBAR: 32,
};

class OtpInput extends React.PureComponent {
  state = {
    activeIdx: 0,
  };

  render() {
    const { numInputs } = this.props;

    const otp = this.props.value ? this.props.value.toString().split("") : [];
    const inputs = Array(numInputs).map(this.renderInput(otp));

    return <div>{inputs}</div>;
  }

  renderInput = (otp) => (val, idx) => {
    const { activeIdx } = this.state;
    return (
      <SingleOtp
        inputMode="decimal"
        focused={activeIdx === idx}
        value={otp && otp[idx]}
        onChange={this.handleChange}
        onKeyDown={this.handleKeyDown}
        onFocus={this.handleFocus(idx)}
        onBlur={this.handleBlur(idx)}
      />
    );
  };

  focusInput(idx) {
    const { numInputs } = this.props;
    const activeIdx = Math.max(Math.min(numInputs - 1, idx), 0);

    return { activeIdx };
  }

  focusNextInput() {
    this.setState(({ activeIdx }) => this.focusInput(activeIdx + 1));
  }
  focusPrevInput() {
    this.setState(({ activeIdx }) => this.focusInput(activeIdx - 1));
  }

  getOtpValue() {
    const { value } = this.props;
    return value
      ? typeof value === "string"
        ? value.split("")
        : value.toString().split("")
      : [];
  }

  /** @param {string} value */
  validateInput(value) {
    return value.length === 1;
  }

  changeCodeAtFocus(value) {
    const { activeIdx } = this.state;
    const otpVal = this.getOtpValue();
    otpVal[activeIdx] = value;

    this.focusNextInput();
    this.handleOtpChange(otpVal);
  }

  handleOtpChange(otp) {
    const value = otp.join("");

    this.props.onChange(value);
  }

  /** @param {React.ChangeEvent} event */
  handleChange = (event) => {
    const { value } = event.target;

    if (this.validateInput(value)) {
      this.changeCodeAtFocus(value);
    }
  };

  /** @param {React.KeyboardEvent} event */
  handleKeyDown = (event) => {
    if (event.keyCode === KeyCode.BACKSPACE || event.key === "Backspace") {
    } else if (event.keyCode === KeyCode.DELETE || event.key === "Delete") {
    } else if (
      event.keyCode === KeyCode.LEFT_ARROW ||
      event.key === "ArrowLeft"
    ) {
    } else if (
      event.keyCode === KeyCode.RIGHT_ARROW ||
      event.key === "ArrowRight"
    ) {
    } else {
      event.preventDefault();
    }
  };

  handleFocus = (idx) => (event) => {
    this.setState({ activeIdx: idx });
  };
  handleBlur = (idx) => () => {
    this.setState({ activeIdx: -1 });
  };
}

OtpInput.propTypes = {
  numInputs: PropTypes.number,
};

OtpInput.defaultProps = {
  numInputs: 6,
};

export default OtpInput;
