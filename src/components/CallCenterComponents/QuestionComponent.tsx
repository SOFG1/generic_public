import React, {useCallback, useEffect, useMemo, useState} from "react";
import styled from "styled-components";
import { desktopBp } from "../../styles/variables";
import { Text } from "../common/Text";
import { DropdownWithSearch } from "../../UI/Dropdown";
import { useTranslation } from "react-i18next";
import { Input } from "../../UI/Input";
import { InputValueType } from "../../types";
import {IQuestions, useCallCenterState} from "../../store/callCenter";
import { UpdateReferrersView } from "../../views/CallCenterViews";
import {Button} from "../../UI/Button";
import {CallCenter, IDistributionAnswerParams} from "../../api/callCenter";
import {useUserState} from "../../store/user";
import {handle} from "../../api";
import {useAppActions} from "../../store/app";
import {activityList} from "../../config/userActivityList";

const QuestionBlock = styled.div`
  display: flex;
  align-items: flex-start;
  align-content: flex-start;
  flex-direction: column;
  width: 100%;
  justify-content: flex-start;
  margin-top: 1.04vw;
  @media screen and (max-width: ${desktopBp}) {
    margin-top: 13px;
  }
`;

const QuestionBlockLabel = styled(Text)`
  font-size: 0.94vw;
  margin-bottom: 2.34vw;
  white-space: pre-line;
  @media screen and (max-width: ${desktopBp}) {
    font-size: 12px;
    margin-bottom: 29px;
  }
`;

const StyledTextarea = styled(Input)`
  width: 100%;
  max-width: 100%;
  margin-top: 1.04vw;

  label {
    margin-bottom: 0;
  }

  textarea {
    border-radius: 1.04vw;
    width: 100%;
    min-height: 6.82vw;
  }
  @media screen and (max-width: ${desktopBp}) {
    margin-top: 13px;
    textarea {
      border-radius: 13px;
      min-height: 86px;
    }
  }
`;

const StyledButton = styled(Button)`
  margin-top: 0.78vw;
  max-width: 6.25vw;
  padding: 0;
  font-size: ${props => props.theme.fontSize.small.vw};;
  @media screen and (max-width: ${desktopBp}) {
   max-width: 78px;
    margin-top: 10px;
    padding: 0;
    font-size: ${props => props.theme.fontSize.small.vw};
  }
`

interface IProps {
  question: IQuestions;
  data: { [key: string]: { [key: string]: any } };
  setData: (data: any) => void,
  className?:string,
}

const QuestionComponent = React.memo(({ question, data, setData, className }: IProps) => {
  const { t } = useTranslation();
  const [dependentQuestion, setDependentQuestion] = useState(undefined);
  const { interviewees, selectedQuestionarieId, selectedIntervieweeNumber, selectedAudienceId } = useCallCenterState();
  const [loading, setLoading] = useState(false);
  const {token} = useUserState();
  const {onShowAlert} =  useAppActions();

  useEffect(()=>{
    setDependentQuestion(undefined)
  },[interviewees?.id])

  const onChangeHandler = useCallback(
    (id: number, key: string, value: InputValueType) => {
      setData((prevState: any) => {
        return {
          ...prevState,
          [id]: {
            ...prevState[id],
            [key]: value,
          },
        };
      });
    },
    []
  );

  const handleAnswer = useCallback(async (id)=>{
    if (!token || !interviewees)  return;
    setLoading(true)
    const dataToSend = {
      question: parseInt(id),
      answer: data[parseInt(id)]?.answer || "",
      comment: data[parseInt(id)]?.comment || "",
    }
    const params: IDistributionAnswerParams = {
      interviewee: interviewees.id,
      answer: dataToSend,
      questionarie: selectedQuestionarieId,
      audience: selectedAudienceId,
      phone: selectedIntervieweeNumber
    }
    const [res, err] = await handle(CallCenter.postAnswers(token, params));
    setLoading(false);
    if(res) setDependentQuestion(res);

    if(err){
      const errText = err?.error?.error_user_msg || err.error || "Something went wrong! Try again later!"
      onShowAlert(false, errText)
    }
  },[data, token, interviewees, selectedQuestionarieId, selectedAudienceId,selectedIntervieweeNumber])


  const selectedAnswer = useMemo(() => {
    const answerId = data[question.id]?.answer;
    return question?.answers_options?.find((a) => a.id === answerId)
  }, [question, data])


  return (
    <div className = {className}>
      <QuestionBlock>
        <QuestionBlockLabel
          dangerouslySetInnerHTML={{
            __html: `${question.query}`,
          }}
        />

        {question.answers_options.length > 0 ? (
          <DropdownWithSearch
            value={data[question.id]?.answer || ""}
            placeholder={t("questionaries_answer-placeholder")}
            onSelect={(val) => onChangeHandler(question.id, "answer", val)}
            options={question.answers_options.map((answer) => {
              return {
                item: answer.answer_words,
                value: answer.id,
              };
            })}
            label={t("questionaries_answer-label")}
          />
        ) : (
          <StyledTextarea
            type="text"
            name="comment"
            isTextarea={true}
            label={t("questionaries_comment-label")}
            onChange={(v) => onChangeHandler(question.id, "comment", v)}
            value={data[question.id]?.[`comment`] || ""}
          />
        )}
        <StyledButton disabled={loading} data-action={activityList["call-center-questionnaire_send"]} onClick = {()=>handleAnswer(question.id)}>{t("questionaries_next")}</StyledButton>
      </QuestionBlock>
      {selectedAnswer?.is_update_referal && <UpdateReferrersView />}
      {selectedAnswer?.related_question && (
        <QuestionComponent
          question={selectedAnswer.related_question}
          data={data}
          setData={setData}
        />
      )}
      {dependentQuestion && (
          <QuestionComponent question={dependentQuestion} data={data} setData={setData}/>
      )}
    </div>
  );
});

export default QuestionComponent;
