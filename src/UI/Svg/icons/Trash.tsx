import React, {FunctionComponent} from 'react';
import DisabledSvg from "../DisabledSvg";
import {IDisableSvg} from "../types";
import {Svg} from "../index";

const Icon: FunctionComponent<IDisableSvg> = (props) => {
    return (
        <DisabledSvg
            $activeColor="#000"
            $disabledColor="rgba(220, 220, 220, 1)"
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="21"
            height="23"
            fill="none"
            viewBox="0 0 21 23"
        >
            <g stroke="#000">
                <g>
                    <path
                        fill="#fff"
                        d="M1.234 4.931a1 1 0 01.981-1.192h16.66a1 1 0 01.982 1.192L16.67 21.192a1 1 0 01-.982.808H5.403a1 1 0 01-.982-.808L1.234 4.932z"
                    ></path>
                    <path d="M10.631 6.783L10.631 18.957"></path>
                    <path d="M5.566 6.783l1.66 12.174"></path>
                    <path d="M15.525 6.783l-1.66 12.174"></path>
                </g>
                <path
                    fill="#fff"
                    d="M5.523 2a1 1 0 011-1h7.13a1 1 0 011 1v1.74h-9.13V2z"
                ></path>
            </g>
        </DisabledSvg>
    );
};

export default Icon;
