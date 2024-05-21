import React, {FunctionComponent} from 'react';
import { Svg, SvgProps } from '../../../UI/Svg';

const Icon: FunctionComponent<SvgProps> = ({stroke="#000", ...props}) => {
    return (
        <Svg width="14" height="8" viewBox="0 0 14 8"  fill={"none"} {...props} >
            <path d="M13 1L7 7L1 1" stroke={stroke}/>
        </Svg>
    );
};

export default Icon;
