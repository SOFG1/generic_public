import React, {useCallback, useEffect, useMemo, useState} from "react"
import styled from "styled-components"
import {useTranslation} from "react-i18next"
import {useSettingsActions, useSettingsState} from "../../store/settings"
import {ConfirmDeleteFull} from "../common/ConfirmDeleteFull"
import {activityList} from "../../config/userActivityList"
import {desktopBp} from "../../styles/variables";
import {AudienceDropdown} from "./index";
import {Button} from "../../UI/Button";
import {Input} from "../../UI/Input";
import {convertFiltersData} from "../../utils/convertFiltersData";
import {handle} from "../../api";
import {Settings} from "../../api/settings";
import {useRawDataState} from "../../store/rawData";
import {useUserState} from "../../store/user";
import {useAppActions} from "../../store/app";
import {Loader} from "../../UI/Spinners";

const Label = styled.div`
  font-size: ${props => props.theme.fontSize.semiMedium.vw};
  font-weight: 400;
  color: #000;
  margin-right: 2.00vw;
  width: 8.67vw;
  @media screen and (max-width: ${desktopBp}) {
    font-size: ${props => props.theme.fontSize.semiMedium.px};
    margin-right: 25px;
    width: 108px;
  }
  @media(max-width: 850px){
    margin-bottom: 5px;
  }
`
const DropdownContainer = styled.div`
    display: flex;
  min-width: 27.00vw;
  flex-direction: column;
  justify-content: space-between;
  @media screen and (max-width: ${desktopBp}) {
    width: 338px;
  }
  @media(max-width: 850px){
    min-width: 100%;
  }
`

const StyledInput = styled(Input)`
  width: 19.84vw;
  font-size: ${props => props.theme.fontSize.semiMedium.vw};
  & .styled_input_label{
    font-size: ${props => props.theme.fontSize.semiMedium.vw};
    @media screen and (max-width: ${desktopBp}) {
      font-size: ${props => props.theme.fontSize.semiMedium.vw};
    }
  }
  
  @media screen and (max-width: ${desktopBp}) {
    width: 249px;
    font-size: ${props => props.theme.fontSize.semiMedium.vw};
  }
`

const StyledButton = styled(Button)`
  width: 2.97vw;
  height: 1.20vw;
  margin-left: 5px;
  font-size: 0.52vw;
  margin-bottom: 0.52vw;
  border-width: 1px;
  @media screen and (max-width: ${desktopBp}) {
    width: 37px;
    height: 15px;
    font-size: 7px;
    margin-bottom: 7px;
  }
`


const StyledChildrenLabel = styled.p`
  color: #000;
  font-size: ${props => props.theme.fontSize.primary.vw};
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  @media screen and (max-width: ${desktopBp}) {
    font-size: ${props => props.theme.fontSize.primary.px};
  }
`


interface IProps {
    audienceId: number
    onChange: (id: number) => void,
}

const AudienceComponent = React.memo(({ audienceId, onChange }: IProps) => {
    const { t } = useTranslation()
    const { audiences } = useSettingsState()
    const { onGetAudiences, onDeleteAudience } = useSettingsActions();
    const [deletingId, setDeletingId] = useState<number>(0)
    const [audienceName, setAudienceName] = useState("");
    const { filtersValues } = useRawDataState()
    const [isFetching, setIsFetching] = useState<boolean>(false)
    const { token } = useUserState()
    const { onShowAlert } = useAppActions()

    const audienceOptions = useMemo(() => {
        return audiences.map(a => ({ item: a.name, value: a.id }))
    }, [audiences])


    useEffect(() => {
        onGetAudiences()
    }, [])

    const handleDelete = useCallback((id: number) => {
        onDeleteAudience(id)
        onChange(0)
    }, []);

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
                setAudienceName("")
            }
            if (dataErr) {
                onShowAlert(false, dataErr?.error || dataErr?.detail);
            }
        }
    }, [token, audienceName, filtersValues]);

    return <>
        <ConfirmDeleteFull show={!!deletingId} title={t("raw-data_audience-warning")} onClose={() => setDeletingId(0)} onDelete={() => handleDelete(deletingId)} />

        <DropdownContainer>
            <Label>{t("raw-data_filter-by-audience")}</Label>
            <AudienceDropdown
                label={!audienceId ? t("raw-data_audience-label") : ""}
                placeholder={t("raw-data_audience-label")}
                value={audienceId}
                onSelect={onChange}
                deletableOptions={{callback: (o) => setDeletingId(o), action: activityList["audiences-delete"]}}
                options={audienceOptions}
                isMultiSelect={true}
                menuChild={
                        <>
                            <StyledInput label="" placeholder={t("raw-data_enter_audience_name")} type={"text"}  onChange={setAudienceName} value={audienceName} name={"create_audience"}/>
                            {!isFetching &&  <StyledButton onClick = {onCreateAudience} disabled={!audienceName.length || isFetching}>Create</StyledButton>}
                            {isFetching && <Loader/>}
                        </>
                }
            />
        </DropdownContainer>
    </>
})




export default AudienceComponent
