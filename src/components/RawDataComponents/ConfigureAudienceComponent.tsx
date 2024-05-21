import React, {FC, useCallback, useMemo, useState} from "react";
import {Modal} from "../../UI/Modal";
import {desktopBp} from "../../styles/variables";
import styled from "styled-components";
import {Input} from "../../UI/Input";
import {useTranslation} from "react-i18next";
import {useSettingsActions, useSettingsState} from "../../store/settings";
import {Dropdown} from "../../UI/Dropdown";
import {Button} from "../../UI/Button";
import {handle} from "../../api";
import {Settings} from "../../api/settings";
import {useAppActions, useAppState} from "../../store/app";
import {useUserState} from "../../store/user";
import {useRawDataState} from "../../store/rawData";
import {convertFiltersData} from "../../utils/convertFiltersData";

interface IProps {
    show: boolean
    onClose: () => void
}
const ConfigureAudienceComponent:FC<IProps> = ({show, onClose})=>{
    const {t} = useTranslation();
    const {token} = useUserState()
    const { audiences } = useSettingsState();
    const {onGetAudiences} = useSettingsActions();
    const { filtersValues, count } = useRawDataState()
    const { onShowAlert } = useAppActions()
    const [selectedAudienceId, setSelectedAudienceId] = useState<number | undefined>();
    const [audienceName, setAudienceName] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const audienceOptions = useMemo(() => {
        return audiences.map(a => ({ item: a.name, value: a.id }))
    }, [audiences]);

    const appliedFiltersQnt: number = useMemo(() => {
        return Object.values(filtersValues || {}).filter(value => value.toString().length).length
    }, [filtersValues]);

    const handleClick = useCallback(async ()=>{
        if(!token || !selectedAudienceId) return;
        setIsLoading(true);
        const reqData = {
            filters: convertFiltersData(filtersValues as Object),
            name: audienceName,
        };
        const [_, rej] = await  handle(Settings.updateAudience(token, selectedAudienceId, reqData));
        if(!rej){
            onShowAlert(true, "Success");
            onGetAudiences()
            setAudienceName("");
            setSelectedAudienceId(0);
            setIsLoading(false);
        }
        if (rej) {
            onShowAlert(false, rej?.error || rej?.detail);
            setIsLoading(false);
        }
    },[token, selectedAudienceId, audienceName])
    return (
        <Modal show={show} onClose={onClose}>
            <StyledTitle>{t("raw-data_filters-configure-audience_title")}</StyledTitle>
            <StyledDropdown label={t("raw-data_filters-audience_csv_label")} placeholder={t("raw-data_filters-audience_csv_label")} value={selectedAudienceId || 0} onSelect={setSelectedAudienceId} options={audienceOptions} />
            <StyledInput onChange={value => setAudienceName(value)} label={"Audience name"} type={"text"} name={"audience name"} value={audienceName}/>
            <StyledText>{t("raw-data_filters-audience_total")} <span>{count}</span></StyledText>
            <StyledText>{t("raw-data_filters-audience_applied")} <span>{appliedFiltersQnt}</span></StyledText>
            <StyledBtn disabled={isLoading} onClick = {handleClick}>{t("raw-data_filters-update-audience-name-btn")}</StyledBtn>
        </Modal>
    )
}


export default ConfigureAudienceComponent;


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
const StyledInput = styled(Input)`
    max-width: 20.05vw;
    margin-bottom: 1.67vw;
    @media screen and (max-width: ${desktopBp}) {
        max-width: 252px;
        margin-bottom: 21px;
    }
`
const StyledBtn = styled(Button)`
    margin-top: 75px;
`
