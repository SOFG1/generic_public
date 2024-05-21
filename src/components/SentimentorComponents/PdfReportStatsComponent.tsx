import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import {
  sentimentorAppliedFiltersSelector,
  sentimentorpdfReportDataSelector,
} from "../../store/sentimentor/selectors";
import { useTranslation } from "react-i18next";

const StyledTotals = styled.div<{showLines: boolean}>`
  display: flex;
  justify-content: space-around;
  ${({showLines}) => showLines && `
    border-top: 1px solid #000;
    border-bottom: 1px solid #000;
  `}
  padding-top: 25px;
  padding-bottom: 25px;
  margin-bottom: 25px;
  min-height: 94px;
`;

const StyledTotal = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
`;

const StyledValue = styled.p`
  margin: 0;
  font-weight: 600;
  padding: 6px;
  border: 1px solid #000;
  border-radius: 50px;
`;

const StyledText = styled.p`
  font-weight: 600;
  margin: 0;
`;

const PdfReportStatsComponent = React.memo(() => {
  const { t } = useTranslation();
  const data = useSelector(sentimentorpdfReportDataSelector);
  const appliedFilters = useSelector(sentimentorAppliedFiltersSelector);

  const totalValues = useMemo(() => {
    const values = Object.values(data?.activity_for_country || {}).map(d => d.num_posts)
    return values.reduce((f, p) => f + p, 0)
  }, [data])
  const isEmpty = useMemo(() => {
    return !appliedFilters.date && typeof data?.unique_authors !== "number"
  }, [data?.total_amount, appliedFilters.date, data?.unique_authors])


  return (
    <StyledTotals showLines={isEmpty}>
      {typeof data?.total_amount === "number" && (
        <StyledTotal>
          <StyledText>{t("ranking_pdf-total")}</StyledText>
          <StyledValue>{totalValues}</StyledValue>
        </StyledTotal>
      )}

      {appliedFilters.date && (
        <StyledTotal>
          <StyledText>{t("ranking_pdf-timespan")}</StyledText>
          <StyledValue>{appliedFilters.date}</StyledValue>
        </StyledTotal>
      )}

      {typeof data?.unique_authors === "number" && (
        <StyledTotal>
          <StyledText>{t("ranking_pdf-authors")}</StyledText>
          <StyledValue>{data?.unique_authors}</StyledValue>
        </StyledTotal>
      )}
    </StyledTotals>
  );
});

export default PdfReportStatsComponent;
