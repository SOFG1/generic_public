import {Input} from "../../UI/Input";
import {Loader} from "../../UI/Spinners";
import {desktopBp} from "../../styles/variables";
import styled from "styled-components";
import {Button} from "../../UI/Button";
import {useTranslation} from "react-i18next";
import {useCallback, useState} from "react";
import {handle} from "../../api";
import {Settings} from "../../api/settings";
import {useUserState} from "../../store/user";
import {useAppActions} from "../../store/app";
import {useSettingsActions, useSettingsState} from "../../store/settings";
import {activityList} from "../../config/userActivityList";

const EditManualSentimentPrompt = ()=>{
    const {t} = useTranslation();
    const {onShowAlert} = useAppActions()
    const {onSetSentimentPrompt} = useSettingsActions();
    const {token} = useUserState();
    const [isLoading, setIsLoading] = useState(false);
    const [positivePrompt, setPositivePrompt] = useState<string | undefined>(undefined);
    const [negativePrompt, setNegativePrompt] = useState<string | undefined>(undefined);

    const handleSave = useCallback(async ()=>{
        if(!token) return;
        setIsLoading(true);
        const [res, error] = await handle(Settings.setActivePrompt(token, negativePrompt || "", positivePrompt || ""));
        setIsLoading(false);
        if(error) return onShowAlert(false, error?.error);
        setPositivePrompt(undefined);
        setNegativePrompt(undefined);
        onSetSentimentPrompt(positivePrompt || "", negativePrompt || "", "");

        if(!res) return;
    },[positivePrompt, negativePrompt]);
    return(
       <Container>
           <CardTitle>{t("settings_sentiment-definition-edit-manually-sentiment-prompt")}</CardTitle>
           <Content>
               <Input type={"text"} label={t("settings_sentiment-definition-view-sentiment-positive")} onChange={(value)=>setPositivePrompt(value)} value={positivePrompt || ""} name={"positive_prompt"}/>
               <Input type={"text"} label={t("settings_sentiment-definition-view-sentiment-negative")} onChange={(value)=>setNegativePrompt(value)} value={negativePrompt || ""} name={"negative_prompt"}/>
               <StyledButton data-action={activityList["settings-edit-sentiment-prompt"]} onClick = {handleSave}>{isLoading ? <Loader/> : t("settings_sentiment-definition-sentiment-prompt-save")}</StyledButton>
           </Content>
       </Container>
    )
}


export default EditManualSentimentPrompt;

const Container = styled.div`
    display: flex;
  width: 100%;
  flex-direction: column;
  margin: 1.04vw 0;
  @media(max-width: ${desktopBp}){
    margin: 13px 0;
  }
`
const StyledButton = styled(Button)`
    max-width: 10.42vw;
  @media(max-width: ${desktopBp}){
    max-width: 131px;
  }
`
const Content = styled.div`
    display: flex;
    flex-direction: column;
  margin-top: 1.56vw;
  @media(max-width: ${desktopBp}){
    margin-top: 20px;
  }
`
const CardTitle = styled.p`
  font-size: 1.67vw;
  line-height: 2.19vw;
  margin: 0;
  @media screen and (max-width: ${desktopBp}) {
    font-size: 21px;
    line-height: 27px;
  }
`;
