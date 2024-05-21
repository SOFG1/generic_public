import React, { useCallback, useMemo, useState, useEffect } from "react";
import { Modal } from "../../UI/Modal";
import {
  SelectFieldsComponent,
  SelectValuesComponent,
} from "../../components/RawDataComponents";
import styled from "styled-components";
import { HintComponent } from "../../UI/HintComponent";
import { IFilters, useRawDataActions, useRawDataState } from "../../store/rawData";
import { Button } from "../../UI/Button";
import { desktopBp } from "../../styles/variables";
import { useUserState } from "../../store/user";
import { IAnaliticModelParams, RawData } from "../../api/rawData";
import { handle } from "../../api";
import { useAppActions } from "../../store/app";
import { useTranslation } from "react-i18next";
import { activityList } from "../../config/userActivityList";
import { useSettingsActions, useSettingsState } from "../../store/settings";
import { Dropdown } from "../../UI/Dropdown";
import { convertFiltersData } from "../../utils/convertFiltersData";


const StyledDropdown = styled(Dropdown)`
  max-width: 200px;
`




const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1.56vw;
  max-width: 100%;
  min-width: 100%;
  margin-bottom: 1.35vw;
  @media screen and (max-width: ${desktopBp}) {
    gap: 20px;
    margin-bottom: 17px;
    width: 482px;
  }
`;

const StyledTitle = styled.p`
  font-size: 1.25vw;
  font-weight: 700;
  margin: 0;
  @media screen and (max-width: ${desktopBp}) {
    font-size: 16px;
  }
`;

const StyledLine = styled.div`
  width: 100%;
  border-bottom: 1px solid #000;
  margin-bottom: 1.61vw;
  width: 38.44vw;
  max-width: 100%;
  min-width: 100%;
  @media screen and (max-width: ${desktopBp}) {
    margin-bottom: 20px;
  }
`;

const StyledBox = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 3.13vw;
  > div {
    flex-grow: 1;
  }
  @media screen and (max-width: ${desktopBp}) {
    gap: 39px;
  }
  @media screen and (max-width: 1020px) {
    flex-direction: column;
  }
`;

const StyledSubtitle = styled.p`
  font-size: 0.83vw;
  font-weight: 600;
  margin: 0 0 0.63vw;
  @media screen and (max-width: ${desktopBp}) {
    font-size: 11px;
    margin: 0 0 8px;
  }
`;

const StyledButton = styled(Button)`
  margin: 0 auto;
`;

interface IProps {
  show: boolean;
  onClose: () => void;
}


//Store "isFetching" flag in local storage in order to prevent parallel model running from different tabs
const loadingKeyInLocalStorage = "raw_data_is_running_model"
 

