import React, {useCallback, useEffect, useState} from "react"
import styled, { keyframes, css } from "styled-components"
import { desktopBp } from "../../styles/variables";
import { useTranslation } from "react-i18next";
import { ChevronLeftIcon, ChevronRightIcon } from "../../UI/Svg";

const StyledWrapper = styled.div``


const StyledHeader = styled.div<{ isOpened: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #aaaaaa;
  margin-bottom: 1.82vw;
  border-radius: 4px;
  cursor: pointer;
  svg path {
    stroke: #000;
  }
  svg {
    width: 1.3vw;
    ${({ isOpened }) => isOpened && "transform: rotate(90deg);"}
  }
  @media screen and (max-width: ${desktopBp}) {
    margin-bottom: 23px;
    svg {
      width: 16px;
    }
  }
`;


const StyledTitle = styled.p`
  font-size: 1.35vw;
  line-height: 1.77vw;
  margin: 0;
  @media screen and (max-width: ${desktopBp}) {
    font-size: 17px;
    line-height: 22px;
  }
`;

const StyledContent = styled.div`
  padding-top: 2.45vw;
  @media screen and (max-width: ${desktopBp}) {
    padding-top: 31px;
  } 
`;



interface IProps {
  title: React.ReactNode
  tabHint?: string
  activity?: string
  children: React.ReactNode
  className?: string,
  initialState?:boolean,
  onClick?:(value:boolean)=>void,
}

const SettingsSmallTabComponent = React.memo(({ title, activity, children, className, initialState, onClick }: IProps) => {
  const { i18n } = useTranslation()
  const [isOpened, setIsOpened] = useState<boolean>(false);

  const handleClick = useCallback(()=>{
    if(onClick) onClick(!isOpened);
    setIsOpened(prev => !prev);
  },[]);

  useEffect(()=>{
    setIsOpened(!!initialState);
  },[initialState])


  return <StyledWrapper className={className}>
    <StyledHeader className="styled_settings_smallTab" isOpened={isOpened} onClick={handleClick} data-action={activity}>
      <StyledTitle>{title}</StyledTitle>
      {i18n.dir() ? <ChevronRightIcon /> : <ChevronLeftIcon />}
    </StyledHeader>
    {isOpened && (
      <StyledContent className="styled_settings_content">
        {children}
      </StyledContent>
    )}
  </StyledWrapper>
})

export default SettingsSmallTabComponent
