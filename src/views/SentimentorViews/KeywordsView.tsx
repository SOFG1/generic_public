import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { Card } from "../../components/common/Card";
import { TagsCloudComponent } from "../../components/SentimentorComponents";
import { Title } from "../../components/common/Title";
import { desktopBp } from "../../styles/variables";
import { HintComponent } from "../../UI/HintComponent";

const CardStyled = styled(Card)`
  display: flex;
  flex-direction: column;

  width: 25.52vw;
  margin-bottom: 0;
  @media screen and (max-width: ${desktopBp}) {
    width: 320px;
  }

  @media screen and (max-width: 1000px) {
    max-width: 550px;
    width: 100%;
  }
`;
const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-top: 1.2vw;
  margin-bottom: 0.89vw;
  @media screen and (max-width: ${desktopBp}) {
    margin-top: 15px;
    margin-bottom: 11px;
  }
`;

const CardTitle = styled(Title)`
  font-size: 1.67vw;
  line-height: 2.19vw;
  font-weight: normal;
  margin: 0;
  @media screen and (max-width: ${desktopBp}) {
    font-size: 21px;
    line-height: 27px;
  }
`;

const StyledHint = styled.p`
  white-space: pre-wrap;
  margin: 0;
`;

const KeywordsView = React.memo(() => {
  const { t } = useTranslation();

  return (
    <CardStyled>
      <CardHeader>
        <CardTitle>{t("stats_keywords-title")}</CardTitle>
        <HintComponent
          position="start"
          items={[<StyledHint>{t("stats_keywords-hint")}</StyledHint>]}
        />
      </CardHeader>
      <TagsCloudComponent />
    </CardStyled>
  );
});

export default KeywordsView;
