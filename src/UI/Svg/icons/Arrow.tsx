import React, {FunctionComponent} from 'react';
import { Svg, SvgProps } from '../../../UI/Svg';

const Icon: FunctionComponent<SvgProps> = ({stroke="#000", ...props}) => {
    return (
        <Svg{...props}
            xmlns="http://www.w3.org/2000/svg"
            width="6"
            height="10"
            fill="none"
            viewBox="0 0 6 10"
        >
            <path
                stroke="#000"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M1 1l4 4-4 4"
            ></path>
        </Svg>
    );
};

export default Icon;
