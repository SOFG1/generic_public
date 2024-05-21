import React, { useMemo, useEffect, useState, useCallback } from "react";
import styled from "styled-components";
import { Card } from "../../components/common/Card";
import { colors } from "../../styles/colors";
import score from "../../assets/images/SocialMediaScore.png";
import scoreIcon1 from "../../assets/images/offline-score1.png";
import scoreIcon2 from "../../assets/images/offline-score2.png";
import scoreIcon3 from "../../assets/images/offline-score3.png";
import scoreIcon4 from "../../assets/images/offline-score4.png";
import scoreIcon5 from "../../assets/images/offline-score5.png";
import reach from "../../assets/images/Reach.png";
import engagement from "../../assets/images/Engagement.png";
import unique from "../../assets/images/Unique.png";
import { useSMStatsActions, useSMStatsState } from "../../store/smStats";
import { useUserState } from "../../store/user";
import { numberWithCommas } from "../../utils/numberWidthCommas";
import { decimalToPercents } from "../../utils/decimalToPercents";
import { useTranslation } from "react-i18next";
import { Loader } from "../../UI/Spinners";
import { desktopBp } from "../../styles/variables";
import { HintComponent } from "../../UI/HintComponent";
import {
  EngagementRateHint,
  SmScoreHint,
  TotalReachHint,
  UniqueReachHint,
  OfflineScoreHint
} from "../../components/StatsComponents";
import { withErrorBoundaryHOC } from "../../utils/withErrorBoundaryHOC";

const Content = styled.div`
  display: flex;
  align-content: center;
  justify-content: space-between;
  gap: 2.08vw;
  width: 100%;
  margin-top: 1.04vw;
  margin-bottom: 1.56vw;
  @media screen and (max-width: 1150px) {
    flex-wrap: wrap;
    gap: 26px;
    margin-top: 13px;
    margin-bottom: 20px;
    justify-content: space-evenly;
  }
`;

const StatsBlock = styled(Card)`
  display: block;
  flex-grow: 1;
  position: relative;
  max-width: 13.85vw;
  min-width: 12.5vw;
  padding: 1.46vw 1.56vw;
  text-align: center;
  margin-bottom: 0;
  @media screen and (max-width: ${desktopBp}) {
    max-width: 174px;
    min-width: 157px;
    padding: 18px 20px;
  }
  @media screen and (max-width: 1150px) {
    max-width: 230px;
    width: 230px;
  }
`;

const StyledHint = styled(HintComponent)`
  position: absolute;
  inset-inline-start: 0.52vw;
  bottom: 0.52vw;
  @media screen and (max-width: ${desktopBp}) {
    inset-inline-start: 7px;
    bottom: 7px;
  }
`;

const StatsBlockTitle = styled.h2`
  font-size: 1.15vw;
  height: 1.15vw;
  line-height: 1.51vw;
  text-align: center;
  font-weight: 500;
  margin: 0 0 1.04vw;
  text-transform: capitalize;
  @media screen and (max-width: ${desktopBp}) {
    font-size: 14px;
    line-height: 19px;
    margin: 0 0 13px;
  }
`;

const StatsBlockValue = styled.div`
  position: relative;
  padding-top: 2.29vw;
  height: 8.28vw;
  @media screen and (max-width: ${desktopBp}) {
    padding-top: 29px;
    height: 104px;
  }
`;

const StatsBlockImage = styled.img`
  position: absolute;
  max-height: 100%;
  width: 90%;
  top: 60%;
  left: 50%;
  transform: translate(-50%, -50%);
  object-fit: contain;
`;

const SpanScore = styled.span`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  font-weight: 700;
  font-size: 1.67vw;
  line-height: 2.19vw;
  padding: 0.52vw 0.89vw 0.52vw;
  background: #ffffff;
  box-shadow: 0px 13px 5px rgba(0, 0, 0, 0.01), 0px 7px 4px rgba(0, 0, 0, 0.05),
    0px 3px 3px rgba(0, 0, 0, 0.09), 0px 1px 2px rgba(0, 0, 0, 0.1),
    0px 0px 0px rgba(0, 0, 0, 0.1);
  border-radius: 6px;
  z-index: 2;
  white-space: nowrap;
  @media screen and (max-width: ${desktopBp}) {
    font-size: 21px;
    line-height: 27px;
    padding: 7px 11px 7px;
  }
`;

const StyledLoader = styled(Loader)`
  height: 4.69vw;
  width: 4.69vw;
  margin: 0 auto;
  @media screen and (max-width: ${desktopBp}) {
    height: 59px;
    width: 59px;
  }
`;

const LoadingText = styled.p`
  font-size: 1.04vw;
  line-height: 1.25vw;
  font-weight: normal;
  color: ${colors.graphite_6};
  @media screen and (max-width: ${desktopBp}) {
    font-size: 13px;
    line-height: 16px;
  }
`;

const StyledNoData = styled.p`
  font-size: 0.94vw;
  text-align: center;
  @media screen and (max-width: ${desktopBp}) {
    font-size: 12px;
  }
`;

const scoreIcon: any = {
  "-1": scoreIcon1,
  "-0.5": scoreIcon2,
  "0": scoreIcon3,
  "0.5": scoreIcon4,
  "1": scoreIcon5,
}


