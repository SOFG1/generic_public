import React, { useMemo, useEffect } from "react";
import styled from "styled-components";
import { Card, card_size } from "../common/Card";
import { Title } from "../common/Title";
import { colors } from "../../styles/colors";
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
import { useSMStatsState, useSMStatsActions } from "../../store/smStats";
import { useTranslation } from "react-i18next";
import { Loader } from "../../UI/Spinners";
import { useAppActions } from "../../store/app";
import { getFormatDate } from "../../utils";
import { useUserState } from "../../store/user";
import { desktopBp } from "../../styles/variables";
import { colorsChart } from "../../config";
import DigitalPostHint from "./DigitalPostHint";
import { useSettingsActions, useSettingsState } from "../../store/settings";
import { demoPostsList, demoUsers } from "../../config/demoUsers";

ChartJS.register(
  ...registerables,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  //This is a custom plugin to increase the legend height in order to add space between the legend and the chart
  {
    id: "customSpacingLegend",
    beforeInit(chart) {
      // Get reference to the original fit function
      //@ts-ignore
      const originalFit = chart.legend.fit;
      // Override the fit function
      //@ts-ignore
      chart.legend.fit = function fit() {
        // Call original function and bind scope in order to use `this` correctly inside it
        originalFit.bind(chart.legend)();
        // Change the height as suggested in another answers
        //@ts-ignore
        this.height += 45;
      };
    },
  }
);

const CardStyled = styled(Card)`
  width: 100%;
  min-height: 23.44vw;
  margin-bottom: 0;
  @media screen and (max-width: ${desktopBp}) {
    min-height: 294px;
  }
`;

const CardHeader = styled.div`
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-top: 1.04vw;
  margin-bottom: 1.51vw;
  @media screen and (max-width: ${desktopBp}) {
    margin-top: 13px;
    margin-bottom: 19px;
  }
`;

const CardTitle = styled(Title)`
  font-size: 1.67vw;
  line-height: 2.19vw;
  font-weight: normal;
  color: #000;
  margin: 0;
  margin-inline-end: 1.20vw;
  @media screen and (max-width: ${desktopBp}) {
    font-size: 21px;
    line-height: 27px;
    margin-inline-end: 15px;

  }
`;

const ChartStyled = styled(Chart)`
  max-height: 32.03vw;
  width: 100%;
  max-width: 100%;
  @media screen and (max-width: ${desktopBp}) {
    max-height: 402px;
  }
  @media screen and (max-width: 500px) {
    max-height: 550px;
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

const LoadingText = styled.p`
  font-size: 1.15vw;
  line-height: 1.3vw;
  font-weight: normal;
  color: ${colors.graphite_6};
  @media screen and (max-width: ${desktopBp}) {
    font-size: 14px;
    line-height: 16px;
  }
`;

const StyledNoData = styled.p`
  font-size: 0.94vw;
  text-align: center;
  @media screen and (max-width: ${desktopBp}) {
    font-size: 12px;
  }
