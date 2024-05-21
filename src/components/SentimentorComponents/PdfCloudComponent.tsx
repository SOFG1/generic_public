import React, { useRef } from "react"
import styled from "styled-components";
import { TagCloudType } from "../../store/sentimentor";
import ExportChartComponent from "./ExportChartComponent";


const StyledWrapper = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    padding-top: 25px;
    flex-wrap: wrap;
    gap: 3px 7px;
`

const getFontSize = (size: number) => {
    const fos = (size * 20) + 12
    return `font-size: ${fos}px;`
}

const StyledKeyword = styled.p<{ color: string, size: number }>`
    word-break: break-all;
    max-width: 100%;
    margin: 0;
    font-weight: 600;
    font-size: 12px;
    font-size: 26px;
    ${({ color }) => `color: ${color};`}
    ${({ size }) => getFontSize(size)}

`


interface IProps {
    words: TagCloudType[]
}

const PdfCloudComponent = React.memo(({ words }: IProps) => {
    const ref = useRef<HTMLDivElement>(null)
    return <StyledWrapper ref={ref}>
        <ExportChartComponent ref={ref} fileName="WordsCloud" />
        {words?.map(w => <StyledKeyword size={w.size} color={w.color}>{w.word}</StyledKeyword>)}</StyledWrapper>
})

export default PdfCloudComponent