const getScoreIcon = (score?: number) => {
  if (typeof score !== "number") return scoreIcon3
  if (scoreIcon[score]) return scoreIcon[score]
  if (score < -1) return scoreIcon1
  if (score > 1) return scoreIcon5
  return scoreIcon3

}

const StatsView = React.memo(() => {
  const { t } = useTranslation();
  const { smStats, offlineScore, isFetchingStats } = useSMStatsState();
  const { onGetSmStats, onGetOfflineScore } = useSMStatsActions()
  const [matchesMQuery1015px, setMatchesMQuery1015px] =
    useState<boolean>(false);

  const { userInfo } = useUserState();
  const permissions: { [p: string]: boolean } = useMemo(() => {
    return userInfo?.permissions["SM_stats"].actions || {};
  }, [userInfo]);

  const smData: { [key: string]: number } = useMemo(() => {
    const data: { [key: string]: number } = {};
    for (const smStat of smStats) {
      const key = Object.keys(smStat)[0];
      data[key] = Object.values(smStat)[0];
    }
    return data;
  }, [smStats]);



  const noDataMessage = useMemo(() => {
    //Show different message depending user's facebook authorization
    const hasFacebook = !!userInfo?.group?.facebook[0];
    return hasFacebook
      ? t("ranking_no-data")
      : "Please connect Facebook to receive data";
  }, [t, userInfo]);

  const mQuery1015px = useMemo(() => {
    return window.matchMedia("(max-width: 1015px)");
  }, []);

  const handleSetMQuery1015px = useCallback(() => {
    setMatchesMQuery1015px(mQuery1015px.matches);
  }, [mQuery1015px]);

  useEffect(() => {
    setMatchesMQuery1015px(mQuery1015px.matches);
    mQuery1015px?.addEventListener("change", handleSetMQuery1015px);
    return () =>
      mQuery1015px.removeEventListener("change", handleSetMQuery1015px);
  }, [mQuery1015px, handleSetMQuery1015px]);

  const offlineScoreHintPosition = useMemo(() => {
    return matchesMQuery1015px ? "end" : "start";
  }, [matchesMQuery1015px]);

  useEffect(() => {
    onGetSmStats()
    onGetOfflineScore()
  }, [])


  return (
    <div>
      {!!permissions["see_stat"] && !isFetchingStats && (
        <Content>
          <StatsBlock>
            <StyledHint position="end" items={[<SmScoreHint />]} />
            <StatsBlockTitle>{t("stats_sm-score")}</StatsBlockTitle>
            {smData["social_media_score"] ? (
              <StatsBlockValue>
                <SpanScore>
                  {smData["social_media_score"]?.toFixed(2)}%
                </SpanScore>
                <StatsBlockImage src={score} alt="Score" />
              </StatsBlockValue>
            ) : (
              <StyledNoData>{noDataMessage}</StyledNoData>
            )}
          </StatsBlock>

          <StatsBlock>
            <StyledHint position="end" items={[<TotalReachHint />]} />
            <StatsBlockTitle>{t("stats_total-reach")}</StatsBlockTitle>
            {smData["total_reach"] ? (
              <StatsBlockValue>
                <SpanScore>{numberWithCommas(smData["total_reach"])}</SpanScore>
                <StatsBlockImage src={reach} alt="Reach" />
              </StatsBlockValue>
            ) : (
              <StyledNoData>{noDataMessage}</StyledNoData>
            )}
          </StatsBlock>

          <StatsBlock>
            <StyledHint position="end" items={[<UniqueReachHint />]} />
            <StatsBlockTitle>{t("stats_unique-reach")}</StatsBlockTitle>
            {smData["unique_reach"] ? (
              <StatsBlockValue>
                <SpanScore>
                  {numberWithCommas(smData["unique_reach"])}
                </SpanScore>
                <StatsBlockImage src={unique} alt="Unique" />
              </StatsBlockValue>
            ) : (
              <StyledNoData>{noDataMessage}</StyledNoData>
            )}
          </StatsBlock>
          <StatsBlock>
            <StyledHint position="end" items={[<EngagementRateHint />]} />
            <StatsBlockTitle>{t("stats_engagement")}</StatsBlockTitle>
            {smData["total_engagement"] ? (
              <StatsBlockValue>
                <SpanScore>
                  {numberWithCommas(smData["total_engagement"])}
                </SpanScore>
                <StatsBlockImage src={engagement} alt="Engagement" />
              </StatsBlockValue>
            ) : (
              <StyledNoData>{noDataMessage}</StyledNoData>
            )}
          </StatsBlock>
          <StatsBlock>
            <StyledHint
              position={offlineScoreHintPosition}
              items={[<OfflineScoreHint />]}
            />
            <StatsBlockTitle>{t("stats_offline")}</StatsBlockTitle>
            <StatsBlockValue>
              <SpanScore>
                {decimalToPercents(offlineScore)}%
              </SpanScore>
              <StatsBlockImage
                src={getScoreIcon(offlineScore)}
                alt="Offline score positive"
              />
            </StatsBlockValue>
          </StatsBlock>
        </Content>
      )}
      {!!permissions["see_stat"] && isFetchingStats && (
        <Card>
          <LoadingText>Refreshing your data</LoadingText>
          <StyledLoader />
        </Card>
      )}
    </div>
  );
});

export default withErrorBoundaryHOC(StatsView);
