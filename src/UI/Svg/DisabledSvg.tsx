import {Svg} from "./index";
import styled from "styled-components";


export interface IProps{
    $disabled?:boolean,
    $activeColor:string,
    $disabledColor:string
}
const DisabledSvg = styled(Svg)<IProps>`
  stroke:${props => props.$disabled ? props.$disabledColor : props.$activeColor};
  
  & path{
    stroke:${props => props.$disabled ? props.$disabledColor : props.$activeColor};
  }
`

export default DisabledSvg;
