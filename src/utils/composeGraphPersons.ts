import { base64avatar } from "../assets/images/base64avatar";
import { IRelationPerson } from "../store/relations";


const offset = 5000


const getCoords = (i: number): any => {
  const remainder = i % 4
  let coords = {x: -offset, y: -offset}
  if(remainder === 1) coords.x = offset
  if(remainder === 2) {
    coords.x = offset
    coords.y = offset
  }
  if(remainder === 3) {
    coords.y = offset
  }
  return coords
}


const AvatarStyled = `
  position: absolute;
  object-fit: cover;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 80%;
  width: 80%;
  border-radius: 50%;
  border: 5px solid #000;
  box-sizing: border-box;
  padding: 4%;
`;

const FakeAvatarStyled = `
  position: absolute;
  object-fit: cover;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 90%;
  width: 90%;
  border-radius: 50%;
  background-color: #2e8cff;
`;

const composePersonInSVG = ({ properties }: any) => {
  const imageURI = "data:image/png;base64," + properties.profile_pic;
  const svg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="500" height="500">
    <foreignObject x="0" y="0" width="100%" height="100%">
      <img style="${properties.profile_pic ? AvatarStyled : FakeAvatarStyled}" 
      src="${properties.profile_pic ? imageURI : base64avatar}" 
      xmlns="http://www.w3.org/1999/xhtml" />
    </foreignObject>
  </svg>
  `;

  return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
};


export const composeGraphPersons = (persons: IRelationPerson[]) => {
  const formatted = persons.map((p, i) => {
    const coords = getCoords(i)
    let mass = 40
    mass-= p.edgesCount
    if(mass < 2) mass = 2
    return {
      id: p.elementId,
      shape: "image",
      x: coords.x,
      y: coords.y,
      mass,
      label: p.properties.name,
      title: p.properties.name,
      shapeProperties: {
        useImageSize: true,
      },
      image: composePersonInSVG(p),
    };
  });

  return formatted
};
