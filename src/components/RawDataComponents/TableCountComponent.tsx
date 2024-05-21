import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { numberWithCommas } from "../../utils/numberWidthCommas";
import { desktopBp } from "../../styles/variables";
import { useRawDataState } from "../../store/rawData";

const StyledBox = styled.div`
  display: flex;
  align-items: center;
`;

const StyledCount = styled.p`
  margin: 0;
  font-size: 0.94vw;
  font-weight: 600;
  margin-inline-end: 1.04vw;
  @media screen and (max-width: ${desktopBp}) {
    margin-inline-end: 13px;
    font-size: 12px;
  }
`;

const TableCountComponent = React.memo(() => {
  const { t } = useTranslation();
  const {
    count,
    appliedFilters
  } = useRawDataState();

  const appliedFiltersCount = useMemo(() => {
    return Object.keys(appliedFilters || {}).length;
  }, [appliedFilters]);


  return (
    <StyledBox>
      <StyledCount>
        {t("raw-data_table-total")}{" "}
        <span dir="ltr"> {numberWithCommas(count)}</span>
      </StyledCount>
      {appliedFiltersCount > 0 && (
        <StyledCount>Filters applied: {appliedFiltersCount}</StyledCount>
      )}
    </StyledBox>
  );
});

export default TableCountComponent;
