import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

class SinglePin extends React.PureComponent {
  /** @type {React.RefObject<HTMLInputElement>} */
  inputRef = React.createRef();

  state = {
    value: this.props.initialValue,
    focus: false,
  };

  render() {
    const { value } = this.state;
    const { type, inputMode } = this.props;
    const inputType = type === "numeric" ? "tel" : type || "text";
    return (
      <Input
        ref={this.inputRef}
        disabled={this.props.disabled}
        type={this.props.secret ? "password" : inputType}
        pattern={type === "numeric" ? "[0-9]*" : "[A-Z0-9]*"}
        maxLength={1}
        autoComplete="off"
        inputMode={inputMode || "text"}
        onChange={this.handleChange}
        onKeyDown={this.handleKeyDown}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        value={value}
      />
    );
  }

  /**
   *
   * @param {React.KeyboardEvent} event
   */
  handleKeyDown = (event) => {
    if (event.key === "Backspace") {
      this.props.onBackspace();
    }
  };

  /**
   *
   * @param {React.ChangeEvent} event
   */
  handleChange = (event) => {
    const value = this.validate(event.target.value);

    if (this.state.value === value) {
      return;
    }

    if (value.length < 2) {
      this.setState({ value });
      this.props.onChange(value);
    }
  };

  /**
   *
   * @param {React.FocusEvent} event
   */
  handleFocus = (event) => {
    event.target.select();
    this.setState({ focus: true });
  };

  handleBlur = () => {
    this.setState({ focus: false });
  };

  validate(value) {
    if (typeof this.props.validate === "function") {
      return this.props.validate(value);
    }

    if (this.props.type === "numeric") {
      const numCode = value.charCodeAt(0);
      const isInteger =
        numCode >= "0".charCodeAt(0) && numCode <= "9".charCodeAt(0);
      return isInteger ? value : "";
    }

    return value.toUpperCase();
  }

  focus() {
    this.inputRef.current.focus();
  }

  clear() {
    this.setState({ value: "" });
  }
}

SinglePin.propTypes = {
  secret: PropTypes.bool,
  inputType: PropTypes.string,
  onBackspace: PropTypes.func,
  onChange: PropTypes.func,
};

const Input = styled.input`
  padding: 0;
  margin: 0 2px;
  text-align: center;
  border: 1px solid;
  background: transparent;
  width: 50px;
  height: 50px;

  &:focus {
    outline: none;
    box-shadow: none;
  }
`;

export default SinglePin;
