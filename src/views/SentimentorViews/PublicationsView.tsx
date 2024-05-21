import React, { useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { useSentimentorActions } from "../../store/sentimentor/hooks";
import {
  sentimentorPublicationsSelector,
} from "../../store/sentimentor/selectors";
import { usePermissions } from "../../store/user/hooks";
import { desktopBp } from "../../styles/variables";
import PublicationsList from "./PublicationsList";
import { withErrorBoundaryHOC } from "../../utils/withErrorBoundaryHOC";

const StyledBox = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2.08vw;
  margin-bottom: 1.56vw;
  @media screen and (max-width: ${desktopBp}) {
    gap: 26px;
    margin-bottom: 20px;
  }
  @media screen and (max-width: 1000px) {
    grid-template-columns: 1fr;
  }
`;

const PublicationsView = React.memo(() => {
  const { t } = useTranslation();
  const publications = useSelector(sentimentorPublicationsSelector);
  const { onGetOtherPublications, onGetGooglePublications, onGetPublicationsFilters } = useSentimentorActions();
  const permissions = usePermissions("Ranking");

  useEffect(() => {
    onGetOtherPublications();
    onGetGooglePublications();
    onGetPublicationsFilters()
  }, []);

  //Only publications from google_news and news_with_login source
  const googlePublications = useMemo(() => {
    return publications
      .filter(
        // (p) => p._sender === "google_news" || p._sender === "news_with_login"
        (p) => p._sender === "google_news"
      )
      .sort((prev, next) => next.date_for_sorting - prev.date_for_sorting);
  }, [publications]);

  //Other publications (the rest)
  const otherPublications = useMemo(() => {
    return publications
      .filter(
        //(p) => p._sender !== "google_news" && p._sender !== "news_with_login"
        (p) => p._sender !== "google_news"
      )
      .sort((prev, next) => next.date_for_sorting - prev.date_for_sorting);
  }, [publications]);

  return (
    <StyledBox>
      {permissions.google_news && (
        <PublicationsList
          fullWidth={!otherPublications?.length || !permissions.gilad_like}
          publications={googlePublications}
          title={t("publications_title2")}
          category="googlePubs"
          showFilter={false}
        />
      )}
      {permissions.gilad_like && (
        <PublicationsList
          fullWidth={!googlePublications?.length || !permissions.google_news}
          publications={otherPublications}
          title={t("publications_title1")}
          category="otherPubs"
          showFilter={true}
        />
      )}
    </StyledBox>
  );
});

export default withErrorBoundaryHOC(PublicationsView);
