import React, { FunctionComponent } from "react";
import { Svg, SvgProps } from "../../../UI/Svg";

const Icon: FunctionComponent<SvgProps> = (props) => {
  return (
    <Svg width="37" height="42" viewBox="0 0 37 42" fill="none" {...props}>
      <g clipPath="url(#clip0_2589_14187)">
        <path
          d="M21.5876 3.57617C30.4085 3.57617 32.1733 14.301 32.1733 21.4497C32.1733 28.5984 37.0034 33.9591 37.0034 33.9591H18.0614H18.9421H0C0 33.9591 4.83013 28.5984 4.83013 21.4497C4.83013 14.301 6.59154 3.57617 15.4124 3.57617H21.5876Z"
          fill="#221F20" />
        <path
          d="M12.7666 36.6394C12.7666 36.6394 12.7666 42.0001 18.0577 42.0001C23.3488 42.0001 22.9222 36.6394 22.9222 36.6394H12.7666Z"
          fill="#221F20" />
        <path
          d="M21.3573 3.70158C21.3573 3.70158 21.3573 0 17.7038 0C14.0502 0 14.3461 3.70158 14.3461 3.70158H21.3573Z"
          fill="#221F20" />
      </g>
      <defs>
        <clipPath id="clip0_2589_14187">
          <rect width="37" height="42" fill="white" />
        </clipPath>
      </defs>
    </Svg>
  );
};

export default Icon;
