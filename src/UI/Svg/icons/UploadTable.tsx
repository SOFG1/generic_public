import React, {FunctionComponent} from 'react';
import {Svg, SvgProps} from '../../../UI/Svg';

const Icon: FunctionComponent<SvgProps> = (props) => {
    return (
        <Svg width="15" height="15" viewBox="0 0 15 15" fill="none" {...props} >
            <path d="M5.85938 4.65381H6.94189V9.60937C6.94189 9.67382 6.99463 9.72656 7.05908 9.72656H7.93799C8.00244 9.72656 8.05518 9.67382 8.05518 9.60937V4.65381H9.14062C9.23877 4.65381 9.29297 4.54102 9.23291 4.46485L7.59229 2.38771C7.58132 2.3737 7.56732 2.36237 7.55133 2.35458C7.53534 2.34679 7.51779 2.34274 7.5 2.34274C7.48221 2.34274 7.46466 2.34679 7.44867 2.35458C7.43268 2.36237 7.41868 2.3737 7.40771 2.38771L5.76709 4.46339C5.70703 4.54102 5.76123 4.65381 5.85938 4.65381V4.65381ZM12.8613 9.16992H11.9824C11.918 9.16992 11.8652 9.22265 11.8652 9.28711V11.543H3.13477V9.28711C3.13477 9.22265 3.08203 9.16992 3.01758 9.16992H2.13867C2.07422 9.16992 2.02148 9.22265 2.02148 9.28711V12.1875C2.02148 12.4468 2.23096 12.6562 2.49023 12.6562H12.5098C12.769 12.6562 12.9785 12.4468 12.9785 12.1875V9.28711C12.9785 9.22265 12.9258 9.16992 12.8613 9.16992Z" fill="#000000"/>
        </Svg>
    );
};

export default Icon;
