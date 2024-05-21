import {EmailsCreateInitialState} from "./EmailsCreateComponent";
import styled from "styled-components";
import {desktopBp} from "../../styles/variables";
import {getFormatDate} from "../../utils";
import {useTranslation} from "react-i18next";

interface IProps{
    data:EmailsCreateInitialState,
    onChangeHandler:(key:keyof EmailsCreateInitialState, data:string | string[] | number)=>void,
}

const EmailsCreateOverviewComponent = ({data, onChangeHandler}:IProps)=>{
    const {t} = useTranslation();
    return (
        <Container>
            <Group>
                <Header>{t("raw_data_breadcrumbs_parameters")}</Header>
                <StyledItem>
                    <Label>{t("raw_data_digital_campaign_emails_sender")}</Label>
                    <Value>{data.sender}</Value>
                </StyledItem>
                <StyledItem>
                    <Label>{t("raw_data_digital_campaign_emails_audience")}</Label>
                    <Value>{data.audience}</Value>
                </StyledItem>
                <StyledItem>
                    <Label>{t("raw_data_digital_campaign_emails_subject")}</Label>
                    <Value>{data.subject}</Value>
                </StyledItem>
            </Group>
            <Group>
                <Header>{t("raw_data_breadcrumbs_timing")}</Header>
                <StyledItem>
                    <Label>{t("raw_data_digital_campaign_sms_date")}</Label>
                    <Value>{data.date ? getFormatDate(new Date(data.date)) : "-"}</Value>
                </StyledItem>
            </Group>
        </Container>
    )
}

export default EmailsCreateOverviewComponent;

const Container = styled.div`
  display: flex;
  gap: 4.95vw;
  @media(max-width: ${desktopBp}){
    gap: 62px;
  }
`

const Group = styled.div`
`

const Header = styled.h3`

  font-weight: 500;
  font-size: ${props => props.theme.fontSize.semiMedium.vw};
  @media screen and (max-width: ${desktopBp}) {
    font-size: ${props => props.theme.fontSize.semiMedium.px};
  }
`
const Label = styled.p`
  color:#000;
  font-size: ${props => props.theme.fontSize.semiMedium.vw};
  @media screen and (max-width: ${desktopBp}) {
    font-size: ${props => props.theme.fontSize.semiMedium.px};
  }
`
const Value = styled(Label)`
    color:#FE5912;
`
const StyledItem = styled.div`
    display: flex;
  gap: 3px;
`
