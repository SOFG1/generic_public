import React, { useMemo } from "react";
import styled from "styled-components";
import Tooltip from "../../assets/images/tooltip.png";
import { desktopBp } from "../../styles/variables";
import { numberWithCommas } from "../../utils/numberWidthCommas";

const Block = styled.div`
  position: relative;
  width: 100%;
  padding: 2.6vw 0 1.25vw;
  @media screen and (max-width: ${desktopBp}) {
    padding: 33px 0 16px;
  }
`;

const Bar = styled.div`
  background: #f066434b;
  height: 4px;
  border-radius: 5.21vw;
  @media screen and (max-width: ${desktopBp}) {
    border-radius: 65px;
  }
`;

const FilledPart = styled.div<{ value: number }>`
  position: relative;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  height: 100%;
  width: ${({ value }) => `${value}%`};
  background: #f06543;
  border-radius: 5.21vw;
  @media screen and (max-width: ${desktopBp}) {
    border-radius: 65px;
  }
`;

const StyledValue = styled.p<{ rtl: boolean | undefined }>`
  position: absolute;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  font-weight: 400;
  font-size: 0.89vw;
  line-height: 1.04vw;
  text-align: center;
  color: #000;
  inset-inline-start: 100%;
  transform: translateY(10px) translateX(${({ rtl }) => (rtl ? "50%" : "-50%")}) !important;
  padding: 1.3vw 1.72vw 2.34vw;
  text-align: center;
  background-image: url(${Tooltip});
  background-size: cover;
  background-repeat: no-repeat;
  margin: 0;
  @media screen and (max-width: ${desktopBp}) {
    font-size: 11px;
    line-height: 13px;
    padding: 16px 22px 29px;
  }
`;

const Point = styled.div<{ rtl: boolean | undefined }>`
  transform: translateY(4px) translateX(${({ rtl }) => (rtl ? "-50%" : "50%")}) !important;
  flex-shrink: 0;
  height: 0.63vw;
  width: 0.63vw;
  border-radius: 50%;
  background-color: #fff;
  box-shadow: 0 2px 4px #00000051;
  @media screen and (max-width: ${desktopBp}) {
    height: 8px;
    width: 8px;
  }
`;

const StyledGrade = styled.span<{ rtl: boolean | undefined; value: number }>`
  position: absolute;
  bottom: 0;
  height: 0.52vw;
  ${({ rtl, value }) => `${rtl ? "right" : "left"} :${value}%;`};
  //
  font-size: 0.73vw;
  line-height: 0.83vw;
  color: #000000;
  transform: translateX(${({ rtl }) => (rtl ? "50%" : "-50%")});
  &::after {
    content: "";
    position: absolute;
    left: 50%;
    top: -6px;
    transform: translateX(-50%);
    height: 4px;
    width: 1px;
    background-color: #00000040;
    border-radius: 1px;
  }
  @media screen and (max-width: ${desktopBp}) {
    height: 7px;
    font-size: 10px;
    line-height: 11px;
  }
`;

interface IProps {
  rate: number;
  bingo: number;
}

const VotingBarComponent = React.memo(({ rate, bingo }: IProps) => {
  const isRtl = document.body.dir === "rtl";

  //Leave 2 digits after point or show an integer
  const rateFixed = useMemo(() => {
    return Number.isInteger(rate) ? rate : rate.toFixed();
  }, [rate]);

  return (
    <Block>
      <Bar>
        <FilledPart value={rate}>
          <StyledValue rtl={isRtl}>
            <span>{rateFixed}%</span>
            <span>{numberWithCommas(bingo)}</span>
          </StyledValue>
          <Point rtl={isRtl} />
        </FilledPart>
      </Bar>
      <StyledGrade value={0} rtl={isRtl}>
        0%
      </StyledGrade>
      <StyledGrade value={10} rtl={isRtl}></StyledGrade>
      <StyledGrade value={20} rtl={isRtl}>
        20%
      </StyledGrade>
      <StyledGrade value={30} rtl={isRtl}></StyledGrade>
      <StyledGrade value={40} rtl={isRtl}>
        40%
      </StyledGrade>
      <StyledGrade value={50} rtl={isRtl}></StyledGrade>
      <StyledGrade value={60} rtl={isRtl}>
        60%
      </StyledGrade>
      <StyledGrade value={70} rtl={isRtl}></StyledGrade>
      <StyledGrade value={80} rtl={isRtl}>
        80%
      </StyledGrade>
      <StyledGrade value={90} rtl={isRtl}></StyledGrade>
      <StyledGrade value={100} rtl={isRtl}>
        100%
      </StyledGrade>
    </Block>
  );
});

export default VotingBarComponent;
