import React, { useCallback, useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { useOpponentsState } from "../../store/opponents";
import { Card } from "../common/Card";
import { Dropdown } from "../../UI/Dropdown";
import { desktopBp } from "../../styles/variables";
import { Title } from "../common/Title";
import { Loader } from "../../UI/Spinners";
import { numberWithCommas } from "../../utils/numberWidthCommas";
import { colorsChart } from "../../config";
import { withErrorBoundaryHOC } from "../../utils/withErrorBoundaryHOC";

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 1.09vw 0 1.61vw;
  @media screen and (max-width: ${desktopBp}) {
    margin: 14px 0 20px;
  }
`;

const StyledTitle = styled(Title)`
  font-size: 1.25vw;
  line-height: 1.61vw;
  font-weight: 600;
  margin: 0;
  @media screen and (max-width: ${desktopBp}) {
    font-size: 16px;
    line-height: 20px;
  }
`;

const ColorBadge = styled.span<{ color: string }>`
  height: 1.09vw;
  width: 1.09vw;
  border-radius: 50%;
  background-color: ${({ color }) => color};
  @media screen and (max-width: ${desktopBp}) {
    height: 14px;
    width: 14px;
  }
`;

const StyledBox = styled.div`
  display: flex;
  gap: 1.04vw;
  margin-bottom: 1.09vw;
  @media screen and (max-width: ${desktopBp}) {
    gap: 13px;
    margin-bottom: 14px;
  }
`;

const StyledDropdown = styled(Dropdown)`
  width: 13.54vw;
  @media screen and (max-width: ${desktopBp}) {
    width: 170px;
  }
`;

const StyledTable = styled.div`
  height: 19.06vw;
  overflow-y: auto;
  @media screen and (max-width: ${desktopBp}) {
    height: 239px;
  }
`;

const StyledNoData = styled.p`
  text-align: center;
  font-size: 1.25vw;
  @media screen and (max-width: ${desktopBp}) {
    font-size: 16px;
  }
`;

const StyledRow = styled.div`
  padding: 3px 0;
  display: flex;
  box-sizing: border-box;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #b1b1b1;
  height: 2.66vw;
  &:last-child {
    border: none;
  }
  @media screen and (max-width: ${desktopBp}) {
    height: 33px;
  }
`;

const StyledRowTitle = styled.p`
  font-size: 0.73vw;
  line-height: 0.94vw;
  margin: 0;
  font-weight: 700;
  @media screen and (max-width: ${desktopBp}) {
    font-size: 10px;
    line-height: 12px;
  }
`;

const StyledLoader = styled(Loader)`
  height: 8.33vw;
  width: 8.33vw;
  margin: 1.04vw auto 0;
  @media screen and (max-width: ${desktopBp}) {
    height: 105px;
    width: 105px;
    margin: 13px auto 0;
  }
`;

const StyledValue = styled(StyledRowTitle)`
  color: #000;
  margin-bottom: 0;
`;

type DataTypeType = "top" | "rising";

interface IProps {
  title: string;
  dataKey: string;
  dataTitle: string;
  dataValue: string;
}

const OpponentsRelatedTable = React.memo(
  ({ title, dataKey, dataTitle, dataValue }: IProps) => {
    const { t } = useTranslation();
    const { opponentGtrends, isFetchingGTrends, searchKeywords } = useOpponentsState();
    const [selectedKeyword, setSelectedKeyword] = useState<string>("");
    const [selectedType, setSelectedType] = useState<DataTypeType>("top");

    const activeKeywordsCount = useMemo(() => {
      return Object.keys(opponentGtrends).length;
    }, [opponentGtrends]);

    const keywordsOptions = useMemo(() => {
      return Object.keys(opponentGtrends).map((k) => ({ item: k, value: k }));
    }, [opponentGtrends]);

    const dataset = useMemo(() => {
      const data = opponentGtrends[selectedKeyword]?.[dataKey]?.[selectedType] || []
      return data;
    }, [opponentGtrends, selectedKeyword, selectedType, dataKey]);

    const dataTypeOptions = useMemo(() => {
      return [
        { item: "Top", value: "top" },
        { item: "Rising", value: "rising" },
      ];
    }, []);

    const keywordColor = useMemo(() => {
      const index = Object.values(searchKeywords).findIndex(word => word === selectedKeyword)
      return colorsChart[index]
    }, [colorsChart, selectedKeyword, searchKeywords]);

    const handleSelectKeyword = useCallback((k: string) => {
      setSelectedKeyword(k);
      //cache selected opponent
      localStorage.setItem(`opponents-selected-${title}-table`, k);
    }, []);

    const handleSelectType = useCallback((k: DataTypeType) => {
      setSelectedType(k);
      //cache selected opponent
      localStorage.setItem(`opponents-${title}-type`, k);
    }, []);

    //Set cached opponent initially
    useEffect(() => {
      const selectedKeyword = localStorage.getItem(
        `opponents-selected-${title}-table`
      );
      if (selectedKeyword) setSelectedKeyword(selectedKeyword);
      const selectedType = localStorage.getItem(`opponents-${title}-type`);
      if (selectedType) setSelectedType(selectedType as DataTypeType);
    }, []);

    //Set selected opponent to existing (if there is one opponent exist)
    useEffect(() => {
      const keys = Object.keys(opponentGtrends);
      if (keys.length === 1) {
        handleSelectKeyword(keys[0]);
      }
    }, [opponentGtrends]);

    return (
      <Card>
        <StyledHeader>
          <StyledTitle>{title}</StyledTitle>
          <ColorBadge color={keywordColor} />
        </StyledHeader>
        <StyledBox>
          {activeKeywordsCount > 1 && (
            <StyledDropdown
              label={t("opponents-keyword_label")}
              placeholder="opponents-keywords_choose"
              value={selectedKeyword}
              onSelect={handleSelectKeyword}
              options={keywordsOptions}
            />
          )}
          <StyledDropdown
            label={t("opponents-type_label")}
            placeholder="opponents-type_choose"
            value={selectedType}
            onSelect={handleSelectType}
            options={dataTypeOptions}
          />
        </StyledBox>
        <StyledTable>
          {isFetchingGTrends && <StyledLoader />}
          {dataset.length === 0 && !isFetchingGTrends && (
            <StyledNoData>{t("opponents-related_no-data")}</StyledNoData>
          )}
          {!isFetchingGTrends &&
            dataset.map((row: any, index: number) => {
              const value =
                typeof row[dataValue] === "number"
                  ? numberWithCommas(row[dataValue])
                  : row[dataValue];

              return (
                <StyledRow key={index}>
                  <StyledRowTitle>{row[dataTitle]}</StyledRowTitle>
                  <StyledValue>{value}</StyledValue>
                </StyledRow>
              );
            })}
        </StyledTable>
      </Card>
    );
  }
);

export default withErrorBoundaryHOC(OpponentsRelatedTable);
