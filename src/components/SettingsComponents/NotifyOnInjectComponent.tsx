import React, { useCallback, useEffect, useState } from "react"
import { desktopBp } from "../../styles/variables";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { Switcher } from "../../UI/Switcher";
import { activityList } from "../../config/userActivityList";
import { useUserState } from "../../store/user";
import { Settings } from "../../api/settings";
import { handle } from "../../api";


const StyledWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #aaaaaa;
  padding-bottom: 10px;
  margin-bottom: 10pxa;
`;

const StyledTitle = styled.p`
  font-size: 1.35vw;
  line-height: 1.77vw;
  margin: 0;
  @media screen and (max-width: ${desktopBp}) {
    font-size: 17px;
    line-height: 22px;
  }
`;






const NotifyOnInjectComponent = React.memo(() => {
    const { t } = useTranslation()
    const { token } = useUserState()
    const [switched, setSwitched] = useState<boolean>(false)
    const [isFetching, setIsFetching] = useState<boolean>(false)

    const handleSwitch = useCallback(async (notify: boolean) => {
        if (token) {
            setIsFetching(true)
            const [dataRes, dataErr] = await handle(Settings.setVoterNotifyStatus(token, notify))
            setIsFetching(false)
            if (!dataErr) {
                setSwitched(notify)
            }
            if (dataErr) {
                console.log(dataErr)
            }
        }
    }, [token])

    const fetchCurrentStatus = useCallback(async () => {
        if (token) {
            setIsFetching(true)
            const [dataRes, dataErr] = await handle(Settings.getVoterNotifyStatus(token))
            setIsFetching(false)
            if (dataRes !== undefined) {
                setSwitched(dataRes)
            }
            if (dataErr) {
                console.log(dataErr)
            }
        }
    }, [token])

    useEffect(() => {
        fetchCurrentStatus()
    }, [fetchCurrentStatus])

    return <StyledWrapper
    >
        <StyledTitle>{t("settings_app-notify_innject")}</StyledTitle>
        <Switcher action={activityList["switch-voter-notify-inject"]} switched={switched} onSwithOn={() => handleSwitch(true)} onSwithOff={() => handleSwitch(false)} disabled={isFetching} />
    </StyledWrapper>
})

export default NotifyOnInjectComponent