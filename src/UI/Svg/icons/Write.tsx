import React from "react";
import {SvgProps} from "../types";
import {DisabledSvg} from "../index";


interface IProps extends SvgProps{
    disabled?:boolean
}
function Icon({...props}:IProps) {
    return (
        <DisabledSvg
            $activeColor="#000"
            $disabledColor="rgba(220, 220, 220, 1)"
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            fill="none"
            viewBox="0 0 25 25"
        >
            <g stroke="#000">
                <path d="M13.218 5h-10.5a2 2 0 00-2 2v15a2 2 0 002 2h15a2 2 0 002-2V11.5"></path>
                <path d="M22.617 4.95l-9.75 9.75-3.947 1.766a.5.5 0 01-.66-.662l1.778-3.932 9.75-9.75a2 2 0 112.829 2.828z"></path>
            </g>
        </DisabledSvg>
    );
}

export default Icon;
