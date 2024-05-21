import React, { FunctionComponent } from 'react';
import { Svg, SvgProps } from '..';

const Icon: FunctionComponent<SvgProps> = (props) => {
    return (
        <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props} >
            <path
                d="M7.359 8.483H1.867c-.967 0-1.754.786-1.754 1.753V20.73c0 .967.787 1.753 1.754 1.753h5.492c.967 0 1.754-.786 1.754-1.753V10.236c0-.966-.787-1.753-1.754-1.753zM23.887 11.036c0-1.588-2.131-2.553-3.066-2.553h-4.214c.715-3.115-.149-4.893-.757-5.697-.602-.795-1.432-1.27-2.221-1.27-.613 0-1.141.289-1.443.796a.505.505 0 0 0-.071.257v2.686c-.605 1.746-1.196 3.111-2 4.145v11.979c.189.063.371.106.52.106h9.227c.434 0 .856-.226 1.229-.649.516-.592.861-1.504.874-2.252.748-.562 1.104-1.588 1.038-3 .805-.836.755-2.023.493-2.756.329-.47.391-1.267.391-1.792z" fill='#fff'>
            </path>
        </Svg>
    );
};

export default Icon;
