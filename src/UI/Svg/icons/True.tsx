import React, { FunctionComponent } from "react";
import { Svg, SvgProps } from "../../../UI/Svg";

const Icon: FunctionComponent<SvgProps> = (props) => {
  return (
    <Svg width="21" height="15" viewBox="0 0 21 15" fill="none" {...props}>
      <path
        d="M2 7L8.5 13.5L19.5 1.5"
        stroke="black"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default Icon;
