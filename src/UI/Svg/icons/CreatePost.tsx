import React, { FunctionComponent } from 'react';
import { Svg, SvgProps } from '../../../UI/Svg';

const Icon: FunctionComponent<SvgProps> = (props) => {
    return (
        <Svg  width="18" height="18" viewBox="0 0 18 18" fill="none" {...props} >
            <line x1="9" y1="17" x2="9" y2="1" stroke="black" strokeWidth="2" strokeLinecap="round" />
            <line x1="1" y1="9" x2="17" y2="9" stroke="black" strokeWidth="2" strokeLinecap="round" />
        </Svg>
    );
};

export default Icon;
