import React, { useCallback, useState } from "react";
import styled from "styled-components";
import { Modal } from "../../UI/Modal";
import { desktopBp } from "../../styles/variables";
import { useRawDataState } from "../../store/rawData";
import { FieldInput } from "../../components/common/FieldInput";
import { useUserState } from "../../store/user";
import { Button } from "../../UI/Button";
import { Input } from "../../UI/Input";
import { useTranslation } from "react-i18next";
import { activityList } from "../../config/userActivityList";
import { handle } from "../../api";
import { RawData } from "../../api/rawData";
import { useAppActions } from "../../store/app";
import { convertFiltersData } from "../../utils/convertFiltersData";
import { useSettingsState } from "../../store/settings";
import { SelectFieldsComponent } from "../../components/RawDataComponents";
import { ConfirmDeleteFull } from "../../components/common/ConfirmDeleteFull";

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

const StyledInput = styled(Input)`
  max-width: 200px;
`;



const StyledButton = styled(Button)`
  margin: 0 auto;
`;

interface IProps {
  show: boolean;
  onClose: () => void;
}

const FamiliesModalView = React.memo(({ show, onClose }: IProps) => {
  const { t } = useTranslation();
  const { token } = useUserState();
  const { columns } = useSettingsState()
  const { onShowAlert } = useAppActions();
  const [familyId, setFamilyId] = useState<string>("");
  const [selectedColumns, setSelectedColumns] = useState<string[]>([])
  const [showConfirm, setShowConfirm] = useState<boolean>(false)

  const handleUpdate = useCallback(async () => {
    if (token) {
      const [dataRes, dataErr] = await handle(
        RawData.updateByFamiliesId(token, familyId, selectedColumns)
      );
      if (typeof dataRes === "number") {
        onShowAlert(true, t("raw-data_families-success", { rows: dataRes }));
      }
      if (dataErr) {
        onShowAlert(false, dataErr.error);
      }
    }
  }, [token, familyId, selectedColumns]);

  return (
    <>
      <Modal show={show} onClose={onClose}>
        <ConfirmDeleteFull show={showConfirm} title={t("raw-data_families-warning", {fields: selectedColumns.join(", ")})} onClose={() => setShowConfirm(false)} onDelete={handleUpdate} />
        <StyledTitle>{t("raw-data_families-title")}</StyledTitle>
        <StyledInput
          type="text"
          name="family_id"
          label={t("raw-data_families-label")}
          placeholder={t("raw-data_families-label")}
          value={familyId}
          onChange={setFamilyId}
        />
        <SelectFieldsComponent
          fields={columns}
          selected={selectedColumns}
          onChange={setSelectedColumns}
        />
        <StyledButton
          onClick={() => setShowConfirm(true)}
          disabled={!familyId}
          data-action={activityList["rawdata-families_id-update"]}
        >
          {t("raw-data_families-btn")}
        </StyledButton>
      </Modal>
    </>
  );
});

export default FamiliesModalView;
