import { tags, TitleProps } from "./types";
import styled from "styled-components";
import { colors } from "../../../styles/colors";
import { desktopBp } from "../../../styles/variables";

const Title = styled.div<TitleProps>`
  font-size: 1.88vw;
  line-height: 2.34vw;
  font-weight: bold;
  font-style: normal;
  text-transform: capitalize;
  color: #000;
  filter: drop-shadow(3px 3px 5px #fff);
  @media screen and (max-width: ${desktopBp}) {
    font-size: 24px;
    line-height: 29px;
  }
`;

Title.defaultProps = {
  as: tags.H2,
};

export default Title;
