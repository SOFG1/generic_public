import {memo, useCallback, useEffect, useState} from "react";
import styled from "styled-components";
import {desktopBp} from "../../styles/variables";
import {SquareCheckbox} from "../../UI/Input";
import {PerfomanceEmailReport, PerfomancePanelCallCenterReport, PerfomancePanelSmsReport} from "./index";
import {IQuestionarieFilter, useCallCenterHistoryActions} from "../../store/callCenterHistory";
import {SecondaryButton} from "../../UI/SecondaryButton";
import {aDayInMilliseconds, getFormatDate} from "../../utils";
import {InputValueType} from "../../types";
import PerfomancePanelDatabaseReport from "./PerfomancePanelDatabaseReport";
import {useHistoryActions} from "../../store/history";
import PerfomanceUserActivityReport from "./PerfomanceUserActivityReport";
import PerfomanceAppQuests from "./PerfomanceAppQuests";

type PerformanceAction = "Sms" | "Email" | "Call Center" | "Database" | "App" | "User Activity";
export type SmsSubtype = "incoming" | "outgoing"

const PerformancePanelComponent = memo(()=>{
    const [panel, setPanel] = useState<PerformanceAction | null>("Sms");
    const [sms, setSms] = useState<null | SmsSubtype>("incoming");
    const { onGetFilters } = useCallCenterHistoryActions();
    const [filterParams, setFilterParams] = useState<{
        [key: string]: InputValueType;
    }>({});
    const [dateFilter, setDateFilter] = useState({
        startDate: null as null | Date,
        endDate: null as null | Date,
    });
    const [questionerId, setQuestionerId] = useState(0);
    const [interviewerId, setInterviewerId] = useState<string>("");
    const {onDownloadActivities, onDownloadIncomingSms,onDownloadOutgoingSms, onDownloadEmails, onDownloadQuestionaries} = useCallCenterHistoryActions();
    const {  onDownloadVoterQuests } = useCallCenterHistoryActions()


    const { onDownloadActions,  } = useHistoryActions();
    const handleDownloadDataBase = useCallback((): void => {
        onDownloadActions();
    }, [filterParams]);

    useEffect(()=>{
        onGetFilters();
    },[])

    useEffect(()=>{
        setFilterParams({});
        setInterviewerId("")
        setQuestionerId(0)
        setDateFilter({startDate: null, endDate: null});
    },[panel])



    const handleDownloadAppQuestReport = useCallback(() => {
        const data: IQuestionarieFilter = {};
        if (dateFilter.startDate && dateFilter.endDate) {
            //Add 1 day to end date
            const endDate = new Date(
                dateFilter.endDate.getTime() + aDayInMilliseconds
            );
            data.date_range = `${getFormatDate(
                dateFilter.startDate
            )} - ${getFormatDate(endDate)}`;
        }
        if (questionerId) data.questionarie = questionerId;
        if (interviewerId) data.interviewier = interviewerId;

        onDownloadVoterQuests(data);
    }, [dateFilter, questionerId, interviewerId]);

    const handleDownloadQuestionaries = useCallback(() => {
        const data: IQuestionarieFilter = {};
        if (dateFilter.startDate && dateFilter.endDate) {
            //Add 1 day to end date
            const endDate = new Date(
                dateFilter.endDate.getTime() + aDayInMilliseconds
            );
            data.date_range = `${getFormatDate(
                dateFilter.startDate
            )} - ${getFormatDate(endDate)}`;
        }
        if (questionerId) data.questionarie = questionerId;
        if (interviewerId) data.interviewier = interviewerId;
        onDownloadQuestionaries(data);
    }, [dateFilter, questionerId, interviewerId]);

    const handleDownloadEmail = useCallback(() => {
        const reqData: { [key: string]: string } = {};
        for (let slug in filterParams) {
            let value = filterParams[slug];
            if (typeof value === "string") {
                reqData[slug] = value.replace(/\s+/g, "");
            }
            if (Array.isArray(value) && value[0] && value[1]) {
                reqData[slug] = `${getFormatDate(value[0])} - ${getFormatDate(
                    new Date(value[1].getTime() + aDayInMilliseconds)
                )}`;
            }
        }
        onDownloadEmails(reqData);
    }, [filterParams]);

    const handleDownloadOutgoing = useCallback(() => {
        const reqData: { [key: string]: string } = {};
        for (let slug in filterParams) {
            let value = filterParams[slug];
            if (typeof value === "string") {
                reqData[slug] = value.replace(/\s+/g, "");
            }
            if (Array.isArray(value) && value[0] && value[1]) {
                reqData[slug] = `${getFormatDate(value[0])} - ${getFormatDate(
                    new Date(value[1].getTime() + aDayInMilliseconds)
                )}`;
            }
        }
        onDownloadOutgoingSms(reqData);
    }, [filterParams]);

    //Download history
    const handleExportIncoming = () => {
        const reqData: { [key: string]: string } = {};
        for (let slug in filterParams) {
            let value = filterParams[slug];
            if (typeof value === "string") {
                reqData[slug] = value.replace(/\s+/g, "");
            }
            if (Array.isArray(value) && value[0] && value[1]) {
                reqData[slug] = `${getFormatDate(value[0])} - ${getFormatDate(
                    new Date(value[1].getTime() + aDayInMilliseconds)
                )}`;
            }
        }
        onDownloadIncomingSms(reqData);
    };

    const handleExport = ()=>{
        if(panel === "Sms"){
            if(sms === "outgoing") return handleDownloadOutgoing();
            if(sms === "incoming") return handleExportIncoming()
        }
        if(panel === "Email") return handleDownloadEmail();
        if(panel === "Call Center") return handleDownloadQuestionaries();
        if(panel === "Database") return handleDownloadDataBase();
        if(panel === "User Activity") return onDownloadActivities();
        if(panel === "App") return handleDownloadAppQuestReport();
    }

    return(
        <Container>
            <CheckBoxContaner>
                <StyledItem>
                    <SquareCheckbox active={panel === "Sms"} onChange={()=>setPanel("Sms")}/>
                    <Label>Sms</Label>
                </StyledItem>
                <StyledItem>
                    <SquareCheckbox active = {panel === "Email"} onChange={()=>setPanel("Email")}/>
                    <Label>Email</Label>
                </StyledItem>
                <StyledItem>
                    <SquareCheckbox active = {panel === "Call Center"}  onChange={()=>setPanel("Call Center")}/>
                    <Label>Call Center</Label>
                </StyledItem>
                <StyledItem>
                    <SquareCheckbox active = {panel === "Database"} onChange={()=>setPanel("Database")}/>
                    <Label>Database</Label>
                </StyledItem>
                <StyledItem>
                    <SquareCheckbox active = {panel === "App"} onChange={()=>setPanel("App")}/>
                    <Label>App</Label>
                </StyledItem>
                <StyledItem>
                    <SquareCheckbox active = {panel === "User Activity"} onChange={()=>setPanel("User Activity")}/>
                    <Label>User activity</Label>
                </StyledItem>
            </CheckBoxContaner>
            <Content>
                {panel === "Sms" && <PerfomancePanelSmsReport filterParams={filterParams} setFilterParams={setFilterParams} panel={sms} setPanel={setSms}/>}
                {panel === "Email" && <PerfomanceEmailReport  filterParams={filterParams} setFilterParams={setFilterParams}/>}
                {panel === "Call Center" && <PerfomancePanelCallCenterReport interviewerId={interviewerId} setInterviewerId={setInterviewerId} questionarieId={questionerId} setQuestionarieId={setQuestionerId} dateFilter={dateFilter} setDateFilter={setDateFilter} />}
                {panel === "Database" && <PerfomancePanelDatabaseReport filterParams={filterParams} setFilterParams={setFilterParams}/>}
                {panel === "User Activity" && <PerfomanceUserActivityReport/>}
                {panel === "App" && <PerfomanceAppQuests interviewerId={interviewerId} setInterviewerId={setInterviewerId} questionarieId={questionerId} setQuestionarieId={setQuestionerId} dateFilter={dateFilter} setDateFilter={setDateFilter}  />}
            </Content>
            <Footer>
                <StyledButton onClick = {handleExport}>Export</StyledButton>
            </Footer>
        </Container>
    )
})

