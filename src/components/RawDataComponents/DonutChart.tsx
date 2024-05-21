import React, { useEffect, useMemo, useRef } from "react";
import drawChart from "../../utils/drawChart";
import styled from "styled-components";
import { colors } from "../../styles/colors";
import { Text } from "../common/Text";
import { desktopBp } from "../../styles/variables";

const DonutChartStyled = styled.div`
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: center;
  position: relative;
  > div:first-child {
    width: 100%;
  }
`;

const Legend = styled.div`
  display: flex;
  align-content: flex-start;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: absolute;
  height: 100%;
  width: 100%;
  svg {
    height: 50%;
    width: 50%;
  }
`;

const LegendItem = styled.div<{ bgSpan: string }>`
  display: flex;

  & > span {
    background-color: ${({ bgSpan }) => bgSpan};
    width: 0.78vw;
    height: 0.78vw;
    border-radius: 8px;
    box-sizing: border-box;
    display: flex;
  }
  @media screen and (max-width: ${desktopBp}) {
    & > span {
      width: 10px;
      height: 10px;
    }
  }
`;

const LegendText = styled(Text)`
  color: ${colors.graphite_5};
  font-size: 0.57vw;
  margin-left: 5px;

  span {
    margin-left: 5px;
    color: ${colors.graphite_6};
  }
  @media screen and (max-width: ${desktopBp}) {
    font-size: 7px;
  }
`;

interface DonutChartProps {
  data: { status: string; value: number; color: string, percent?: number }[];
  fontSize?: number;
  innerRadius?: number;
  outerRadius?: number;
  icon?: React.ReactElement;
  showLegend?: boolean;
  showTicks: boolean;
  showTooltip: boolean;
  showLabels?: boolean;
  posInnerRadius?:number,
  postOuterRadius?:number,
  boxSize?:number
}

const DonutChart = React.memo(
  ({
    data,
    fontSize = 12,
    innerRadius,
    showLegend = true,
    outerRadius,
    icon,
    showTicks,
    showTooltip,
      posInnerRadius,
      postOuterRadius,
      showLabels,
      boxSize,
    ...props
  }: DonutChartProps) => {
    const ref = useRef(null);

    const dataDonut = useMemo(() => {
      const total = data?.reduce((acc, item) => {
        return acc + item.value;
      }, 0) || 0
      return data?.map((item) => {
        let percent = ((item.value * 100) / total).toFixed(1);
        if(item.percent) percent = String(item.percent)
        return {
          value: percent,
          count: Math.round(item.value),
          name: item.status,
          color: item.color || "#000",
        };
      }) || []
    }, [data]);

    useEffect(() => {
      if (ref.current) {
        drawChart({
          element: ref.current,
          data: dataDonut,
          colorsChart: dataDonut.map((item) => item.color),
          fontSize,
          innerRadius,
          outerRadius,
          showTicks,
          showTooltip,
          showLabels,
          postOuterRadius,
          posInnerRadius,
          containerSize:boxSize
        });
      }
    }, [ref, dataDonut, fontSize, innerRadius, outerRadius, data]);

    return (
      <DonutChartStyled {...props}>
        <div ref={ref} />
        {showLegend && (
          <Legend>
            {icon
              ? icon
              : data.map((item, id) => {
                  return (
                    <LegendItem bgSpan={item.color} key={`Legeng-${id}`}>
                      <span />
                      <LegendText>
                        {item.status}
                        <span>({item.value})</span>
                      </LegendText>
                    </LegendItem>
                  );
                })}
          </Legend>
        )}
      </DonutChartStyled>
    );
  }
);

export default DonutChart;