const ModellingModalView = React.memo(({ show, onClose }: IProps) => {
  const { t } = useTranslation();
  const { token } = useUserState();
  const { filtersValues, filters, modellingData } = useRawDataState()
  const { columns, all_statuses } = useSettingsState()
  const { onChangeModellingData } = useRawDataActions()
  const { onGetColumns } = useSettingsActions()
  const { onShowAlert } = useAppActions();
  const [isFetching, setIsFetching] = useState<boolean>(false)


  const fieldsOptions = useMemo(() => {
    return filters
    .filter(f => f.fetch)
    .filter(f => f.slug !== "city" && f.slug !== "street")
    .map(c => ({ item: c.name, value: c.id }))
  }, [filters])


  const selectedFilter = useMemo(() => {
    return filters.find(c => c.id === modellingData.filterId)
  }, [filters, modellingData.filterId])

  const valuesOptions = useMemo(() => {
    if(selectedFilter?.slug === "status") {
      return all_statuses?.map(s => s.status) || []
    }
    const filter = filters.find(f => f.id === modellingData.filterId)
    return filter?.options.map(o => o.at(-1) || "") || []
  }, [modellingData.filterId, filters, selectedFilter, all_statuses])

  //Not dates and integers
  const textualColumns = useMemo(() => {
    return columns.filter((f) => f.type !== "timestamp" && f.type !== "int" && f.type !== "float");
  }, [columns]);

  //Numbers and timestamps
  const numericalColumns = useMemo(() => {
    return columns.filter((f) => f.type === "timestamp" || f.type === "int" || f.type === "float");
  }, [columns]);


  const handleRunModel = useCallback(async () => {
    //Prevent parallel running from different tabs
    const isAlreadyRunning = localStorage.getItem(loadingKeyInLocalStorage) === "true"
    if(isAlreadyRunning) {
      onShowAlert(false, t("raw-data_modelling_duplicate"));
      return
    }
    if (token) {
      const params: IAnaliticModelParams = {
        filters: convertFiltersData(filtersValues || {}) ,
        pro_status: modellingData.proValues,
        anti_status: modellingData.antiValues,
        categorical_columns: modellingData.selectedTextual,
        numeric_columns: modellingData.selectedNumeric,
        prediction_field: (selectedFilter as IFilters).slug
      };
      localStorage.setItem(loadingKeyInLocalStorage, "true")
      setIsFetching(true)
      const [dataRes, dataErr] = await handle(
        RawData.analiticModel(token, params)
      );
      setIsFetching(false)
      localStorage.setItem(loadingKeyInLocalStorage, "false")
      if (!dataErr) {
        onShowAlert(true, t("raw-data_modelling_success"));
      }
      if (dataErr) {
        onShowAlert(false, dataErr.error);
      }
    }
  }, [
    filtersValues,
    selectedFilter,
    modellingData,
    t,
  ]);


  useEffect(() => {
    onGetColumns()
  }, [])


  useEffect(() => {
    onChangeModellingData("proValues", [])
    onChangeModellingData("antiValues", [])
  }, [modellingData.filterId])


  return (
    <Modal show={show} onClose={onClose}>
      <StyledDropdown label={t("raw-data_modelling_field")} value={modellingData.filterId} onSelect={(v) => onChangeModellingData("filterId", v)} options={fieldsOptions} placeholder={t("raw-data_modelling_field")} />
      <StyledLine />
      {selectedFilter && (
        <>
          <StyledHeader>
            <StyledTitle>{t("raw-data_pro-values")}</StyledTitle>
            <HintComponent
              position="start"
              items={[t("raw-data_pro-values_hint")]}
            />
          </StyledHeader>
          <SelectValuesComponent
            slug={selectedFilter.slug}
            selected={modellingData.proValues}
            onChange={(v) => onChangeModellingData("proValues", v)}
            options={valuesOptions}
          />
          <StyledHeader>
            <StyledTitle>{t("raw-data_opposite-values")}</StyledTitle>
          </StyledHeader>
          <SelectValuesComponent
            slug={selectedFilter.slug}
            selected={modellingData.antiValues}
            onChange={(v) => onChangeModellingData("antiValues", v)}
            options={valuesOptions}
          />
          <StyledLine />
        </>
      )}

      <StyledHeader>
        <StyledTitle>{t("raw-data_modelling_categories")}</StyledTitle>
      </StyledHeader>
      <StyledBox>
        <div>
          <StyledSubtitle>{t("raw-data_modelling_subtitle1")}</StyledSubtitle>
          <SelectFieldsComponent
            fields={textualColumns}
            selected={modellingData.selectedTextual}
            onChange={(v) => onChangeModellingData("selectedTextual", v)}
          />
        </div>
        <div>
          <StyledSubtitle>{t("raw-data_modelling_subtitle2")}</StyledSubtitle>
          <SelectFieldsComponent
            fields={numericalColumns}
            selected={modellingData.selectedNumeric}
            onChange={(v) => onChangeModellingData("selectedNumeric", v)}
          />
        </div>
      </StyledBox>
      <StyledLine />
      <StyledButton
        onClick={handleRunModel}
        disabled={isFetching || !selectedFilter}
        data-action={activityList["rawdata-modelling-run"]}
      >
        {t("raw-data_modelling_btn")}
      </StyledButton>
    </Modal>
  );
});

export default ModellingModalView;
