import React, {useMemo} from "react";
import {useTranslation} from "react-i18next";
import styled from "styled-components";
import {StatisticsPreloader} from ".";
import {colorsChart} from "../../config";
import {useRawDataState} from "../../store/rawData";

import {useUserState} from "../../store/user";
import {desktopBp} from "../../styles/variables";
import {GearHintComponent} from "../../UI/GearHintComponent";
import DonutChart from "./DonutChart";
import {Text} from "../common/Text";
import {activityList} from "../../config/userActivityList";


const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  margin-bottom: 0;
`;

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-height: 1.72vw;
  @media screen and (max-width: ${desktopBp}) {
    max-height: 22px;
  }
`;

const CardTitle = styled(Text)`
  font-weight: 500;
  width: 100%;
  font-size: ${props => props.theme.fontSize.headerSecondary.vw};
  @media screen and (max-width: ${desktopBp}) {
    font-size: ${props => props.theme.fontSize.headerSecondary.px};
  }
`;

const StyledGearHint = styled(GearHintComponent)`
  flex-shrink: 0;
  overflow: hidden;
`;

const StatusChartStyled = styled(DonutChart)`
  width: 100%;
  z-index: 2;
`;

const DoughnutWrapper = styled.div`
  width: 14.80vw;
  @media screen and (max-width: ${desktopBp}) {
    width: 100%;
  }
  
`

const Legend = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.68vw 0.83vw;
  @media screen and (max-width: ${desktopBp}) {
    gap: 8px 10px;
  }
`;


interface IProps {
  className?: string;
}

const StatusChartComponent = React.memo(({ className }: IProps) => {
  const isRtl = document.body.dir === "rtl";
  const { t } = useTranslation();
  const { statusCoors } = useUserState();
  const { stats, isFetchingStats } = useRawDataState();

  const statusData = useMemo(() => {
    return stats?.status_stat.map((item, id) => {
      return {
        status: item.status,
        percent: Number(item.percent.toFixed(2)),
        value: item.count,
        color:
          statusCoors?.find((s) => s.status === item.status)?.color ||
          colorsChart[id],
      };
    });
  }, [stats?.status_stat, statusCoors]);


  return (
    <Container className={className}>
      <StyledHeader>
        <CardTitle>{t("raw-data_status")}</CardTitle>
        <StyledGearHint
          action={activityList["rawdata-status-hint"]}
          currentHint="status-chart1"
          startPoint={isRtl ? "right" : "left"}
          hintArrowTarget="Menu-Settings"
        />
      </StyledHeader>
      {!isFetchingStats ? (
        <>
          <DoughnutWrapper>
            <StatusChartStyled
                showTicks={true} //true
                showLegend={false}
                innerRadius={45}
                outerRadius={90}
                fontSize={12}
                data={statusData}
                showTooltip={true}
                showLabels={true}
                posInnerRadius={125}
                postOuterRadius={125}
                boxSize={310}
            />
          </DoughnutWrapper>
        </>
      ) : (
        <StatisticsPreloader />
      )}
    </Container>
  );
});

export default StatusChartComponent;
