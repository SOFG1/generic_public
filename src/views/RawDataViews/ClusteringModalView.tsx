import React, { useState, useCallback, useMemo, useEffect } from "react";
import styled from "styled-components";
import { Modal } from "../../UI/Modal";
import { useTranslation } from "react-i18next";
import { useUserState } from "../../store/user";
import { useRawDataState } from "../../store/rawData";
import { desktopBp } from "../../styles/variables";
import { SelectFieldsComponent } from "../../components/RawDataComponents";
import { Button } from "../../UI/Button";
import { activityList } from "../../config/userActivityList";
import { handle } from "../../api";
import { IClusteringParams, RawData } from "../../api/rawData";
import { useAppActions } from "../../store/app";
import { useSettingsActions, useSettingsState } from "../../store/settings";
import { convertFiltersData } from "../../utils/convertFiltersData";

const StyledTitle = styled.p`
  font-size: 1.25vw;
  font-weight: 700;
  width: 38.44vw;
  max-width: 100%;
  min-width: 100%;
  margin: 0 0 1.35vw;
  @media screen and (max-width: ${desktopBp}) {
    font-size: 16px;
    margin-bottom: 17px;
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

const ClusteringModalView = React.memo(({ show, onClose }: IProps) => {
  const { t } = useTranslation();
  const { token } = useUserState();
  const { filtersValues } = useRawDataState();
  const { columns } = useSettingsState()
  const { onGetColumns } = useSettingsActions()
  const { onShowAlert } = useAppActions();
  const [selectedFields, setSelectedFields] = useState<string[]>([]);

  const handleRunModel = useCallback(async () => {
    const params: IClusteringParams = {
      filters: convertFiltersData(filtersValues || {}),
      categorical_columns: selectedFields,
    };
    if (token) {
      const [dataRes, dataErr] = await handle(
        RawData.clustering(token, params)
      );
      if (!dataErr) {
        onShowAlert(true, t("raw-data_clustering-success"));
      }
      if (dataErr) {
        onShowAlert(false, dataErr.error);
      }
    }
  }, [token, selectedFields, filtersValues, t]);

  const columnsFiltered = useMemo(() => {
    return columns.filter(f => {
      return f.fetch || f.type === "bool"
    })
  }, [columns])


  useEffect(() => {
    onGetColumns()
  }, [])

  return (
    <Modal show={show} onClose={onClose}>
      <StyledTitle>{t("raw-data_clustering-title")}</StyledTitle>
      <StyledSubtitle>{t("raw-data_clustering-fields")}</StyledSubtitle>
      <SelectFieldsComponent
        fields={columnsFiltered}
        selected={selectedFields}
        onChange={setSelectedFields}
      />
      <StyledButton
        onClick={handleRunModel}
        data-action={activityList["rawdata-clustering-run"]}
      >
        {t("raw-data_clustering-btn")}
      </StyledButton>
    </Modal>
  );
});

export default ClusteringModalView;
