import React, { FunctionComponent } from 'react';
import { Svg, SvgProps } from '../../../UI/Svg';

const Icon: FunctionComponent<SvgProps> = (props) => {
    return (
        <Svg width="23" height="23" viewBox="0 0 23 23" fill="none" {...props} >
            <circle cx="11.5" cy="11.5" r="11" fill="white" stroke="black" />
            <path d="M6 11.1111L9.7931 15L17 8" stroke="black" strokeWidth="2" strokeLinecap="round"
                strokeLinejoin="round" />
        </Svg>
    );
};

export default Icon;
