import React, { FunctionComponent } from 'react';
import { Svg, SvgProps } from '..';

const Icon: FunctionComponent<SvgProps> = (props) => {
    return (
        <Svg width="23" height="23" viewBox="0 0 23 23" fill="none" {...props} >
            <circle cx="11.5" cy="11.5" r="11" stroke="black" />
            <path d="M8 15L15.2069 8" stroke="black" strokeWidth="2" strokeLinecap="round" />
            <path d="M8.10339 7.89648L15.1034 15.1034" stroke="black" strokeWidth="2" strokeLinecap="round" />
        </Svg>
    );
};

export default Icon;