`;

const EngagementRateComponent = React.memo(() => {
  const { t } = useTranslation();
  const { userInfo } = useUserState();
  const { defaultPages } = useSettingsState();
  const { postViews, isFetchingStats, postList } = useSMStatsState();
  const { onSelectPreviewPost, onClearPreviewPost, onSetPreviewPost } = useSMStatsActions();
  const { onGetDefaultPages } = useSettingsActions();
  const { onShowAlert } = useAppActions();

  const labels: string[] = useMemo(() => {
    const values = Object.values(postViews);
    if (values.length > 0) {
      return values[0].map((item) => item.m_date);
    }
    return [];
  }, [postViews]);

  const isDemoUser = useMemo(() => {
    return demoUsers.includes(userInfo?.login as string)
  }, [userInfo?.login])

  const data = useMemo(() => {
    const datasets = [];
    let i = 0;
    for (const label in postViews) {
      const pageId = postViews[label][0] ? postViews[label][0].page_id : "";
      const visibleByDefault = defaultPages.find(
        (p) => p.page_id === pageId
      )?.viewed || isDemoUser
      const dataset = {
        type: "line" as const,
        label: label,
        borderColor: colorsChart[i],
        backgroundColor: colorsChart[i],
        //disable every 3rd label
        hidden: !visibleByDefault,
        borderWidth: 1,
        fill: false,
        tension: 0,
        parsing: {
          xAxisKey: "m_date",
          yAxisKey: "engagements_rate",
        },
        data: postViews[label].map((item) => {
          return {
            engagements_rate: item.engagements_rate * 100,
            m_date: item.m_date,
            page_id: item.page_id,
            posts_rate: item.posts_rate,
            video_rate: item.video_rate,
          };
        }),
      };
      datasets.push(dataset);
      i++;
    }
    return {
      labels,
      datasets: datasets,
    };
  }, [labels, postViews, defaultPages, isDemoUser]);



  const postsWithDates = useMemo(() => {
    return postList.map((post) => {
      return {
        ...post,
        date: new Date(post.date).getTime() / 86400000,
      };
    });
  }, [postList]);

  

  const handleClick = (evt: any, element: any) => {
    // Get the latest post in last 7 days from clicked point period
    if (element.length > 0) {
      // selected data from chart
      const pageIndex = element[0].datasetIndex;
      console.log(pageIndex)
      if(demoUsers.includes(userInfo?.login as string)) { //Custom logic for demo user
        onSetPreviewPost(demoPostsList[pageIndex])
        return
      }
      const itemIndex = element[0].index;
      const pageId = data.datasets[pageIndex].data[itemIndex].page_id;
      const date = data.datasets[pageIndex].data[itemIndex].m_date;
      // Filtering actual post (author & not older than 7 days)
      const selectedPeriodInDays = new Date(date).getTime() / 86400000;
      const actualPost = postsWithDates.filter((post) => {
        const postPage = post.post_id.split("_")[0];
        return (
          post.date > selectedPeriodInDays - 8 &&
          post.date <= selectedPeriodInDays &&
          postPage === pageId
        );
      })[0];
      if (actualPost) onSelectPreviewPost(actualPost.post_id);
      if (!actualPost) {
        onClearPreviewPost();
        const currentDate = getFormatDate(new Date(date));
        const weekEarlyDate = getFormatDate(
          new Date((selectedPeriodInDays - 8) * 86400000)
        );
        onShowAlert(
          false,
          `No posts on this page between ${currentDate} - ${weekEarlyDate}`
        );
      }
    }
  };

  const noData = useMemo(() => {
    return Object.keys(postViews).length === 0;
  }, [postViews]);

  const noDataMessage = useMemo(() => {
    //Show different message depending user's facebook authorization
    const hasFacebook = !!userInfo?.group?.facebook[0];
    return hasFacebook ? t("ranking_no-data") : t("ranking_no-facebook");
  }, [t, userInfo]);

  useEffect(() => {
    onGetDefaultPages();
  }, []);

  return (
    <CardStyled size={card_size.sm}>
      <CardHeader>
        <CardTitle>{t("stats_post-title")}</CardTitle>
        <DigitalPostHint />
      </CardHeader>

      {!isFetchingStats && noData && (
        <StyledNoData>{noDataMessage}</StyledNoData>
      )}
      {!isFetchingStats && !noData && (
        <ChartStyled
          type="bar"
          data={data}
          options={{
            maintainAspectRatio: false,
            onClick: handleClick,
            scales: {
              y: {
                grid: {
                  borderDash: [6],
                  color: "#A8A8A8",
                  borderColor: "#000",
                  borderWidth: 2,
                },
                min: 0,
                ticks: {
                  color: "#000",
                  crossAlign: "far",
                  stepSize: 10,
                  callback: function (value) {
                    return value + "%";
                  },
                },
              },
              x: {
                offset: false,
                grid: {
                  offset: false,
                  borderColor: "#000",
                  color: "#D9D9D9",
                  borderWidth: 2,
                },
                ticks: {
                  align: "center",
                  callback: function (val, index) {
                    const label = this.getLabelForValue(val as number)
                      .slice(5)
                      .replace("-", "/");
                    // Hide every 3nd tick label
                    return index % 3 === 0 ? label : "";
                  },
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
                display: true,
                align: "start",
                labels: {
                  boxWidth: 14,
                  boxHeight: 14,
                  usePointStyle: true,
                  textAlign: "left",
                  font: {
                    size: 14,
                    family: "IMBPlexSansHebrew",
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
                        //hidden: hidden,
                        strokeWidth: 0,
                        fillStyle: hidden ? "#ffffff" : d.backgroundColor,
                        strokeStyle: d.backgroundColor,
                        fontColor: hidden ? "#AAAAAA" : "#000",
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
                    const percent = context.parsed.y.toFixed(2);
                    return `${label}: ${percent}%`;
                  },
                  beforeFooter: function (context) {
                    //@ts-ignore
                    let postsRate = context[0].raw?.posts_rate || "";
                    postsRate = postsRate * 100;
                    if (
                      typeof postsRate === "number" &&
                      !Number.isInteger(postsRate)
                    ) {
                      postsRate = postsRate.toFixed(2);
                    }
                    return postsRate ? `Posts rate: ${postsRate}%` : "";
                  },
                  footer: function (context) {
                    //@ts-ignore
                    let videoRate = context[0].raw?.video_rate || "";
                    videoRate = videoRate * 100;
                    if (
                      typeof videoRate === "number" &&
                      !Number.isInteger(videoRate)
                    ) {
                      videoRate = videoRate.toFixed(2);
                    }
                    return videoRate ? `Video rate: ${videoRate}%` : "";
                  },
                },
              },
            },
            elements: {
              point: {
                hoverRadius: 7,
              },
            },
          }}
        />
      )}
      {isFetchingStats && (
        <>
          <LoadingText>{t("stats_post-collecting")}</LoadingText>
          <StyledLoader />
        </>
      )}
    </CardStyled>
  );
});

export default EngagementRateComponent;
