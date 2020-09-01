import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

class SingleOtp extends React.PureComponent {
  /** @type {React.RefObject<HTMLInputElement>} */
  inputRef = React.createRef();

  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.isFocused !== prevProps.isFocused &&
      this.inputRef.current &&
      this.props.isFocused
    ) {
      this.inputRef.current.focus();
      this.inputRef.current.select();
    }
  }

  render() {
    const { isFocused, disabled, ...rest } = this.props;

    return (
      <div style={{ display: "flex", alignItems: "center" }}>
        <Input
          ref={this.inputRef}
          autoComplete="off"
          maxLength={1}
          disabled={disabled}
          {...rest}
        />
      </div>
    );
  }
}

SingleOtp.propTypes = {
  isFocused: PropTypes.bool,
};

const Input = styled.input`
  width: 1em;
  text-align: center;
  box-sizing: content-box;
`;

export default SingleOtp;
