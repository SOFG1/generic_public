import React, { FunctionComponent } from 'react';
import { Svg, SvgProps } from '..';

const Icon: FunctionComponent<SvgProps> = (props) => {
    return (
        <Svg width="15" height="22" viewBox="0 0 15 22" fill={"none"} {...props} >
            <path d="M7.30203 6.43567C2.24082 6.43567 0 12.9133 0 15.8583C0 19.392 2.24184 21.895 7.30203 21.895C12.3622 21.895 14.6041 19.392 14.6041 15.8583C14.6041 12.9143 12.3632 6.43567 7.30203 6.43567Z" fill="black" />
            <path d="M7.30217 9.52732C9.83244 9.52732 11.8836 7.41822 11.8836 4.81652C11.8836 2.21481 9.83244 0.105713 7.30217 0.105713C4.77189 0.105713 2.7207 2.21481 2.7207 4.81652C2.7207 7.41822 4.77189 9.52732 7.30217 9.52732Z" fill="#AAAAAA" />
            <path d="M7.30192 8.64449C9.35798 8.64449 11.0247 6.93067 11.0247 4.81657C11.0247 2.70247 9.35798 0.988647 7.30192 0.988647C5.24587 0.988647 3.5791 2.70247 3.5791 4.81657C3.5791 6.93067 5.24587 8.64449 7.30192 8.64449Z" fill="black" />
        </Svg>
    );
};

export default Icon;
