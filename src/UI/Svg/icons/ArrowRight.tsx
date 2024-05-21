import React from "react";
import {DisabledSvg} from "../index";
import {IDisableSvg} from "../types";



function Icon(props:IDisableSvg) {
    return (
        <DisabledSvg
            $activeColor="rgba(0, 0, 0, 1)"
            $disabledColor="rgba(188, 188, 188, 1)"
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="5"
            height="7"
            fill="none"
            viewBox="0 0 5 7"
        >
            <path stroke="#BCBCBC" d="M1 1l2.5 2.5L1 6"></path>
        </DisabledSvg>
    );
}

export default Icon;
