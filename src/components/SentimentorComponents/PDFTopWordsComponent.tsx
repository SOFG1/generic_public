import React, {useMemo, useRef} from "react"
import { useTranslation } from "react-i18next"
import styled from "styled-components"
import { ChevronRightIcon } from "../../UI/Svg"
import ExportChartComponent from "./ExportChartComponent"


const WordsList = styled.div`
  position: relative;
`

const StyledWordsTitle = styled.p`
  margin: 0 0 15px;
  color: #595959;
  font-size: 18px;
  text-transform: capitalize;
  font-weight: 700;
`

const WordsHeader = styled.div`
  padding: 17px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f4f6f7;
  border-inline-end: 1px solid #f1f2f3;
  border-bottom: 1px solid #f1f2f3;
  margin-bottom: 10px;
  p {
    margin: 0;
  }
`


const StyledString = styled.p`
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 10px;
  border-bottom: 1px solid #e3e3e3;
  margin: 0;
  svg {
    width: 15px;
    height: 15px;
  }
  svg path {
    stroke: #bdbdbd;
  }
  &:last-child {
    margin-bottom: 30px;
  }
`


const StyledWord = styled.p`
    margin: 0;  
    font-size: 14px;
    font-weight: 500;
    color: #848991;
`

const StyledPercent = styled.p`
    margin: 0;  
    margin-inline-start: auto;
    background-color: #6a788c;
    border-radius: 5px;
    font-size: 13px;
    color: #fff;
    padding: 4px 2px;
    min-width: 65px;
    box-sizing: border-box;
    text-align: center;
`

interface IProps {
  platform: string
  words: { word: string, perc: number, count:number }[],
  viewBy: "#" | "%",
}

const PDFTopWordsComponent = React.memo(({ platform, words, viewBy }: IProps) => {
  const { t } = useTranslation()
  const listRef = useRef<HTMLDivElement>(null)
  const top3Words = useMemo(()=> words.slice(0, 3), [words]);

  return <WordsList ref={listRef}>
    <ExportChartComponent fileName="TopWords" ref={listRef} />
    <StyledWordsTitle>{t("ranking_pdf-top_words-platform", { c: top3Words.length, p: platform })}</StyledWordsTitle>
    <WordsHeader>
      <p>{t("ranking_pdf-top_words-keywords")}</p>
      <p>{t("ranking_pdf-top_words-users-" + viewBy)}</p>
    </WordsHeader>
    {top3Words?.map((w: any, i: number) => {
      const percent = (w.perc * 100).toFixed(1);
      return <StyledString key={i}>
        <ChevronRightIcon />
        <StyledWord>{w.word}</StyledWord>
        <StyledPercent>{viewBy === "%" ? `${percent}%` : w.count}</StyledPercent>
      </StyledString>
    })}
  </WordsList>
})


export default PDFTopWordsComponent
