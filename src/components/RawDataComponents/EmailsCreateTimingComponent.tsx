import {memo, useCallback} from "react";
import styled from "styled-components";
import {desktopBp} from "../../styles/variables";
import {DateInlineInput} from "../../UI/Input";
import {EmailsCreateInitialState} from "./EmailsCreateComponent";
import {useTranslation} from "react-i18next";

interface IProps{
    data:EmailsCreateInitialState,
    onChangeHandler:(key:keyof EmailsCreateInitialState, data:string | string[] | number)=>void,
}

const EmailsCreateTimingComponent = memo(({data, onChangeHandler}:IProps)=>{
    const {t} = useTranslation();

    const handleChangeDate = useCallback((dates:Date[] | null)=>{
        if(!dates || !(dates instanceof Array)) return;
        onChangeHandler("date", dates[0].getTime())
    },[])

    return(
        <Container>
            <StyledLabel>{t("raw_data_digital_campaign_emails_date")}</StyledLabel>
            <DateInlineInput onChangeHandler={(dates)=>handleChangeDate(dates)} startDate={data.date ? new Date(data.date) : new Date()}/>
        </Container>
    )
})

export default EmailsCreateTimingComponent;


const Container = styled.div`
    display: flex;
  flex-direction: column;
    width: 100%;
  justify-content: center;
  align-items: center;
`
const StyledLabel = styled.p`
  font-size: ${props => props.theme.fontSize.primary.vw};
  @media screen and (max-width: ${desktopBp}) {
    font-size: ${props => props.theme.fontSize.primary.px};
  }
  font-weight: 500;
`
