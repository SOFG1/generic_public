import React from "react";
import EditFieldsContent from "./EditFieldsContent";
import { useTranslation } from "react-i18next";
import { useAppState } from "../../store/app";
import {
  SettingsBigTabComponent,
} from "../../components/SettingsComponents";
import { activityList } from "../../config/userActivityList";
import { SettingsCardHint } from "../../UI/SettingsCardHint/SettingsCardHint";
import styled from "styled-components";
import { useHint } from "../../hooks/useHint";
import { withErrorBoundaryHOC } from "../../utils/withErrorBoundaryHOC";

const StyledWrapper = styled.div`
  position: relative;
`

const EditFieldsView = React.memo(() => {
  const { t } = useTranslation();
  const { hint } = useAppState();

  useHint("filters-hint2", "filters-hint3")


  return (
    <StyledWrapper>
      {hint === "filters-hint3" && <SettingsCardHint />}
      <SettingsBigTabComponent title={t("settings_fields")} activity={activityList["open-edit-fields"]}>
        <EditFieldsContent />
      </SettingsBigTabComponent>
    </StyledWrapper>
  );
});

export default withErrorBoundaryHOC(EditFieldsView);
