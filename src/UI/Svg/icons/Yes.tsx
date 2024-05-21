import React, {FunctionComponent} from 'react';
import {Svg, SvgProps} from '../../../UI/Svg';

const Icon: FunctionComponent<SvgProps> = (props) => {
    return (
        <Svg width="20" height="20" viewBox="0 0 20 20" fill="none" {...props} >
            <path d="M5 10.8182L8.125 14L15 7" stroke="#1BBDD4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <rect x="0.5" y="0.5" width="19" height="19" rx="9.5" stroke="#1BBDD4"/>
        </Svg>
    );
};

export default Icon;
