import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { IFilters } from "../../store/rawData";
import {
  IAnswer,
  IQuestionnaire,
  useSettingsActions,
  useSettingsState,
} from "../../store/settings";
import { desktopBp } from "../../styles/variables";
import { Button } from "../../UI/Button";
import { Checkbox, Input } from "../../UI/Input";
import { EditIcon, LikeIcon, QuestionIcon, TrashIcon } from "../../UI/Svg";
import { ConfirmDeleteFull } from "../common/ConfirmDeleteFull";
import { FieldInput } from "../common/FieldInput";
import { Dropdown } from "../../UI/Dropdown";
import { convert } from "html-to-text";
import { activityList } from "../../config/userActivityList";
import VoterAnswerDropdown from "./VoterAnswerDropdown";
import { getFormatDate } from "../../utils";

const StyledBox = styled.div`
  display: flex;
  gap: 15px;
  align-items: flex-end;
  justify-content: flex-start;
  min-height: 2.45vw;
  padding-inline-end: 0.73vw;
  margin-bottom: 2.03vw;
  @media screen and (max-width: ${desktopBp}) {
    min-height: 31px;
    padding-inline-end: 9px;
    margin-bottom: 25px;
  }
  @media screen and (max-width: 550px) {
    flex-wrap: wrap;
    gap: 10px 0;
  }
`;


const StyledInput = styled(Input)`
  max-width: 27.5vw;
  flex-grow: 1;
  margin-inline-end: 4.17vw;
  @media screen and (max-width: ${desktopBp}) {
    max-width: 345px;
    margin-inline-end: 52px;
  }
  @media screen and (max-width: 550px) {
    max-width: 100%;
    margin-inline-end: 0;
  }
`;

const StyledValue = styled(FieldInput)`
  max-width: 13.96vw;
  margin-inline-end: auto;
  @media screen and (max-width: ${desktopBp}) {
    max-width: 175px;
  }
`;

const SaveButton = styled(Button)`
  margin-inline-start: 10px;
  height: 1.46vw;
  width: 3.65vw;
  flex-shrink: 0;
  align-self: center;
  @media screen and (max-width: ${desktopBp}) {
    height: 18px;
    width: 46px;
  }
`;

const StyledText = styled.p`
  max-width: 27.5vw;
  flex-grow: 1;
  margin: 0;
  margin-inline-end: 4.17vw;
  word-break: break-all;
  font-size: 0.94vw;
  line-height: 1.2vw;
  @media screen and (max-width: ${desktopBp}) {
    font-size: 12px;
    line-height: 15px;
    max-width: 345px;
    margin-inline-end: 52px;
  }
  @media screen and (max-width: 550px) {
    max-width: 100%;
    width: 100%;
    margin-inline-end: 0;
  }
`;


