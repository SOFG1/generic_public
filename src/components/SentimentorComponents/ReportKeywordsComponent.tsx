import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import PdfReportHeaderComponent from "./PdfReportHeaderComponent";
import { useTranslation } from "react-i18next";
import PDFExportPageComponent from "./PDFExportPageComponent";

const pageHeight = 900; //Max height of a page

const StyledA4 = styled.div`
  width: 100%;
  margin-bottom: 150px;
  min-height: ${pageHeight - 1}px; //Don't set greater than 880
`;

const StyledKeywords = styled.div`
  max-width: 100%;
  display: flex;
  flex-wrap: wrap;
  margin-inline-start: 30px;
  margin-bottom: 50px;
  span {
    font-weight: 600;
  }
`;

const StyledKeyword = styled.p`
  max-width: 100%;
  word-break: break-all;
  margin: 5px 0;
  margin-inline-end: 10px;
`;

interface IProps {
  keywords: string[];
  onSetDisabled: (d: boolean) => void
  disabled: boolean
}

const initialWordsCount = 150;

const ReportKeywordsComponent = React.memo(({ keywords, onSetDisabled, disabled }: IProps) => {
  const { t } = useTranslation();
  const [separators, setSeparators] = useState<number[]>([initialWordsCount]); //show x keywords initially

  const keywordsFormated: string[] = useMemo(() => {
    const formated: string[] = [];
    keywords.forEach((k) => {
      if (!k) return
      const arr = k.split(";");
      formated.push(...arr);
    });
    return formated;
  }, [keywords]);

  useEffect(() => {
    onSetDisabled(true);
    //Skip these actions if all words are rendered
    const totalRendered = separators.reduce((s, a) => {
      return s + a;
    }, 0);
    if (totalRendered >= keywordsFormated.length) {
      onSetDisabled(false);
      return;
    }
    //Add page if page is aleardy fullfiled
    const currentIndex = separators.length - 1;
    const currentPage = document.getElementById(
      `ranking-pdf-keywords${currentIndex}`
    );
    if (currentPage?.clientHeight && currentPage?.clientHeight > pageHeight) {
      setSeparators((p) => [...p, 300]);
      return;
    }
    //Increment words count if page is not fullfilled
    const copy = [...separators];
    copy[currentIndex] += 10;
    setSeparators(copy);
  }, [separators, keywordsFormated]);

  return (
    <>
      {separators.map((s, index) => {
        const prev = separators[index - 1] || 0;
        const slice = keywordsFormated.slice(prev, s);
        if (slice.length === 0) return null;
        return (
          <StyledA4 id={`ranking-pdf-keywords${index}`} key={index}>
            <PdfReportHeaderComponent />
            <StyledKeywords className={`ranking-pdf-keywords ranking-pdf-keywords${index}`}>
              {index === 0 && <span>{t("ranking_pdf-keywords")}</span>}
              {slice.map((k) => {
                return <StyledKeyword>{`${k}, `}</StyledKeyword>;
              })}
            </StyledKeywords>
          </StyledA4>
        );
      })}
    </>
  );
});




export default ReportKeywordsComponent;
