import styled from "styled-components";
import { desktopBp } from "../../styles/variables";

const SettingsTitle = styled.h2`
  font-size: 1.67vw;
  line-height: 2.19vw;
  font-weight: 500;
  margin: 0;
  text-transform: capitalize;
  margin-inline-end: auto;
  @media screen and (max-width: ${desktopBp}) {
    font-size: 21px;
    line-height: 27px;
  }
  @media screen and (max-width: 700px) {
    margin-inline-end: 0;
  }
`;

export default SettingsTitle;
