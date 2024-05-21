import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { IQuestionnaire, useSettingsState } from "../../store/settings";
import { desktopBp } from "../../styles/variables";
import QuestionarieQuestionComponent from "./QuestionarieQuestionComponent";
import { Loader } from "../../UI/Spinners";

const StyledWrapper = styled.div`
  padding-top: 0.47vw;
  margin-bottom: 1.51vw;
  @media screen and (max-width: ${desktopBp}) {
    margin-bottom: 19px;
    padding-top: 6px;
  }
`;

const StyledLabel = styled.p`
  font-size: 0.94vw;
  line-height: 1.2vw;
  font-weight: 500;
  color: #aaaaaa;
  margin: 0;
  text-align: start;
  @media screen and (max-width: ${desktopBp}) {
    font-size: 12px;
    line-height: 15px;
  }
`;

const StyledList = styled.div`
  border: 1px solid #000000;
  max-height: 32.60vw;
  overflow: auto;
  padding: 0.78vw 1.25vw;
  @media screen and (max-width: ${desktopBp}) {
    max-height: 409px;
    padding: 10px 16px;
  }
`;

const StyledLoader = styled(Loader)`
  height: 170px;
  width: 170px;
  margin: 0 auto;
`

interface IProps {
  questionaries: IQuestionnaire[]
  is_voter: boolean
}

const QuestionnairePreview = React.memo(({ questionaries, is_voter }: IProps) => {
  const { t } = useTranslation();
  const { selectedQuestionnaireId, isEditingQuestions } = useSettingsState();

  const selectedQuestionnaire = useMemo(() => {
    return questionaries.find((q) => q.id === selectedQuestionnaireId);
  }, [questionaries, selectedQuestionnaireId]);

  const questionsList = useMemo(() => {
    const copy = selectedQuestionnaire?.questions && [
      ...selectedQuestionnaire?.questions,
    ];
    return copy?.sort((q) => q.query_pos);
  }, [selectedQuestionnaire?.questions]);

  if (!selectedQuestionnaire) return null;

  return (
    <StyledWrapper>
      <StyledLabel>{t("settings_questionnaires-preview")}</StyledLabel>
      <StyledList>
        {!isEditingQuestions && questionsList?.map((q) => {
          return (
            <QuestionarieQuestionComponent
              is_voter={is_voter}
              key={q.id}
              question={q}
              questionsList={questionsList}
            />
          );
        })}
        {isEditingQuestions && <StyledLoader />}
      </StyledList>
    </StyledWrapper>
  );
});

export default QuestionnairePreview;
