import React, { useCallback, useEffect, useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
import { Modal } from "../../UI/Modal"
import styled from "styled-components"
import { desktopBp } from "../../styles/variables"
import { Dropdown } from "../../UI/Dropdown"
import { useSettingsActions, useSettingsState } from "../../store/settings"
import { Button } from "../../UI/Button"
import { activityList } from "../../config/userActivityList"
import { useUserState } from "../../store/user"
import { handle } from "../../api"
import { useAppActions } from "../../store/app"
import { RawData } from "../../api/rawData"
import { saveAs } from "file-saver";


const StyledTitle = styled.p`
    font-size: 1.67vw;
    margin: 0 0 1.88vw;
    @media screen and (max-width: ${desktopBp}) {
        font-size: 21px;
        margin: 0 0 24px;
    }
`

const StyledDropdown = styled(Dropdown)`
    
`


const StyledBtn = styled(Button)`
    margin-top: 200px;
`

interface IProps {
    show: boolean
    onClose: () => void
}



const AudienceCSVComponent = React.memo(({ show, onClose }: IProps) => {
    const { t } = useTranslation()
    const { token } = useUserState()
    const { audiences } = useSettingsState()
    const { onGetAudiences } = useSettingsActions()
    const { onShowAlert } = useAppActions()
    const [selectedAudienceId, setSelectedAudienceId] = useState<number>(0)
    const [isFetching, setIsFetching] = useState<boolean>(false)


    const audienceOptions = useMemo(() => {
        return audiences.map(a => ({ item: a.name, value: a.id }))
    }, [audiences])

    const handleExportCSV = useCallback(async () => {
        if (token) {
            setIsFetching(true)
            onShowAlert(true, "We've received your request")
            const [dataRes, dataErr] = await handle(RawData.getAudienceCSV(token, selectedAudienceId))
            setIsFetching(false)
            if(dataRes) {
                const audienceName = audiences.find(a => a.id === selectedAudienceId)?.name
                saveAs(dataRes, `${audienceName}.csv`)
            }
            if(dataErr) {
                const errMessage = dataErr.error.message || dataErr.error
                onShowAlert(false, errMessage)
            }
        }
    }, [token, selectedAudienceId, audiences])


    useEffect(() => {
        onGetAudiences()
    }, [])


    return <Modal show={show} onClose={onClose}>
        <StyledTitle>{t("raw-data_filters-audience_csv_title")}</StyledTitle>
        <StyledDropdown label={t("raw-data_filters-audience_csv_label")} placeholder={t("raw-data_filters-audience_csv_label")} value={selectedAudienceId} onSelect={setSelectedAudienceId} options={audienceOptions} />
        <StyledBtn onClick={handleExportCSV} disabled={isFetching} data-action={activityList["export-facebook-csv"]}>{t("raw-data_filters-audience_csv_btn")}</StyledBtn>
    </Modal>
})

export default AudienceCSVComponent