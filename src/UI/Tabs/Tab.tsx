import styled from "styled-components";
import {ReactElement} from "react";

interface IProps{
    isActive?:boolean,
    children:ReactElement | string | ReactElement[]
    index?:number,
    className?:string,
    onClick?:()=>void,
}

const Tab = ({children, onClick, className, isActive}:IProps)=>{
    return (
        <Container $isActive={!!isActive} className={className} onClick={onClick}>
            {children}
        </Container>
    )
}

export default Tab;


interface IContainer{
    $isActive:boolean
}
const Container = styled.div<IContainer>`
  cursor: pointer;
  color:${props => !props.$isActive ? "rgba(188, 188, 188, 1)" : "#000"};
  border-bottom: ${props => props.$isActive && "1px solid #000"}; 
  transition: color .3s ease;
`


