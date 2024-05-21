import {memo} from "react";
import styled from "styled-components";
import {desktopBp} from "../../styles/variables";

interface IProps{
    active?:boolean,
    onChange:(value:boolean)=>void,
    className?:string;
}


const SquareCheckbox = memo(({active, onChange, ...props}:IProps)=>{
    return (
        <Container {...props} onClick = {()=>onChange(!active)}>
            {active && <Active className = "sq-checkbox-active"/>}
        </Container>
    )
})

export default SquareCheckbox;



const Container = styled.div`
  width: 1.13vw;
  cursor: pointer;
  height: 1.13vw;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #000;
  
  @media(max-width:${desktopBp}){
    width: 14px;
    height: 14px;
  }
`


const Active = styled.div`
    width: 0.67vw;
    height: 0.67vw;
  background: #000;
  @media(max-width:${desktopBp}){
    width: 8px;
    height: 8px;
  }
`
