import React, { useState } from "react"
import styled from "styled-components"
import { Checkbox } from "../../UI/Input"
import { Button } from "../../UI/Button"
import { ConfirmDeleteFull } from "../common/ConfirmDeleteFull"
import { useSettingsActions } from "../../store/settings"
import { useTranslation } from "react-i18next"
import { activityList } from "../../config/userActivityList"


interface IProps {
    selectedUsers: number[]
}


const StyledWrapper = styled.div`
    padding: 20px;
`

const StyledLabel = styled.p`
    color: #000;
    white-space: nowrap;
`

const StyledBox = styled.div`
    display: flex;
    gap: 10px;
`

const StyledBtn = styled(Button)`
    padding: 5px;
    width: fit-content;
    margin: 0 auto;
`

const DeleteVoterUsersComponent = React.memo(({ selectedUsers }: IProps) => {
    const { t } = useTranslation()
    const { onDeleteVoterUsers } = useSettingsActions()
    const [permanently, setPermanently] = useState<boolean>(true)
    const [confirm, setConfirm] = useState<boolean>(false)



    return <>
        <ConfirmDeleteFull title={t("settings_app-delete_confirm")} show={confirm} onClose={() => setConfirm(false)} onDelete={() => onDeleteVoterUsers(selectedUsers, permanently)} />
        <StyledWrapper>
            <StyledBox>
                <StyledLabel>{t("settings_app-delete_permanently")}</StyledLabel>
                <Checkbox label={t("settings_app-delete_permanently_yes")} isActive={permanently} onChange={setPermanently} />
                <Checkbox label={t("settings_app-delete_permanently_no")} isActive={!permanently} onChange={(v) => setPermanently(!v)} />
            </StyledBox>
            <StyledBtn data-action={activityList["settings-delete-voter-users"]} onClick={() => setConfirm(true)}>{t("settings_app-delete_btn")}</StyledBtn>
        </StyledWrapper>
    </>
})


export default DeleteVoterUsersComponent