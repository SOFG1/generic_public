import React, {memo, useEffect, useMemo} from "react";
import styled from "styled-components";
import {InputDate} from "../../UI/Input";
import {Dropdown} from "../../UI/Dropdown";
import {useTranslation} from "react-i18next";
import {useCallCenterHistoryActions, useCallCenterHistoryState} from "../../store/callCenterHistory";
import {useSettingsActions, useSettingsState} from "../../store/settings";

interface IProps{
    dateFilter:any,
    setDateFilter:any,
    questionarieId:number,
    setQuestionarieId: React.Dispatch<React.SetStateAction<number>>,
    interviewerId:string,
    setInterviewerId: React.Dispatch<React.SetStateAction<string>>

}
const PerfomancePanelCallCenterReport = memo(({dateFilter, setDateFilter, questionarieId, setQuestionarieId, interviewerId, setInterviewerId}:IProps)=>{
    const { t } = useTranslation();
    const { interviewers } =
        useCallCenterHistoryState();
    const {
        onSetQuestionariesPage,
    } = useCallCenterHistoryActions();


    const { questionaries } = useSettingsState();
    const { onGetQuestionaries } = useSettingsActions();

    const questionariesOptions = useMemo(() => {
        return questionaries.map((q) => ({ item: q.name, value: q.id }));
    }, [questionaries]);

    const interviewersOptions = useMemo(() => {
        return interviewers.map((i) => ({ item: i.login, value: i.id }));
    }, [interviewers]);




    useEffect(() => {
        onSetQuestionariesPage(0);
    }, [dateFilter, questionarieId, interviewerId]);

    useEffect(() => {
        onGetQuestionaries();
    }, []);
    return (
        <Container>
            <InputDate
                label={t("reports-questionnaires_date")}
                startDate={dateFilter.startDate}
                expirationDate={dateFilter.endDate}
                onChange={(dates: Date[]) => {
                    setDateFilter((prev: any) => ({
                        ...prev,
                        startDate: dates[0],
                        endDate: dates[1],
                    }));
                }}
            />
            <Dropdown
                options={interviewersOptions}
                value={interviewerId}
                onSelect={setInterviewerId}
                isMultiSelect={true}
                placeholder={t("reports-questionnaires_interviewer")}
                label={t("reports-questionnaires_interviewer")}
            />
            <Dropdown
                options={questionariesOptions}
                value={questionarieId}
                onSelect={setQuestionarieId}
                placeholder={t("reports-questionnaires_questionnaire")}
                label={t("reports-questionnaires_questionnaire")}
            />
        </Container>
    )
})

export default PerfomancePanelCallCenterReport;


const Container = styled.div`
`
