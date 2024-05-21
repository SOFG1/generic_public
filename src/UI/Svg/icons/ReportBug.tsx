import React, { FunctionComponent } from 'react';
import { Svg, SvgProps } from '..';

const Icon: FunctionComponent<SvgProps> = (props) => {
    return (
        <Svg {...props}
             xmlns="http://www.w3.org/2000/svg"
             width="36"
             height="37"
             fill="none"
             viewBox="0 0 36 37"
        >
            <path
                fill="#1CB7CE"
                fillRule="evenodd"
                d="M18 36.035c9.941 0 18-8.059 18-18s-8.059-18-18-18-18 8.059-18 18 8.059 18 18 18zm5.842-12.43l-.204-.154c.596-1.102.897-2.274.987-3.513h.782c.36.002.72.003 1.08-.003.308-.005.51-.202.512-.472.002-.268-.203-.47-.506-.478-.231-.007-.463-.005-.694-.004l-.283.001h-.861a30.649 30.649 0 01-.077-.486c-.055-.357-.108-.705-.19-1.046-.084-.346-.198-.685-.313-1.03-.05-.153-.102-.307-.151-.463l.02-.017c.028-.023.063-.053.098-.08.081-.065.162-.13.243-.193l1.115-.882c.176-.138.244-.318.186-.53-.051-.188-.19-.324-.38-.325a.75.75 0 00-.421.143c-.334.247-.659.506-.99.769l-.351.28c-.834-1.326-1.935-2.32-3.41-2.886l.03-.051a2.26 2.26 0 01.058-.094c.547-.83 1.312-1.37 2.24-1.696.869-.307 1.769-.402 2.684-.41.332-.003.547-.218.532-.498-.014-.276-.232-.475-.552-.449-.148.012-.297.023-.445.033-.546.04-1.093.078-1.626.184-1.624.32-2.948 1.119-3.794 2.593-.076.131-.166.117-.274.1h-.004a5.44 5.44 0 00-1.767.003c-.145.024-.224-.011-.3-.144-.546-.946-1.33-1.632-2.32-2.088-.858-.397-1.767-.577-2.702-.65-.266-.02-.533-.028-.799-.034-.34-.008-.56.17-.575.455-.014.286.207.485.557.498.08.003.159.004.238.005.113.001.226.003.339.01.945.059 1.864.225 2.717.661a4.135 4.135 0 011.697 1.573 6.536 6.536 0 00-1.948 1.156 7.48 7.48 0 00-1.463 1.73l-.39-.31c-.302-.239-.598-.473-.895-.705-.274-.214-.543-.2-.725.029-.178.224-.126.502.14.713l.205.164c.348.277.696.555 1.05.825.123.094.151.165.094.325-.176.493-.345.991-.47 1.499-.072.294-.113.596-.154.902-.02.138-.038.278-.06.418h-.535c-.435-.002-.87-.003-1.306.002-.301.004-.511.21-.511.475 0 .267.206.469.51.475.291.006.582.005.873.004l.349-.001h.648a8.49 8.49 0 00.98 3.514l-.055.043-.157.12-.42.316c-.352.263-.703.526-1.053.79-.269.203-.328.484-.155.71.171.227.453.246.726.044.177-.13.353-.263.528-.396a93.96 93.96 0 011.088-.811c1.302 1.723 2.967 2.772 5.151 2.767 2.177-.005 3.846-1.044 5.126-2.765l.06.042a205.64 205.64 0 01.587.438c.34.256.68.512 1.024.763.236.173.506.133.67-.08.16-.21.122-.482-.1-.67a2.64 2.64 0 00-.145-.112l-.048-.036-1.345-1.01zm-10.954-7.001c.007-.005.016-.01.025-.018 1.383.998 2.853 1.806 4.625 1.91v7.576c-1.242-.131-2.29-.65-3.165-1.512-1.348-1.327-1.972-2.973-2.052-4.839a7.162 7.162 0 01.544-3.098c.004-.007.011-.012.023-.02zm5.667 9.45c-.014 0-.029 0-.045.002V18.495c1.737-.113 3.192-.921 4.615-1.94l.105.315c.074.216.146.426.198.64.563 2.315.227 4.473-1.22 6.395-.894 1.187-2.078 1.939-3.576 2.143-.024.003-.048.004-.077.005zm4.124-10.379c-2.964 2.39-6.016 2.636-9.365.012 1.105-1.714 2.57-2.84 4.675-2.846 2.117-.007 3.585 1.126 4.69 2.834z"
                clipRule="evenodd"
            ></path>
        </Svg>
    );
};

export default Icon;
