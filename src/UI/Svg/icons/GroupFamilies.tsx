import React, { FunctionComponent } from "react";
import { Svg, SvgProps } from "..";

const Icon: FunctionComponent<SvgProps> = (props) => {
  return (
    <Svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="21"
        height="26"
        fill="none"
        viewBox="0 0 21 26"
    >
      <g stroke="#000">
        <path d="M10.498 10L10.498 21"></path>
        <path d="M3.352 3.646L10.352 10.646"></path>
        <path d="M17.352 4.354L10.352 11.354"></path>
        <circle cx="10.498" cy="23.5" r="2" fill="#fff"></circle>
        <circle cx="10.498" cy="10.5" r="2" fill="#fff"></circle>
        <circle cx="2.498" cy="2.5" r="2" fill="#fff"></circle>
        <circle cx="18.498" cy="2.5" r="2" fill="#fff"></circle>
      </g>
    </Svg>
  );
};

export default Icon;
