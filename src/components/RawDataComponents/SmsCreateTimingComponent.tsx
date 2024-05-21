import {SmsCreateInitialState} from "./SmsCreateComponent";
import styled from "styled-components";
import {DateInlineInput} from "../../UI/Input";
import {memo, useCallback} from "react";
import {desktopBp} from "../../styles/variables";
import {useTranslation} from "react-i18next";

interface IProps{
    data:SmsCreateInitialState,
    onChangeHandler:(key:keyof SmsCreateInitialState, data:string | string[] | number)=>void,
}
const SmsCreateTimingComponent = memo(({data, onChangeHandler}:IProps)=>{
    const {t} = useTranslation();

    const handleChangeDate = useCallback((dates:Date[] | null)=>{
        if(!dates || !(dates instanceof Array)) return;
        onChangeHandler("date", dates[0].getTime())
    },[])

    return(
        <Container>
            <StyledLabel>{t("raw_data_digital_campaign_sms_date")}</StyledLabel>
            <DateInlineInput onChangeHandler={(dates)=>handleChangeDate(dates)} startDate={data.date ? new Date(data.date) : new Date()}/>
        </Container>
    )
})

export default SmsCreateTimingComponent;


const Container = styled.div`
    display: flex;
  flex-direction: column;
    width: 100%;
  justify-content: center;
  align-items: center;
  padding: 0 0.52vw;
  @media screen and (max-width: ${desktopBp}) {
    padding: 0 7px;
  }
  
`
const StyledLabel = styled.p`
  font-weight: 500;
  font-size: ${props => props.theme.fontSize.primary.vw};
  @media screen and (max-width: ${desktopBp}) {
    font-size: ${props => props.theme.fontSize.primary.px};
  }
`

