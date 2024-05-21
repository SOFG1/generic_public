import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { IFilters, useRawDataState } from "../../store/rawData";
import { IQuestionnaire, useSettingsState } from "../../store/settings";
import { desktopBp } from "../../styles/variables";
import { ChevronIcon } from "../../UI/Svg";
import EditAnswerComponent from "./EditAnswerComponent";
import CreateAnswerComponent from "./CreateAnswerComponent";

const StyledWrapper = styled.div<{ opened: boolean }>`
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  padding-bottom: 4px;
  border-bottom: 1px solid #000000;
  margin-bottom: 1.93vw;
  svg path {
    stroke: #000;
    stroke-width: 3px;
  }
  svg {
    height: 0.63vw;
    width: 0.63vw;
    ${({ opened }) => opened && "transform: rotate(180deg);"}
  }
  @media screen and (max-width: ${desktopBp}) {
    margin-bottom: 24px;
    svg {
      height: 8px;
      width: 8px;
    }
  }
`;

const StyledTitle = styled.p`
  font-size: 0.73vw;
  line-height: 0.94vw;
  font-weight: 700;
  margin: 0;
  @media screen and (max-width: ${desktopBp}) {
    font-size: 9px;
    line-height: 12px;
  }
`;

const StyledAnswers = styled.div`
  padding-top: 4px;
  padding-inline-start: 1.67vw;
  @media screen and (max-width: ${desktopBp}) {
    padding-inline-start: 21px;
  }
`;


interface IProps {
  questionaries: IQuestionnaire[] 
  is_voter: boolean
}

const EditAnswersComponent = React.memo(({ questionaries, is_voter }: IProps) => {
  const { t } = useTranslation();
  const { selectedQuestionnaireId, selectedQuestionId } =
    useSettingsState();
  const { filters } = useRawDataState();
  const [opened, setOpened] = useState<boolean>(true);

  const selectedQuestionnaire = useMemo(() => {
    return questionaries.find((q) => q.id === selectedQuestionnaireId);
  }, [questionaries, selectedQuestionnaireId]);

  const selectedQuestion = useMemo(() => {
    return selectedQuestionnaire?.questions.find(
      (q) => q.id === selectedQuestionId
    );
  }, [selectedQuestionnaire, selectedQuestionId]);

  const fieldFilter: IFilters | undefined = useMemo(() => {
    if (selectedQuestion?.field_to_update) {
      const field = selectedQuestion.field_to_update;
      return filters.find((f) => f.slug === field);
    }
  }, [filters, selectedQuestion]);


  console.log(fieldFilter)
  

  if (!selectedQuestionId) return null;

  return (
    <>
      <StyledWrapper onClick={() => setOpened((p) => !p)} opened={opened}>
        <StyledTitle>{t("settings_answers-title")}</StyledTitle>
        <ChevronIcon />
      </StyledWrapper>
      {opened && (
        <StyledAnswers>
          {selectedQuestion?.answers_options.map((answer) => {
            return (
              <EditAnswerComponent
                questionaries={questionaries}
                key={answer.id}
                answer={answer}
                answers={selectedQuestion?.answers_options}
                field={fieldFilter}
                is_voter={is_voter}
              />
            );
          })}
          <CreateAnswerComponent is_voter={is_voter} selectedQuestion={selectedQuestion} fieldFilter={fieldFilter} questionaries={questionaries} />
        </StyledAnswers>
      )}
    </>
  );
});

export default EditAnswersComponent;
