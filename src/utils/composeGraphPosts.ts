import { base64BlueBgImage } from "../assets/images/base64BlueBgImage";
import { base64FacebookIcon } from "../assets/images/base64FacebookIcon";
import { base64RedBgImage } from "../assets/images/base64RedBgImage";
import { base64TwitterIcon } from "../assets/images/base64TwitterIcon";
import { base64Planet } from "../assets/images/base64Planet";

const getContainerStyles = (color: string) => {
  return `
  position: relative;
  height: 98%;
  width: 98%;
  box-sizing: border-box;
  border: 30px solid ${color};
  border-radius: 50%;
  padding: 18px;
  background-color: #fff;
`;
};

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

const PostStyled = `
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 60%;
  width: 60%;
  box-sizing: border-box;
  padding: 1.25% 1.57%;
  border: 1px solid #000;
  border-radius: 15px;

`;

const PostContentStyled = `
  background: #242527;
  height: 100%;
  overflow: hidden;
  box-sizing: border-box;
  padding: 20px 0 0 20px;
  border-radius: 15px;
`;

const PostHeaderStyled = `
  display: flex;
  gap: 20px;
  height: 130px;
  margin-bottom: 10px;
`;

const AvatarIconStyled = `
  width: 100px;
  height: 100px;
  border-radius: 50%;
`;

const PostTitleStyled = `
  font-family: inherit;
  color: #fff;
  font-weight: 500;
  font-size: 25px;
  margin: 0;
`;

const PlanetIconStyled = `
  width: 30px;
  height: 30px;
  margin-left: 14px;
`;

const PostDateStyled = `
display: flex;
align-items: center;
font-family: inherit;
color: #ccc;
font-weight: 500;
font-size: 22px;
margin: 0 0 5px;
`;

const PostHeaderTextStyled = `
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const PostTextStyled = `
font-family: inherit;
  color: #fff;
  font-weight: 400;
  font-size: 26px;
  margin: 0;
`;

const NetworkIconStyled = `
  position: absolute;
  left: 50%;
  bottom: 0;
  transform: translate(-50%, 50%);
  height: 20%;
  width: 20%;
  object-fit: contain;
  background-color: #fff;
  border-radius: 50%;
  border: 1px solid #000;
  padding: 0.3%;
`;

const getPostDate = (properties: any) => {
  //Extracting date
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const day = properties.date_added_to_db?.day?.low;
  const month = properties.date_added_to_db?.month?.low;
  const year = properties.date_added_to_db?.year?.low;
  const date = `${months[month - 1]} ${day}, ${year}`;
  return date;
};

const composePostInSVG = ({ properties }: any, color: string) => {
  //Calculating size
  let postSize: number;
  const imageURI = "data:image/png;base64," + properties.pic;
  const actionsSum =
    (properties.comments?.low +
      properties.shares?.low +
      properties.likes?.low) /
    3;
  postSize = actionsSum > 1800 ? 1800 : actionsSum;
  postSize = actionsSum < 1100 ? 1100 : actionsSum;
  //Computing social netowrk
  let networkIcon: string = "";
  if (properties.link?.match("twitter.com")) networkIcon = base64TwitterIcon;
  if (properties.link?.match("facebook.com")) networkIcon = base64FacebookIcon;

  //BG image
  const bgImage =
    properties.label === "NEGATIVE" ? base64RedBgImage : base64BlueBgImage;
  const svg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="${postSize}" height="${postSize}">
  <foreignObject x="0" y="0" width="100%" height="100%">
  <div xmlns="http://www.w3.org/1999/xhtml" style="${getContainerStyles(
    color
  )}">
  <img style="${BackgroundStyled}" src="${bgImage}" xmlns="http://www.w3.org/1999/xhtml" />
    <div style="${PostStyled}">
      <div style="${PostContentStyled}">
        <div style="${PostHeaderStyled}">
         ${
           properties.pic &&
           `<img style="${AvatarIconStyled}" src="${imageURI}" />`
         }
         <div  style="${PostHeaderTextStyled}">
         <p style="${PostTitleStyled}">${properties.tag}</p>
         <p style="${PostDateStyled}">
           ${getPostDate(
             properties
           )} · <img style="${PlanetIconStyled}" src="${base64Planet}" />
         </p>
         </div>
        </div>
        <p style="${PostTextStyled}">${properties.text_original}</p>
      </div>
      ${
        networkIcon &&
        `<img style="${NetworkIconStyled}" src="${networkIcon}" />`
      }
    </div>
  </div>
  </foreignObject>
  </svg>
  `;

  return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
};

const StyledContextMenu = `
  position: absolute;
  top: -10px;
  left: -10px;
  background-color: #FFF;
  border: 2px solid #F06543;
  border-radius: 8px;
  padding: 12px;
  width: 30vw;
`;

const StyledValue = `
  margin: 0;
  white-space: normal;
`;

const composePostTitle = ({ properties }: any) => {
  const None = ""; //None comes in keywords without ''
  const keywords = eval(properties.noun_keywords);
  return `<div style="${StyledContextMenu}">
    <p style="${StyledValue}">Tag : ${properties.tag}</p>
    <p style="${StyledValue}">Date : ${getPostDate(properties)}</p>
    <p style="${StyledValue}">Label : ${properties.label}</p>
    <p style="${StyledValue}">Language : ${properties.lang}</p>
    <p style="${StyledValue}">Likes : ${properties.likes.low}</p>
    <p style="${StyledValue}">Shares : ${properties.shares.low}</p>
    <p style="${StyledValue}">Type : ${properties.type}</p>
    <p style="${StyledValue}">Keywords : ${keywords.join(", ")}</p>
    <br>
    <p style="${StyledValue}">${properties.text_original}</p>
  </div>`;
};

export const composeGraphPosts = (posts: any, colors: any[]) => {
  const postsFormatted = posts.map((p: any) => {
    const tagId = p.properties.tag_id.low;
    const color = colors.find((c) => c.id === tagId);
    return {
      id: p.elementId,
      shape: "image",
      shapeProperties: {
        useImageSize: true,
      },
      x: 0,
      y: 0,
      group: String(tagId),
      label: p.properties.tag,
      title: composePostTitle(p),
      image: composePostInSVG(p, color.color),
    };
  });
  return postsFormatted;
};
