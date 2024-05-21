import React, { FunctionComponent } from "react";
import { Svg, SvgProps } from "..";

const Icon: FunctionComponent<SvgProps> = (props) => {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg"
         width="24"
         height="24"
         fill="none"
         viewBox="0 0 24 24"
    >
        <g>
            <rect
                width="22"
                height="22"
                x="1"
                y="1"
                fill="#fff"
                stroke="#000"
                rx="1"
            ></rect>
            <rect width="22" height="5" x="1" y="1" stroke="#000" rx="1"></rect>
            <rect width="5" height="22" x="1" y="1" stroke="#000" rx="1"></rect>
            <g>
                <g stroke="#000">
                    <path d="M17.666 10.666V18"></path>
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M20.333 12.667L17.667 10 15 12.667"
                    ></path>
                </g>
                <g>
                    <path
                        fill="#000"
                        d="M10.667 17.167a.5.5 0 100 1v-1zm0 1H18v-1h-7.333v1z"
                    ></path>
                    <path
                        stroke="#000"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12.667 15L10 17.667l2.667 2.666"
                    ></path>
                </g>
            </g>
        </g>
    </Svg>
  );
};

export default Icon;
