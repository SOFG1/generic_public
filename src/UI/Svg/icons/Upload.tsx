import React, {FunctionComponent} from 'react';
import {Svg, SvgProps} from '../../../UI/Svg';


const Icon: FunctionComponent<SvgProps> = (props) => {
    return (
        <Svg width="30" height="30" viewBox="0 0 30 30" fill="#1BBDD4" {...props} >
            <path d="M11.7188 9.30761H13.8838V19.2187C13.8838 19.3476 13.9893 19.4531 14.1182 19.4531H15.876C16.0049 19.4531 16.1104 19.3476 16.1104 19.2187V9.30761H18.2812C18.4775 9.30761 18.5859 9.08203 18.4658 8.92969L15.1846 4.7754C15.1626 4.74738 15.1346 4.72473 15.1027 4.70915C15.0707 4.69357 15.0356 4.68547 15 4.68547C14.9644 4.68547 14.9293 4.69357 14.8973 4.70915C14.8654 4.72473 14.8374 4.74738 14.8154 4.7754L11.5342 8.92676C11.4141 9.08203 11.5225 9.30761 11.7188 9.30761ZM25.7227 18.3398H23.9648C23.8359 18.3398
            23.7305 18.4453 23.7305 18.5742V23.0859H6.26953V18.5742C6.26953
            18.4453 6.16406 18.3398 6.03516 18.3398H4.27734C4.14844
            18.3398 4.04297 18.4453 4.04297 18.5742V24.375C4.04297
            24.8935 4.46191 25.3125 4.98047 25.3125H25.0195C25.5381
            25.3125 25.957 24.8935 25.957 24.375V18.5742C25.957
            18.4453 25.8516 18.3398 25.7227 18.3398Z"/>
        </Svg>
    );
};

export default Icon;