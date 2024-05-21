import React, {FunctionComponent} from 'react';
import { Svg, SvgProps } from '../../../UI/Svg';

const Icon: FunctionComponent<SvgProps> = (props) => {
    return (
        <Svg width="45" height="45" viewBox="0 0 45 45"  fill={"none"} {...props} >
            <path d="M15 7.5L30 22.5L15 37.5" strokeWidth="3.75" strokeLinecap="round" strokeLinejoin="round"/>
        </Svg>
    );
};

export default Icon;