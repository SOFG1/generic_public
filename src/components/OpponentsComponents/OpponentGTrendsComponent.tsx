import React, { useMemo } from "react";
import styled from "styled-components";
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
import { useOpponentsState } from "../../store/opponents";
import { colors } from "../../styles/colors";
import { Loader } from "../../UI/Spinners";
import { desktopBp } from "../../styles/variables";
import { colorsChart } from "../../config";

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

const Wrapper = styled.div`
  width: 100%;
  margin-top: -1.56vw;
  @media screen and (max-width: ${desktopBp}) {
    margin-top: -20px;
  }
`;

const ChartStyled = styled(Chart)`
 height: 460px;
  max-width: 100%;
  @media screen and (max-width: ${desktopBp}) {
   height: 294px;
  }
`;

const StyledLoader = styled(Loader)`
  height: 10.94vw;
  width: 10.94vw;
  margin: 1.04vw auto;
  @media screen and (max-width: ${desktopBp}) {
    height: 137px;
    width: 137px;
    margin: 13px auto;
  }
`;


const OpponentGTrendsComponent = React.memo(() => {
  const { opponentGtrends, isFetchingGTrends, searchKeywords} = useOpponentsState();


  const labels = useMemo(() => {
    const firstValue = opponentGtrends
      ? Object.values(opponentGtrends)[0]?.interest_over_time
      : null;
    if (firstValue) {
      return Object.keys(firstValue);
    }
    return []
  }, [opponentGtrends]);
 
  const dataSets = useMemo(() => {
    if (opponentGtrends && Object.values(opponentGtrends).length) {
      return Object.keys(opponentGtrends).map((title, i) => {
        //Get opponent order(0 | 1 | 2 | 3) to get proper color order
        const colorIndex = Object.values(searchKeywords).indexOf(title)
        return {
          type: "line" as const,
          label: title,
          borderColor: colorsChart[colorIndex],
          backgroundColor: colorsChart[colorIndex],
          borderWidth: 1,
          tension: 0,
          data:opponentGtrends[title] ? Object.values(opponentGtrends[title].interest_over_time) : [],
        };
      });
    }
    return [];
  }, [opponentGtrends]);

  const chartData = {
    labels: labels,
    datasets: dataSets,
  };

  

  return (
    <Wrapper>
      {isFetchingGTrends ? (
        <StyledLoader />
      ) : (
        <ChartStyled
          type="bar"
          data={chartData}
          options={{
            maintainAspectRatio: false,
            scales: {
              y: {
                grid: {
                  borderDash: [4],
                  color: "#A8A8A8",
                  lineWidth: 1,
                  borderWidth: 2,
                  borderColor: "#000",
                },
                ticks: {
                  color: "#000",
                  callback: function (value) {
                    return value + "%";
                  },
                },
                min: 0,
                max: 100,
              },
              x: {
                offset: false,
                grid: {
                  offset: false,
                  display: false,
                  borderColor: "#000",
                  borderWidth: 2,
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
      )}
    </Wrapper>
  );
});

export default OpponentGTrendsComponent;
