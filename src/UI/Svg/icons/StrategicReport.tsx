import React, { FunctionComponent } from 'react';
import { Svg, SvgProps } from '..';

const Icon: FunctionComponent<SvgProps> = (props) => {
    return (
        <Svg {...props} xmlns="http://www.w3.org/2000/svg"
             width="27"
             height="26"
             fill="none"
             viewBox="0 0 27 26"
        >
            <g stroke="#000">
                <g>
                    <rect width="17" height="23" x="1" y="2" rx="1"></rect>
                    <path strokeLinecap="round" d="M4.5 18.5L14.5 18.5"></path>
                    <path strokeLinecap="round" d="M4.5 15.5L14.5 15.5"></path>
                    <path strokeLinecap="round" d="M4.5 21.5L14.5 21.5"></path>
                </g>
                <path
                    fill="#fff"
                    d="M24.656 4.95l-9.75 9.75-3.947 1.766a.5.5 0 01-.66-.662l1.778-3.932 9.75-9.75a2 2 0 012.829 2.828z"
                ></path>
            </g>
        </Svg>
    );
};

export default Icon;
