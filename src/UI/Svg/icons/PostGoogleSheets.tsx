import React, { FunctionComponent } from "react";
import { Svg, SvgProps } from "..";

const Icon: FunctionComponent<SvgProps> = (props) => {
  return (
    <Svg width="35" height="35" viewBox="0 0 35 35" fill="none" {...props}>
      <rect x="10.5" y="11.5" width="12" height="14" rx="1.5" fill="white" stroke="black" />
      <line x1="12" y1="13.5" x2="18" y2="13.5" stroke="black" />
      <line x1="12" y1="15.5" x2="18" y2="15.5" stroke="black" />
      <line x1="12" y1="17.5" x2="15" y2="17.5" stroke="black" />
      <line x1="12" y1="19.5" x2="20" y2="19.5" stroke="black" />
      <line x1="12" y1="21.5" x2="18" y2="21.5" stroke="black" />
      <line x1="12" y1="23.5" x2="20" y2="23.5" stroke="black" />
      <circle cx="22.5" cy="13.5" r="5.5" fill="white" stroke="black" />
      <line x1="20" y1="13.5" x2="25" y2="13.5" stroke="black" />
      <line x1="22.5" y1="11" x2="22.5" y2="16" stroke="black" />
    </Svg>
  );
};

export default Icon;
