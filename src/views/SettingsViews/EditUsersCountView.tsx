import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { handle } from "../../api";
import { Settings } from "../../api/settings";
import { useAppActions } from "../../store/app";
import { useSettingsActions, useSettingsState } from "../../store/settings";
import { useUserState } from "../../store/user";
import { desktopBp } from "../../styles/variables";
import { saveAs } from "file-saver";
import { Dropdown } from "../../UI/Dropdown";
import { Button } from "../../UI/Button";
import { Loader } from "../../UI/Spinners";
import { Input } from "../../UI/Input";
import { activityList } from "../../config/userActivityList";
import { SettingsSmallTabComponent } from "../../components/SettingsComponents";


const StyledGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2.45vw 3.07vw;
  @media screen and (max-width: ${desktopBp}) {
    gap: 31px 39px;
  }
  @media screen and (max-width: 700px) {
    grid-template-columns: 1fr;
  }
`

const StyledSubtitle = styled.p`
  text-align: start;
  font-size: 1.15vw;
  margin: 0;
  @media screen and (max-width: ${desktopBp}) {
    font-size: 14px;
    line-height: 22px;
  }
`;

const StyledBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 0.52vw;
  @media screen and (max-width: ${desktopBp}) {
    gap: 7px;
  }
`;

const StyledBtn = styled.button<{ color: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 2.08vw;
  width: 2.08vw;
  padding: 0;
  background-color: transparent;
  border-radius: 50%;
  font-size: 1.56vw;
  line-height: 2.08vw;
  font-weight: 500;
  flex-shrink: 0;
  cursor: pointer;
  transition: opacity 200ms linear;
  ${({ color }) => `color: ${color};`}
  ${({ color }) => `border: 2px solid ${color};`}
    &:hover {
    opacity: 0.65;
  }
  @media screen and (max-width: ${desktopBp}) {
    height: 26px;
    width: 26px;
    font-size: 20px;
    line-height: 26px;
  }
`;

const StyledDropdown = styled(Dropdown)`
`;

const StyledInput = styled(Input)`
  & label,
  & input {
    text-align: center;
  }
`;

const StyledBtnBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.04vw;
  margin-top: 3.65vw;
  @media screen and (max-width: ${desktopBp}) {
    gap: 13px;
    margin-top: 46px;
  }
`;

const StyledSubmit = styled(Button)`
  padding: 0.73vw 2.08vw;
  @media screen and (max-width: ${desktopBp}) {
    padding: 9px 26px;
  }
`;

const audienceErrorMessage =
  "Please, select initial audience and questionnaire for the new users. You will be able to change them after on Mapping screen.";

const EditUsersCountView = React.memo(() => {
  const { t } = useTranslation();
  const { token } = useUserState();
  const { onGetQuestionaries, onGetAudiences } = useSettingsActions();
  const { onShowAlert } = useAppActions();
  const { questionaries, audiences } = useSettingsState();
  const [usersCount, setUsersCount] = useState<number>(0);
  const [selectedQuestionarieId, setSelectedQuestionarieId] =
    useState<number>(0);
  const [selectedAudienceId, setSelectedAudienceId] = useState<number>(0);
  const [isFetching, setIsFetching] = useState<boolean>(false);

  const questionariesOptions = useMemo(() => {
    return questionaries.map((q) => ({ item: q.name, value: q.id }));
  }, [questionaries]);

  const audiencesOptions = useMemo(() => {
    return audiences.map((a) => ({ item: a.name, value: a.id }));
  }, [audiences]);

  useEffect(() => {
    onGetQuestionaries();
    onGetAudiences();
  }, []);

  const handleChange = (current: number | string, increment: boolean) => {
    if (typeof current === "string") current = parseInt(current, 10);
    increment ? (current += 1) : (current -= 1);
    current = current >= 0 ? current : 0;
    current = current <= 100 ? current : 100;
    setUsersCount(current);
  };

  const onChange = (val: number) => {
    if (val < 0) {
      setUsersCount(0);
      return;
    }
    if (val > 100) {
      setUsersCount(100);
      return;
    }
    setUsersCount(val);
  };

  const handleSubmit = useCallback(async () => {
    //Show alert if not selected questionarie or audience
    if (!selectedQuestionarieId || !selectedAudienceId) {
      onShowAlert(false, audienceErrorMessage);
      return;
    }
    if (token) {
      setIsFetching(true);
      const [dataRes, dataErr] = await handle(
        Settings.editUsersCount(
          token,
          selectedQuestionarieId,
          selectedAudienceId,
          usersCount
        )
      );
      setIsFetching(false);
      if (dataRes) {
        saveAs(dataRes, "UsersCount.xlsx");
      }
      if (dataErr) {
        //convert blob response to JSON
        const { error } = JSON.parse(await dataErr.text());
        onShowAlert(false, error);
      }
    }
  }, [token, selectedQuestionarieId, selectedAudienceId, usersCount]);



  return (

    <SettingsSmallTabComponent title={t("settings_users-qnt-title")} activity={activityList["toggle-users-count"]}>
      <StyledGrid>
        <StyledSubtitle>{t("settings_users-qnt-hint")}</StyledSubtitle>
        <StyledBox>
          <StyledBtn
            data-action={activityList["decrease-users-count"]}
            color="#F06543"
            onClick={() => handleChange(usersCount, false)}
          >
            -
          </StyledBtn>
          <StyledInput
            name="quantity"
            type="number"
            value={usersCount}
            onChange={onChange}
            label={t("settings_users-qnt-label")}
          />
          <StyledBtn
            data-action={activityList["increase-users-count"]}
            color="#1BBDD4;"
            onClick={() => handleChange(usersCount, true)}
          >
            +
          </StyledBtn>
        </StyledBox>
        <StyledDropdown
          label={t("questionaries-questionarie-plhr")}
          placeholder={t("questionaries-questionarie-label")}
          options={questionariesOptions}
          value={selectedQuestionarieId}
          onSelect={setSelectedQuestionarieId}
        />
        <StyledDropdown
          label={t("settings_mapping-audience")}
          placeholder={t("settings_mapping-audience")}
          options={audiencesOptions}
          value={selectedAudienceId}
          onSelect={setSelectedAudienceId}
        />
      </StyledGrid>
      <StyledBtnBox>
        <StyledSubmit onClick={handleSubmit} disabled={isFetching} data-action={activityList["users-count-save"]}>
          {t("settings_mapping-btn")}
        </StyledSubmit>
        {isFetching && <Loader />}
      </StyledBtnBox>
    </SettingsSmallTabComponent>
  );
});

export default EditUsersCountView;
