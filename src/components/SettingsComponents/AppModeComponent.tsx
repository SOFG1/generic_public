import React, { useCallback, useEffect, useState } from "react"
import styled from "styled-components"
import { useSettingsActions } from "../../store/settings";
import { DropdownWithSearch } from "../../UI/Dropdown";
import { useTranslation } from "react-i18next";
import { Button } from "../../UI/Button";
import { useUserState } from "../../store/user";
import { handle } from "../../api";
import { ISwithAppModeParams, Settings } from "../../api/settings";
import { useAppActions } from "../../store/app";
import { activityList } from "../../config/userActivityList";
import { Checkbox } from "../../UI/Input";
import { HintComponent } from "../../UI/HintComponent";
import { desktopBp } from "../../styles/variables";
import AppContactsModeComponent from "./AppContactsModeComponent";
import BallotDropdownComponent from "./BallotDropdownComponent";


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

const StyledString = styled.p`
    margin: 0;
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
    width: fit-content;
    border-radius: 0;
    margin:auto auto 0;
@media screen and (max-width: ${desktopBp}) {
    height: 27px;
}
`

const StyledBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center; 
    gap: 5px;
    margin-bottom: 15px;
`

const modeOptions = [
    { item: "status_update", value: "status_update" },
    { item: "questionarie", value: "questionarie" },
    { item: "eday_bingo", value: "eday_bingo" },
    { item: "eday_pledge", value: "eday_pledge" },

]

interface IProps {
    selectedUsers: number[]
}


const AppModeComponent = React.memo(({ selectedUsers }: IProps) => {
    const { t } = useTranslation()
    const { token } = useUserState()
    const { onGetVoterUsers } = useSettingsActions()
    const { onShowAlert } = useAppActions()
    const [selectedMode, setSelectedMode] = useState<string>("")
    const [ballotId, setBallotId] = useState<string>("")
    const [updateStatus, setUpdateStatus] = useState<boolean | undefined>(undefined)
    const [isFetching, setIsFetching] = useState<boolean>(false)



    const handleSwitch = useCallback(async () => {
        if (token) {
            setIsFetching(true)
            const params: ISwithAppModeParams = { voter_users: selectedUsers, mode: selectedMode, update_negative_status: updateStatus }
            if (ballotId) params.ballot_id = Number(ballotId)
            const [dataRes, dataErr] = await handle(Settings.switchVoterMode(token, params))
            setIsFetching(false)
            if (!dataErr) {
                onShowAlert(true, t("settings_app-mode_success"))
                onGetVoterUsers()
            }
            if (dataErr) {
                if(dataErr.error === "Connect Election day modul bfr use this mode"){
                    onShowAlert(false, t("settings_app_change_voter_mode_alert"))
                }else{
                    onShowAlert(false, dataErr.error)
                }
            }
        }
    }, [token, selectedUsers, selectedMode, updateStatus, t, ballotId])


    useEffect(() => {
        setUpdateStatus(undefined)
    }, [selectedMode])


    useEffect(() => {
        setBallotId("")
    }, [selectedMode])

    return <StyledWrapper>
        <StyledBox>
            <StyledDropdown
                label={t("settings_app-mode_label")}
                placeholder={t("settings_app-mode_label")}
                options={modeOptions}
                value={selectedMode}
                onSelect={setSelectedMode}
            />
            {selectedMode === "eday_bingo" && (
                <BallotDropdownComponent value={ballotId} onChange={setBallotId} />
            )}
            {selectedMode === "status_update" && <>
                <StyledString>{t("settings_app-mode_status")}</StyledString>
                <StyledBox>
                    <Checkbox isActive={updateStatus === true} label={t("settings_app-mode_status-yes")} onChange={(v) => { if (v) setUpdateStatus(true) }} />
                    <Checkbox isActive={updateStatus === false} label={t("settings_app-mode_status-no")} onChange={(v) => { if (v) setUpdateStatus(false) }} />
                    <HintComponent items={[t("settings_app-mode_status-hint")]} position="top" />
                </StyledBox>
            </>}
        </StyledBox>
        <StyledBtn disabled={!selectedMode || !selectedUsers || isFetching} data-action={activityList["voter-switch-mode"]} onClick={handleSwitch}>{t("settings_app-mode_btn")}</StyledBtn>
        <AppContactsModeComponent />
    </StyledWrapper>
})


export default AppModeComponent
