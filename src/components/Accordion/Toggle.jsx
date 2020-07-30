import React, { useContext } from "react";
import PropTypes from "prop-types";
import Context from "./Context";

const Toggle = React.forwardRef((props, ref) => {
  const { as: Component, eventKey, onClick, children } = props;
  const contextEventKey = useContext(Context);

  return (
    <Component
      ref={ref}
      onClick={(event) => {
        const eventKeyPassed = eventKey === contextEventKey ? null : eventKey;
        onClick(eventKeyPassed, event);
      }}
    >
      {children}
    </Component>
  );
});

Toggle.propTypes = {
  as: PropTypes.elementType,
  eventKey: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

Toggle.defaultProps = {
  as: "button",
  onClick: () => null,
};

export default Toggle;
