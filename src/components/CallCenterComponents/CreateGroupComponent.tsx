import React, { useCallback, useMemo, useState } from "react";
import styled from "styled-components";
import { handle } from "../../api";
import { GoogleAds } from "../../api/googleAds";
import { useAppActions } from "../../store/app";
import { useGoogleAdsState } from "../../store/googleAds";
import { useUserState } from "../../store/user";
import { desktopBp } from "../../styles/variables";
import { Button } from "../../UI/Button";
import { Dropdown } from "../../UI/Dropdown";
import { Input } from "../../UI/Input";
import { HintText, StyledHint } from "../../UI/InputHint/InputHint";
import { Loader } from "../../UI/Spinners";
import { InfoIcon } from "../../UI/Svg";
import { Title } from "../common/Title";
import { activityList } from "../../config/userActivityList";
import { useTranslation } from "react-i18next";

const StyledTitle = styled(Title)`
  margin-top: 0;
`;

const InputsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.04vw;
  padding: 0 7.81vw 0.52vw;
  @media screen and (max-width: ${desktopBp}) {
    gap: 13px;
    padding: 0 98px 7px;
  }
  @media screen and (max-width: 600px) {
    padding: 10px;
  }
`;

const InputBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.52vw;
  @media screen and (max-width: ${desktopBp}) {
    gap: 7px;
  }
`;

const ClearButton = styled(Button)`
  padding: 4px 5px;
  font-size: 0.73vw;
  width: 4.69vw;
  align-self: flex-end;
  @media screen and (max-width: ${desktopBp}) {
    font-size: 10px;
    width: 59px;
  }
`;

const StyledAddBtn = styled(Button)`
  margin: 0 auto 1.04vw;
  @media screen and (max-width: ${desktopBp}) {
    margin: 0 auto 13px;
  }
`;

const StyledLoader = styled(Loader)`
  margin: 0 auto;
`;

const CreateGroupComponent = React.memo(() => {
  const { t } = useTranslation()
  const { token } = useUserState();
  const { campaigns, selectedCustomerId } = useGoogleAdsState();
  const { onShowAlert } = useAppActions();
  const [selectedCampaignId, setSelectedCampaignId] = useState<string>("");
  const [groupName, setGroupName] = useState<string>("");
  const [isFetching, setIsFetching] = useState<boolean>(false);

  const handleAdd = useCallback(async () => {
    const reqData = {
      customer_id: String(selectedCustomerId),
      campaign_id: selectedCampaignId,
      ad_group_name: groupName,
    };
    if (token) {
      setIsFetching(true);
      const [dataRes, dataErr] = await handle(
        GoogleAds.createGroup(token, reqData)
      );
      setIsFetching(false);
      if (dataRes) {
        onShowAlert(true, "Success");
      }
      if (dataErr) {
        onShowAlert(false, dataErr.error);
        console.log(dataErr);
      }
    }
  }, [token, selectedCustomerId, selectedCampaignId, groupName]);

  const showClearButton = useMemo(() => {
    return selectedCampaignId || groupName;
  }, [selectedCampaignId, groupName]);

  const handleClear = () => {
    setSelectedCampaignId("");
    setGroupName("");
  };

  const campaignsOptions = useMemo(() => {
    return campaigns.map((c) => ({ item: c.name, value: c.campaign_id }));
  }, [campaigns]);

  return (
    <>
      <StyledTitle className = "styled_create_campaign_label">Create group</StyledTitle>
      <InputsContainer className = "styled_create_campaign_inputs">
        <InputBox>
          <Dropdown
            placeholder="Campaign"
            label="Campaign"
            value={selectedCampaignId}
            onSelect={setSelectedCampaignId}
            options={campaignsOptions}
          />
          <StyledHint>
            <HintText>{t("google_ads-create_group-h1")}</HintText>
            <InfoIcon />
          </StyledHint>
        </InputBox>
        <InputBox>
          <Input
            name="ad_group_name"
            type="text"
            placeholder="ad_group_name"
            label="ad_group_name"
            value={groupName}
            onChange={setGroupName}
          />
          <StyledHint>
            <HintText>{t("google_ads-create_group-h2")}</HintText>
            <InfoIcon />
          </StyledHint>
        </InputBox>
        {showClearButton && (
          <ClearButton onClick={handleClear} data-action={activityList["call-center-google-group_clear"]}>Clear all</ClearButton>
        )}
      </InputsContainer>
      {isFetching ? (
        <StyledLoader />
      ) : (
        <StyledAddBtn onClick={handleAdd} data-action={activityList["call-center-google-group_create"]}>Add a group</StyledAddBtn>
      )}
    </>
  );
});

export default CreateGroupComponent;
