import React, {FunctionComponent} from 'react';
import {Svg, SvgProps} from '../../../UI/Svg';

const Icon: FunctionComponent<SvgProps> = (props) => {
    return (
        <Svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...props} >
            <path fillRule="evenodd" clipRule="evenodd" d="M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM3.33333 8.46667L6.4 11.5333L12.6667 5.33333L11.3333 4L6.4 8.93333L4.66667 7.2L3.33333 8.46667Z" fill="#1BBDD4"/>
        </Svg>
    );
};

export default Icon;
