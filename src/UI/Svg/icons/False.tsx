import React, { FunctionComponent } from "react";
import { Svg, SvgProps } from "../../../UI/Svg";

const Icon: FunctionComponent<SvgProps> = (props) => {
  return (
    <Svg width="17" height="17" viewBox="0 0 17 17" fill="none" {...props}>
      <path
        d="M2 2L15 15"
        stroke="black"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15 2L2 15"
        stroke="black"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default Icon;
