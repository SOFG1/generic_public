import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
  useRef,
} from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Filler,
  Legend,
  Tooltip,
  registerables,
} from "chart.js";
import { Chart } from "react-chartjs-2";
import { Card } from "../common/Card";
import { Title } from "../common/Title";
import { useSentimentorActions } from "../../store/sentimentor/hooks";
import { useSelector } from "react-redux";
import {
  sentimentorAnalysisSelector,
  sentimentorAppliedFiltersSelector,
  sentimentorFetchingAnalysisSelector,
} from "../../store/sentimentor/selectors";
import { desktopBp } from "../../styles/variables";
import { HintComponent } from "../../UI/HintComponent";
import { colorsChart } from "../../config";
import { Loader } from "../../UI/Spinners";
import { aDayInMilliseconds, getFormatDate } from "../../utils";
import { settingsMainInstitutionSelector, useSettingsState } from "../../store/settings";
import { CameraIcon } from "../../UI/Svg";
import { withErrorBoundaryHOC } from "../../utils/withErrorBoundaryHOC";
const { useScreenshot, createFileName } = require("use-react-screenshot");

ChartJS.register(
  ...registerables,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Filler,
  Legend,
  Tooltip
);

const ChartComponentStyled = styled(Card)`
  width: 100%;
  flex: 1;
  margin-bottom: 0;
  padding-bottom: 2.03vw;
  @media screen and (max-width: ${desktopBp}) {
    padding-bottom: 25px;
  }
`;

const CardHeader = styled.div`
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  margin-top: 1.04vw;
  gap: 5px;
  @media screen and (max-width: ${desktopBp}) {
    margin-top: 13px;
  }
  @media screen and (max-width: 540px) {
    justify-content: space-between;
  }
`;

const CardTitle = styled(Title)`
  font-size: 1.67vw;
  line-height: 2.19vw;
  font-weight: normal;
  margin: 0;
  margin-inline-end: auto;
  @media screen and (max-width: ${desktopBp}) {
    font-size: 21px;
    line-height: 27px;
  }
`;

const StyledDownloadBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 20px;
  width: 20px;
  border: 1px solid #000;
  border-radius: 20px;
  background-color: transparent;
  cursor: pointer;
  padding: 2px;
  box-sizing: padding-box;
  p {
    display: none;
    margin:5px 0;
    white-space: nowrap;
    line-height: 0.8;
    font-size: 0.83vw;
    @media screen and (max-width: ${desktopBp}) {
      font-size: 10px;
    }
  }
  :hover {
    width: auto;
  }
  :hover p {
    display: block;
  }
  svg {
    max-width: 90%;
    max-height: 90%;
  }
`;

const ChartWrapper = styled.div`
  width: 100%;
  height: 27.71vw;
  @media screen and (max-width: ${desktopBp}) {
    height: 348px;
  }
  @media screen and (max-width: 500px) {
    height: 320px;
  }
`;

const StyledLoader = styled(Loader)`
  height: 13.02vw;
  width: 13.02vw;
  margin: 1.56vw auto;
  @media screen and (max-width: ${desktopBp}) {
    height: 163px;
    width: 163px;
    margin: 20px auto;
  }
`;

const StyledNoData = styled.p`
  margin-top: 2.08vw;
  font-size: 1.04vw;
  text-align: center;
  @media screen and (max-width: ${desktopBp}) {
    margin-top: 26px;
    font-size: 13px;
  }
`;

const ChartStyled = styled(Chart)`
  height: 100%;
  max-height: 100%;
  max-width: 100%;
