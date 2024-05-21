import {SmsCreateInitialState} from "./SmsCreateComponent";
import styled from "styled-components";
import {desktopBp} from "../../styles/variables";
import DropdownWithSearch from "../../UI/Dropdown/DropdownWithSearch";
import {Input} from "../../UI/Input";
import React, {memo} from "react";
import {useTranslation} from "react-i18next";

interface IProps{
    data:SmsCreateInitialState,
    onChangeHandler:(key:keyof SmsCreateInitialState, data:string | string[])=>void,
}

const SmsCreateContentComponent = memo(({data, onChangeHandler}:IProps)=>{
    const {t} = useTranslation();
    return (
        <Container>
            <Label>{t("raw_data_digital_campaign_sms_text-field")}:</Label>
            <StyledTextarea
                type="text"
                name="text"
                isTextarea={true}
                label=""
                onChange={(v) => onChangeHandler("text", v)}
                value={data.text}
            />
        </Container>
    )
})

export default SmsCreateContentComponent;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 0.52vw;
  @media screen and (max-width: ${desktopBp}) {
    padding: 0 7px;
  }
`

const Label = styled.p`
  font-size: ${props => props.theme.fontSize.semiMedium.vw};
  @media screen and (max-width: ${desktopBp}) {
    font-size: ${props => props.theme.fontSize.semiMedium.px};
  }
`

const StyledTextarea = styled(Input)`
  max-width: 26.93vw;
  width: 100%;

  & .styled_input{
    border-color: rgba(188, 188, 188, 1);
    font-size: ${props => props.theme.fontSize.semiMedium.vw};
    @media screen and (max-width: ${desktopBp}) {
      font-size: ${props => props.theme.fontSize.semiMedium.px};
    }
  }
  textarea {
    width: 100%;
    min-height: 6.82vw;
    @media screen and (max-width: ${desktopBp}) {
      border-radius: 13px;
      min-height: 86px;
    }
  }
  @media screen and (max-width: ${desktopBp}) {
    width: 338px;
  }
`;
