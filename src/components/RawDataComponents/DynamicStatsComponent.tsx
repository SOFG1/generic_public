import React, { useMemo } from "react";
import styled from "styled-components";
import { Card } from "../common/Card";
import { Text } from "../common/Text";
import { colors } from "../../styles/colors";
import { numberWithCommas } from "../../utils/numberWidthCommas";
import { StatisticsPreloader } from "./";
import {
  IRawDataStats,
  useRawDataActions,
  useRawDataState,
} from "../../store/rawData";
import _ from "lodash";
import { desktopBp } from "../../styles/variables";
import { useTranslation } from "react-i18next";
import { RefreshButton } from "../common/RefreshButton";
import { activityList } from "../../config/userActivityList";

const CardStyled = styled.div`
  position: relative;
  display: flex;
  
  flex-direction: column;
  margin-bottom: 0;
  min-width: 14.47vw;
  @media screen and (max-width: ${desktopBp}) {
    min-width: 181px;
  }
`;

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CardTitle = styled(Text)`
 
  line-height: normal;
  font-weight: 500;
  font-size: ${props => props.theme.fontSize.headerSecondary.vw};
  @media screen and (max-width: ${desktopBp}) {
    font-size: ${props => props.theme.fontSize.headerSecondary.px};
  }
`;

const TableWrapper = styled.div`
  overflow-y: auto;
  height: 13.85vw;
  width: 100%;
  padding-top: 1.20vw;
  box-sizing: border-box;
  @media screen and (max-width: ${desktopBp}) {
    padding-top: 15px;
    height: 174px;
  }
`;

const StyledRow = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid #b1b1b1;
  height: 2.20vw;
  @media screen and (max-width: ${desktopBp}) {
    height: 28px;
  }
`;

const StyledLabel = styled.p`
  
  line-height: normal;
  font-weight: 600;
  width: 30%;
  margin: 0;
  font-size: ${props => props.theme.fontSize.medium.vw};
  @media screen and (max-width: ${desktopBp}) {
    font-size: ${props => props.theme.fontSize.medium.px};
  }
`;

const LabelCenter = styled(StyledLabel)`
  text-align: center;
  font-size: ${props => props.theme.fontSize.medium.vw};
  @media screen and (max-width: ${desktopBp}) {
    font-size: ${props => props.theme.fontSize.medium.px};
  }
`;

const StyledValue = styled(StyledLabel)`
  font-weight: 700;
  text-align: end;
  font-size: ${props => props.theme.fontSize.semiMedium.vw};
  @media screen and (max-width: ${desktopBp}) {
    font-size: ${props => props.theme.fontSize.semiMedium.px};
  }
`;

const NoData = styled.p`
  font-weight: 600;
  font-size: 1.04vw;
  @media screen and (max-width: ${desktopBp}) {
    font-size: 13px;
  }
`;

interface DynamicStatsComponentProps {
  title: string;
  dataKey: keyof IRawDataStats;
  labelKey: string;
  sortFunction: (a: any, b: any) => number;
}

const DynamicStatsComponent = React.memo(
  ({ title, dataKey, labelKey, sortFunction }: DynamicStatsComponentProps) => {
    const { t } = useTranslation();
    const { stats, isFetchingStats } = useRawDataState();
    const { onUpdateStat } = useRawDataActions();

    const data: {
      name: string;
      percent: number | string;
      value: number | string;
      dynamic: boolean;
    }[] = useMemo(() => {
      return (stats[dataKey] as any[])
        .map((stat) => {
          const percent = stat.change * 100;
          return {
            name: stat[labelKey],
            percent: Number.isInteger(percent) ? percent : percent.toFixed(1),
            value: stat.count,
            dynamic: stat.change > 0,
          };
        })
        .sort(sortFunction);
    }, [stats]);

    return (
      <CardStyled>
        <StyledHeader>
          <CardTitle fontSize="24px" color={colors.graphite_6}>
            {title}
          </CardTitle>
          {/*{!isFetchingStats && (*/}
          {/*  <RefreshButton*/}
          {/*    action={activityList["rawdata-update-stats"]}*/}
          {/*    onClick={onUpdateStat}*/}
          {/*    disabled={isFetchingStats}*/}
          {/*    hint={t("raw-data_refresh")}*/}
          {/*  />*/}
          {/*)}*/}
        </StyledHeader>

        {!isFetchingStats && data.length > 0 && (
          <TableWrapper dir="ltr">
            {data.map((item, index) => {
              return (
                <StyledRow key={index}>
                  <StyledLabel>{item.name}</StyledLabel>
                  <LabelCenter>{item.percent}%</LabelCenter>
                  <StyledValue>
                    {numberWithCommas(Number(item.value))}
                  </StyledValue>
                  {/* <td valign="top">
                    {item.dynamic ? (
                      <PositiveDynamicIcon />
                    ) : (
                      <NegativeDynamicIcon />
                    )}
                  </td> */}
                </StyledRow>
              );
            })}
          </TableWrapper>
        )}
        {isFetchingStats && <StatisticsPreloader />}
        {!isFetchingStats && data.length === 0 && (
          <NoData>{t("raw-data_no-data")}</NoData>
        )}
      </CardStyled>
    );
  }
);

export default DynamicStatsComponent;
