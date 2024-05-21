import React from "react";
import {Svg, SvgProps} from "../index";

function Icon(props:SvgProps) {
    return (
        <Svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="5"
            fill="none"
            viewBox="0 0 16 5"
        >
            <g fill="#000">
                <ellipse cx="2.747" cy="2.276" rx="1.786" ry="1.81"></ellipse>
                <ellipse cx="8.461" cy="2.276" rx="1.786" ry="1.81"></ellipse>
                <ellipse cx="14.175" cy="2.276" rx="1.786" ry="1.81"></ellipse>
            </g>
        </Svg>
    );
}

export default Icon;
