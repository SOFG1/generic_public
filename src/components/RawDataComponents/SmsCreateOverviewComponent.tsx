import {memo} from "react";
import styled from "styled-components";
import {SmsCreateInitialState} from "./SmsCreateComponent";
import {desktopBp} from "../../styles/variables";
import {getFormatDate} from "../../utils";
import {useTranslation} from "react-i18next";

interface IProps{
    data:SmsCreateInitialState,
    onChangeHandler:(key:keyof SmsCreateInitialState, data:string | string[] | number)=>void,
}

const SmsCreateOverviewComponent = memo(({data, onChangeHandler}:IProps)=>{
    const {t} = useTranslation();

    return (
        <Container>
            <Group>
                <Header>Parameter:</Header>
                <Content>
                    <StyledItem>
                        <Label>{t("raw_data_digital_campaign_sms_sender")}:</Label>
                        <Value>{data.sender}</Value>
                    </StyledItem>
                    <StyledItem>
                        <Label>{t("raw_data_digital_campaign_sms_audience")}:</Label>
                        <Value>{data.audience}</Value>
                    </StyledItem>
                    <StyledItem>
                        <Label>{t("raw_data_digital_campaign_sms_name")}:</Label>
                        <Value>{data.name}</Value>
                    </StyledItem>
                    <StyledItem>
                        <Label>{t("raw_data_digital_campaign_sms_exclude")}:</Label>
                        <Value>{data.exclude || "-"}</Value>
                    </StyledItem>
                </Content>
            </Group>
            <Group>
                <Header>Timing:</Header>
                <Content>
                    <StyledItem>
                        <Label>{t("raw_data_digital_campaign_sms_date")}:</Label>
                        <Value>{data.date ? getFormatDate(new Date(data.date)) : "-"}</Value>
                    </StyledItem>
                </Content>
            </Group>
        </Container>
    )
})

export default SmsCreateOverviewComponent;

const Container = styled.div`
  display: flex;
  gap: 4.95vw;
  padding: 0 0.52vw;

  @media(max-width: ${desktopBp}){
    gap: 62px;
    padding: 0 7px;
  }
`

const Group = styled.div`
`
const Content = styled.div`
    
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
