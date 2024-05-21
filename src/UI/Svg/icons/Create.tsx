import React, {SVGProps} from "react";
import {Svg} from "../index";

interface IProps extends SVGProps<SVGSVGElement>{}

function Icon(props:IProps) {
    return (
        <Svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="none"
            viewBox="0 0 20 20"
        >
            <g stroke="#000" strokeLinecap="round">
                <path d="M1 9.5h18"></path>
                <path d="M10.5 1v18"></path>
            </g>
        </Svg>
    );
}

export default Icon;
