import React, { useCallback, useEffect, useMemo, useState } from "react"
import styled from "styled-components"
import { DropdownWithSearch } from "../../UI/Dropdown"
import { useTranslation } from "react-i18next"
import { useSettingsActions, useSettingsState } from "../../store/settings"
import { Button } from "../../UI/Button"
import { desktopBp } from "../../styles/variables"
import { useUserState } from "../../store/user"
import { handle } from "../../api"
import { Settings } from "../../api/settings"
import { useAppActions } from "../../store/app"
import { activityList } from "../../config/userActivityList"

const StyledWrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding: 1.04vw 1.56vw 1.56vw;
    margin-bottom: 0.78vw;
    min-height: 8.85vw;
    color: #000;
    @media screen and (max-width: ${desktopBp}) {
        padding: 13px 20px 20px;
        margin-bottom: 10px;
        min-height: 111px;
    }
`

const StyledDropdown = styled(DropdownWithSearch)`
    max-width: 15.63vw;
    width: 52.08vw;
    @media screen and (max-width: ${desktopBp}) {
        max-width: 196px;
        width: 654px;
    }
`;

const StyledBtn = styled(Button)`
height: 2.19vw;
width: 5.21vw;
border-radius: 0;
margin:auto auto 0;
@media screen and (max-width: ${desktopBp}) {
    height: 27px;
    width: 65px;
}
`

interface IProps {
    selectedUsers: number[]
}

const SetAppQuestionnairesComponent = React.memo(({ selectedUsers }: IProps) => {
    const { t } = useTranslation()
    const { token } = useUserState()
    const { voterQuests } = useSettingsState()
    const { onGetVoterQuests, onGetVoterUsers } = useSettingsActions()
    const { onShowAlert } = useAppActions()
    const [selectedQuestionnaireId, setSelectedQuestionnaireId] = useState<number>(0);


    const options = useMemo(() => {
        return voterQuests.map(q => ({ item: q.name, value: q.id }))
    }, [voterQuests])


    const handleApply = useCallback(async () => {
        if (token && selectedQuestionnaireId) {
            const [dataRes, dataErr] = await handle(Settings.setQuestionnaireUsers(token, selectedQuestionnaireId, selectedUsers))
            if (!dataErr) {
                onShowAlert(true, t("settings_call-quests_users-success"))
                onGetVoterUsers()
            }
            if (dataErr) {
                console.log(dataErr)
            }
        }
    }, [token, selectedQuestionnaireId, selectedUsers, t])


    useEffect(() => {
        onGetVoterQuests()
    }, [])


    return <StyledWrapper>
        <StyledDropdown
            label={t("settings_call-quest")}
            placeholder={t("settings_call-quest")}
            options={options}
            value={selectedQuestionnaireId}
            onSelect={setSelectedQuestionnaireId}
        />
        <StyledBtn data-action={activityList["voter-apply-questionnaire"]} onClick={handleApply} disabled={!selectedUsers || !selectedUsers.length}>{t("settings_call-quests_users-apply")}</StyledBtn>
    </StyledWrapper>
})

export default SetAppQuestionnairesComponent