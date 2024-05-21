import React, { useMemo } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { desktopBp } from "../../styles/variables";
import { useSMStatsState } from "../../store/smStats";

const StyledTitle = styled.p`
  font-size: 1.15vw;
  line-height: 1.51vw;
  margin: 0 0 1.04vw;
  text-align: start;
  @media screen and (max-width: ${desktopBp}) {
    font-size: 14px;
    line-height: 19px;
    margin: 0 0 13px;
  }
`;

const StyledText = styled.p`
  font-size: 0.83vw;
  line-height: 0.99vw;
  margin: 0 0 0.68vw;
  text-align: start;
  @media screen and (max-width: ${desktopBp}) {
    font-size: 11px;
    line-height: 12px;
    margin: 0 0 8px;
  }
`;

const StyledFooter = styled.p`
  font-size: 1.15vw;
  line-height: 1.51vw;
  margin: 0 0 10px;
  span {
    font-weight: 700;
  }
  @media screen and (max-width: ${desktopBp}) {
    font-size: 14px;
    line-height: 19px;
  }
`;

const StyledBar = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
  margin: 0 15px 10px;
  &::before {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 8px;
    border-top: 1px solid #000;
    background: linear-gradient(
      90deg,
      #fe8312 1.47%,
      #e7e9d5 52%,
      #29c3da 97.8%
    );
  }
`;

const StyledScale = styled.span`
  position: relative;
  padding-bottom: 21px;
  &:first-child {
    transform: translateX(-50%);
  }
  &:last-child {
    transform: translateX(50%);
  }
  &::after {
    content: "";
    position: absolute;
    left: 50%;
    bottom: 0;
    height: 16px;
    width: 1px;
    background-color: #000;
  }
`;

const OfflineScoreHint = React.memo(() => {
  const { t } = useTranslation();
  const { smStats, daysFilter } = useSMStatsState();

  const lastDataUpdate = useMemo(() => {
    const lastUpdateObj = smStats.find((d) =>
      d.hasOwnProperty("last_data_update")
    );
    //@ts-ignore
    return lastUpdateObj?.last_data_update;
  }, [smStats]);

  const daysFilterText =  useMemo(() => {
    return eval(t("engagement-rate_hint-footer"))(daysFilter)
  }, [t, daysFilter])

  return (
    <>
      <StyledTitle>{t("offline-score_hint-title")}</StyledTitle>
      <StyledText>{t("offline-score_hint-text")}</StyledText>
      <StyledBar dir="ltr">
        <StyledScale>-150%</StyledScale>
        <StyledScale>0%</StyledScale>
        <StyledScale>150%</StyledScale>
      </StyledBar>
      <StyledFooter dangerouslySetInnerHTML={{__html: daysFilterText}} />
      <StyledFooter>
        {t("offline-score_hint-footer")} <span>{lastDataUpdate}</span>
      </StyledFooter>
    </>
  );
});

export default OfflineScoreHint;
