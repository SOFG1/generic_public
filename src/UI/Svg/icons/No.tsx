import React, {FunctionComponent} from 'react';
import {Svg, SvgProps} from '../../../UI/Svg';

const Icon: FunctionComponent<SvgProps> = (props) => {
    return (
        <Svg width="20" height="20" viewBox="0 0 20 20" fill="none" {...props} >
            <path d="M7 7L10 10M13 13L10 10M10 10L13 7M10 10L7 13" stroke="#000" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
            <rect x="0.5" y="0.5" width="19" height="19" rx="9.5" stroke="#000"/>
        </Svg>
    );
};

export default Icon;
