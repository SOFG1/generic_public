import React, { useCallback, useState } from "react"
import styled from "styled-components"
import { desktopBp } from "../../styles/variables"
import { ConfirmDeleteFull } from "../common/ConfirmDeleteFull"
import { useUserState } from "../../store/user"
import { handle } from "../../api"
import { Settings } from "../../api/settings"
import { useTranslation } from "react-i18next"
import { useAppActions } from "../../store/app"
import { activityList } from "../../config/userActivityList"


interface IProps {
    selectedUsers: number[]
}

const StyledTab = styled.div`
  position: relative;
  font-size: 0.94vw;
  font-weight: 700;
  min-width: 8.23vw;
  line-height: 1;
  padding: 0.52vw;
  text-align: center;
  border: 1px solid #000;
  &:hover {
    color: #fff;
    background-color: #000;
  }
  &:hover > div {
    display: block;
  }
  @media screen and (max-width: ${desktopBp}) {
    font-size: 12px;
    padding: 7px;
    min-width: 103px;
  }
`


const ResyncContactsComponent = React.memo(({ selectedUsers }: IProps) => {
    const { t } = useTranslation()
    const { token } = useUserState()
    const { onShowAlert } = useAppActions()
    const [showWarning, setShowWarning] = useState<boolean>(false)


    const handleResync = useCallback(async () => {
        if (token) {
            const [dataRes, dataErr] = await handle(Settings.resyncContacts(token, selectedUsers))
            if (!dataErr) {
              onShowAlert(true, t("settings_call-center-resync_success"))
                console.log(dataRes)
            }
            if (dataErr) {
                onShowAlert(false, dataErr.error)
                console.log(dataErr)
            }
        }
    }, [token, selectedUsers, t])






    return <>
        <ConfirmDeleteFull title={t("settings_call-center-resync_warn")} show={showWarning} onClose={() => setShowWarning(false)} onDelete={handleResync} />
        <StyledTab data-action={activityList["settings-resync-contacts"]} onClick={() => setShowWarning(true)}>{t("settings_call-center-resync")}</StyledTab>
    </>
})



export default ResyncContactsComponent