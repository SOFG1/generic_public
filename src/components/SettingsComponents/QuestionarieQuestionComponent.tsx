import React, { useCallback, useState } from "react";
import styled from "styled-components";
import { desktopBp } from "../../styles/variables";
import { IQuestion, useSettingsActions } from "../../store/settings";
import { ChevronIcon, EditIcon, TrashIcon } from "../../UI/Svg";
import AnswersListComponent from "./AnswersListComponent";
import { ConfirmDeleteFull } from "../common/ConfirmDeleteFull";
import { useTranslation } from "react-i18next";
import { activityList } from "../../config/userActivityList";


const StyledWrapper = styled.div`
  display: flex;
  align-items: stretch;
  gap: 17px;
  margin-bottom: 20px;
  @media screen and (max-width: ${desktopBp}) {
    gap: 0.89vw;
    margin-bottom: 11px;
  }
`

const StyledOrder = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: 1.30vw 0;
  @media screen and (max-width: ${desktopBp}) {
    padding: 16px 0;
  }
`

const OrderBtn = styled.button<{ reversed?: boolean }>`
  padding: 0;
  border: 0;
  background-color: transparent;
  cursor: pointer;
  svg {
    ${({ reversed }) => reversed && "transform: rotate(180deg);"}
  }
`;

const OrderBottomBtn = styled(OrderBtn)`
  margin-top: auto;
`


const StyledQuestion = styled.div`
  flex-grow: 1;
  min-height: 10.05vw;
  border-radius: 1.04vw;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
  box-sizing: border-box;
  padding: 1.25vw 1.56vw;
  @media screen and (max-width: ${desktopBp}) {
    min-height: 126px;
    border-radius: 13px;
    padding: 16px 20px;
  }
`;

const StyledBox = styled.div`
  display: flex;
  margin-bottom: 0.52vw;
  gap: 13px;
  @media screen and (max-width: ${desktopBp}) {
    margin-bottom: 7px;
  }
`;


const StyledTitle = styled.p`
  font-size: 0.94vw;
  line-height: 1.2vw;
  font-weight: 700;
  margin: 0;
  margin-inline-end: auto;
  text-decoration: underline;
  @media screen and (max-width: ${desktopBp}) {
    font-size: 12px;
    line-height: 15px;
  }
`;

const StyledText = styled.p`
  font-size: 0.94vw;
  line-height: 1.2vw;
  margin: 0;
  flex-grow: 1;
  text-align: start;
  @media screen and (max-width: ${desktopBp}) {
    font-size: 12px;
    line-height: 15px;
  }
`;

const DeleteButton = styled.button`
  height: 25px;
  width: 25px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #000;
  background-color: transparent;
  padding: 0;
  cursor: pointer;
  svg {
    height: 60%;
    width: 60%;
  }
`;

interface IProps {
  question: IQuestion;
  questionsList: IQuestion[];
  is_voter: boolean
}

const QuestionarieQuestionComponent = React.memo(
  ({ question, questionsList, is_voter }: IProps) => {
    const { t } = useTranslation();
    const {
      onDeleteQuestion, //+
      onSelectQuestionnaireQuestion, //+
      onEditQuestionOrder, //+
    } = useSettingsActions();
    const [showConfirmDelete, setShowConfirmDelete] = useState<boolean>(false);

    const handleChangeOrder = useCallback(
      (id: number, query_pos: number, type: "+" | "-") => {
        const newPostion = type === "+" ? query_pos + 1 : query_pos - 1;
        onEditQuestionOrder(id, newPostion, is_voter);
        const neighboor = questionsList?.find(
          (q) => q.query_pos === newPostion
        ); //Question with this order
        if (neighboor) {
          onEditQuestionOrder(neighboor.id, query_pos, is_voter);
        }
      },
      [questionsList, is_voter]
    );
 
    return (
      <StyledWrapper>
        <StyledOrder>
          {question.query_pos !== 1 && (
            <OrderBtn
              data-action={activityList["question-change-order"]}
              reversed={true}
              onClick={() =>
                handleChangeOrder(question.id, question.query_pos, "-")
              }
            >
              <ChevronIcon />
            </OrderBtn>
          )}
          {question.query_pos !== questionsList.length && (
            <OrderBottomBtn
              data-action={activityList["question-change-order"]}
              onClick={() =>
                handleChangeOrder(question.id, question.query_pos, "+")
              }
            >
              <ChevronIcon />
            </OrderBottomBtn>
          )}
        </StyledOrder>
        <StyledQuestion>
          <StyledBox>
            <StyledTitle>{t("settings_question", { order: question.query_pos })}</StyledTitle>
            <DeleteButton data-action={activityList["question-delete"]} onClick={() => setShowConfirmDelete(true)}>
              <TrashIcon />
            </DeleteButton>
            <DeleteButton
              data-action={activityList["question-edit"]}
              onClick={() => onSelectQuestionnaireQuestion(question.id)}
            >
              <EditIcon />
            </DeleteButton>
          </StyledBox>
          <StyledText dangerouslySetInnerHTML={{ __html: question.query }} />
          <AnswersListComponent answers={question.answers_options} />
        </StyledQuestion>
        <ConfirmDeleteFull
          show={showConfirmDelete}
          onClose={() => setShowConfirmDelete(false)}
          onDelete={() => onDeleteQuestion(question.id, is_voter)}
          title={t("settings_question-warning")}
        />
      </StyledWrapper>
    );
  }
);

export default QuestionarieQuestionComponent;
