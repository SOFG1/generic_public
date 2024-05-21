import {memo, useCallback, useState} from "react";
import styled from "styled-components";
import {Breadcrumbs} from "../../UI/Breadcrumbs";
import {ArrowRight} from "../../UI/Svg";
import {desktopBp} from "../../styles/variables";
import {useTranslation} from "react-i18next";
import {
    SmsCreateContentComponent,
    SmsCreateOverviewComponent,
    SmsCreateParametersComponent,
    SmsCreateTimingComponent
} from "./index";
import {Button} from "../../UI/Button";
import {SendSmsAction, useCallCenterActions, useCallCenterState} from "../../store/callCenter";
import {Loader} from "../../UI/Spinners";
import {getFormatDateTime} from "../../utils";
import {activityList} from "../../config/userActivityList";


export interface SmsCreateInitialState{
    sender:string,
    audience:string
    name:string,
    exclude:string,
    text:string,
    date:number | null,
}


const initialState:SmsCreateInitialState = {
    sender:"123",
    audience:"",
    name:"",
    exclude:"",
    text:"",
    date:null,
}



const SmsCreateComponent = memo(()=>{
    const {t} = useTranslation();
    const [data, setData] = useState<SmsCreateInitialState>(initialState);
    const [index, setIndex] = useState(0);
    const { onSendSms } = useCallCenterActions();
    const {
        isFetching
    } = useCallCenterState();
    const onChangeHandler = useCallback((key:keyof SmsCreateInitialState, data:string | string[] | number)=>{
        setData(prev => ({...prev, [key]:data}));
    },[])

    const next = useCallback(()=>{
        if(index + 1 > 3) return;
        setIndex(index + 1);
    },[index]);

    const back = useCallback(()=>{
        if((index - 1) < 0) return;
        setIndex(index - 1);
    }, [index]);

    const isNextDisabled = useCallback(()=>{
        const smsValidation = !!(data.sender.length && data.audience.length && data.name.length);
        if(index >= 1) return !(smsValidation && data.text.length)
        return !smsValidation;
    },[index, data]);

    const handleSubmit = useCallback(()=>{
        const sendData: SendSmsAction = {
            from: data.sender,
            exclude_compaings: data.exclude.split(" ,"),
            date: data.date ? getFormatDateTime(new Date(data.date)) : null,
            text: data.text,
            now: !data.date,
            test_list: false,
            add_param_comment: data.name || null,
        };
        if(data.audience){
            sendData.audience_ids = data.audience
                .split(" ,")
                .map((v: string) => parseInt(v, 10));
        }
        onSendSms(sendData)
        setIndex(0);
        setData(initialState)
    },[data]);
    return (
        <Container>
            <Breadcrumbs index = {index} separator={<ArrowRight/>}>
                <StyledBreadcrumbLabel>{t("raw_data_breadcrumbs_parameters")}</StyledBreadcrumbLabel>
                <StyledBreadcrumbLabel>{t("raw_data_breadcrumbs_content")}</StyledBreadcrumbLabel>
                <StyledBreadcrumbLabel>{t("raw_data_breadcrumbs_timing")}</StyledBreadcrumbLabel>
                <StyledBreadcrumbLabel>{t("raw_data_breadcrumbs_create")}</StyledBreadcrumbLabel>
            </Breadcrumbs>
            <Content>
                {index === 0 && <SmsCreateParametersComponent data = {data} onChangeHandler={onChangeHandler}/>}
                {index === 1 && <SmsCreateContentComponent data = {data} onChangeHandler={onChangeHandler}/>}
                {index === 2 && <SmsCreateTimingComponent data = {data} onChangeHandler={onChangeHandler} />}
                {index === 3 && <SmsCreateOverviewComponent data = {data} onChangeHandler={onChangeHandler}/>}
                {!isFetching && <StyledButtonContainer>
                    {index > 0 && <StyledButton data-action = {activityList["raw-data-digital-campaign-sms-prev"]} onClick = {back}>{t("raw_data_digital_campaign-prev")}</StyledButton>}
                    {index !== 3 && <StyledButton data-action = {activityList["raw-data-digital-campaign-sms-next"]} disabled={isNextDisabled()} style = {{marginLeft:"auto"}} onClick = {next}>Next</StyledButton>}
                    {index === 3 && <StyledButton data-action = {activityList["raw-data-digital-campaign-sms-create"]} disabled={isNextDisabled()} style = {{marginLeft:"auto"}} onClick = {handleSubmit}>{t("raw_data_breadcrumbs_create")}</StyledButton>}
                </StyledButtonContainer>}
                {isFetching && <LoaderContainer><StyledLoader/></LoaderContainer>}
            </Content>
        </Container>
    )
})

export default SmsCreateComponent;


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

  
  justify-content: space-between;
  margin-top: 3.80vw;
  margin-bottom: 3.54vw;
  padding: 0 0.52vw;

  @media(max-width: ${desktopBp}){
    margin-top: 48px;
    margin-bottom: 44px;
    padding: 0 7px;
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
const StyledLoader = styled(Loader)`
  height: 2.6vw;
  width: 2.6vw;
  @media screen and (max-width: ${desktopBp}) {
    height: 33px;
    width: 33px;
  }
`;

const LoaderContainer = styled.div`
    display: flex;
  width: 100%;
  justify-content: center;
`
