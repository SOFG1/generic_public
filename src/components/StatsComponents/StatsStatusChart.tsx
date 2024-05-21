import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { StatisticsPreloader } from "../RawDataComponents";
import { colorsChart } from "../../config";
import { useRawDataActions, useRawDataState } from "../../store/rawData";
import { useUserState } from "../../store/user";
import { desktopBp } from "../../styles/variables";
import { GearHintComponent } from "../../UI/GearHintComponent";
import { Card } from "../common/Card";
import { RefreshButton } from "../common/RefreshButton";
import DonutChart from "../RawDataComponents/DonutChart";
import { HintComponent } from "../../UI/HintComponent";
import { activityList } from "../../config/userActivityList";
import { withErrorBoundaryHOC } from "../../utils/withErrorBoundaryHOC";

const CardStyled = styled(Card)`
  position: relative;
  display: flex;
  flex-direction: column;
  position: relative;
  margin-bottom: 0;
  @media screen and (max-width: ${desktopBp}) {
    min-width: 222px;
  }
`;

const StyledBox = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
`;

const StyledHint = styled(HintComponent)`
  margin-inline-start: 10px;
  align-self: center;
`;

const StyledGearHint = styled(GearHintComponent)`
  position: absolute;
  bottom: 5px;
  inset-inline-end: 5px;
`;

const StyledRefreshBtn = styled(RefreshButton)`
  margin-inline-start: auto;
`;

const PredictionChartStyled = styled(DonutChart)`
  position: absolute;
  width: 85%;
  opacity: 0.8;
`;

const StatusChartStyled = styled(DonutChart)`
  width: 100%;
  z-index: 2;
`;

const DoughnutWrapper = styled.div`
  position: relative;
  width: 116%;
  align-self: center;
  height: auto;
  margin-top: -1.04vw;
  display: flex;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: ${desktopBp}) {
    margin-top: -13px;
  }
`

const Legend = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.99vw;
  @media screen and (max-width: ${desktopBp}) {
    gap: 12px;
  }
`;

const LegendItem = styled.p<{ color: string }>`
  display: flex;
  align-items: center;
  gap: 0.47vw;
  font-size: 0.83vw;
  line-height: 1.09vw;
  min-width: 20%;
  margin: 0;
  span {
    display: inline-block;
    height: 1.2vw;
    width: 1.2vw;
    border-radius: 50%;
    background-color: ${({ color }: any) => color};
  }
  @media screen and (max-width: ${desktopBp}) {
    gap: 6px;
    font-size: 10px;
    line-height: 14px;
    span {
      height: 15px;
      width: 15px;
    }
  }
`;

interface IProps {
  title: React.ReactNode;
  className?: string;
}

const StatsStatusChart = React.memo(({ title, className }: IProps) => {
  const isRtl = document.body.dir === "rtl";
  const { t } = useTranslation();
  const { statusCoors } = useUserState();
  const { stats, isFetchingStats } = useRawDataState();
  const { onUpdateStat } = useRawDataActions();

  const statusData = useMemo(() => {
    return stats?.status_stat.map((item, index) => {
      return {
        status: item.status,
        percent: item.percent,
        value: item.count,
        color:
          statusCoors?.find((s) => s.status === item.status)?.color ||
          colorsChart[index],
      };
    });
  }, [stats?.status_stat, statusCoors]);

  const predictionData = useMemo(() => {
    return stats?.status_prediction_stat?.map((item, id) => {
      return {
        status: item.status,
        value: item.count,
        color:
          statusCoors?.find((s) => s.status === item.status)?.color ||
          colorsChart[id],
      };
    }) || []
  }, [stats?.status_prediction_stat, statusCoors]);

  return (
    <CardStyled className={className}>
      <StyledBox>
        {title}
        {!isFetchingStats && (
          <StyledRefreshBtn
            action={activityList["update-status-data"]}
            onClick={onUpdateStat}
            disabled={isFetchingStats}
            hint={t("raw-data_refresh")}
          />
        )}
        <StyledHint position="top" items={[t("stats_status-hint")]} />
      </StyledBox>
      {!isFetchingStats ? (
        <>
          <DoughnutWrapper>
            <StatusChartStyled
              showTicks={true}
              showLegend={false}
              innerRadius={40}
              outerRadius={55}
              boxSize={210}
              fontSize={9}

              data={statusData}
              showTooltip={true}
            />
            <PredictionChartStyled
              showTicks={false}
              showLegend={false}
              innerRadius={37}
              outerRadius={48}
              fontSize={9}
              data={predictionData}
              showTooltip={true}
            />
          </DoughnutWrapper>
          <Legend>
            {statusData?.map((i) => (
              <LegendItem key={i.status} color={i.color}>
                <span></span>
                {i.status}
              </LegendItem>
            ))}
          </Legend>
        </>
      ) : (
        <StatisticsPreloader />
      )}
      <StyledGearHint
        action={activityList["status-hint"]}
        currentHint="status-chart1"
        startPoint={isRtl ? "right" : "left"}
        hintArrowTarget="Menu-Settings"
      />
    </CardStyled>
  );
});

export default withErrorBoundaryHOC<IProps>(StatsStatusChart);
