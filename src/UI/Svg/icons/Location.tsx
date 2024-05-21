import React, { FunctionComponent } from "react";
import { Svg, SvgProps } from "../../../UI/Svg";

const Icon: FunctionComponent<SvgProps> = (props) => {
  return (
    <Svg width="7" height="9" viewBox="0 0 7 9" fill="none" {...props}>
      <path
        d="M6 3.15002C6 1.49002 4.66 0.150024 3 0.150024C1.34 0.150024 0 1.49002 0 3.15002C0 3.85002 0.250004 4.49 0.660004 5H0.649994L3.00999 8.21997L5.36 5H5.35001C5.75001 4.49 6.00999 3.85002 6.00999 3.15002H6ZM3 4.15002C2.45 4.15002 2 3.70002 2 3.15002C2 2.60002 2.45 2.15002 3 2.15002C3.55 2.15002 4 2.60002 4 3.15002C4 3.70002 3.55 4.15002 3 4.15002Z"
        fill="#231F20"
      />
    </Svg>
  );
};

export default Icon;
