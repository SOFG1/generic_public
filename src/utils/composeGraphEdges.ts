import { IRelation } from "../store/relations";
import { base64graphComment } from "../assets/images/base64graphComment";
import { base64graphLike } from "../assets/images/base64graphLike";
import { base64graphShare } from "../assets/images/base64graphShare";

const IconStyles = `
    height: 63px;
    width: 63px;
    border: 3px solid #000;
    box-sizing: border-box;
    border-radius: 50%;
    background-color: #fff;
    object-fit: contain;
`;

const getImage = (icon: string) => {
  const svg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70">
    <foreignObject x="0" y="0" width="100%" height="100%">
      <img style="${IconStyles}" src="${icon}" xmlns="http://www.w3.org/1999/xhtml" />
    </foreignObject>
  </svg>
  `;
  return  "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
}


export const composeGraphEdges = (relations: IRelation[], isSelected?: boolean) => {
  return relations.map((e: any) => {
    let icon = base64graphComment
    if(e.type === 'LIKE') icon = base64graphLike
    if(e.type === 'SHARE') icon = base64graphShare
    return {
      from: e.startNodeElementId,
      to: e.endNodeElementId,
      color: {
        color: isSelected ? 'orangered' : '#000'
      },
      width: isSelected ? 3 : 1,
      arrows: {
        middle: {
          enabled: false,
          type: "image",
          imageWidth: 280,
          imageHeight: 280,
          src: getImage(icon),
        },
      },
    };
  })
};
