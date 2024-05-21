import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { sentimentorpdfReportDataSelector } from "../../store/sentimentor/selectors";
import { useTranslation } from "react-i18next";

const StyledTable = styled.table`
  width: 100%;
  max-width: 100%;
  border-collapse: collapse;
`;

const StyledTR = styled.tr`
  &:last-child td {
    border-bottom: 0;
  }
`;

const StyledTH = styled.th`
  text-align: start;
  min-width: 90px;
  font-weight: 700;
  border: 2px solid #000;
  border-top: 0;
  padding: 3px;
  &:first-child {
    border-inline-start: 0;
    min-width: 150px;
  }
  &:last-child {
    border-inline-end: 0;
  }
`;

const StyledTD = styled.td<{ color?: string }>`
  min-width: 90px;
  text-align: center;
  font-weight: 700;
  border: 2px solid #000;
  word-break: break-all;
  padding: 3px;
  ${({ color }) => color && `color: ${color};`}
  span {
    font-size: 12px;
    min-width: 20px;
    display: inline-block;
  }
  &:first-child {
    border-inline-start: 0;
    text-align: start;
    min-width: 150px;
  }
  &:last-child {
    border-inline-end: 0;
  }
`;

const EmotionsTableComponent = React.memo(() => {
  const {t} = useTranslation()
  const data = useSelector(sentimentorpdfReportDataSelector);

  return (
    <StyledTable>
      <thead>
        <StyledTR>
          <StyledTH>{t("ranking_pdf-emotion-th")}</StyledTH>
          <StyledTH>{t("ranking_pdf-sentiment")}</StyledTH>
          <StyledTH>{t("ranking_pdf-amount")}</StyledTH>
        </StyledTR>
      </thead>
      <tbody>
        {data?.emotion_analysis?.map((d, index) => {
          return (
            <StyledTR key={index}>
              <StyledTD>
                <span>{index}</span> {d.emotion}
              </StyledTD>
              <StyledTD
                color={d.sentiment === "Positive" ? "#4965AF" : "#EE386D"}
              >
                {d.sentiment}
              </StyledTD>
              <StyledTD>{d.count}</StyledTD>
            </StyledTR>
          );
        })}
      </tbody>
    </StyledTable>
  );
});

export default EmotionsTableComponent;
