import React, {FunctionComponent} from 'react';
import { Svg, SvgProps } from '../../../UI/Svg';

const Icon: FunctionComponent<SvgProps> = (props) => {
    return (
        <Svg width="16" height="17" viewBox="0 0 16 17" fill={"none"} {...props} >
          <path d="M8 1.5V5C8 5.39782 8.15804 5.77936 8.43934 6.06066C8.72064 6.34196 9.10218 6.5 9.5 6.5H13V14C13 14.3978 12.842 14.7794 12.5607 15.0607C12.2794 15.342 11.8978 15.5 11.5 15.5H4.5C4.10218 15.5 3.72064 15.342 3.43934 15.0607C3.15804 14.7794 3 14.3978 3 14V3C3 2.60218 3.15804 2.22064 3.43934 1.93934C3.72064 1.65804 4.10218 1.5 4.5 1.5H8ZM9 1.75V5C9 5.13261 9.05268 5.25979 9.14645 5.35355C9.24021 5.44732 9.36739 5.5 9.5 5.5H12.75L9 1.75Z" fill="#20127F"/>
        </Svg>
    );
};

export default Icon;
