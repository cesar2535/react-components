import React from "react";
import PropTypes from "prop-types";

import Context from "./Context";

const Accordion = React.forwardRef((props, ref) => {
  const { as: Component, activeKey, children, className } = props;

  return (
    <Context.Provider value={activeKey}>
      <Component ref={ref} className={className}>
        {children}
      </Component>
    </Context.Provider>
  );
});

Accordion.propTypes = {
  as: PropTypes.elementType,
  activeKey: PropTypes.string,
};

Accordion.defaultProps = {
  as: "div",
};

export default Accordion;
