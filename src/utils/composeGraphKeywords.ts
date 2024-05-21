import { base64RedBgImage } from "../assets/images/base64RedBgImage";
import { base64BlueBgImage } from "../assets/images/base64BlueBgImage";
import { base64bg20 } from "../assets/images/base64bg20";
import { base64bg40 } from "../assets/images/base64bg40";
import { base64bg60 } from "../assets/images/base64bg60";
import { base64bg80 } from "../assets/images/base64bg80";
import { base64bg50 } from "../assets/images/base64bg50";
import { colorsChart } from "../config";

const containerStyles = (color: string) => {
    return `
    position: relative;
    height: 98%;
    width: 98%;
    box-sizing: border-box;
    border: 15px solid ${color};
    border-radius: 50%;
    padding: 18px;
    background-color: #fff;
  `
}

const TitleStyled = `
  position: absolute;
  top: 50%;
  left: 50%;
  margin: 0;
  transform: translate(-50%, -50%);
`;


const BackgroundStyled = `
  position: absolute;
  object-fit: cover;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 90%;
  width: 90%;
  border-radius: 50%;
`;

const composeTagInSVG = (properties: any, color: string) => {
  let bgImage = base64RedBgImage
  if(properties.score > 0) {
    bgImage = base64bg20
  }
  if(properties.score > 0.2) {
    bgImage = base64bg40
  }
  if(properties.score > 0.4) {
    bgImage = base64bg50
  }
  if(properties.score > 0.6) {
    bgImage = base64bg60
  }
  if(properties.score > 0.8) {
    bgImage = base64bg80
  }
  if(properties.score === 1) {
    bgImage = base64BlueBgImage
  }

  const svg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="400px" height="400px">
  <foreignObject x="0" y="0" width="100%" height="100%">
  <div xmlns="http://www.w3.org/1999/xhtml" style="${containerStyles(color)}">
  <img style="${BackgroundStyled}" src="${bgImage}" xmlns="http://www.w3.org/1999/xhtml" />
  <p style="${TitleStyled} font-size: 46px; font-weight: 600;">${properties.tag}</p>
  </div>
  </foreignObject>
  </svg>
  `;

  return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
};



export const composeGraphKeywords = (keywords: any) => {
  const keywordsFormated = keywords?.map((k: any, index: number) => {
    return {
      id: k.tag,
      shape: "image",
      shapeProperties: {
        useImageSize: true,
      },
      label: k.tag,
      title: k.tag,
      image: composeTagInSVG(k, colorsChart[index] || "#AAA"),
    };
  });
  return keywordsFormated;
};
