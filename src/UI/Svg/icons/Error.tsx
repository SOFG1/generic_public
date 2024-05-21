import React, { FunctionComponent } from 'react';
import { Svg, SvgProps } from '../../../UI/Svg';

const Icon: FunctionComponent<SvgProps> = ({ fill = "#26A6D1", ...props }) => {
	return (
		<Svg width="91" height="91" viewBox="0 0 91 91" fill="none">
			<circle cx="45.5" cy="45.5" r="43.5" stroke="#FE5912" strokeWidth="4" />
			<circle cx="46.1842" cy="67.3947" r="5.81579" fill="#FE5912" />
			<path d="M38.9107 24.8775L43.4313 54.7638C43.6373 56.1252 44.8074 57.1316 46.1842 57.1316V16.4211C41.6832 16.4211 38.2375 20.4271 38.9107 24.8775Z" fill="#FE5912" />
			<path d="M53.1156 24.8775L48.595 54.7637C48.3891 56.1251 47.219 57.1315 45.8421 57.1315V16.421C50.3432 16.421 53.7888 20.4271 53.1156 24.8775Z" fill="#FE5912" />
		</Svg>

	);
};

export default Icon;
