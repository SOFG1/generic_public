import React from "react";
import styled from "styled-components";
import { ChartComponent } from "../../components/SentimentorComponents";
import { desktopBp } from "../../styles/variables";
import KeywordsView from "./KeywordsView";

const ChartAndKeywordsViewStyled = styled.div`
  display: flex;
  align-content: center;
  align-items: stretch;
  justify-content: flex-start;
  width: 100%;
  margin-top: 1.82vw;
  margin-bottom: 1.98vw;
  gap: 2.08vw;
  @media screen and (max-width: ${desktopBp}) {
    margin-top: 23px;
    margin-bottom: 25px;
    gap: 26px;
  }
  @media screen and (max-width: 1000px) {
    flex-direction: column;
    align-items: center;
  }
`;

const ChartAndKeywordsView = React.memo(() => {
  return (
    <ChartAndKeywordsViewStyled>
      <ChartComponent />
      <KeywordsView />
    </ChartAndKeywordsViewStyled>
  );
});

export default ChartAndKeywordsView;
