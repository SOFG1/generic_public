import React, { useCallback, useEffect, useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
import styled from "styled-components"
import { useSettingsActions, useSettingsState } from "../../store/settings"
import { Dropdown } from "../../UI/Dropdown"
import { Button } from "../../UI/Button"
import { useUserState } from "../../store/user"
import { Checkbox } from "../../UI/Input"
import { handle } from "../../api"
import { Settings } from "../../api/settings"
import { useAppActions } from "../../store/app"
import { activityList } from "../../config/userActivityList"
import { desktopBp } from "../../styles/variables"



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

const StyledBox = styled.div`
    display: flex;
    align-items: center; 
    gap: 5px;
    margin-bottom: 15px;
`

const StyledDropdown = styled(Dropdown)`
    max-width: 15.63vw;
    width: 52.08vw;
    @media screen and (max-width: ${desktopBp}) {
        max-width: 196px;
        width: 654px;
    }
`;


const BtnBox = styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
    justify-content: center;
    margin-top: auto;
`

const StyledBtn = styled(Button)`
    height: 2.19vw;
    width: 5.21vw;
    border-radius: 0;
@media screen and (max-width: ${desktopBp}) {
    height: 27px;
    width: 65px;
}
`

interface IProps {
    selectedUsers: number[]
}

const InjectAppAudienceComponent = React.memo(({ selectedUsers }: IProps) => {
    const { t } = useTranslation()
    const { token } = useUserState()
    const { audiences } = useSettingsState()
    const { onGetAudiences, onGetVoterUsers } = useSettingsActions()
    const { onShowAlert } = useAppActions()
    const [selectedAudienceId, setSelectedAudienceId] = useState<number>(0)
    const [resync, setResync] = useState<boolean>(false)
    const [isFetching, setIsFetching] = useState<boolean>(false)


    const audienceOptions = useMemo(() => {
        return audiences.map(a => ({ item: a.name, value: a.id }))
    }, [audiences])


    const handleInject = useCallback(async () => {
        if (token && selectedAudienceId) {
            setIsFetching(true)
            const [dataRes, dataErr] = await handle(Settings.injectAudienceToUsers(token, selectedAudienceId, selectedUsers, resync))
            setIsFetching(false)
            if (!dataErr) {
                onShowAlert(true, t("settings_audiences-inject_success"))
                onGetVoterUsers()
            }
            if (dataErr) {
                onShowAlert(false, dataErr.error)
            }
        }
    }, [token, selectedAudienceId, selectedUsers, resync, t])

    const handleClear = useCallback(async () => {
        if (token) {
            setIsFetching(true)
            const [dataRes, dataErr] = await handle(
                Settings.clearVoterUsers(token, selectedUsers)
            );
            setIsFetching(false)
            if (!dataErr) {
                onShowAlert(true, t("settings_call-center-clear_m"));
            }
            if (dataErr) {
                onShowAlert(false, dataErr?.error);
            }
        }
    }, [token, selectedUsers]);


    useEffect(() => {
        onGetAudiences()
    }, [])

    return <StyledWrapper>
        <StyledBox>
            <StyledDropdown label={t("settings_audiences-inject_users")} placeholder={t("settings_audiences-inject_users")} value={selectedAudienceId} onSelect={setSelectedAudienceId} options={audienceOptions} />
            <Checkbox label={t("settings_audiences-inject_resync")} isActive={resync} onChange={setResync} />
        </StyledBox>
        <BtnBox>
            <StyledBtn onClick={handleInject} disabled={!selectedAudienceId || !selectedUsers.length || isFetching} data-action={activityList["voter-inject-audience"]}>{t("settings_audiences-inject_btn")}</StyledBtn>
            <StyledBtn onClick={handleClear} disabled={!selectedUsers.length || isFetching} data-action={activityList["clear-injected-users"]}>{t("settings_call-center-clear")}</StyledBtn>
        </BtnBox>
    </StyledWrapper>
})

export default InjectAppAudienceComponent