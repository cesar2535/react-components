import React from "react";
import PropTypes from "prop-types";

class SingleOtp extends React.PureComponent {
  /** @type {React.RefObject<HTMLInputElement>} */
  inputRef = React.createRef();

  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.focused !== prevProps.focused &&
      this.inputRef.current &&
      this.props.focused
    ) {
      this.inputRef.current.focus();
      this.inputRef.current.select();
    }
  }

  render() {
    const { disabled, ...rest } = this.props;

    return (
      <div>
        <input
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
  focused: PropTypes.bool,
};

export default SingleOtp;
