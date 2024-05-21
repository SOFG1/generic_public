import React, { useCallback, useState } from "react"
import styled from "styled-components"
import { desktopBp } from "../../styles/variables"
import { useTranslation } from "react-i18next"
import { useUserState } from "../../store/user"
import { handle } from "../../api"
import { Settings } from "../../api/settings"
import { useAppActions } from "../../store/app"


const StyledTab = styled.button`
  position: relative;
  font-size: 0.94vw;
  font-weight: 700;
  min-width: 8.23vw;
  line-height: 1;
  padding: 0.52vw;
  text-align: center;
  background-color: transparent;
  border: 1px solid #000;
  cursor: pointer;
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


const AssignementsExcelComponent = React.memo(() => {
    const { t } = useTranslation()
    const { token } = useUserState()
    const { onShowAlert } = useAppActions()
    const [isFetching, setIsFetching] = useState<boolean>(false)


    const handleDownload = useCallback(async () => {
        if (token) {
            setIsFetching(true)
            const [dataRes, dataErr] = await handle(Settings.getAssignmentsExcel(token))
            setIsFetching(false)
            if (!dataErr) {
                onShowAlert(true, t("settings_call-center-excel_success"))
                console.log(dataRes)
            }
            if (dataErr) {
                console.log(dataErr)
            }
        }
    }, [token, t])


    return <StyledTab disabled={isFetching} onClick={handleDownload}>{t("settings_call-center-excel")}</StyledTab>
})

export default AssignementsExcelComponent