export default PerformancePanelComponent;


const Container = styled.div`
  display: flex;
  gap: 0 6.13vw;
  width: 24.20vw;
  flex-direction: column;
  @media(max-width: ${desktopBp}){
    gap: 0 77px;
    max-width: 303px;
  }
  & .styled_dropdown_value_wrapper{
    border-inline-end: 0 !important;
  }
  & .styled_dropdown_label{
    color: #AAA;
    font-size: ${props => props.theme.fontSize.semiMedium.vw};
    @media(max-width: ${desktopBp}){
      font-size: ${props => props.theme.fontSize.semiMedium.px};
    }
  }
  & .styled_input_date_label{
    color: #AAA;
    font-size: ${props => props.theme.fontSize.semiMedium.vw};
    @media(max-width: ${desktopBp}){
      font-size: ${props => props.theme.fontSize.semiMedium.px};
    }
  }
  
  & .styled_input_label{
    color: #AAA;
    font-size: ${props => props.theme.fontSize.semiMedium.vw};
    @media(max-width: ${desktopBp}){
      font-size: ${props => props.theme.fontSize.semiMedium.px};
    }
  }
`

const Footer = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  &:after{
    content:"";
    position: absolute;
    top: 0;
    height: 1px;
    background: ${props => props => props.theme.color.lightGrey};
    width: calc(100% + (1.97vw * 2));
    right: -1.97vw;
  }
  @media(max-width: ${desktopBp}){
    &:after{
      width: calc(100% + (22px * 2));
      right: -22px;
      bottom: -11px;
    }
  }
`

const CheckBoxContaner = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  position: relative;
  
  &:after{
    content:"";
    position: absolute;
    bottom: -0.87vw;
    height: 1px;
    background: ${props => props => props.theme.color.lightGrey};
    width: calc(100% + (1.97vw * 2));
    right: -1.97vw;
  }
  @media(max-width: ${desktopBp}){
    &:after{
      width: calc(100% + (22px * 2));
      right: -22px;
      bottom: -11px;
    }
  }
`
const StyledItem =  styled.div`
    display: flex;
  width: 6.47vw;
  justify-content: flex-start;
  align-items: center;
  gap: 5px;

  @media(max-width: ${desktopBp}){
    width: 81px;
  }
`

const Label = styled.p`
  width: fit-content;
  white-space: nowrap;
  font-weight: 500;
  font-size: ${props => props.theme.fontSize.semiMedium.vw};
  
  @media(max-width: ${desktopBp}){
    font-size: ${props => props.theme.fontSize.semiMedium.px};
  }  
`

const Content = styled.div`
    margin-top: 2.53vw;
    margin-bottom: 2.00vw;
  @media(max-width: ${desktopBp}){
    margin-top: 32px;
    margin-bottom: 25px;
  }
`
const StyledButton = styled(SecondaryButton)`
  width: 6.33vw;
  height: 2.80vw;
  
  margin: 1.53vw auto 0 auto;
  @media(max-width: ${desktopBp}){
    height: 35px;
    width: 79px;
    margin: 19px auto 0 auto;
  }
`
