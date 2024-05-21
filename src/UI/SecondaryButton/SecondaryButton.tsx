import styled from "styled-components";
import {desktopBp} from "../../styles/variables";


const SecondaryButton = styled.button`
  background: 0;
  outline: 0;
  font-size: ${props => props.theme.fontSize.semiMedium.vw};
  font-weight: 400;
  color:#000;
  border-radius: 5px;
  border: 1px solid ${props => props.theme.color.lightGrey};
  cursor: pointer;
  @media(${desktopBp}){
    font-size: ${props => props.theme.fontSize.semiMedium.px};
  }
`


export default SecondaryButton;
