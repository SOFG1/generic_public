import React, { useCallback, useMemo } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

const StyledTitles = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-bottom: 10px;
`;

const StyledTitle = styled.p`
  margin: 0;
  font-size: 16px;
  width: 12%;
`;

const StyledRow = styled.div`
  height: 20px;
  position: relative;
  margin-bottom: 18px;
  p {
    position: absolute;
    inset-inline-start: 40%;
    width: 20%;
    text-align: center;
  }
`;

const StyledBar = styled.div<{ isMale: boolean; width: number }>`
  position: absolute;
  top: 0;
  height: 20px;
  width: ${({ width }) => `${width}%`};
  ${({ isMale }) =>
    isMale
      ? `
        background-color: #20a4ff;
        inset-inline-end: 60%;
  `
      : `
        background-color: #ff2758;
        inset-inline-start: 60%;
  `}
`;


const StyledFooter = styled.div`
display: flex;
justify-content: space-between;
  border-top: 1px solid #000;
`

const StyledFooterRow = styled.div`
  width: 40%;
  display: flex;
  justify-content: space-between;

`


interface IProps {
  data: any
  viewBy: "%" | "#"
}


const StyledLabel = styled(StyledTitle)`
  position: relative;
  font-size: 14px;
  &:before {
    content: "";
    height: 3px;
    width: 1px;
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    background-color: #000;
  }
`

const convertThousandsToK = (v: number): string => {
  if (v % 1000000 === 0) {
    return (v / 1000000).toFixed(0) + "M"
  }
  if (v > 1000000) {
    return (v / 1000000).toFixed(2) + "M"
  }
  if (v % 1000 === 0) {
    return (v / 1000).toFixed(0) + "K"
  }
  if (v > 1000) {
    return (v / 1000).toFixed(1) + "K"
  }
  return String(v)
}


const AgeGenderComponent = React.memo(({ data, viewBy }: IProps) => {
  const { t } = useTranslation()


  const maxValue = useMemo(() => {
    if (viewBy === "%") {
      let total = 0
      Object.values(data).forEach((d: any) => {
        Object.values(d).forEach((v: any) => {
          if (v) total += v
        })
      })
      return total
    }
    let max = 0
    Object.values(data).forEach((val: any) => {
      if (val?.male && val?.male > max) {
        max = val.male
      }
      if (val.female && val?.female > max) {
        max = val.female
      }
    })
    return max
  }, [data, viewBy])

  const keysSorted = useMemo(() => {
    return Object.keys(data).sort()
  }, [data])






  const getLabel = useCallback((val: number) => {
    let step = 1
    if (maxValue > 100) step = 5
    if (maxValue > 200) step = 10
    if (maxValue > 400) step = 20
    if (maxValue > 1000) step = 50
    if (maxValue > 2000) step = 100
    if (maxValue > 4000) step = 200
    if (maxValue > 10000) step = 500
    if (maxValue > 20000) step = 1000
    const remainder = val % step
    const value = val - remainder
    return convertThousandsToK(value)
  }, [maxValue])


  return (
    <>
      <StyledTitles>
        <StyledTitle>{t("ranking_pdf-male")}</StyledTitle>
        <StyledTitle>{t("ranking_pdf-female")}</StyledTitle>
      </StyledTitles>
      {keysSorted.map((age) => {
        const male = data[age]?.male
        const female = data[age]?.female
        const percent = maxValue / 100
        const maleVal = male ? (male / percent) : 0
        const femaleVal = female ? (female / percent) : 0
        return (
          <StyledRow key={age}>
            <StyledBar width={maleVal * 0.4} isMale={true} />
            <StyledTitle>{age}</StyledTitle>
            <StyledBar width={femaleVal * 0.4} isMale={false} />
          </StyledRow>
        );
      })}
      <StyledFooter>
        <StyledFooterRow>
          <StyledLabel>{viewBy === "#" ? getLabel(maxValue) : "100%"}</StyledLabel>
          <StyledLabel>{viewBy === "#" ? getLabel(maxValue * 0.8) : "80%"}</StyledLabel>
          <StyledLabel>{viewBy === "#" ? getLabel(maxValue * 0.6) : "60%"}</StyledLabel>
          <StyledLabel>{viewBy === "#" ? getLabel(maxValue * 0.4) : "40%"}</StyledLabel>
          <StyledLabel>{viewBy === "#" ? getLabel(maxValue * 0.2) : "20%"}</StyledLabel>
          <StyledLabel></StyledLabel>
        </StyledFooterRow>
        <StyledFooterRow>
          <StyledLabel></StyledLabel>
          <StyledLabel>{viewBy === "#" ? getLabel(maxValue * 0.2) : "20%"}</StyledLabel>
          <StyledLabel>{viewBy === "#" ? getLabel(maxValue * 0.4) : "40%"}</StyledLabel>
          <StyledLabel>{viewBy === "#" ? getLabel(maxValue * 0.6) : "60%"}</StyledLabel>
          <StyledLabel>{viewBy === "#" ? getLabel(maxValue * 0.8) : "80%"}</StyledLabel>
          <StyledLabel>{viewBy === "#" ? getLabel(maxValue) : "100%"}</StyledLabel>
        </StyledFooterRow>
      </StyledFooter>
    </>
  );
});

export default AgeGenderComponent;
