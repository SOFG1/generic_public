import React, {memo, useCallback, useEffect, useMemo, useState} from "react";
import {InputDate} from "../../UI/Input";
import {Dropdown} from "../../UI/Dropdown";
import {useTranslation} from "react-i18next";
import {useUserState} from "../../store/user";
import {useSettingsActions, useSettingsState} from "../../store/settings";
import {handle} from "../../api";
import {CallCenterHistory} from "../../api/callCenterHistory";
import styled from "styled-components";

interface IProps{
    dateFilter:{
        startDate: null | Date,
        endDate: null | Date,
    },
    setDateFilter: React.Dispatch<React.SetStateAction<{startDate: Date | null, endDate: Date | null}>>,
    questionarieId:number,
    interviewerId:string,
    setInterviewerId: React.Dispatch<React.SetStateAction<string>>,
    setQuestionarieId: React.Dispatch<React.SetStateAction<number>>
}

const PerfomanceAppQuests = memo(({dateFilter, setDateFilter, questionarieId, interviewerId, setInterviewerId, setQuestionarieId}:IProps)=>{
    const { t } = useTranslation()
    const { token } = useUserState()
    const { voterQuests: voterQuestsList } = useSettingsState()
    const { onGetVoterQuests } = useSettingsActions()

    const [interviewerOptions, setInterviewerOptions] = useState<{ item: string, value: number }[]>([])


    const questionariesOptions = useMemo(() => {
        return voterQuestsList.map((q) => ({ item: q.name, value: q.id }));
    }, [voterQuestsList]);



    const handleFetchInterviewers = useCallback(async () => {
        if (token) {
            const [dataRes, dataErr] = await handle(CallCenterHistory.getQuestionarieFilters(token, true))
            if (dataRes) {
                const opts = dataRes.interviewier.map((c: any) => ({ item: c.login, value: c.id }))
                setInterviewerOptions(opts)
            }
            if (dataErr) {
                console.log(dataErr)
            }
        }
    }, [token])




    useEffect(() => {
        handleFetchInterviewers()
    }, [handleFetchInterviewers])


    useEffect(() => {
        onGetVoterQuests()
    }, [])
    return (
        <Container>
            <InputDate
                label={t("reports-app_date")}
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
                options={interviewerOptions}
                value={interviewerId}
                onSelect={setInterviewerId}
                isMultiSelect={true}
                placeholder={t("reports-app_interviewer")}
                label={t("reports-app_interviewer")}
            />
            <Dropdown
                options={questionariesOptions}
                value={questionarieId}
                onSelect={setQuestionarieId}
                placeholder={t("reports-app_questionnaire")}
                label={t("reports-app_questionnaire")}
            />
        </Container>
    )
})

export default PerfomanceAppQuests;
const Container = styled.div`
`
