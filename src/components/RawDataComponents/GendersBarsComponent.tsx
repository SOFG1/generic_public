import _ from "lodash";
import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { StatisticsPreloader } from ".";
import { useRawDataActions, useRawDataState } from "../../store/rawData";
import { desktopBp } from "../../styles/variables";
import { numberWithCommas } from "../../utils/numberWidthCommas";
import { Card } from "../common/Card";
import { RefreshButton } from "../common/RefreshButton";
import { Text } from "../common/Text";
import { activityList } from "../../config/userActivityList";


const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 15.00vw;
  min-width: 15.00vw;
  margin-bottom: 0;
  height: 13.91vw;
  @media screen and (max-width: ${desktopBp}) {
    width: 188px;
    min-width: 232px;
    height: 175px;
  }
`
const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;


const CardTitle = styled(Text)`
  font-weight: 500;
  font-size: ${props => props.theme.fontSize.headerSecondary.vw};
  @media screen and (max-width: ${desktopBp}) {
    font-size: ${props => props.theme.fontSize.headerSecondary.px};
  }
`;

const Content = styled.div`
  position: relative;
  display: flex;
  align-items: stretch;
  justify-content: flex-end;
  flex-grow: 1;
  width: 100%;
  padding-inline-end: 0.63vw;
  margin-inline-start: -0.63vw;

  &::after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    top: 50%;
    border-top: 1px solid #000;
  }
  
  @media screen and (max-width: ${desktopBp}) {
    margin-inline-start: -8px;
    padding-inline-end: 8px;
  }
`;

const StyledColumn = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-inline-end: 0.87vw;
  
  @media(max-width: ${desktopBp}){
    margin-inline-end: 11px;
  }
  &:first-child {
    margin-inline-end: auto;
  }
  &:last-child {
    margin: 0;
  }
`

const ContentText = styled(Text)`
  font-size: ${props => props.theme.fontSize.semiMedium.vw};
  margin: 6px 0;
  width: fit-content;
  color: #000;
  min-width: 2.08vw;
  text-transform: capitalize;
  @media screen and (max-width: ${desktopBp}) {
    font-size: ${props => props.theme.fontSize.semiMedium.px};
    min-width: 26px;
  }
`;


const LegendItem = styled.span`
position: relative;
z-index: 1;
  display: block;
  font-weight: bold;
  font-size: ${props => props.theme.fontSize.small.vw};
  color: #000;
  line-height: normal;
  width: 1.56vw;
  text-align: center;
  background-color: #fff;
  border: 1px solid #000;
  @media screen and (max-width: ${desktopBp}) {
    font-size: ${props => props.theme.fontSize.small.px};
    width: 20px;
  }
`;

const BarFemale = styled.div<{ height: number }>`
  height: ${({ height }) => height / 2}%;
  max-width: 2.08vw;
  width: 1.61vw;
  background-color: #fe5912;
  position: absolute;
  left: 50%;
  bottom: 50%;
  transform: translateX(-50%);
  span {
    position: absolute;
    font-size: ${props => props.theme.fontSize.small.vw};
    line-height: normal;
    color: #000;
    display: block;
    left: 50%;
    top: 0;
    white-space: nowrap;
    transform: translate(-50%, -100%);
  }
  @media screen and (max-width: ${desktopBp}) {
    max-width: 26px;
    width: 20px;
    margin-right: 10px;
    span {
      font-size: ${props => props.theme.fontSize.small.px};
    }
  }
`;
const BarMale = styled(BarFemale)`
  background-color: ${props => props.theme.color.darkBlue};
  top: 50%;
  span {
    bottom: 0;
    top: unset;
    transform: translate(-50%, 100%);
  }
`;

const NoData = styled.p`
  font-weight: 600;
  font-size: 1.04vw;
  @media screen and (max-width: ${desktopBp}) {
    font-size: 13px;
  }
`;

const GendersBarsComponent = React.memo(() => {
  const { t } = useTranslation();
  const { stats, isFetchingStats } = useRawDataState();
  const { onUpdateStat } = useRawDataActions();

  const genders: string[] = useMemo(() => {
    return _.uniq(stats?.gender_stat.map((stat) => stat.gender));
  }, [stats?.gender_stat]);

  const genderData: {
    gender_1: number[];
    gender_2: number[];
    legends: string[];
    maxValue: number;
  } = useMemo(() => {
    const legends: string[] = [];
    let maxValue: number = 0;
    const groups: { [group: string]: { [gender: string]: number } } = {};
    for (const stat of stats?.gender_stat) {
      const group = stat.age_group || "no group";
      if (groups[group]) {
        groups[group][stat.gender] += stat.count;
      } else {
        const groupData: { [gender: string]: number } = {
          [stat.gender]: stat.count,
        };
        for (const gender of genders.filter((item) => item != stat.gender)) {
          groupData[gender] = 0;
        }
        groups[group] = { ...groupData };
      }
    }
    const gender_1: number[] = [];
    const gender_2: number[] = [];
    if (genders.length > 0) {
      for (const groupsKey in groups) {
        legends.push(groupsKey);
        const group = groups[groupsKey];
        const gender_1_value = group[genders[0]] || 0;
        const gender_2_value = group[genders[1]] || 0;
        gender_1.push(gender_1_value);
        gender_2.push(gender_2_value);
        maxValue = Math.max(maxValue, gender_1_value, gender_2_value);
      }
    }
    return {
      legends,
      maxValue,
      gender_1,
      gender_2,
    };
  }, [stats?.gender_stat, genders]);

  return (
    <Container>
      <StyledHeader>
        <CardTitle color="#000000" bold={true}>
          {t("raw-data_gender")}
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
      {!isFetchingStats && genderData.legends.length > 0 && (
        <Content dir="ltr">
          <StyledColumn>
            <ContentText>{genders[0] || ""}</ContentText>
            <ContentText>{genders[1] || ""}</ContentText>
          </StyledColumn>
          {genderData.legends.map((legend, index) => {
            const gender1 = genderData.gender_1[index]
            const height1 = (gender1 / genderData.maxValue) * 80;
            const gender2 = genderData.gender_2[index]
            const height2 = (gender2 / genderData.maxValue) * 80;
            return <StyledColumn key={index}>
              <BarFemale height={height1}>
                <span>{numberWithCommas(gender1)}</span>
              </BarFemale>
              <LegendItem>{legend}</LegendItem>
              <BarMale height={height2}>
                <span>{numberWithCommas(gender2)}</span>
              </BarMale>
            </StyledColumn>;
          })}
        </Content>
      )}
      {isFetchingStats && <StatisticsPreloader />}
      {!isFetchingStats && genderData.legends.length === 0 && (
        <NoData>{t("raw-data_no-data")}</NoData>
      )}

    </Container>
  )
});

export default GendersBarsComponent;
