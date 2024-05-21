import styled from "styled-components";
import {useTranslation} from "react-i18next";

const SettingsHint = ()=>{
    const {t} = useTranslation();
    return (
        <Container>
            <Text>
                <Bold>{t("ranking_ai_setting_tip_cfg_header")}</Bold>
                {t("ranking_ai_setting_tip_cfg_content")}
            </Text>
            <Text>
                <Bold>{t("ranking_ai_setting_tip_steps_header")}</Bold>
                {t("ranking_ai_setting_tip_steps_content")}
            </Text>
            <Text>
                <Bold>{t("ranking_ai_setting_tip_batch_header")}</Bold>
                {t("ranking_ai_setting_tip_batch_content")}
            </Text>
            <Text>
                <Bold>{t("ranking_ai_setting_tip_seed_header")}</Bold>
                {t("ranking_ai_setting_tip_seed_content")}
            </Text>
        </Container>
    )
}

export default SettingsHint;

const Container = styled.div`
    display: flex;
  flex-direction: column;
  gap: 2px;
`
const Text = styled.p`
  margin-block-start: 5px;
  margin-block-end: 5px;
`

const Bold = styled.span`
    font-weight: bold;
  margin-right: 2px;
`
