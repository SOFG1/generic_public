import React, { useEffect, useMemo, useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { colorsChart } from "../../config";
import {
  IOpponentData,
  OpponentOrderType,
  useOpponentsState,
} from "../../store/opponents";
import { desktopBp } from "../../styles/variables";
import { Dropdown } from "../../UI/Dropdown";
import { Loader } from "../../UI/Spinners";
import { getPercentOfTotal } from "../../utils/getPercentOfTotal";
import { numberWithCommas } from "../../utils/numberWidthCommas";
import { Card } from "../common/Card";
import { Title } from "../common/Title";

const OpponentsDropdown = styled(Dropdown)`
  width: 13.54vw;
  margin-bottom: 1.04vw;
  @media screen and (max-width: ${desktopBp}) {
    width: 170px;
    margin-bottom: 14px;
  }
`;

const StyledBox = styled.div`
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

const StyledTable = styled.div`
  height: 23.85vw;
  overflow-y: auto;
  @media screen and (max-width: ${desktopBp}) {
    height: 299px;
  }
`;

const StyledRow = styled.div`
  padding: 3px 0;
  display: flex;
  box-sizing: border-box;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #b1b1b1;
  height: 3.91vw;
  &:last-child {
    border: none;
  }
  @media screen and (max-width: ${desktopBp}) {
    height: 49px;
  }
`;

const StyledRowTitle = styled.p`
  font-size: 0.73vw;
  line-height: 0.94vw;
  margin: 0;
  font-weight: 700;
  width: 6.25vw;
  @media screen and (max-width: ${desktopBp}) {
    font-size: 10px;
    line-height: 12px;
    width: 78px;
  }
`;

const StyledValue = styled(StyledRowTitle)`
  color: #000;
  margin-bottom: 0;
  text-align: center;
`;

const StyledValueEnd = styled(StyledValue)`
  text-align: end;
`;

const StyledLoader = styled(Loader)`
  height: 10.42vw;
  width: 10.42vw;
  margin: 0 auto;
  @media screen and (max-width: ${desktopBp}) {
    height: 131px;
    width: 131px;
  }
`;

const GeoTableComponent = React.memo(() => {
  const { t } = useTranslation();
  const { opponentsData, selectedOpponents, isFetchingData } =
    useOpponentsState();
  const [selectedOpponent, setSelectedOpponent] = useState<
    OpponentOrderType | ""
  >("");

  const activeOpponentsCount = useMemo(() => {
    return Object.values(opponentsData).filter((o) => o).length;
  }, [opponentsData]);

  const opponentsOptions = useMemo(() => {
    return Object.keys(selectedOpponents)
      .filter(
        (key) =>
          opponentsData[key as OpponentOrderType] &&
          selectedOpponents[key as OpponentOrderType]?.page_name
      )
      .map((key) => ({
        item: selectedOpponents[key as OpponentOrderType].page_name,
        value: key,
      }));
  }, [selectedOpponents, opponentsData]);

  const tableData: { [key: string]: any } = useMemo(() => {
    return opponentsData[selectedOpponent as OpponentOrderType]
      ? (opponentsData[selectedOpponent as OpponentOrderType] as IOpponentData)
          .geo_target_groups
      : {};
  }, [opponentsData, selectedOpponent]);

  const totalValue: number = useMemo(() => {
    return Object.values(tableData).reduce((v, prev) => {
      return v + prev;
    }, 0);
  }, [tableData]);

  const opponentColor = useMemo(() => {
    return selectedOpponent ? colorsChart[selectedOpponent] : "";
  }, [colorsChart, selectedOpponent]);

  const handleSelect = useCallback((o: OpponentOrderType | "") => {
    setSelectedOpponent(o);
    //cache selected opponent
    localStorage.setItem("opponents-selected-geo-table", o);
  }, []);

  //Set cached opponent initially
  useEffect(() => {
    const selected = localStorage.getItem("opponents-selected-geo-table");
    if (selected) setSelectedOpponent(selected as OpponentOrderType);
  }, []);

  //Set selected opponent to existing (if there is one opponent exist)
  useEffect(() => {
    const dataset = Object.values(opponentsData);
    if (dataset.filter((o) => o).length === 1) {
      const order = dataset.findIndex((d) => d !== null);
      handleSelect(String(order) as OpponentOrderType);
    }
  }, [opponentsData]);

  return (
    <Card>
      <StyledBox>
        <StyledTitle>{t("opponents-geo")}</StyledTitle>
        <ColorBadge color={opponentColor} />
      </StyledBox>
      {activeOpponentsCount > 1 && (
        <OpponentsDropdown
          label={t("opponents-choose")}
          placeholder={t("opponents-choose")}
          value={selectedOpponent}
          onSelect={handleSelect}
          options={opponentsOptions}
        />
      )}
      {isFetchingData ? (
        <StyledLoader />
      ) : (
        <StyledTable>
          {Object.keys(tableData).map((key, index) => {
            const percent = getPercentOfTotal(tableData[key], totalValue, 2);
            const percentShorted = Number.isInteger(percent)
              ? percent
              : percent;
            return (
              <StyledRow key={index}>
                <StyledRowTitle>{key}</StyledRowTitle>
                <StyledValue>{percentShorted}%</StyledValue>
                <StyledValueEnd>
                  {numberWithCommas(tableData[key])}
                </StyledValueEnd>
              </StyledRow>
            );
          })}
          <StyledRow>
            <StyledRowTitle>
              <b>{t("opponents-geo_total")}</b>
            </StyledRowTitle>
            <div>
              <StyledValueEnd>{numberWithCommas(totalValue)}</StyledValueEnd>
            </div>
          </StyledRow>
        </StyledTable>
      )}
    </Card>
  );
});

export default GeoTableComponent;
