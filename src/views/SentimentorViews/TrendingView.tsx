import React from "react";
import {useTranslation} from "react-i18next";
import styled from "styled-components";
import {TrendingPostsComponent} from "../../components/SentimentorComponents";
import {desktopBp} from "../../styles/variables";


const TrendingViewStyled = styled.div`
  max-width: 100%;
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

const TrendingView = React.memo(() => {
    const { t } = useTranslation();



    return (
        <TrendingViewStyled>
            <TrendingPostsComponent title={t("ranking_trending-positive")} sentiment="positive" />
            <TrendingPostsComponent title={t("ranking_trending-negative")} sentiment="negative" />
        </TrendingViewStyled>
    );
});

export default TrendingView;
