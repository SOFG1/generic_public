import styled from "styled-components";
import {desktopBp} from "../../styles/variables";
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";
import {sentimentorKeywordsSelector} from "../../store/sentimentor/selectors";
import {Dropdown} from "../../UI/Dropdown";
import {memo, useCallback, useState} from "react";
import {Button} from "../../UI/Button";
import {Settings} from "../../api/settings";
import {useUserState} from "../../store/user";
import {handle} from "../../api";
import {useAppActions} from "../../store/app";
import {Loader} from "../../UI/Spinners";
import {useSettingsActions, useSettingsState} from "../../store/settings";
import {activityList} from "../../config/userActivityList";

const EditSentimentPrompt = memo(()=>{
    const {t} = useTranslation();
    const [isLoadingGeneratePrompt, setIsLoadingGeneratePrompt] = useState(false);
    const {token} = useUserState();
    const {onShowAlert} = useAppActions()
    const {onSetSentimentPrompt} = useSettingsActions();
    const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);
    const sentimentorKeywords = useSelector(sentimentorKeywordsSelector);

    const handleAddKeywords = useCallback(async ()=>{
        if(!token) return;
        setIsLoadingGeneratePrompt(true);
        const [res, error] = await handle(Settings.generateSentimentPrompt(token, selectedKeywords.map(el => parseInt(el))));
        setIsLoadingGeneratePrompt(false);
        if(error) return onShowAlert(false, error?.error);
        if(!res) return;
        onSetSentimentPrompt(res.positive, res.negative, res.topic);

    },[selectedKeywords]);



    return (
        <Container>
            <CardTitle>{t("settings_sentiment-definition-edit-sentiment-prompt")}</CardTitle>
            <DropdownContainer>
                <Dropdown isMultiSelect value={selectedKeywords.join(", ")} placeholder={t("settings_sentiment-definition-sentiment-prompt")} onSelect={value => setSelectedKeywords(value.split(", "))}
                          options={sentimentorKeywords.map(el => ({item:el.word, value:el.id}))} label={t("settings_sentiment-definition-sentiment-prompt")}/>
                <StyledButton data-action={activityList["settings-generate-sentiment-prompt"]} onClick = {handleAddKeywords}>{isLoadingGeneratePrompt ? <Loader/> : t("settings_sentiment-definition-sentiment-prompt-add")}</StyledButton>
            </DropdownContainer>
        </Container>
    )
})


export default EditSentimentPrompt;

const Container = styled.div`
    display: flex;
  width: 100%;
  flex-direction: column;
  margin: 1.04vw 0;
  @media(max-width: ${desktopBp}){
    margin: 13px 0;
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

const DropdownContainer = styled.div`
  width: 100%;
  margin-top: 1.04vw;
  
  @media(max-width: ${desktopBp}){
    margin-top: 13px;
  }
`

const StyledButton = styled(Button)`
    max-width: 10.42vw;
  @media(max-width: ${desktopBp}){
    max-width: 131px;
  }
`

