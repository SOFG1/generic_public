import React, { FunctionComponent } from 'react';
import { Svg, SvgProps } from '..';

const Icon: FunctionComponent<SvgProps> = (props) => {
    return (
        <Svg  width="35" height="35" viewBox="0 0 35 35" fill="none" {...props} >
    <circle cx="17.5" cy="17.5" r="17" stroke="black" />
    <path d="M10.4546 12.8303H25.0001" stroke="#201D1D" strokeLinecap="round" strokeLinejoin="round" />
    <path
        d="M23.3795 13.302C23.3795 13.302 23.109 20.8212 23.0661 21.7627C22.9453 24.4201 22.7037 25.5676 19.8651 25.5676C17.0266 25.5676 17.9567 25.5616 17.9567 25.5616H17.6909C17.6909 25.5616 18.4936 25.5676 15.7824 25.5676C13.0713 25.5676 12.7023 24.4201 12.5815 21.7627C12.5386 20.8206 12.2681 13.302 12.2681 13.302"
        stroke="#201D1D" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M15.2188 15.3694V22.9133" stroke="#201D1D" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M17.8066 15.3572V22.9017" stroke="#201D1D" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M20.3564 15.3572V22.9017" stroke="#201D1D" strokeLinecap="round" strokeLinejoin="round" />
    <path
        d="M20.1311 12.8243V11.4956C20.1311 10.8911 19.5272 10.4085 17.7944 10.4333H17.7576C16.0248 10.4085 15.4209 10.8911 15.4209 11.4956V12.8243"
        stroke="#201D1D" strokeLinecap="round" strokeLinejoin="round" />
        </Svg>
    );
};

export default Icon;
