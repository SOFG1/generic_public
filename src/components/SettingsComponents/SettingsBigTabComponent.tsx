import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { desktopBp } from "../../styles/variables";
import { useTranslation } from "react-i18next";
import { ChevronLeftIcon, ChevronRightIcon } from "../../UI/Svg";


const StyledWrapper = styled.div<{ isOpened: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-inline-start: 1.77vw;
  margin-inline-end: 2.14vw;
  border-bottom: 1px solid #aaaaaa;
  padding-bottom: 0.57vw;
  margin-bottom: 1.88vw;
  //Not selectable
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently */
  cursor: pointer;
  svg path {
    stroke: #000;
  }
  svg {
    width: 1.56vw;
    ${({ isOpened }) => isOpened && "transform: rotate(90deg);"}
  }
  @media screen and (max-width: ${desktopBp}) {
    margin-inline-start: 22px;
    margin-inline-end: 27px;
    padding-bottom: 7px;
    margin-bottom: 24px;
    svg {
      width: 20px;
    }
  }
  @media screen and (max-width: 900px) {
    margin-inline-start: 0;
    margin-inline-end: 0;
  }
`;


const StyledTitle = styled.p`
  font-size: 1.67vw;
  line-height: 2.19vw;
  font-weight: 400;
  margin: 0;
  @media screen and (max-width: ${desktopBp}) {
    font-size: 21px;
    line-height: 27px;
  }
`;

const StyledContent = styled.div`
  margin-inline-start: 1.77vw;
  margin-inline-end: 2.14vw;
  padding-inline-start: 0.68vw;
  padding-inline-end: 1.25vw;
  padding-top: 0.47vw;
  margin-bottom: 5vw;
  @media screen and (max-width: ${desktopBp}) {
    margin-inline-start: 22px;
    margin-inline-end: 27px;
    padding-inline-start: 8px;
    padding-inline-end: 16px;
    padding-top: 6px;
    margin-bottom: 63px;
  }
  @media screen and (max-width: 700px) {
padding: 0;
margin: 0;
  }
`;


interface IProps {
  title: React.ReactNode,
  activity?: string
  children: React.ReactNode
  opened?: boolean,
  className?:string
}

const SettingsBigTabComponent = React.memo(({ title, activity, children, opened, className }: IProps) => {
  const { i18n } = useTranslation()
  const [isOpened, setIsOpened] = useState<boolean>(false);


  useEffect(() => {
    setIsOpened(!!opened)
  }, [opened])


  return <>
    <StyledWrapper className={className} data-action={activity} onClick={() => setIsOpened((p) => !p)} isOpened={isOpened}>
      <StyledTitle className="styled_setting_big_tab_title">{title}</StyledTitle>
      {i18n.dir() === "rtl" ? <ChevronLeftIcon /> : <ChevronRightIcon />}
    </StyledWrapper>
    {isOpened && (
      <StyledContent onClick={(e) => e.stopPropagation()}>
        {children}
      </StyledContent>
    )}
  </>
})

export default SettingsBigTabComponent
