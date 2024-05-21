import React, {FunctionComponent} from 'react';
import {Svg, SvgProps} from '../../../UI/Svg';

const Icon: FunctionComponent<SvgProps> = (props) => {
    return (
        <Svg width="27" height="27" viewBox="0 0 27 27" fill="none" {...props} >
            <circle cx="13.5" cy="13.5" r="13" stroke="black"/>
<path d="M14.3863 9.68C15.0343 9.68 15.2743 9.368 15.2743 8.972V8.72C15.2743 8.324 15.0343 8.012 14.3743 8.012C13.7263 8.012 13.4863 8.324 13.4863 8.72V8.972C13.4863 9.368 13.7263 9.68 14.3863 9.68ZM11.6143 17H17.0143V15.944H15.0343V10.808H11.6143V11.864H13.7263V15.944H11.6143V17Z" fill="black"/>
        </Svg>
    );
};

export default Icon;
