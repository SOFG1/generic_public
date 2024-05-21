import React from "react"
import { useTranslation } from "react-i18next"
import styled from "styled-components"



const StyledWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-bottom: 30px;
`

const StyledText = styled.p`
    margin: 0;
    font-size: 13px;
    margin-inline-end: 4px;
`

const StyledBtn = styled.button`
    height: 35px;
    width: 35px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #294bdb;
    border-radius: 3px;
    background-color: #eff3ff;
    border: 1px solid #8ea1ed;
    cursor: pointer;
`

interface IProps {
    selected: "#" | "%"
    onSelect: (v: "#" | "%") => void
}


const PDFPercentSwitcherComponent = React.memo(({ selected, onSelect }: IProps) => {
    const { t } = useTranslation()
    return <StyledWrapper>
        <StyledText>{t("ranking_pdf-view_by")} {selected}</StyledText>
        <StyledBtn onClick={() => onSelect("#")}>#</StyledBtn>
        <StyledBtn onClick={() => onSelect("%")}>%</StyledBtn>
    </StyledWrapper>
})


export default PDFPercentSwitcherComponent