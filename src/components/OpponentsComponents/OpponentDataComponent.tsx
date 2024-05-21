import React, { useMemo, useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import { Card } from "../common/Card";
import { Title } from "../common/Title";
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  registerables,
} from "chart.js";
import { Chart } from "react-chartjs-2";
import { convert1000toK } from "../../utils/convert1000toK";
import {
  IOpponentData,
  OpponentOrderType,
  useOpponentsState,
} from "../../store/opponents";
import { Dropdown } from "../../UI/Dropdown";
import { Loader } from "../../UI/Spinners";
import { numberWithCommas } from "../../utils/numberWidthCommas";
import { desktopBp } from "../../styles/variables";
import { colorsChart } from "../../config";
import CurrencySymbols from "../../data/currency-symbols.json";
import { useTranslation } from "react-i18next";
import { withErrorBoundaryHOC } from "../../utils/withErrorBoundaryHOC";

ChartJS.register(
  ...registerables,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip
);

const StyledCard = styled(Card)`
  align-items: flex-start;
  margin-bottom: 0;
`;

const StyledBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0.57vw 0 1.61vw;
  @media screen and (max-width: ${desktopBp}) {
    margin: 7px 0 20px;
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
  margin-inline-end: 15px;
  @media screen and (max-width: ${desktopBp}) {
    height: 14px;
    width: 14px;
  }
`;

const OpponentsDropdown = styled(Dropdown)`
  width: 13.54vw;
  @media screen and (max-width: ${desktopBp}) {
    width: 170px;
  }
`;

const StyledValue = styled.p`
  font-size: 1.15vw;
  line-height: 1.51vw;
  margin: 0 0 0.52vw;
  span {
    font-weight: 700;
  }
  @media screen and (max-width: ${desktopBp}) {
    font-size: 14px;
    line-height: 19px;
    margin: 0 0 7px;
  }
`;

const ChartStyled = styled(Chart)`
  max-height: 8.02vw;
  max-width: 100%;
  @media screen and (max-width: ${desktopBp}) {
    max-height: 101px;
  }
  @media screen and (max-width: 1100px) {
    max-height: 270px;
  }
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

type CurrencySymbolsKey = keyof typeof CurrencySymbols;

interface IProps {
  title: string;
  property: "budget" | "number_of_posts" | "reach";
}

const OpponentDataComponent = React.memo(({ title, property }: IProps) => {
  const { t } = useTranslation()
  const { opponentsData, selectedOpponents, isFetchingData } =
    useOpponentsState();
  const [selectedOpponent, setSelectedOpponent] = useState<
    OpponentOrderType | ""
  >("");

  const activeOpponentsCount = useMemo(() => {
    return Object.values(opponentsData).filter((o) => o).length;
  }, [opponentsData]);

  const opponentsOptions = useMemo(() => {
    return (Object.keys(selectedOpponents) as OpponentOrderType[])
      .filter((key) => opponentsData[key] && selectedOpponents[key]?.page_name)
      .map((key) => ({
        item: selectedOpponents[key].page_name,
        value: key,
      }));
  }, [selectedOpponents, opponentsData]);

  const labels = useMemo(() => {
    return opponentsData[selectedOpponent as OpponentOrderType]
      ? (opponentsData[selectedOpponent as OpponentOrderType] as IOpponentData)[
        property
      ].chart.map(({ month }: any) => month)
      : [];
  }, [opponentsData, selectedOpponent, property]);

  const dataset: any[] = useMemo(() => {
    return opponentsData[selectedOpponent as OpponentOrderType]
      ? [
        {
          type: "line" as const,
          label: title,
          borderColor: colorsChart[selectedOpponent as OpponentOrderType],
          backgroundColor: colorsChart[selectedOpponent as OpponentOrderType],
          borderWidth: 1,
          tension: 0,
          data: (
            opponentsData[
            selectedOpponent as OpponentOrderType
            ] as IOpponentData
          )[property].chart.map(({ value }: any) => value),
        },
      ]
      : [];
  }, [opponentsData, selectedOpponent]);

  const chartData = useMemo(() => {
    return {
      labels: labels,
      datasets: dataset,
    };
  }, [labels, dataset]);

  const totalValue = useMemo(() => {
    const value: number = opponentsData[selectedOpponent as OpponentOrderType]
      ? (opponentsData[selectedOpponent as OpponentOrderType] as IOpponentData)[
        property
      ].total
      : 0;
    return numberWithCommas(Math.round(value));
  }, [opponentsData, selectedOpponent]);

  const lastMonthValue = useMemo(() => {
    const value: number = opponentsData[selectedOpponent as OpponentOrderType]
      ? (opponentsData[selectedOpponent as OpponentOrderType] as IOpponentData)[
        property
      ].last_month
      : 0;
    return numberWithCommas(Math.round(value));
  }, [opponentsData, selectedOpponent]);

  //Generates sign for 'budget' property (USD,CAD,EUR...)
  const currencySign = useMemo(() => {
    const currency = opponentsData[selectedOpponent as OpponentOrderType]
      ? (opponentsData[selectedOpponent as OpponentOrderType] as IOpponentData)[
        property
      ].currency
      : "";
    return currency
      ? CurrencySymbols[currency as CurrencySymbolsKey].symbol
      : "";
  }, [opponentsData, selectedOpponent, CurrencySymbols]);

  const opponentColor = useMemo(() => {
    return selectedOpponent ? colorsChart[selectedOpponent] : "";
  }, [colorsChart, selectedOpponent]);

  const handleSelect = useCallback((o: OpponentOrderType | "") => {
    setSelectedOpponent(o);
    //cache selected opponent
    localStorage.setItem(`opponents-selected-${property}-table`, o);
  }, []);

  //Set cached opponent initially
  useEffect(() => {
    const selected = localStorage.getItem(
      `opponents-selected-${property}-table`
    );
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
    <StyledCard>
      <StyledBox>
        <StyledTitle>{title}</StyledTitle>
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
        <>
          <StyledValue>
            {t("opponents-total")}
            <span>
              {totalValue} {currencySign}
            </span>
          </StyledValue>
          <StyledValue>
            {t("opponents-last_month")}
            <span>
              {numberWithCommas(lastMonthValue)} {currencySign}
            </span>
          </StyledValue>
          <ChartStyled
            type="bar"
            data={chartData}
            options={{
              maintainAspectRatio: false,
              scales: {
                y: {
                  grid: {
                    color: "#000",
                  },
                  ticks: {
                    callback: function (value) {
                      return convert1000toK(value as number);
                    },
                  },
                },
                x: {
                  offset: false,
                  grid: {
                    offset: false,
                    color: "#000",
                  },
                  ticks: {
                    color: "#000",
                  },
                },
              },
              plugins: {
                legend: {
                  display: false,
                },
              },
            }}
          />
        </>
      )}
    </StyledCard>
  );
});

export default withErrorBoundaryHOC(OpponentDataComponent);
