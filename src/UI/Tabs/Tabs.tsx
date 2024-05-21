import styled from "styled-components";
import React, {ReactElement, useCallback} from "react";
import {desktopBp} from "../../styles/variables";

interface IProps  {
    onChange:(index:number)=>void,
    className?:string,
    value:number,
    children:ReactElement | ReactElement[]
}

const Tabs = (props:IProps)=>{
    const {onChange, children, value, ...rest} = props;

    const createTabs = useCallback(()=>{
        let components = children;
        if(!(components instanceof Array)) components = [components];
        return components.map((child, index) => React.cloneElement(child, {
            index,
            isActive:value === index,
            key:index,
            onClick:()=>onChange(index)
        }))
    },[children, value]);
    return (
        <Container {...rest}>
            {createTabs()}
        </Container>
    )
}


const Container = styled.div`
  display: flex;
  width: fit-content;
  position: relative;
  font-weight: 500;
  font-size: 14px;
  gap: 2.3vh;
  @media screen and (max-width: ${desktopBp}) {
    font-size: 12px;
    gap: 30px;
  }
  
`

export default Tabs;
