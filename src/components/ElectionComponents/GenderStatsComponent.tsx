import React, { useMemo } from "react";
import _ from "lodash";
import styled from "styled-components";
import { useElectionState } from "../../store/election";
import { Text } from "../common/Text";
import { numberWithCommas } from "../../utils/numberWidthCommas";
import { desktopBp } from "../../styles/variables";

const Content = styled.div`
  display: flex;
  align-content: center;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  min-height: 8.85vw;
  max-width: 13.54vw;
  @media screen and (max-width: ${desktopBp}) {
    min-height: 111px;
    max-width: 170px;
  }
`;

const ContentText = styled(Text)`
  font-size: 0.83vw;
  margin-bottom: 6px;
  font-weight: 600;
  margin-top: 6px;
  width: fit-content;
  color: #000;
  min-width: 2.6vw;
  text-transform: capitalize;
  @media screen and (max-width: ${desktopBp}) {
    font-size: 10px;
    min-width: 33px;
  }
`;

const ChartBlock = styled.div`
  width: 100%;
  display: flex;
  align-content: flex-end;
  align-items: flex-end;
  justify-content: flex-start;
  height: 100%;
`;

const FemaleBlock = styled(ChartBlock)`
  border-bottom: 1px solid #000;
  position: relative;
  z-index: 2;
`;

const MaleBlock = styled(ChartBlock)`
  align-items: flex-start;
  align-content: flex-start;
  z-index: 0;
`;

const Legend = styled.div`
  display: flex;
  align-content: flex-start;
  align-items: flex-start;
  transform: translateY(50%);
  position: absolute;
  bottom: 0;
  left: -0.57vw;
  right: -0.57vw;
  z-index: 2;
  @media screen and (max-width: ${desktopBp}) {
    left: -7px;
    right: -7px;
  }
`;

const LegendItem = styled.span`
  display: block;
  font-weight: bold;
  font-size: 0.7vw;
  color: #000;
  line-height: 0.83vw;
  width: 1.88vw;
  margin-right: 3px;
  text-align: center;
  background-color: #fff;
  border: 1px solid #000;
  @media screen and (max-width: ${desktopBp}) {
    font-size: 9px;
    line-height: 11px;
    width: 24px;
  }
`;

const Bars = styled.div`
  position: relative;
  display: flex;
  align-content: flex-end;
  align-items: flex-end;
  max-width: 100%;
  margin-left: 0.68vw;
  height: 100%;
  width: 100%;
  @media screen and (max-width: ${desktopBp}) {
    margin-left: 8px;
  }
`;

const BarsMale = styled(Bars)`
  align-items: flex-start;
`;

const BarFemale = styled.div<{ height: number }>`
  height: ${({ height }) => height}%;
  max-width: 1.88vw;
  width: 1.04vw;
  background-color: #fe5912;
  margin-right: 1.10vw;
  position: relative;
  span {
    position: absolute;
    font-weight: 500;
    font-size: 0.6vw;
    line-height: 0.68vw;
    color: #000;
    display: block;
    left: 50%;
    top: 0;
    white-space: nowrap;
    transform: translate(-50%, -100%);
  }
  @media screen and (max-width: ${desktopBp}) {
    max-width: 24px;
    width: 13px;
    margin-right: 16px;
    span {
      font-size: 9px;
      line-height: 8px;
    }
  }
`;
const BarMale = styled(BarFemale)`
  background-color: #133d48;
  margin-right: 1.10vw;
  span {
    bottom: 0;
    top: unset;
    transform: translate(-50%, 100%);
  }
  @media screen and (max-width: ${desktopBp}) {
    margin-right: 16px;
  }
`;

const GenderStatsComponent = React.memo(() => {
  const { stats } = useElectionState();

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
    <Content>
      <FemaleBlock>
        <ContentText>{genders[0] || ""}</ContentText>
        <Bars>
          {genderData.gender_1.map((female, id) => {
            const height = (female / genderData.maxValue) * 100;
            return (
              <BarFemale height={height} key={`female-${id}`}>
                <span>{numberWithCommas(female)}</span>
              </BarFemale>
            );
          })}
          <Legend>
            {genderData.legends.map((legend, id) => {
              return <LegendItem key={`Legend-${id}`}>{legend}</LegendItem>;
            })}
          </Legend>
        </Bars>
      </FemaleBlock>
      <MaleBlock>
        <ContentText>{genders[1] || ""}</ContentText>
        <BarsMale>
          {genderData.gender_2.map((male, id) => {
            const height = (male / genderData.maxValue) * 100;
            return (
              <BarMale height={height} key={`male-${id}`}>
                <span>{numberWithCommas(male)}</span>
              </BarMale>
            );
          })}
        </BarsMale>
      </MaleBlock>
    </Content>
  );
});

export default GenderStatsComponent;
