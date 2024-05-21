import React, { useCallback, useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { handle } from "../../api";
import { GoogleAds } from "../../api/googleAds";
import { useAppActions } from "../../store/app";
import { useGoogleAdsActions, useGoogleAdsState } from "../../store/googleAds";
import { useUserState } from "../../store/user";
import { desktopBp } from "../../styles/variables";
import { Button } from "../../UI/Button";
import { Dropdown, DropdownWithSearch } from "../../UI/Dropdown";
import { Checkbox, Input } from "../../UI/Input";
import { HintText, StyledHint } from "../../UI/InputHint/InputHint";
import { Loader } from "../../UI/Spinners";
import { InfoIcon } from "../../UI/Svg";
import { isoCodes } from "../../utils/isoCodes";
import { Title } from "../common/Title";
import { activityList } from "../../config/userActivityList";
import { useTranslation } from "react-i18next";

const StyledTitle = styled(Title)`
  margin-top: 0;
  margin-bottom: 0.52vw;
  @media screen and (max-width: ${desktopBp}) {
    margin-bottom: 7px;
  }
`;

const InputsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.04vw;
  padding: 0.52vw 9.38vw;
  @media screen and (max-width: ${desktopBp}) {
    gap: 13px;
    padding: 7px 118px;
  }
  @media screen and (max-width: 800px) {
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

const RadioBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-inline-end: auto;
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
  margin: 0 auto 1.04vw;
  @media screen and (max-width: ${desktopBp}) {
    margin: 0 auto 13px;
  }
`;

const StyledDeleteImage = styled.button`
  padding: 0;
  border: 0;
  background-color: transparent;
  cursor: pointer;
`;

const channelOptions = [
  { item: "SEARCH", value: "SEARCH" },
  { item: "DISPLAY", value: "DISPLAY" },
  { item: "MULTI_CHANNEL", value: "MULTI_CHANNEL" },
];

const deliveryMethodOptions = [
  { item: "STANDART", value: "STANDART" },
  { item: "ACCELERATED", value: "ACCELERATED" },
];

const appStrategyVariants = [
  "OPTIMIZE_INSTALLS_TARGET_INSTALL_COST",
  "OPTIMIZE_INSTALLS_WITHOUT_TARGET_INSTALL_COST",
  "OPTIMIZE_IN_APP_CONVERSIONS_TARGET_CONVERSION_COST",
  "OPTIMIZE_IN_APP_CONVERSIONS_TARGET_INSTALL_COST",
  "OPTIMIZE_PRE_REGISTRATION_CONVERSION_VOLUME",
  "OPTIMIZE_RETURN_ON_ADVERTISING_SPEND",
];

const statusOptions = [
  { item: "ENABLED", value: "ENABLED" },
  { item: "PAUSED", value: "PAUSED" },
  { item: "REMOVED", value: "REMOVED" },
];

const CreateCampaignComponent = React.memo(() => {
  const { t } = useTranslation()
  const { token } = useUserState();
  const { selectedCustomerId } = useGoogleAdsState();
  const { onGetCampaigns } = useGoogleAdsActions();
  const { onShowAlert } = useAppActions();
  const [campaignName, setCampaignName] = useState<string>("");
  const [selectedChannelType, setSelectedChannelType] = useState<string>("");
  const [deliveryMethod, setDeliveryMethod] = useState<string>("ACCELERATED");
  const [budgetMicros, setBudgetMicros] = useState<string>("");
  const [formData, setFormData] = useState<{ [key: string]: any }>({});
  const [isFetching, setIsFetching] = useState<boolean>(false);

  const subChannelOptions = useMemo(() => {
    if (selectedChannelType === "SEARCH") {
      return [
        { item: "SEARCH_MOBILE_APP", value: "SEARCH_MOBILE_APP" },
        { item: "SEARCH_EXPRESS", value: "SEARCH_EXPRESS" },
      ];
    }
    if (selectedChannelType === "DISPLAY") {
      return [
        { item: "DISPLAY_GMAIL_AD", value: "DISPLAY_GMAIL_AD" },
        { item: "DISPLAY_SMART_CAMPAIGN", value: "DISPLAY_SMART_CAMPAIGN" },
        { item: "DISPLAY_MOBILE_APP", value: "DISPLAY_MOBILE_APP" },
      ];
    }
    if (selectedChannelType === "MULTI_CHANNEL") {
      return [{ item: "APP_CAMPAIGN", value: "APP_CAMPAIGN" }];
    }
    return [];
  }, [selectedChannelType]);

  const handleAdd = useCallback(async () => {
    const reqData: any = {
      customer_id: String(selectedCustomerId),
      campaign_name: campaignName,
      channel_type: selectedChannelType,
      delivery_method: deliveryMethod,
      ...formData,
    };
    if (budgetMicros) {
      reqData.budget_micros = parseInt(budgetMicros, 10) * 1000000;
    }
    if (formData.target_cpa_micros) {
      reqData.target_cpa_micros =
        parseInt(formData.target_cpa_micros, 10) * 1000000;
    }
    if (token) {
      setIsFetching(true);
      const [dataRes, dataErr] = await handle(
        GoogleAds.createCampaign(token, reqData)
      );
      setIsFetching(false);
      if (!dataErr) {
        onShowAlert(true, "Success");
        onGetCampaigns();
      }
      if (dataErr) {
        onShowAlert(false, dataErr.error);
      }
    }
  }, [
    token,
    selectedCustomerId,
    campaignName,
    selectedChannelType,
    deliveryMethod,
    budgetMicros,
    formData,
  ]);

  const showClearButton = useMemo(() => {
    let formDataChanged = false;
    if (
      campaignName ||
      selectedChannelType ||
      deliveryMethod !== "STANDART" ||
      budgetMicros
    )
      formDataChanged = true;
    Object.values(formData).forEach((data) => {
      if (data) formDataChanged = true;
    });
    return formDataChanged;
  }, [
    campaignName,
    selectedChannelType,
    deliveryMethod,
    budgetMicros,
    formData,
  ]);

  const handleClear = () => {
    setCampaignName("");
    setSelectedChannelType("");
    setDeliveryMethod("ACCELERATED");
    setBudgetMicros("");
    setFormData({});
  };

  useEffect(() => {
    setFormData({});
  }, [selectedChannelType]);

  return (
    <>
      <StyledTitle>Create campaign</StyledTitle>
      <InputsContainer className = "styled_create_campaign_inputs">
        <InputBox>
          <Input
            name="campaign_name"
            type="text"
            placeholder="campaign_name"
            label="campaign_name"
            value={campaignName}
            onChange={setCampaignName}
          />
          <StyledHint>
            <HintText>{t("google_ads-create_campaign-h1")}</HintText>
            <InfoIcon />
          </StyledHint>
        </InputBox>

        <InputBox>
          <Input
            name="budget"
            type="number"
            placeholder="Daily Budget"
            label="Daily Budget"
            value={budgetMicros}
            onChange={setBudgetMicros}
          />
          <StyledHint>
            <HintText>{t("google_ads-create_campaign-h2")}</HintText>
            <InfoIcon />
          </StyledHint>
        </InputBox>

        <InputBox>
          <Dropdown
            placeholder="delivery_method"
            label="delivery_method"
            value={deliveryMethod}
            onSelect={setDeliveryMethod}
            options={deliveryMethodOptions}
          />
          <StyledHint>
            <HintText>
              {t("google_ads-create_campaign-h3")}
            </HintText>
            <InfoIcon />
          </StyledHint>
        </InputBox>

        <InputBox>
          <Dropdown
            label="channel_type"
            placeholder="channel_type"
            value={selectedChannelType}
            onSelect={setSelectedChannelType}
            options={channelOptions}
          />
          <StyledHint>
            <HintText>
              {t("google_ads-create_campaign-h4")}
            </HintText>
            <InfoIcon />
          </StyledHint>
        </InputBox>

        <InputBox>
          <Dropdown
            placeholder="Status"
            label="Status"
            options={statusOptions}
            value={formData.status || ""}
            onSelect={(v) => setFormData((p) => ({ ...p, status: v }))}
          />
          <StyledHint>
            <HintText>{t("google_ads-create_campaign-h5")}</HintText>
            <InfoIcon />
          </StyledHint>
        </InputBox>

        {selectedChannelType === "SEARCH" && (
          <>
            <InputBox>
              <Input
                name="domain_name"
                type="text"
                placeholder="domain_name"
                label="domain_name"
                value={formData.domain_name || ""}
                onChange={(v) => setFormData((p) => ({ ...p, domain_name: v }))}
              />
              <StyledHint>
                <HintText>
                  {t("google_ads-create_campaign-h6")}
                </HintText>
                <InfoIcon />
              </StyledHint>
            </InputBox>

            <InputBox>
              <DropdownWithSearch
                label="language_code"
                placeholder="language_code"
                value={formData.language_code || ""}
                options={isoCodes}
                onSelect={(v) =>
                  setFormData((p) => ({ ...p, language_code: v }))
                }
              />
              <StyledHint>
                <HintText>
                  {t("google_ads-create_campaign-h7")}
                </HintText>
                <InfoIcon />
              </StyledHint>
            </InputBox>

            {/* <InputBox>
                <DropdownWithSearch
                  label="channel_sub_type"
                  placeholder="channel_sub_type"
                  value={formData.channel_sub_type || ""}
                  options={subChannelOptions}
                  onSelect={(v) =>
                    setFormData((p) => ({ ...p, channel_sub_type: v }))
                  }
                />
                <StyledHint>
                  <HintText>
                    Immutable. Optional refinement to advertising_channel_type.
                    Must be a valid sub-type of the parent channel type. Can be
                    set only when creating campaigns. After campaign is created,
                    the field can not be changed.
                  </HintText>
                  <InfoIcon />
                </StyledHint>
              </InputBox> */}
          </>
        )}
        {selectedChannelType === "DISPLAY" && (
          <>
            {/* <InputBox>
                <DropdownWithSearch
                  label="channel_sub_type"
                  placeholder="channel_sub_type"
                  value={formData.channel_sub_type || ""}
                  options={subChannelOptions}
                  onSelect={(v) =>
                    setFormData((p) => ({ ...p, channel_sub_type: v }))
                  }
                />
                <StyledHint>
                  <HintText>
                    Immutable. Optional refinement to advertising_channel_type.
                    Must be a valid sub-type of the parent channel type. Can be
                    set only when creating campaigns. After campaign is created,
                    the field can not be changed.
                  </HintText>
                  <InfoIcon />
                </StyledHint>
              </InputBox> */}

            <InputBox>
              <Input
                name="target_cpa_micros"
                type="number"
                placeholder="target_cpa"
                label="target_cpa"
                value={formData.target_cpa_micros || ""}
                onChange={(v) =>
                  setFormData((p) => ({ ...p, target_cpa_micros: v }))
                }
              />
              <StyledHint>
                <HintText>
                  {t("google_ads-create_campaign-h8")}
                </HintText>
                <InfoIcon />
              </StyledHint>
            </InputBox>
          </>
        )}
        {selectedChannelType === "MULTI_CHANNEL" && (
          <>
            <InputBox>
              <Input
                name="target_cpa_micros"
                type="number"
                placeholder="target_cpa"
                label="target_cpa"
                value={formData.target_cpa_micros || ""}
                onChange={(v) =>
                  setFormData((p) => ({ ...p, target_cpa_micros: v }))
                }
              />
              <StyledHint>
                <HintText>
                  {t("google_ads-create_campaign-h9")}
                </HintText>
                <InfoIcon />
              </StyledHint>
            </InputBox>

            <InputBox>
              <Input
                name="app_id"
                type="text"
                placeholder="app_id"
                label="app_id"
                value={formData.app_id || ""}
                onChange={(v) => setFormData((p) => ({ ...p, app_id: v }))}
              />
              <StyledHint>
                <HintText>
                  {t("google_ads-create_campaign-h10")}
                </HintText>
                <InfoIcon />
              </StyledHint>
            </InputBox>

            <InputBox>
              <p>app_store</p>
              <RadioBox>
                <Checkbox
                  label="APPLE"
                  isActive={formData.app_store === "APPLE"}
                  onChange={() =>
                    setFormData((p) => ({ ...p, app_store: "APPLE" }))
                  }
                />
                <Checkbox
                  label="GOOGLE"
                  isActive={formData.app_store === "GOOGLE"}
                  onChange={() =>
                    setFormData((p) => ({ ...p, app_store: "GOOGLE" }))
                  }
                />
              </RadioBox>

              <StyledHint>
                <HintText>
                  {t("google_ads-create_campaign-h11")}
                </HintText>
                <InfoIcon />
              </StyledHint>
            </InputBox>

            <InputBox>
              <p>app_strategy</p>
              <RadioBox>
                {appStrategyVariants.map((v) => {
                  return (
                    <Checkbox
                      key={v}
                      label={v}
                      isActive={formData.app_strategy === v}
                      onChange={() =>
                        setFormData((p) => ({ ...p, app_strategy: v }))
                      }
                    />
                  );
                })}
              </RadioBox>
              <StyledHint>
                <HintText>
                  {t("google_ads-create_campaign-h12")}
                </HintText>
                <InfoIcon />
              </StyledHint>
            </InputBox>

            <InputBox>
              <DropdownWithSearch
                label="channel_sub_type"
                placeholder="channel_sub_type"
                value={formData.channel_sub_type || ""}
                options={subChannelOptions}
                onSelect={(v) =>
                  setFormData((p) => ({ ...p, channel_sub_type: v }))
                }
              />
              <StyledHint>
                <HintText>
                  {t("google_ads-create_campaign-h13")}
                </HintText>
                <InfoIcon />
              </StyledHint>
            </InputBox>
          </>
        )}
        {showClearButton && (
          <ClearButton onClick={handleClear}>Clear all</ClearButton>
        )}
      </InputsContainer>
      {isFetching ? (
        <StyledLoader />
      ) : (
        <StyledAddBtn onClick={handleAdd} data-action={activityList["call-center-google-campaign_create"]}>Add campaign</StyledAddBtn>
      )}
    </>
  );
});

export default CreateCampaignComponent;
