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

const UniqueReachHint = React.memo(() => {
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
      <StyledTitle>{t("unique-reach_hint-title")}</StyledTitle>
      <StyledText>{t("unique-reach_hint-text")}</StyledText>
      <StyledFooter dangerouslySetInnerHTML={{__html: daysFilterText}} />
      <StyledFooter>
        {t("offline-score_hint-footer")} <span>{lastDataUpdate}</span>
      </StyledFooter>
    </>
  );
});

export default UniqueReachHint;
