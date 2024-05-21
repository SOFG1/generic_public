import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import {
  CreateAudienceAction,
  useCallCenterActions,
  useCallCenterState,
} from "../../store/callCenter";
import { desktopBp } from "../../styles/variables";
import { Button } from "../../UI/Button";
import { Input } from "../../UI/Input";
import { Text } from "../common/Text";
import { activityList } from "../../config/userActivityList";
import { useSettingsActions, useSettingsState } from "../../store/settings";
import { DropdownWithSearch } from "../../UI/Dropdown";
import { useUserState } from "../../store/user";
import { handle } from "../../api";
import { CallCenter } from "../../api/callCenter";
import { useAppActions } from "../../store/app";
import Spinner from "../../UI/Spinners/Loader";

const InputStyled = styled(Input)`
  min-width: 20.83vw;
  margin-bottom: 1.04vw;
  @media screen and (max-width: ${desktopBp}) {
    min-width: 261px;
    margin-bottom: 13px;
  }
  @media screen and (max-width: 500px) {
    min-width: 200px;
  }
`;

const StyledLoader = styled(Spinner)`
  width: 12px;
  height: 12px;
`

const ButtonStyled = styled(Button)`
  padding: 0.57vw 1.77vw;
  margin: 15.63vw auto 0;
  @media screen and (max-width: ${desktopBp}) {
    padding: 7px 22px;
    margin: 196px auto 0;
  }
`;

const TextStyled = styled(Text)`
  margin-bottom: 0.52vw;
  margin-top: 0;
  text-decoration: underline;
  @media screen and (max-width: ${desktopBp}) {
    margin-bottom: 7px;
  }
`;

const FBFilterAudience = React.memo(() => {
  const { t } = useTranslation();
  const {
    selectedFBAccount,
    isFetching,
  } = useCallCenterState();
  const { token } = useUserState()
  const { audiences } = useSettingsState()
  const { onGetAudiences } = useSettingsActions()
  const { onShowAlert } = useAppActions()
  const [newName, setNewName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [selectedAudienceId, setSelectedAudienceId] = useState<number>(0)
  const [numbersCount, setNumbersCount] = useState<number>(0)
  const [fetching, setFetching] = useState<boolean>(false)

  const isLoading = isFetching === "customaudience" || fetching

  const audiencesOptions = useMemo(() => {
    return audiences.map(a => ({ item: a.name, value: a.id }))
  }, [audiences])



  const handleFetchNumbersCount = useCallback(async () => {
    if (token && selectedAudienceId) {
      setFetching(true)
      const [dataRes, dataErr] = await handle(CallCenter.getApply(token, { audience: selectedAudienceId }))
      setFetching(false)
      if (dataRes.phone_count) {
        setNumbersCount(dataRes.phone_count)
      }
      if(dataErr) {
        onShowAlert(false, dataErr.error)
      }
    }
  }, [token, selectedAudienceId])



  const onCreateAudienceHandler = useCallback(async () => {
    const audienceData: CreateAudienceAction = {
      acc_id: selectedFBAccount,
      name: newName,
      description: description,
    };
    if(token) {
      setFetching(true)
      const [dataRes, dataErr] = await handle(CallCenter.postCustomAudience(token, {audience: selectedAudienceId}, audienceData))
      setFetching(false)
      if(dataRes) {
        onShowAlert(true, `Audience ${newName} was successfully updated `)
      }
      if(dataErr) {
      const errText = dataErr?.error?.error_user_msg || dataErr.error || "Something went wrong! Try again later!"
        onShowAlert(false, errText)
      }

    }
  }, [selectedFBAccount, newName, description, token, selectedAudienceId]);




  useEffect(() => {
    handleFetchNumbersCount()
  }, [handleFetchNumbersCount])

  useEffect(() => {
    onGetAudiences()
  }, [])



  return (
    <>
      <TextStyled>
        {t("audience_phone-count", { count: numbersCount })}
      </TextStyled>
      <InputStyled
        type="text"
        placeholder={t("audience_name-placeholder")}
        value={newName}
        onChange={setNewName}
        name="set_name"
        label={t("audience_name-label")}
      />

      <InputStyled
        type="text"
        placeholder={t("audience_desc-placeholder")}
        value={description}
        onChange={setDescription}
        name={"audience_description"}
        label={t("audience_desc-label")}
      />
      <InputStyled as={DropdownWithSearch} label="Audience" placeholder="Audience" value={selectedAudienceId} onSelect={setSelectedAudienceId} options={audiencesOptions} />
      <ButtonStyled
        data-action={activityList["call-center-FB-audience_filter_create"]}
        disabled={isLoading}
        onClick={onCreateAudienceHandler}
      >
        {!isLoading && t("audience_create")}
        {isLoading && <StyledLoader/>}
      </ButtonStyled>
    </>
  );
});

export default FBFilterAudience;
