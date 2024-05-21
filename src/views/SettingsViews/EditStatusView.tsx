import React, { useState, useRef, useCallback, useEffect } from "react";
import EditStatusContent from "./EditStatusContent";
import { useTranslation } from "react-i18next";
import { useAppActions, useAppState } from "../../store/app";
import {
  SettingsBigTabComponent,
} from "../../components/SettingsComponents";
import { activityList } from "../../config/userActivityList";
import styled from "styled-components";
import { SettingsCardHint } from "../../UI/SettingsCardHint/SettingsCardHint";
import { useHint } from "../../hooks/useHint";
import { useSearchParams } from "react-router-dom";
import { withErrorBoundaryHOC } from "../../utils/withErrorBoundaryHOC";

const StyledWrapper = styled.div`
  position: relative;
`

const EditStatusView = React.memo(() => {
  const { t } = useTranslation();
  const { hint } = useAppState();
  const [searchParams] = useSearchParams();
  const [opened, setOpened] = useState<boolean>(false)


  useHint("status-chart2", "status-chart3")

  useEffect(() => {
    const modal = searchParams.get("modal");
    if (modal === "general") {
      setOpened(true);
    }
  }, [searchParams]);


  return (
    <StyledWrapper>
        {hint === "status-chart3" && <SettingsCardHint />}
      <SettingsBigTabComponent opened={opened} title={t("settings_status")} activity={activityList["open-status-settings"]}>
        <EditStatusContent />
      </SettingsBigTabComponent>
    </StyledWrapper>
  );
});

export default withErrorBoundaryHOC(EditStatusView);
