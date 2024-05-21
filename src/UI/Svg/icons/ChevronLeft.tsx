import React, {FunctionComponent} from 'react';
import { Svg, SvgProps } from '../../../UI/Svg';

const Icon: FunctionComponent<SvgProps> = (props) => {
    return (
        <Svg width="45" height="45" viewBox="0 0 45 45"  fill={"none"} {...props} >
            <path d="M28.125 7.5L13.125 22.5L28.125 37.5" strokeWidth="3.75" strokeLinecap="round" strokeLinejoin="round"/>
        </Svg>
    );
};

export default Icon;
