import React, { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { handle } from "../../api";
import { Settings } from "../../api/settings";
import { useAppActions } from "../../store/app";
import { useSettingsState } from "../../store/settings";
import { useUserState } from "../../store/user";
import { Button } from "../../UI/Button";
import { DropdownWithSearch } from "../../UI/Dropdown";
import { desktopBp } from "../../styles/variables";
import { activityList } from "../../config/userActivityList";


const StyledWrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding: 1.04vw 1.56vw 1.56vw;
    margin-bottom: 0.78vw;
    min-height: 8.85vw;
    color: #000;
    @media screen and (max-width: ${desktopBp}) {
        padding: 13px 20px 20px;
        margin-bottom: 10px;
        min-height: 111px;
    }
`

const StyledDropdown = styled(DropdownWithSearch)`
    max-width: 15.63vw;
    width: 52.08vw;
    @media screen and (max-width: ${desktopBp}) {
        max-width: 196px;
        width: 654px;
    }
`;

const StyledBtn = styled(Button)`
height: 2.19vw;
width: 5.21vw;
border-radius: 0;
margin:auto auto 0;
@media screen and (max-width: ${desktopBp}) {
    height: 27px;
    width: 65px;
}
`

interface IProps {
  selectedUsers: number[]
}

const DistributionAudienceComponent = React.memo(({ selectedUsers }: IProps) => {
  const { t } = useTranslation();
  const { token } = useUserState();
  const { audiences } = useSettingsState();
  const { onShowAlert } = useAppActions();
  const [selectedAudienceId, setSelectedAudienceId] = useState<number>(0);

  const handleSave = useCallback(async () => {
    const data = {
      audience_id: selectedAudienceId,
      users: selectedUsers,
    };
    if (token) {
      const [dataRes, dataErr] = await handle(Settings.setMapping(token, data));
      if (!dataErr) {
        onShowAlert(true, "Success");
      }
      if (dataErr) {
        onShowAlert(false, dataErr?.error);
      }
    }
  }, [token, selectedUsers, selectedAudienceId]);

  const audiencesOptions = useMemo(() => {
    return audiences.map((a) => ({ item: a.name, value: a.id }));
  }, [audiences]);


  return (
    <StyledWrapper>
      <StyledDropdown
        isReversed={true}
        label={t("settings_mapping-audience")}
        placeholder={t("settings_mapping-audience")}
        options={audiencesOptions}
        value={selectedAudienceId}
        onSelect={setSelectedAudienceId}
      />
      <StyledBtn onClick={handleSave} disabled={!selectedUsers.length || !selectedAudienceId} data-action={activityList["audience-users-mapping"]}>
        {t("settings_mapping-users_save")}
      </StyledBtn>
    </StyledWrapper>
  );
});

export default DistributionAudienceComponent;
