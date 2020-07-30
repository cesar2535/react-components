import React, { useContext } from "react";
import PropTypes from "prop-types";

import Context from "./Context";

const Collapse = React.forwardRef((props, ref) => {
  const { as: Component, className, children, eventKey } = props;
  const contextEventKey = useContext(Context);

  const style =
    contextEventKey === eventKey
      ? { overflow: "hidden" }
      : { maxHeight: 0, overflow: "hidden" };
  return (
    <Component
      ref={ref}
      className={className}
      style={style}
      selected={contextEventKey === eventKey}
    >
      {children}
    </Component>
  );
});

Collapse.propTypes = {
  as: PropTypes.elementType,
  eventKey: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

Collapse.defaultProps = {
  as: "div",
};

export default Collapse;
