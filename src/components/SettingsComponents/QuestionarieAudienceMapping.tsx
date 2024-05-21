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

const QuestionarieAudienceMapping = React.memo(() => {
  const { t } = useTranslation();
  const { token } = useUserState();
  const { questionaries, audiences } = useSettingsState();
  const { onShowAlert } = useAppActions();
  const [selectedQuestionarieId, setSelectedQuestionarieId] =
    useState<number>(0);
  const [selectedAudienceId, setSelectedAudienceId] = useState<number>(0);

  const handleSave = useCallback(async () => {
    if (!selectedAudienceId || !selectedQuestionarieId) {
      onShowAlert(false, "Fields questionnaire or audience are empty");
      return;
    }
    const data = {
      questionarie_id: selectedQuestionarieId,
      audience_id: selectedAudienceId,
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
  }, [token, selectedQuestionarieId, selectedAudienceId]);

  const questionariesOptions = useMemo(() => {
    return questionaries.map((q) => ({ item: q.name, value: q.id }));
  }, [questionaries]);

  const audiencesOptions = useMemo(() => {
    return audiences.map((a) => ({ item: a.name, value: a.id }));
  }, [audiences]);

  return (
    <StyledWrapper>
      <StyledDropdown
        isReversed={true}
        label={t("settings_mapping-questionarie")}
        placeholder={t("settings_mapping-questionarie")}
        options={questionariesOptions}
        value={selectedQuestionarieId}
        onSelect={setSelectedQuestionarieId}
      />
      <StyledDropdown
        isReversed={true}
        label={t("settings_mapping-audience")}
        placeholder={t("settings_mapping-audience")}
        options={audiencesOptions}
        value={selectedAudienceId}
        onSelect={setSelectedAudienceId}
      />
      <StyledBtn onClick={handleSave} data-action={activityList["questionnaire-audience-mapping"]}>
        {t("settings_mapping-audience_save")}
      </StyledBtn>
    </StyledWrapper>
  );
});

export default QuestionarieAudienceMapping;
