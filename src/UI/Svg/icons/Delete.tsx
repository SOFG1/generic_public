import React, {FunctionComponent} from 'react';
import {Svg, SvgProps} from '../../../UI/Svg';

const Icon: FunctionComponent<SvgProps> = (props) => {
    return (
        <Svg width="12" height="2" viewBox="0 0 12 2" fill="none" {...props} >
           <line y1="1" x2="12" y2="1" stroke="black" strokeWidth="2"/>
        </Svg>
    );
};

export default Icon;
