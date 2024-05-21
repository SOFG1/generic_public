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

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 1.56vw 0 4px;
  @media screen and (max-width: ${desktopBp}) {
    margin: 20px 0 3px;
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
  justify-content: space-between;
  margin-bottom: 6px;
  > p {
    text-align: end;
  }
  @media screen and (max-width: ${desktopBp}) {
    margin-bottom: 6px;
  }
`;

const StyledTable = styled.div`
  height: 25vw;
  overflow-y: auto;
  @media screen and (max-width: ${desktopBp}) {
    height: 314px;
  }
`;

const StyledRow = styled.div`
  padding: 3px 0;
  display: flex;
  box-sizing: border-box;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #b1b1b1;
  height: 3.75vw;
  &:last-child {
    border: none;
  }
  > div {
    text-align: end;
  }
  @media screen and (max-width: ${desktopBp}) {
    height: 47px;
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

const StyledRowValue = styled(StyledRowTitle)`
  color: #909090;
  margin-bottom: 0;
`;

const StyledPercent = styled(StyledRowTitle)`
  color: #000;
  margin-bottom: 0;
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

const DemoTableComponent = React.memo(() => {
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
          .demographic_target_groups
      : {};
  }, [opponentsData, selectedOpponent]);

  const labels = useMemo(() => {
    return tableData.unknown ? Object.keys(tableData.unknown).sort() : [];
  }, [tableData]);

  const totalValues: number = useMemo(() => {
    let value: number = 0;
    Object.values(tableData).forEach((column) => {
      const datasetValues: number[] = Object.values(column);
      const total = datasetValues.reduce((p, c) => {
        return p + c;
      });
      value += total;
    });
    return value;
  }, [tableData]);

  const dataKeys = useMemo(() => {
    return Object.keys(tableData);
  }, [tableData]);

  const opponentColor = useMemo(() => {
    return selectedOpponent ? colorsChart[selectedOpponent] : "";
  }, [colorsChart, selectedOpponent]);

  const handleSelect = useCallback((o: OpponentOrderType | "") => {
    setSelectedOpponent(o);
    //Cache selected in localstorage
    localStorage.setItem("opponents-selected-demo-table", o);
  }, []);

  //Set cached value inititally
  useEffect(() => {
    const selected = localStorage.getItem("opponents-selected-demo-table");
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
      <StyledHeader>
        <StyledTitle>{t("opponents-demo")}</StyledTitle>
        <ColorBadge color={opponentColor} />
      </StyledHeader>
      {activeOpponentsCount > 1 && (
        <OpponentsDropdown
          label="Choose opponent"
          placeholder="Choose opponent"
          value={selectedOpponent}
          onSelect={handleSelect}
          options={opponentsOptions}
        />
      )}
      {isFetchingData ? (
        <StyledLoader />
      ) : (
        <>
          <StyledTable>
            <StyledBox>
              <StyledRowTitle></StyledRowTitle>
              {dataKeys.map((key) => (
                <StyledRowTitle key={key}>{key}</StyledRowTitle>
              ))}
            </StyledBox>
            {labels?.map((l) => {
              return (
                <StyledRow key={l}>
                  <StyledPercent>{l}</StyledPercent>
                  {dataKeys?.map((key) => {
                    const value = tableData[key][l];
                    const percent = getPercentOfTotal(value, totalValues, 2);
                    return (
                      <div key={key}>
                        <StyledPercent>{percent}%</StyledPercent>
                        <StyledRowValue>
                          {numberWithCommas(value)}
                        </StyledRowValue>
                      </div>
                    );
                  })}
                </StyledRow>
              );
            })}
            <StyledRow>
              <StyledRowTitle>
                <b>{t("opponents-demo_total")}</b>
              </StyledRowTitle>
              {dataKeys.map((key: string, index: number) => {
                const total = (
                  Object.values(tableData[key]) as number[]
                ).reduce((c: number, p: number) => {
                  return c + p;
                }, 0);
                const percent = getPercentOfTotal(total, totalValues, 2);
                return (
                  <div key={index}>
                    <StyledPercent>{percent}%</StyledPercent>
                    <StyledRowValue>{numberWithCommas(total)}</StyledRowValue>
                  </div>
                );
              })}
            </StyledRow>
          </StyledTable>
        </>
      )}
    </Card>
  );
});

export default DemoTableComponent;
