import React, {FunctionComponent} from 'react';
import {Svg, SvgProps} from '../../../UI/Svg';

const Icon: FunctionComponent<SvgProps> = (props) => {
    return (
        <Svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...props} >
         <line x1="0.989685" y1="8.38135" x2="15.2783" y2="8.38135" stroke="black" strokeWidth="2"/>
<line x1="8.48454" y1="0.288574" x2="8.48454" y2="15.8762" stroke="black" strokeWidth="2"/>
        </Svg>
    );
};

export default Icon;
