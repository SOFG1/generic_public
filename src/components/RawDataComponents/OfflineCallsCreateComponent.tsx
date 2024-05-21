import styled from "styled-components";
import {desktopBp} from "../../styles/variables";
import {Button} from "../../UI/Button";
import {Loader} from "../../UI/Spinners";
import {Breadcrumbs} from "../../UI/Breadcrumbs";
import {ArrowRight} from "../../UI/Svg";
import {useCallback, useEffect, useMemo, useState} from "react";
import {useTranslation} from "react-i18next";
import {
    OfflineCallsCreateParametersComponent,
    OfflineCallsCreateQuestionComponent,
    OfflineCallsCreateUsersComponent
} from "./index";
import {IQuestionaries, SendAnswerAction, useCallCenterActions, useCallCenterState} from "../../store/callCenter";
import {useSettingsActions} from "../../store/settings";
import {activityList} from "../../config/userActivityList";

const OfflineCallsCreateComponent = ()=>{
    const {t} = useTranslation();
    const [index, setIndex] = useState(0);
    const { onGetAudiences } = useSettingsActions()
    const {questionariesList, selectedQuestionarieId,
        selectedAudienceId} = useCallCenterState();
    const {onGetQuestionariesInterviewees, onSendAnswers,} = useCallCenterActions();
    const [data, setData] = useState<{ [key: string]: { [key: string]: any } }>({});

    const selectQuestionarie: IQuestionaries | null = useMemo(() => {
        return (
            questionariesList.find(
                (item) => item.id === selectedQuestionarieId
            ) || null
        );
    }, [questionariesList, selectedQuestionarieId]);

    useEffect(() => {
        if (selectQuestionarie !== null) {
            onGetQuestionariesInterviewees();
        }
    }, [selectQuestionarie, onGetQuestionariesInterviewees]);

    useEffect(()=>{
        onGetAudiences();
    },[])

    const next = useCallback(()=>{
        if(index + 1 > 2) return;
        setIndex(index + 1);
    },[index]);

    const back = useCallback(()=>{
        if((index - 1) < 0) return;
        setIndex(index - 1);
    }, [index]);

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

    const handleSendAnswers = useCallback(() => {
        // const dataSend: SendAnswerAction = Object.keys(data).map((id) => {
        //     return {
        //         question: parseInt(id),
        //         answer: data[parseInt(id)].answer,
        //         comment: data[parseInt(id)].comment,
        //     };
        // });
        // onSendAnswers(dataSend);
        // setData(emptyData);
    }, [data, emptyData]);

    const isNextDisabled = useCallback(()=>{
        return !selectQuestionarie || !selectedAudienceId
    },[selectQuestionarie, selectedAudienceId])

    return (
        <Container>
            <Breadcrumbs index = {index} separator={<ArrowRight/>}>
                <StyledBreadcrumbLabel>{t("raw_data_breadcrumbs_parameters")}</StyledBreadcrumbLabel>
                <StyledBreadcrumbLabel>{t("raw-data-offline-campaign-user_info")}</StyledBreadcrumbLabel>
                <StyledBreadcrumbLabel>{t("raw-data-offline-campaign_questions")}</StyledBreadcrumbLabel>
            </Breadcrumbs>
            <Content>
                {index === 0 && <OfflineCallsCreateParametersComponent/>}
                {index === 1 && <OfflineCallsCreateUsersComponent/>}
                {index === 2 && <OfflineCallsCreateQuestionComponent data = {data} setData = {setData}/>}
                <StyledButtonContainer>
                    {index !== 0 && (<StyledButton onClick = {back}>{t("raw_data_digital_campaign-prev")}</StyledButton>)}
                    {index !== 2 && (<StyledButton disabled = {isNextDisabled()} style = {{marginLeft:"auto"}} onClick = {next}>{t("raw_data_digital_campaign-next")}</StyledButton>)}
                    {index === 2 && (<StyledButton disabled = {isNextDisabled()}  data-action={activityList["call-center-questionnaire_send"]} style = {{marginLeft:"auto"}} onClick ={handleSendAnswers}>Next</StyledButton>)}
                </StyledButtonContainer>
            </Content>
        </Container>
    )
}

export default OfflineCallsCreateComponent;


const Container = styled.div`
`

const StyledBreadcrumbLabel = styled.p`
  font-weight: 500;
  font-size: ${props => props.theme.fontSize.small.vw};
  @media(max-width: ${desktopBp}){
    font-size: ${props => props.theme.fontSize.small.vw};
  }
`

const StyledButtonContainer = styled.div`
    display: flex;
  width: 100%;
  justify-content: space-between;
  margin-top: 3.80vw;
  margin-bottom: 3.54vw;

  @media(max-width: ${desktopBp}){
    margin-top: 48px;
    margin-bottom: 44px;
  }
`

const StyledButton = styled(Button)`
  width: 4.01vw;
  height: 1.67vw;
  border-width: 1px;
  font-size: 0.63vw;
  
  @media(max-width: ${desktopBp}){
    width: 50px;
    height: 21px;
    font-size: 8px;
  }
`

const Content = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`
