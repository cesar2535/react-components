import React from "react";

const getDiameter = (radius = 100) => Math.round(Math.PI * radius * 2);
const getOffset = (val = 0, diameter) =>
  Math.round(((100 - Math.min(val, 100)) / 100) * diameter);

class CircularProgress extends React.PureComponent {
  render() {
    const {
      progress,
      size,
      bgColor,
      progressColor,
      lineWidth,
      roundedStroke,
      animate,
      animationDuration,
    } = this.props;
    const transition = animate
      ? `stroke-dashoffset ${animationDuration} ease-out`
      : undefined;
    const strokeLinecap = roundedStroke ? "round" : "butt";
    const radius = (size - lineWidth) / 2;
    const viewoBox = `0 0 ${size} ${size}`;
    const dashArray = getDiameter(radius);
    const dashOffset = getOffset(progress, dashArray);

    return (
      <svg width={size} height={size} viewBox={viewoBox}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={bgColor}
          strokeWidth={`${lineWidth}px`}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={progressColor}
          strokeWidth={`${lineWidth}px`}
          strokeLinecap={strokeLinecap}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          style={{
            strokeDasharray: dashArray,
            strokeDashoffset: dashOffset,
            transition,
          }}
        />
        {this.renderIcon()}
        {this.renderCover()}
        {this.getText(radius)}
      </svg>
    );
  }

  renderIcon() {
    const { size, icon } = this.props;
    const imgSize = size * 0.6;
    const imgXY = (size - imgSize) / 2;

    if (!icon) {
      return null;
    }

    return (
      <image
        x={imgXY}
        y={imgXY}
        width={imgSize}
        height={imgSize}
        xlinkHref={icon}
      />
    );
  }

  renderCover() {
    const {
      bgColor,
      size,
      lineWidth,
      progress,
      animate,
      animationDuration,
    } = this.props;
    const transition = animate
      ? `stroke-dashoffset ${animationDuration} ease-out`
      : undefined;
    const radius = (size - lineWidth) / 4;
    const dashArray = getDiameter(radius);
    const dashOffset = getOffset(100 - progress, dashArray);
    return (
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={bgColor}
        strokeOpacity="0.3"
        strokeWidth={radius * 2}
        transform={`
          rotate(-90 ${size / 2} ${size / 2}) 
          scale(1, -1) 
          translate(0, -${size})
        `}
        style={{
          strokeDasharray: dashArray,
          strokeDashoffset: dashOffset,
          transition,
        }}
      />
    );
  }

  getText(radius) {
    const {
      progress,
      showPercentage,
      textColor,
      textStyle,
      percentSpacing,
      showPercentageSymbol,
    } = this.props;
    if (!showPercentage) return;

    return (
      <text
        style={textStyle}
        fill={textColor}
        x={radius}
        y={radius}
        textAnchor="middle"
        dominantBaseline="central"
      >
        {progress}
        {showPercentageSymbol && <tspan dx={percentSpacing}>%</tspan>}
      </text>
    );
  }
}

CircularProgress.defaultProps = {
  progress: 0,
  showPercentage: true,
  showPercentageSymbol: true,
  progressColor: "rgb(76, 154, 255)",
  bgColor: "#ecedf0",
  textColor: "#fff",
  size: "100",
  lineWidth: "25",
  percentSpacing: 10,
  textStyle: { font: "bold 2.5rem Helvetica, Arial, sans-serif" },
  animate: true,
  animationDuration: "1s",
};

export default CircularProgress;