`;

const ChartComponent = React.memo(() => {
  const { t } = useTranslation();
  const { onGetAnalysis, onApplyFilters } = useSentimentorActions();
  const appliedFilters = useSelector(sentimentorAppliedFiltersSelector)
  const { institutions } = useSettingsState()
  const [maxWidth540, setMaxWidth540] = useState<boolean>(false);
  const chartData = useSelector(sentimentorAnalysisSelector);
  const fetchingAnalysis = useSelector(sentimentorFetchingAnalysisSelector);
  const [image, takeScreenshot] = useScreenshot();
  const chartRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    onGetAnalysis();
  }, []);

  const mQuery540px = useMemo(() => {
    return window.matchMedia("(max-width: 540px)");
  }, []);

  const handleSetMaxWidth540 = useCallback(() => {
    setMaxWidth540(mQuery540px.matches);
  }, [mQuery540px]);

  useEffect(() => {
    setMaxWidth540(mQuery540px.matches);
    mQuery540px?.addEventListener("change", handleSetMaxWidth540);
    return () =>
      mQuery540px?.removeEventListener("change", handleSetMaxWidth540);
  }, [mQuery540px, handleSetMaxWidth540]);

  const hintPopupPosition = useMemo(() => {
    return maxWidth540 ? "start" : "end";
  }, [maxWidth540]);

  const data = useMemo(() => {
    const firstData = Object.values(chartData)[0];
    return {
      labels: firstData ? firstData.map(({ date }) => date) : [],
      datasets: Object.keys(chartData).map((key: string, i: number) => {
        const color = institutions.find(i => i.inst_name === key)?.color || colorsChart[i]
        return {
          type: "line" as const,
          label: key === "null" ? t("ranking_chart-label") : key,
          borderColor: color || '#000',
          pointBackgroundColor: color || '#000',
          borderWidth: 1,
          backgroundColor: "rgba(254, 89, 18, 0.55)",
          target: "origin",
          fill: Object.keys(chartData).length === 1,
          tension: 0,
          data: chartData[key].map(({ score }) => score),
        };
      }),
    };
  }, [chartData, t, institutions]);

  const noDataYet = useMemo(() => {
    return Object.keys(chartData).length === 0;
  }, [chartData]);

  const showLegend = useMemo(() => {
    return Object.keys(chartData).length > 1;
  }, [chartData]);

  const handleSaveScreenshot = useCallback(async () => {
    const a = document.createElement("a");
    a.download = createFileName("jpg", "Sentiment Analysis");
    a.href = await takeScreenshot(chartRef.current);
    a.click();
  }, [chartRef]);

  const handleClick = (e: any, element: any) => {
    if (!element[0]) return
    const itemIndex = element[0].index;
    const date = data.labels[itemIndex]
    const dateFormated = getFormatDate(new Date(date))
    const dateStr = `${dateFormated} - ${dateFormated}`
    onApplyFilters({...appliedFilters, date: dateStr})
  }


  return (
    <ChartComponentStyled>
      <CardHeader>
        <CardTitle>{t("ranking_analysis-title")}</CardTitle>
        <HintComponent
          position={hintPopupPosition}
          items={[t("ranking_analysis-hint")]}
        />
        <StyledDownloadBtn
          onClick={handleSaveScreenshot}
        >
          <CameraIcon />
          <p>{t("ranking_analysis-download")}</p>
        </StyledDownloadBtn>
      </CardHeader>
      <ChartWrapper ref={chartRef}>
        {!fetchingAnalysis && noDataYet && (
          <StyledNoData>{t("ranking_no-data")}</StyledNoData>
        )}
        {fetchingAnalysis && <StyledLoader />}
        {!noDataYet && !fetchingAnalysis && (
          <ChartStyled
            type="bar"
            data={data}
            options={{
              maintainAspectRatio: false,
              onClick: handleClick,
              scales: {
                y: {
                  max: 10,
                  min: 0,
                  beginAtZero: true,
                  grid: {
                    borderColor: "#000",
                    borderWidth: 2,
                    color: (context) => {
                      return context.tick.value === 0 ? "#000" : "#A8A8A8";
                    },
                    borderDash: (context) => {
                      return context.tick.value === 0 ? [0] : [6];
                    },
                    lineWidth: (context) => {
                      return context.tick.value === 0 ? 2 : 1;
                    },
                  },
                  ticks: {
                    color: "#000",
                    crossAlign: "far",
                    stepSize: 20,
                    // callback: function (value) {
                    //   return value + "%";
                    // },
                  },
                },
                x: {
                  offset: false,
                  grid: {
                    offset: false,
                    color: "#d9d9d984",
                  },
                  ticks: {
                    callback: function (val, index) {
                      const label = this.getLabelForValue(val as number)
                        .slice(5)
                        .replace("-", "/");
                      // Hide every 3nd tick label
                      return index % 3 === 0 ? label : "";
                    },
                    align: "center",
                    color: "#000",
                    font: {
                      size: 10,
                      family: "IMBPlexSansHebrew",
                    },
                  },
                },
              },
              plugins: {
                legend: {
                  display: showLegend,
                  align: "start",
                  labels: {
                    boxWidth: 14,
                    boxHeight: 14,
                    usePointStyle: true,
                    textAlign: "left",
                    font: {
                      size: 12,
                      //   family: "IMBPlexSansHebrew",
                      weight: "700",
                    },
                    color: "#000",
                    padding: 25,
                    boxPadding: 5,
                    generateLabels: (chart) => {
                      return chart.data.datasets.map((d: any, i) => {
                        const hidden = !chart.getDatasetMeta(i)?.visible;
                        return {
                          text: d.label,
                          datasetIndex: i,
                          index: i,
                          fontStyle: 'bold',
                          fillStyle: hidden ? "#ffffff" : d.borderColor,
                          strokeStyle: d.borderColor,
                          fontColor: hidden ? "#AAAAAA" : d.borderColor,
                        };
                      });
                    },
                  },
                },
                tooltip: {
                  enabled: true,
                  callbacks: {
                    label: function (context) {
                      const label = context.dataset.label || "";
                      const value = context.parsed.y.toFixed(2);
                      const index = context.dataIndex;
                      const prevData = context.dataset.data[index - 1];
                      let difference =
                        typeof prevData === "number"
                          ? parseInt(value, 10) - prevData
                          : "";
                      if (typeof difference === "number" && difference >= 0) {
                        difference = `(+${difference.toFixed(2)})`;
                      }
                      if (typeof difference === "number" && difference < 0) {
                        difference = difference = `(${difference.toFixed(2)})`;
                      }
                      return `${label}: ${value} ${difference}`;
                    },
                  },
                },
              },
            }}
          />
        )}
      </ChartWrapper>
    </ChartComponentStyled>
  );
});

export default withErrorBoundaryHOC(ChartComponent);
