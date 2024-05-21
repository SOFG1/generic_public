import styled from "styled-components";
import {desktopBp} from "../../../styles/variables";
import {memo, ReactNode} from "react";

interface IProps{
    children:ReactNode,
    open:boolean,
}

const FloatingPanel = memo(({children, open}:IProps)=>{

    return (
        <Container active = {open}>
            {children}
        </Container>
    )
})

export default FloatingPanel;



const Container = styled.div<{active:boolean}>`
  position: absolute;
  z-index: 10;
  border-radius: 5px;
  background: #fff;
  top: 4.97vw;
  padding: 1.97vw;
  box-shadow:
          0px 6px 13px rgba(0, 0, 0, 0.10),
          0px 23px 23px rgba(0, 0, 0, 0.09),
          0px 52px 31px rgba(0, 0, 0, 0.05),
          0px 93px 37px rgba(0, 0, 0, 0.01),
          0px 145px 41px rgba(0, 0, 0, 0.00);
  
  display: ${props => props.active ? "block" : "none"};
  
  &:after{
    width: 100%;
    height: 10px;
    position: absolute;
    content: "";
    top: -5px;
    left: 50%;
    z-index: 40;
    transform: translate(-50%, 0);
    background: #fff;
  }
  @media(max-width: ${desktopBp}){
    padding: 22px;
    top:62px;
  }
`

