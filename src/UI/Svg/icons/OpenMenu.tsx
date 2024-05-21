import React, {FunctionComponent} from 'react';
import {Svg, SvgProps} from '../../../UI/Svg';

const Icon: FunctionComponent<SvgProps> = (props) => {
    return (
        <Svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...props} >
            <circle cx="2" cy="2" r="2" fill="#F06543"/>
            <circle cx="2" cy="8" r="2" fill="#F06543"/>
            <circle cx="2" cy="14" r="2" fill="#F06543"/>
            <circle cx="8" cy="2" r="2" fill="#F06543"/>
            <circle cx="8" cy="8" r="2" fill="#F06543"/>
            <circle cx="8" cy="14" r="2" fill="#F06543"/>
            <circle cx="14" cy="2" r="2" fill="#F06543"/>
            <circle cx="14" cy="8" r="2" fill="#F06543"/>
            <circle cx="14" cy="14" r="2" fill="#F06543"/>
        </Svg>
    );
};

export default Icon;
