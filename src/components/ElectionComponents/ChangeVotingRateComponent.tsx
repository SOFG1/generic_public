import React, { useCallback, useEffect, useState } from "react"
import styled from "styled-components"
import { Button } from "../../UI/Button"
import { Modal } from "../../UI/Modal"
import { Input } from "../../UI/Input"
import { useUserState } from "../../store/user"
import { handle } from "../../api"
import { Election } from "../../api/election"
import { useAppActions } from "../../store/app"
import { useTranslation } from "react-i18next"
import { activityList } from "../../config/userActivityList"
import { useElectionActions } from "../../store/election"


const StyledButton = styled(Button)`
  margin-top: 15px;
`

const StyledTitle = styled.p`
    
`


interface IProps {
    initialValue: number
}

const ChangeVotingRateComponent = React.memo(({ initialValue }: IProps) => {
    const { t } = useTranslation()
    const { token } = useUserState()
    const { onGetVotingRate, onGetMap } = useElectionActions()
    const { onShowAlert } = useAppActions()
    const [opened, setOpened] = useState<boolean>(false)
    const [value, setValue] = useState<string>(String(initialValue))
    const [isFetching, setIsFetching] = useState<boolean>(false)


    const handleSetVotingRate = useCallback(async () => {
        if (token) {
            setIsFetching(true)
            const [dataRes, dataErr] = await handle(Election.setVotingRate(token, Number(value) / 100))
            setIsFetching(false)
            if (!dataErr) {
                setOpened(false)
                onShowAlert(true, t("election_voting-rate-change_success"))
                onGetVotingRate()
                onGetMap()
            }
            if (dataErr) {
                onShowAlert(false, dataErr.error)
            }
        }
    }, [token, value, t])


    const handleResetVotingRate = useCallback(async () => {
        if (token) {
            setIsFetching(true)
            const [dataRes, dataErr] = await handle(Election.resetVotingRate(token))
            setIsFetching(false)
            if (!dataErr) {
                setOpened(false)
                onShowAlert(true, t("election_voting-rate-change_success"))
                onGetVotingRate()
                onGetMap()
            }
            if (dataErr) {
                onShowAlert(false, dataErr.error)
            }
        }
    }, [token, t])


    const handleChange = useCallback((value: string) => {
        const num = Number(value)
        if (num < 0) {
            setValue("0")
            return
        }
        if (num > 99) {
            setValue("99")
            return
        }
        setValue(value)
    }, [])

    useEffect(() => {
        setValue(String(initialValue))
    }, [opened, initialValue])

    return <>
        <Modal show={opened} onClose={() => setOpened(false)}>
            <StyledTitle>{t("election_voting-rate-change_title")}</StyledTitle>
            <Input type="number" name="rate" label={"Voting rate"} value={value} onChange={handleChange} />
            <StyledButton disabled={isFetching} data-action={activityList["change-voting-rate"]} onClick={handleSetVotingRate}>{t("election_voting-rate-change_btn")}</StyledButton>
            <StyledButton disabled={isFetching} data-action={activityList["change-voting-rate"]} onClick={handleResetVotingRate}>{t("election_voting-rate-reset_btn")}</StyledButton>
        </Modal>
        <StyledButton onClick={() => setOpened(true)} data-action={activityList["open-change-voting-rate"]}>{t("election_voting-rate-change")}</StyledButton></>
})


export default ChangeVotingRateComponent