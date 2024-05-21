import React, { useCallback, useState, useMemo } from "react"
import { Modal } from "../../UI/Modal"
import styled from "styled-components"
import { Input } from "../../UI/Input"
import { CheckedIcon } from "../../UI/Svg"
import { desktopBp } from "../../styles/variables"
import { useTranslation } from "react-i18next"
import { useRawDataState } from "../../store/rawData"
import { useUserState } from "../../store/user"
import { useAppActions } from "../../store/app"
import { handle } from "../../api"
import { Settings } from "../../api/settings"
import { useSettingsActions } from "../../store/settings"
import { activityList } from "../../config/userActivityList"
import { convertFiltersData } from "../../utils/convertFiltersData"


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

const StyledText = styled.p`
    margin: 0 0 13px;
    font-size: 0.94vw;
    font-weight: 500;
    span {
        color: #FE5912;
    }
    @media screen and (max-width: ${desktopBp}) {
        font-size: 12px;
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
    span {
        display: inline-flex;
        justify-content: center;
        align-items: center;
        height: 1.25vw;
        width: 1.25vw;
        border-radius: 50%;
        background-color: #000;
    }
    svg {
        height: 70%;
        width: 70%;
    }
    svg path {
        fill: #fff;
    }
    @media screen and (max-width: ${desktopBp}) {
    gap: 12px;
    span {
        height: 16px;
        width: 16px;
    }
    }
`

interface IProps {
    show: boolean
    onClose: () => void
}

const CreateAudienceComponent = React.memo(({ show, onClose }: IProps) => {
    const { t } = useTranslation()
    const { token } = useUserState()
    const { filtersValues, count } = useRawDataState()
    const { onGetAudiences } = useSettingsActions()
    const { onShowAlert } = useAppActions()
    const [audienceName, setAudienceName] = useState<string>("")
    const [isFetching, setIsFetching] = useState<boolean>(false)

    const appliedFiltersQnt: number = useMemo(() => {
        return Object.values(filtersValues || {}).filter(value => value.toString().length).length
    }, [filtersValues]);

    const onCreateAudience = useCallback(async () => {
        const reqData = {
            filters: convertFiltersData(filtersValues as Object),
            name: audienceName,
        };

        if (token) {
            setIsFetching(true)
            const [dataRes, dataErr] = await handle(
                Settings.createAudience(token, reqData)
            );
            setIsFetching(false)
            if (!dataErr) {
                onShowAlert(true, "Success");
                onGetAudiences()
                onClose()
                setAudienceName("")
            }
            if (dataErr) {
                onShowAlert(false, dataErr?.error || dataErr?.detail);
            }
        }
    }, [token, audienceName, filtersValues]);

    return <Modal show={show} onClose={onClose}>
        <StyledTitle>{t("raw-data_filters-audience_title")}</StyledTitle>
        <StyledInput type="text" label={t("raw-data_filters-audience_name")} placeholder={t("raw-data_filters-audience_name")} name="name" value={audienceName} onChange={setAudienceName} />
        <StyledText>{t("raw-data_filters-audience_total")} <span>{count}</span></StyledText>
        <StyledText>{t("raw-data_filters-audience_applied")} <span>{appliedFiltersQnt}</span></StyledText>
        <StyledBtn onClick={onCreateAudience} disabled={isFetching} data-action={activityList["create-audience"]}>{t("raw-data_filters-audience_btn")} <span><CheckedIcon /></span></StyledBtn>
    </Modal>
})

export default CreateAudienceComponent
