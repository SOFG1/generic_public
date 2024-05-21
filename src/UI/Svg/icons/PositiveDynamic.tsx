import React, {FunctionComponent} from 'react';
import {Svg, SvgProps} from '../../../UI/Svg';

const Icon: FunctionComponent<SvgProps> = (props) => {
    return (
        <Svg width="9" height="5" viewBox="0 0 9 5" fill="none" {...props} >
            <path d="M4.5 0L0 4.5H9L4.5 0Z" fill="#00BA2A"/>
        </Svg>
    );
};

export default Icon;
