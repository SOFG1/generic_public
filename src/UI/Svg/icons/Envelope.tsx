import React, { FunctionComponent } from "react";
import { Svg, SvgProps } from "../../../UI/Svg";

const Icon: FunctionComponent<SvgProps> = (props) => {
  return (
    <Svg width="13" height="11" viewBox="0 0 13 11" fill={"none"} {...props}>
      <path
        d="M10.625 0.5C11.1223 0.5 11.5992 0.702609 11.9508 1.06326C12.3025 1.4239 12.5 1.91305 12.5 2.42308V8.57692C12.5 9.08696 12.3025 9.5761 11.9508 9.93674C11.5992 10.2974 11.1223 10.5 10.625 10.5H2.375C1.87772 10.5 1.40081 10.2974 1.04917 9.93674C0.697544 9.5761 0.5 9.08696 0.5 8.57692V2.42308C0.5 1.91305 0.697544 1.4239 1.04917 1.06326C1.40081 0.702609 1.87772 0.5 2.375 0.5H10.625ZM11.75 3.54692L6.6905 6.60077C6.64267 6.62957 6.5892 6.64714 6.53395 6.65219C6.4787 6.65725 6.42305 6.64967 6.371 6.63L6.3095 6.60077L1.25 3.54846V8.57692C1.25 8.88294 1.36853 9.17643 1.5795 9.39282C1.79048 9.6092 2.07663 9.73077 2.375 9.73077H10.625C10.9234 9.73077 11.2095 9.6092 11.4205 9.39282C11.6315 9.17643 11.75 8.88294 11.75 8.57692V3.54692ZM10.625 1.26923H2.375C2.07663 1.26923 1.79048 1.3908 1.5795 1.60718C1.36853 1.82357 1.25 2.11706 1.25 2.42308V2.65538L6.5 5.82308L11.75 2.65385V2.42308C11.75 2.11706 11.6315 1.82357 11.4205 1.60718C11.2095 1.3908 10.9234 1.26923 10.625 1.26923Z"
        fill="#000000"
      />
    </Svg>
  );
};

export default Icon;