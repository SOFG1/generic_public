import React, {useCallback, useEffect, useMemo, useState} from "react";
import styled from "styled-components";
import {Title} from "../../components/common/Title";
import {Button} from "../../UI/Button";
import {IQuestionaries, useCallCenterActions, useCallCenterState,} from "../../store/callCenter";
import {Dropdown} from "../../UI/Dropdown";
import {useUserState} from "../../store/user";
import {useTranslation} from "react-i18next";
import {desktopBp} from "../../styles/variables";
import {QuestionComponent} from "../../components/CallCenterComponents";
import {useSettingsActions, useSettingsState} from "../../store/settings";
import {activityList} from "../../config/userActivityList";

const QuestionCard = styled.div`
  flex-grow: 1;
`;

const CardHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-content: flex-start;
  align-items: flex-start;
  width: 100%;
  justify-content: space-between;
  box-sizing: border-box;
  padding-bottom: 1.04vw;
  gap: 1.82vw;
  @media screen and (max-width: ${desktopBp}) {
    padding-bottom: 13px;
    gap: 23px;
  }
  @media screen and (max-width: 740px) {
    flex-direction: column;
    gap: 20px;
  }
`;

const TitleStyled = styled(Title)`
  margin-top: 0;
  font-size: 1.25vw;
  line-height: 1.2;
  margin-bottom: 0;
  font-weight: 500;
  white-space: nowrap;
  @media screen and (max-width: ${desktopBp}) {
    font-size: 16px;
  }
`;

const Form = styled.div`
  box-sizing: border-box;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: flex-start;
  align-content: flex-start;
  margin-top: 1.04vw;
  padding: 1.04vw 0 0;
  @media screen and (max-width: ${desktopBp}) {
    margin-top: 13px;
    padding: 13px 0 0;
  }
`;

const Footer = styled.div`
  display: flex;
  align-items: flex-end;
  align-content: flex-end;
  justify-content: flex-end;
  width: 100%;
  box-sizing: border-box;

  button {
    max-width: 13.54vw;
  }
  @media screen and (max-width: ${desktopBp}) {
    button {
      max-width: 170px;
    }
  }
`;

const QuestionName = styled(Title)`
  font-weight: 600;
  font-size: 0.94vw;
  line-height: 1.15vw;
  margin: 0;
  @media screen and (max-width: ${desktopBp}) {
    font-size: 12px;
    line-height: 14px;
  }
`;

const QuestionView = React.memo(() => {
  const { t } = useTranslation();
  const { userInfo } = useUserState();
  const {
    questionariesList,
    selectedQuestionarieId,
    selectedAudienceId
  } = useCallCenterState();
  const { audiences } = useSettingsState()
  const {
    onGetQuestionariesInterviewees,
    onSelectQuestionarie,
    onSelectAudience,
  } = useCallCenterActions();
  const { onGetAudiences } = useSettingsActions()
  const [data, setData] = useState<{ [key: string]: { [key: string]: any } }>(
    {}
  );


  const isGeneralRole = userInfo?.role?.id !== 3;

  const questionarieOptions: { item: string; value: string | number }[] =
    useMemo(() => {
      return questionariesList.map((item) => {
        return {
          item: item.name,
          value: item.id,
        };
      });
    }, [questionariesList]);


  const selectQuestionarie: IQuestionaries | null = useMemo(() => {
    return (
      questionariesList.find(
        (item) => item.id === selectedQuestionarieId
      ) || null
    );
  }, [questionariesList, selectedQuestionarieId]);

  const emptyData = useMemo(() => {
    const dataObj: { [id: number]: { [key: string]: any } } = {};
    if (selectQuestionarie) {
      for (const question of selectQuestionarie.questions) {
        dataObj[question.id] = {
          answer: 0,
          comment: "",
        };
      }
    }
    return dataObj;
  }, [selectQuestionarie]);

  useEffect(() => {
    setData(emptyData);
  }, [emptyData]);


  useEffect(() => {
    if (selectQuestionarie !== null) {
      onGetQuestionariesInterviewees();
    }
  }, [
    selectQuestionarie,
    onGetQuestionariesInterviewees,
  ]);


  const audiencesOptions = useMemo(() => {
    return audiences?.map(a => ({ item: a.name, value: a.id }))
  }, [audiences])

  const nextInterviewer = useCallback(()=>{
    onGetQuestionariesInterviewees();
    setData(emptyData);
  },[emptyData])

  const handleSelectQuestionarie = (id: any) => {
    onSelectQuestionarie(id);
  };

  const showDemoData = useMemo(() => {
    return (
      questionarieOptions.length === 1 &&
      questionarieOptions[0]?.item === "Demo"
    );
  }, [questionarieOptions]);

  //Questions that are depended of answers
  const dependedQuestions = useMemo(() => {
    const ids: any = [];
    selectQuestionarie?.questions.forEach((q) => {
      q.answers_options.forEach((a) => {
        if (a.related_question) {
          ids.push(a.related_question.id);
        }
      });
    });
    return ids;
  }, [selectQuestionarie?.questions]);

  useEffect(() => {
    onGetAudiences()
  }, [])




  return (
    <QuestionCard>
      <TitleStyled>
        {t("questionaries-title")} {showDemoData && t("questionaries-demo")}
      </TitleStyled>
      <CardHeader>
        <Dropdown
          isReversed={true}
          value={selectedQuestionarieId}
          placeholder={t("questionaries-questionarie-plhr")}
          onSelect={handleSelectQuestionarie}
          options={questionarieOptions}
          label={t("questionaries-questionarie-label")}
        />
        {isGeneralRole && (
          <Dropdown
            isReversed={true}
            value={selectedAudienceId || 0}
            placeholder={t("questionaries-audience")}
            onSelect={onSelectAudience}
            options={audiencesOptions}
            label={t("questionaries-audience")}
          />
        )}
      </CardHeader>
      {selectQuestionarie && (
        <>
          <Form>
            <QuestionName>{selectQuestionarie.name}</QuestionName>
            {selectQuestionarie.questions.map((question) => {
              //Don't show this question if it's dependent of an answer
              if (dependedQuestions.includes(question.id)) return null;
              return (
                <QuestionComponent
                  key={question.id}
                  question={question}
                  data={data}
                  setData={setData}
                />
              );
            })}
          </Form>
          <Footer>
            <Button
                data-action={activityList["call-center-next-interviewer"]}
              onClick={nextInterviewer}
            >
              {t("call-center_next_interviewer")}
            </Button>
          </Footer>
        </>
      )}
    </QuestionCard>
  );
});

export default QuestionView;
