import {
    EditManualPrompt,
    EditSentimentPrompt,
    SettingsBigTabComponent,
    ViewSentimentPrompt
} from "../../components/SettingsComponents";
import {useTranslation} from "react-i18next";
import {useSentimentorActions} from "../../store/sentimentor";
import {memo, useEffect} from "react";
import {useSettingsActions} from "../../store/settings";
import {activityList} from "../../config/userActivityList";

const EditSentimentScoreDefinitionView = memo(()=>{
    const {t} = useTranslation();
    const {onGetKeywords} = useSentimentorActions();
    const {onFetchSentimentActivePrompt} = useSettingsActions();

    useEffect(()=>{
        onGetKeywords();
        onFetchSentimentActivePrompt();
    },[]);

    return (
        <SettingsBigTabComponent activity={activityList["open-edit-fields"]} title={t("settings_sentiment-definition")}>
            <ViewSentimentPrompt/>
            <EditSentimentPrompt/>
            <EditManualPrompt/>
        </SettingsBigTabComponent>
    )
})

export default EditSentimentScoreDefinitionView;
