import React from "react";
import styled from "styled-components";
import { InfoComponent } from "../../components/CallCenterComponents";
import { desktopBp } from "../../styles/variables";
import { QuestionView } from "./index";
import { withErrorBoundaryHOC } from "../../utils/withErrorBoundaryHOC";

const QuestionsStyled = styled.div`
  display: flex;
  align-content: center;
  align-items: stretch;
  align-self: stretch;
  justify-content: flex-start;
  margin-bottom: 2.08vw;
  gap: 2.08vw 26px;
  @media screen and (max-width: ${desktopBp}) {
    margin-bottom: 2.08vw;
    gap: 2.08vw 26px;
  }
  @media screen and (max-width: 1080px) {
    flex-direction: column;
  }
`;

const QuestionsView = React.memo(() => {
  return (
    <QuestionsStyled>
      <QuestionView />
      <InfoComponent />
    </QuestionsStyled>
  );
});

export default withErrorBoundaryHOC(QuestionsView);
