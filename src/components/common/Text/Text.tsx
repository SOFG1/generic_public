import styled from "styled-components";
import { desktopBp } from "../../../styles/variables";
import {TextProps} from "./types";

const Text = styled.p<TextProps>`
  font-style: normal;
  font-weight: ${({bold}) => bold ? 'bold' : 500};
  font-size: ${({fontSize}) => fontSize || '0.94vw'};
  line-height: 1.2;
  margin: 0;
  @media screen and (max-width: ${desktopBp}) {
    font-size: 12px;
  }
`

export default Text