import styled from "styled-components";
import {desktopBp} from "../../styles/variables";
import {Button} from "../../UI/Button";
import {Loader} from "../../UI/Spinners";
import {useCallback, useState} from "react";
import {ArrowRight} from "../../UI/Svg";
import {Breadcrumbs} from "../../UI/Breadcrumbs";
import {useTranslation} from "react-i18next";
import {
    EmailsCreateContentComponent,
    EmailsCreateOverviewComponent,
    EmailsCreateParametersComponent,
    EmailsCreateTimingComponent
} from "./index"
import {SendEmailAction, useCallCenterActions} from "../../store/callCenter";
import {getFormatDateTime} from "../../utils";
import {activityList} from "../../config/userActivityList";


export interface EmailsCreateInitialState{
    subject:string,
    audience:string,
    text:string,
    sender:string,
    files:{name: string, id: number}[] | null,
    date:number | null,
    link:string,
}

const initialState:EmailsCreateInitialState = {
    subject:"",
    audience:"",
    text:"",
    sender:"test",
    files:null,
    date:null,
    link:"",
}


const EmailsCreateComponent = ()=>{
    const {t} = useTranslation()
    const [index, setIndex] = useState(0);
    const { onSendEmail } = useCallCenterActions();
    const [data, setData] = useState(initialState);

    const onChangeHandler = useCallback((key:keyof EmailsCreateInitialState, data:string | string[] | number)=>{
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

    const isNextDisable = useCallback(()=>{
        let parametersValidation = !!(data.subject.length && data.sender.length && data.audience.length)
        if(index >= 1) return !(parametersValidation && (data.link.length || data.text.length) && data.files?.length);
        return !parametersValidation;
    },[index, data]);

    const handleSubmit = useCallback(()=>{
        const sendData: SendEmailAction = {
            from: data.sender,
            date: data.date ? getFormatDateTime(new Date(data.date)) : null,
            text: data.link ? data.link : data.text,
            link: !!data.link,
            title: data.subject,
            now: !data.date,
        };

        if(data.audience){
            sendData.audience_ids = data.audience
                .split(" ,")
                .map((v: string) => parseInt(v, 10));
        }

        if (data.files) {
            sendData.attachments = data.files.map((f: any) => f.id);
        }
        onSendEmail(sendData);
        setIndex(0);
        setData(initialState);
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
                {index === 0 && <EmailsCreateParametersComponent data={data} onChangeHandler={onChangeHandler}/>}
                {index === 1 && <EmailsCreateContentComponent data={data} onChangeHandler={onChangeHandler}/>}
                {index === 2 && <EmailsCreateTimingComponent data={data} onChangeHandler={onChangeHandler}/>}
                {index === 3 && <EmailsCreateOverviewComponent data={data} onChangeHandler={onChangeHandler}/>}
            </Content>
            <StyledButtonContainer>
                {index !== 0 && <StyledButton data-action = {activityList["raw-data-digital-campaign-emails-prev"]} onClick = {back}>{t("raw_data_digital_campaign-prev")}</StyledButton>}
                {index !== 3 && <StyledButton data-action = {activityList["raw-data-digital-campaign-emails-next"]} disabled={isNextDisable()} style = {{marginLeft:"auto"}} onClick = {next}>{t("raw_data_digital_campaign-next")}</StyledButton>}
                {index === 3 && <StyledButton data-action = {activityList["raw-data-digital-campaign-emails-create"]} disabled={isNextDisable()} style = {{marginLeft:"auto"}} onClick = {handleSubmit}>{t("raw_data_digital_campaign-next")}</StyledButton>}
            </StyledButtonContainer>
        </Container>
    )
}

export default EmailsCreateComponent;


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
