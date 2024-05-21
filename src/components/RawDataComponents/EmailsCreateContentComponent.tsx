import React, {memo, useEffect, useRef, useState} from "react";
import {EmailsCreateInitialState} from "./EmailsCreateComponent";
import styled from "styled-components";
import {desktopBp} from "../../styles/variables";
import {SunEditorComponent} from "../common/SunEditorComponent";
import DropdownWithSearch from "../../UI/Dropdown/DropdownWithSearch";
import {Input} from "../../UI/Input";
import {InputVariants} from "../../UI/Input/types";
import {useTranslation} from "react-i18next";
import {FileInputFetch} from "../../UI/FileInputFetch";

interface IProps{
    data:EmailsCreateInitialState,
    onChangeHandler:(key:keyof EmailsCreateInitialState, data:any)=>void,
}
const EmailsCreateContentComponent = memo(({data, onChangeHandler}:IProps)=>{
    const [isLink, setIsLink] = useState(false);
    const editorRef = useRef<any>(null);
    const {t} = useTranslation();

    useEffect(()=>{
        if(isLink){
            onChangeHandler("text", "");

        }else{
            onChangeHandler("link", "");
        }
    },[isLink]);

    return (
        <Container>
            <StyledLabelContainer>
                <Label onClick={()=>setIsLink(true)} $active={!isLink}>{t("raw_data_digital_campaign_emails_link")}</Label>
                <Label onClick={()=>setIsLink(false)} $active={isLink}>{t("raw_data_digital_campaign_emails_text")}</Label>
            </StyledLabelContainer>
            {!isLink && <SunEditorComponent onChange={(content)=>onChangeHandler("text", content)}  ref={editorRef} />}
            {isLink && (
                <LinkInputContainer>
                    <StyledLabel>{t("raw_data_digital_campaign_emails_link")}</StyledLabel>
                    <DropdownStyled
                        as={Input}
                        name={"name"}
                        type="text"
                        placeholder={t("raw_data_digital_campaign_emails_link")}
                        label={t("raw_data_digital_campaign_emails_link")}
                        value={data.subject}
                        onChange={(val: string) => onChangeHandler("link", val)}
                        variant={InputVariants.Small}
                    />
                </LinkInputContainer>
            )}
            <FileInputFetch
                filesList={ data.files || []}
                onChange={(v) => onChangeHandler("files", v)}
            />
        </Container>
    )
})

export default EmailsCreateContentComponent;

const StyledLabel = styled.p`
  font-size:0.63vw;
  @media screen and (max-width: ${desktopBp}) {
    font-size: 8px;
  }
`

const LinkInputContainer = styled.div`
    display: flex;
  align-items: center;
  gap:3px;
`

const Container = styled.div`
  display: flex;
  position: relative; 
  flex-direction: column;
  justify-content: space-between;
  gap:1.17vw;
  padding: 0 0.52vw;
  
  @media screen and (max-width: ${desktopBp}) {
    gap:15px;
    padding: 0 7px;
  }
  
  & button{
    width: 25px !important;
    height: 25px !important;
    margin: 0 5px !important;
    & svg{
      width: 10px !important;
      height: 10px !important;
    }
  }
  
  & .se-wrapper-inner{
    height: 150px !important;
    max-height: 150px !important;
    min-height: 150px !important;
  }
  
  & .se-dialog{
    position: absolute !important;
  }
  & .se-dialog-back{
    opacity: 0 !important;
  }
  & .se-btn-primary{
    width: 100% !important;
  }
`

const Label = styled.p<{$active:boolean}>`
  cursor: pointer;
  text-decoration: ${props => props.$active ? "underline" : "none"};
  font-size: ${props => props.theme.fontSize.semiMedium.vw};
  @media screen and (max-width: ${desktopBp}) {
    font-size: ${props => props.theme.fontSize.semiMedium.px};
  }
`

const StyledLabelContainer = styled.div`
  display: flex;
  gap: 5px;
  width: 100%;
  max-width: 26.93vw;
  padding: 0 0.52vw;
  @media screen and (max-width: ${desktopBp}) {
    padding: 0 7px;
    max-width: 338px;
  }
`
const DropdownStyled = styled(DropdownWithSearch)`
  width: 9.48vw;
  color:rgba(254, 89, 18, 1);
  
  @media screen and (max-width: ${desktopBp}) {
    width: 119px;
  }
`;
