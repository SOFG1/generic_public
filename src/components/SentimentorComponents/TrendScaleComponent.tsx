import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

const StyledWrapper = styled.div`
  display: flex;
  padding-top: 8px;
  align-items: center;
  align-self: flex-end;
  gap: 9px;
  span {
    font-size: 14px;
  }
`;

const StyledScale = styled.div<{isRtl: boolean}>`
  position: relative;
  width: 110px;
  height: 5px;
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(68deg, #fe5912 0%, #f8f3e1 50%, #29c3da 100%);
    ${({isRtl}) => isRtl && "background: linear-gradient(68deg, #29c3da 0%, #f8f3e1 50%, #fe5912 100%);"}
  }
`;

const StyledValue = styled.div<{ score: number }>`
  position: absolute;
  bottom: 15px;
  inset-inline-start: ${({ score }) => `${score * 10}%`};
  margin-inline-start: -12px;
  font-size: 16px;
  border-radius: 50px;
  border: 1px solid #000;
  padding: 0 9px;
`;

const StyledLine = styled.span`
  position: absolute;
  top: 100%;
  inset-inline-start: 12px;
  height: 15px;
  width: 1px;
  background-color: #000;
`;

const StyledPoint = styled.span`
  position: absolute;
  height: 11px;
  width: 11px;
  border-radius: 50%;
  background-color: #000;
  bottom: -18px;
  inset-inline-start: 7px;
`;

interface IProps {
  score: number; //Form 0 to 10
}

const TrendScaleComponent = React.memo(({ score }: IProps) => {

  const { i18n } = useTranslation()

  if (score === null) return null

  return (
    <StyledWrapper>
      <span>0</span>
      <StyledScale isRtl={i18n.dir() === "rtl"}>
        <StyledValue score={score}>
          {score} <StyledLine />
          <StyledPoint />
        </StyledValue>
      </StyledScale>
      <span>10</span>
    </StyledWrapper>
  );
});

export default TrendScaleComponent;
