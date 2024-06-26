import React, {FunctionComponent} from 'react';
import {Svg, SvgProps} from '../../../UI/Svg';

const Icon: FunctionComponent<SvgProps> = (props) => {
    return (
        <Svg {...props} xmlns="http://www.w3.org/2000/svg"
             width="32"
             height="36"
             fill="none"
             viewBox="0 0 32 36"
        >
            <path
                fill="#1CB7CE"
                fillRule="evenodd"
                d="M11.233 1.672c-.466.295-.931.59-1.405.845a185.99 185.99 0 01-2.862 1.72c-1.599.949-3.198 1.897-4.747 2.923C.599 8.533-.146 10.74.024 12.873c.003 1.44.002 2.879 0 4.318-.003 2.342-.006 4.683.014 7.025.21 2.288 1.733 4.231 3.694 5.188 1.198.717 2.394 1.439 3.59 2.16 1.944 1.174 3.889 2.347 5.845 3.499 2.008.953 4.385.552 6.161-.738 1.193-.722 2.388-1.439 3.584-2.155 1.95-1.17 3.9-2.339 5.838-3.53 1.798-1.333 2.651-3.678 2.467-5.926-.004-1.439-.002-2.878 0-4.316a697.2 697.2 0 00-.015-7.026c-.21-2.29-1.733-4.232-3.694-5.19-1.197-.715-2.393-1.436-3.588-2.157-1.945-1.173-3.89-2.347-5.847-3.499-.765-.37-1.614-.52-2.453-.523-1.651-.063-3.025.807-4.387 1.67zm3.637 19.356H16.13c.531 0 .83.077.83.84v1.49c0 .916.33 1.642 1.492 1.642h2.72c.73 0 1.36-.583 1.36-1.948v-4.197h.237c1.098.003 1.232.003 1.232-.625 0-.541-.893-1.488-1.594-2.23a18.3 18.3 0 01-.572-.623c-.74-.867-4.195-4.869-4.61-5.346C16.81 9.554 16.262 9 15.5 9s-1.31.554-1.724 1.03c-.415.478-3.87 4.48-4.61 5.347-.149.174-.35.388-.572.623-.7.742-1.594 1.689-1.594 2.23 0 .628.134.628 1.232.625h.238v4.197C8.47 24.417 9.1 25 9.83 25h2.719c1.163 0 1.492-.726 1.492-1.642v-1.49c0-.763.299-.84.83-.84z"
                clipRule="evenodd"
            ></path>
        </Svg>
    );
};

export default Icon;
