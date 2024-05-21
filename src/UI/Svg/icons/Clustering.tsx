import React, { FunctionComponent } from "react";
import { Svg, SvgProps } from "..";

const Icon: FunctionComponent<SvgProps> = (props) => {
  return (
    <Svg  {...props}
          xmlns="http://www.w3.org/2000/svg"
          width="34"
          height="20"
          fill="none"
          viewBox="0 0 34 20"
    >
      <path
          fill="#000"
          fillRule="evenodd"
          d="M9.998 19a9 9 0 100-18 9 9 0 000 18zm0 1c5.523 0 10-4.477 10-10s-4.477-10-10-10-10 4.477-10 10 4.477 10 10 10zm14-1a9 9 0 100-18 9 9 0 000 18zm0 1c5.523 0 10-4.477 10-10s-4.477-10-10-10-10 4.477-10 10 4.477 10 10 10z"
          clipRule="evenodd"
      ></path>
    </Svg>
  );
};

export default Icon;
