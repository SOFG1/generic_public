import React, { useState, useCallback } from "react"
import { Modal } from "../../UI/Modal"
import styled from "styled-components"
import { desktopBp } from "../../styles/variables"
import { Input } from "../../UI/Input"
import { useUserState } from "../../store/user"
import { handle } from "../../api"
import { RawData } from "../../api/rawData"
import { useAppActions } from "../../store/app"
import { useTranslation } from "react-i18next"
import { activityList } from "../../config/userActivityList"

const StyledTitle = styled.p`
    font-size: 1.67vw;
    margin: 0 0 1.88vw;
    @media screen and (max-width: ${desktopBp}) {
        font-size: 21px;
        margin: 0 0 24px;
    }
`
const StyledInput = styled(Input)`
    max-width: 20.05vw;
    margin-bottom: 1.67vw;
    @media screen and (max-width: ${desktopBp}) {
        max-width: 252px;
        margin-bottom: 21px;
    }
`


const StyledBtn = styled.button`
    display: flex;
    align-items: center;
    gap: 0.99vw;
    padding: 4px;
    border-radius: 100px;
    border: 1px solid #000;
    background-color: transparent;
    cursor: pointer;
    margin: 0 auto;
`

interface IProps {
    show: boolean
    onClose: () => void
}

const StrategicReportComponent = React.memo(({ show, onClose }: IProps) => {
    const { t } = useTranslation()
    const { token } = useUserState()
    const { onShowAlert } = useAppActions()
    const [location, setLocation] = useState<string>("")
    const [name, setName] = useState<string>("")
    const [job, setJob] = useState<string>("")
    const [isFetching, setIsFetching] = useState<boolean>(false)


    const handleFetch = useCallback(async () => {
        if (token) {
            setIsFetching(true)
            const [res, err] = await handle(RawData.getStrategicReport(token, location, name, job))
            setIsFetching(false)
            if (!err) {
                console.log(res)
                onShowAlert(true, t("raw-data_strategic-success"))
            }
            if (err) {
                onShowAlert(false, err.error)
                console.log(err)
            }
        }
    }, [token, location, name, job, t])



    return <Modal show={show} onClose={onClose}>
        <StyledTitle>{t("raw-data_strategic-title")}</StyledTitle>
        <StyledInput type="text" label={t("raw-data_strategic-location")} placeholder={t("raw-data_strategic-location")} name="name" value={location} onChange={setLocation} />
        <StyledInput type="text" label={t("raw-data_strategic-name")} placeholder={t("raw-data_strategic-name")} name="name" value={name} onChange={setName} />
        <StyledInput type="text" label={t("raw-data_strategic-job")} placeholder={t("raw-data_strategic-job")} name="name" value={job} onChange={setJob} />
        <StyledBtn data-action={activityList["request-strategic-report"]} disabled={isFetching} onClick={handleFetch}>{t("raw-data_strategic-btn")}</StyledBtn>
    </Modal>
})

export default StrategicReportComponent