const StyledAnswer = styled.div<{ answer: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  height: 33px;
  width: 33px;
  background-color: #AAA;
  svg {
    width: 60%;
    height: 60%;
  ${({ answer }) => answer === "no" && "transform: rotate(180deg);"}
  }
  ${({ answer }) => answer === "yes" && "background-color: #65C763;"}
  ${({ answer }) => answer === "no" && "background-color: #EB5B3C;"}
`

const StyledValueText = styled.p`
  font-size: 0.94vw;
  line-height: 1.2vw;
  width: 13.96vw;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 0;
  margin-inline-end: auto;
  @media screen and (max-width: ${desktopBp}) {
    font-size: 12px;
    line-height: 15px;
    width: 175px;
  }
`;

const DeleteButton = styled.button`
  height: 25px;
  width: 25px;
  flex-shrink: 0;
  border: 1px solid #000;
  border-radius: 50%;
  background-color: transparent;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  svg {
    height: 65%;
    width: 65%;
  }
`;


const StyledDropdown = styled(Dropdown)`
  margin-inline-start: 0.78vw;
  @media screen and (max-width: ${desktopBp}) {
    margin-inline-start: 10px;
  }
`;

const answerIcons = {
  "yes": <LikeIcon />,
  "no": <LikeIcon />,
  "unknown": <QuestionIcon />
}

interface IProps {
  questionaries: IQuestionnaire[]
  answer: IAnswer;
  answers?: IAnswer[]
  field?: IFilters;
  is_voter: boolean
}

const EditAnswerComponent = React.memo(({ questionaries, answer, answers, field, is_voter }: IProps) => {
  const { t } = useTranslation();
  const { selectedQuestionnaireId, selectedQuestionId } =
    useSettingsState();
  const { onDeleteAnswer, onEditAnswer } = useSettingsActions();
  const boxRef = useRef<HTMLDivElement>(null);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [answerText, setAnswerText] = useState<string>("");
  const [fieldValue, setFieldValue] = useState<any>("");
  const [relatedQuestionId, setRelatedQuestionId] = useState<number>(0);
  const [updateReferal, setUpdateReferal] = useState<boolean>(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState<boolean>(false);

  const questionsOptions = useMemo(() => {
    const questions =
      questionaries.find((q) => q.id === selectedQuestionnaireId)?.questions ||
      [];
    const options = questions
      .filter((q) => q.id !== selectedQuestionId)
      .map((q) => ({ item: convert(q.query), value: q.id }));
    return [{ item: "", value: "" }, ...options];
  }, [questionaries, selectedQuestionnaireId, selectedQuestionId]);

  const handleSave = useCallback(() => {
    let valueFormated = fieldValue
    if(valueFormated instanceof Date) {
      valueFormated = getFormatDate(valueFormated)
    }
    onEditAnswer(
      answer.id,
      answerText,
      valueFormated,
      relatedQuestionId || null,
      updateReferal,
      is_voter
    );
    setEditMode(false);
  }, [answer.id, answerText, fieldValue, relatedQuestionId, updateReferal, is_voter]);

  const handleClickOutside = useCallback(
    (e: any) => {
      if (e.target.tagName === "BUTTON") return
      if (e.composedPath()?.includes(boxRef.current)) return
      if (!editMode) return
      setEditMode(false);
    },
    [boxRef.current, editMode])


  //Set answer to field value if answer is empty
  const handleSetFieldValue = useCallback((v: any) => {
    if (answerText === String(fieldValue)) {
      setAnswerText(String(v))
    }
    setFieldValue(v)
  }, [answerText, fieldValue])

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [editMode, handleClickOutside]);

  useEffect(() => {
    if (editMode) {
      setUpdateReferal(answer.is_update_referal)
      setAnswerText(answer.answer_words);
      setFieldValue(answer.value_to_set);
      if(field?.type === "timestamp") {
       const val = answer.value_to_set ? new Date(answer.value_to_set.split(".").reverse().join("-")) : null;
        setFieldValue(val);
      }
      if(field?.type !== "timestamp") {
        setFieldValue(answer.value_to_set);
      }
      if (answer.related_question) {
        setRelatedQuestionId(answer.related_question.id);
      }
    }
  }, [answer, editMode, field]);


  const valueType = useMemo(() => {
    if (field?.type === "int") return "int-single"
    if (field?.type === "timestamp") return "date-single"
    return field?.type
  }, [field])



  return (
    <>
      <StyledBox ref={boxRef}>
        {editMode ? (
          <>
            {is_voter ? (
              <VoterAnswerDropdown value={answerText} onChange={setAnswerText} answers={answers} />
            ) : (
              <StyledInput
                name="answer"
                label={t("settings_answers-label")}
                type="text"
                value={answerText}
                onChange={setAnswerText}
              />
            )}

            {field && (
              <StyledValue
                isForPreview={false}
                filter={{
                  ...field,
                  type: valueType as string,
                  label: t("settings_answers-field"),
                  is_multiplier: false,
                  name: field.slug,
                }}
                value={fieldValue}
                onChange={(s, v) => handleSetFieldValue(v)}
              />
            )}
            <StyledDropdown
              label={t("settings_answers-related")}
              placeholder={t("settings_answers-related")}
              value={relatedQuestionId}
              options={questionsOptions}
              onSelect={setRelatedQuestionId}
            />
            <Checkbox
              label={t("settings_answers-update_referal")}
              isActive={updateReferal}
              onChange={() => setUpdateReferal(!updateReferal)}
            />
            <SaveButton onClick={handleSave} data-action={activityList["save-editing-answer"]}>
              {t("settings_answers-save")}
            </SaveButton>
          </>
        ) : (
          <>
            {is_voter && <StyledAnswer answer={answer.answer_words}>{answerIcons[answer.answer_words as keyof typeof answerIcons]}</StyledAnswer>}
            {!is_voter && <StyledText>{answer.answer_words}</StyledText>}
            <StyledValueText>{answer.value_to_set}</StyledValueText>
            <StyledValueText>
              {answer.related_question?.query &&
                convert(answer.related_question?.query)}
            </StyledValueText>
            <DeleteButton onClick={() => setEditMode(true)} data-action={activityList["edit-answer"]}>
              <EditIcon />
            </DeleteButton>
            <DeleteButton onClick={() => setShowConfirmDelete(true)} data-action={activityList["delete-answer"]}>
              <TrashIcon />
            </DeleteButton>
          </>
        )}
      </StyledBox>
      <ConfirmDeleteFull
        show={showConfirmDelete}
        onClose={() => setShowConfirmDelete(false)}
        onDelete={() => onDeleteAnswer(answer.id, is_voter)}
        title={t("settings_answers-warn")}
      />
    </>
  );
});

export default EditAnswerComponent;
