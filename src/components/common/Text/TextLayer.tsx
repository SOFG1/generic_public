import styled from "styled-components";
import {colors} from "../../../styles/colors";
import {Text} from "./index";

const TextLayer = styled(Text)`{
  color: ${colors.cyan_4};
  text-decoration: underline;
  transition: all .25s ease;
  &:hover {
    color: ${colors.cyan_5};
  }
}
`

export default TextLayer