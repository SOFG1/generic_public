import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { Card } from "../../components/common/Card";
import {
  MapComponent,
  StatsStatusChart,
} from "../../components/StatsComponents";
import { useRawDataActions } from "../../store/rawData";
import { desktopBp } from "../../styles/variables";
import { HintComponent } from "../../UI/HintComponent";
import { withErrorBoundaryHOC } from "../../utils/withErrorBoundaryHOC";

const MapAndKeywordsViewStyled = styled.div`
  position: relative;
  display: flex;
  align-content: center;
  justify-content: flex-start;
  width: 100%;
  gap: 2.08vw;
  margin-bottom: 1.56vw;
  @media screen and (max-width: ${desktopBp}) {
    gap: 26px;
    margin-bottom: 20px;
  }
  @media screen and (max-width: 1050px) {
    flex-direction: column;
  }
`;

const MapComponentStyled = styled(Card)`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 0;
`;

const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 0.83vw 1.3vw;
  @media screen and (max-width: ${desktopBp}) {
    margin: 0 10px 16px;
  }
`;

const MapTitle = styled.h2`
  font-weight: 400;
  font-size: 1.67vw;
  line-height: 2.14vw;
  margin: 0;
  margin-inline-end: 10px;
  @media screen and (max-width: ${desktopBp}) {
    font-size: 21px;
    line-height: 2.14vw;
  }
`;

const StyledStatus = styled(StatsStatusChart)`
  min-width: 26.67vw;
  @media screen and (max-width: ${desktopBp}) {
    min-width: 335px;
  }
  @media screen and (max-width: 1050px) {
    & > div {
      max-width: 100%;
    }
  }
  @media screen and (max-width: 510px) {
    width: auto;
  }
`;

const StatusTitle = styled.p`
  text-align: left;
  margin: 0;
  font-size: 1.67vw;
  line-height: 2.19vw;
  @media screen and (max-width: ${desktopBp}) {
    font-size: 21px;
    line-height: 27px;
  }
`;

const StyledHintText = styled.p`
  margin: 0;
  white-space: pre-wrap;
`;

const MapAndStatusView = React.memo(() => {
  const { t } = useTranslation();
  const { onGetStats } = useRawDataActions();

  useEffect(() => {
    onGetStats();
  }, []);

  return (
    <MapAndKeywordsViewStyled>
      <MapComponentStyled>
        <StyledHeader>
          <MapTitle>{t("stats_map-title")}</MapTitle>
          <HintComponent
            position="end"
            items={[
              <StyledHintText>{t("stats_map-hint1")}</StyledHintText>,
              <StyledHintText>{t("stats_map-hint2")}</StyledHintText>,
            ]}
          />
        </StyledHeader>
        <MapComponent />
      </MapComponentStyled>
      <StyledStatus title={<StatusTitle>{t("raw-data_status")}</StatusTitle>} />
    </MapAndKeywordsViewStyled>
  );
});

export default withErrorBoundaryHOC(MapAndStatusView);
