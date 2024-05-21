import React, {Children, memo, ReactElement, ReactNode, useCallback} from "react";
import styled from "styled-components";
import {desktopBp} from "../../styles/variables";

interface IProps extends React.HTMLAttributes<HTMLDivElement>{
    children:ReactNode[] | ReactNode,
    separator:ReactElement,
    index:number,
}

const Breadcrumbs = memo(({children, separator, index, ...props}:IProps)=>{

    const getBreadcrumbs = useCallback(()=>{
        let elements = children;
        if(!(elements instanceof Array)) return elements;
        return Children.toArray(children).map((element, elementIndex) => {
            const clonedSeparator = React.cloneElement(separator, {
                disabled:elementIndex >= index,
            })

            return <BreadcrumbItem key = {elementIndex}>
                <StyledLabel hasUnderline={elementIndex < index} disabled={elementIndex > index}>
                    {element}
                </StyledLabel>
                {elementIndex !== Children.count(children) - 1 && clonedSeparator}
            </BreadcrumbItem>
        })
    },[children, separator]);

    return (
        <Container {...props}>
            {getBreadcrumbs()}
        </Container>
    )
})

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 0.42vw;
  
  @media(max-width: ${desktopBp}){
    gap: 5px;
  }
`

const BreadcrumbItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.42vw;

  @media(max-width: ${desktopBp}){
    gap: 5px;
  }
`
interface IStyledLabel{
    disabled:boolean,
    hasUnderline:boolean,
}
const StyledLabel = styled.p<IStyledLabel>`
    color: ${props => props.disabled ? "rgba(188, 188, 188, 1)" : "#000"};
  border-bottom: ${props => props.hasUnderline && "1px solid #000"};
`




export default Breadcrumbs;
