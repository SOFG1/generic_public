import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { handle } from "../../api";
import { GoogleAds } from "../../api/googleAds";
import { useAppActions } from "../../store/app";
import { useGoogleAdsState } from "../../store/googleAds";
import { useSettingsState } from "../../store/settings";
import { useUserState } from "../../store/user";
import { desktopBp } from "../../styles/variables";
import { Button } from "../../UI/Button";
import { CreateableDropdown } from "../../UI/CreateableDropdown";
import { Dropdown, DropdownWithSearch } from "../../UI/Dropdown";
import { Checkbox, Input, InputFile } from "../../UI/Input";
import { HintText, StyledHint } from "../../UI/InputHint/InputHint";
import { Loader } from "../../UI/Spinners";
import { EuroIcon, InfoIcon } from "../../UI/Svg";
import { isoCodes } from "../../utils/isoCodes";
import { Text } from "../common/Text";
import { Title } from "../common/Title";
import StringListComponent from "./StringListComponent";
import { activityList } from "../../config/userActivityList";

const StyledTitle = styled(Title)`
  margin-top: 0;
`;

const StyledInputsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.04vw;
  max-width: 38.54vw;
  padding-bottom: 7.81vw;
  margin: 0 auto;
  @media screen and (max-width: ${desktopBp}) {
    gap: 13px;
    max-width: 38.54vw;
    padding-bottom: 98px;
  }
  @media screen and (max-width: 550px) {
    padding-bottom: 20px;
  }
`;

const StyledInputBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.52vw;
  min-width: 22.66vw;
  @media screen and (max-width: ${desktopBp}) {
    gap: 7px;
    min-width: 284px;
  }
  @media screen and (max-width: 550px) {
    min-width: 0;
  }
`;

const StyledInput = styled(Input)`
  overflow: hidden;
  textarea {
    resize: vertical;
    min-height: 4.17vw;
    @media screen and (max-width: ${desktopBp}) {
      min-height: 52px;
    }
  }
`;

const TitleStyled = styled(Title)`
  margin-bottom: 0.52vw;
  margin-top: 0;
  @media screen and (max-width: ${desktopBp}) {
    margin-bottom: 7px;
  }
`;
const TextStyled = styled(Text)`
  margin-bottom: 0.52vw;
  margin-top: 0;
  text-decoration: underline;
  cursor: pointer;
  @media screen and (max-width: ${desktopBp}) {
    margin-bottom: 7px;
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
  margin: 0 auto;
`;

const StyledLoader = styled(Loader)`
  margin: 0 auto;
`;

const MapingColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const RadioBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-inline-end: auto;
`;

const StyledGendersMaping = styled.div`
  display: flex;
  align-items: center;
  gap: 1.56vw;
  p {
    min-width: 4.17vw;
  }
  @media screen and (max-width: ${desktopBp}) {
    gap: 20px;
    p {
      min-width: 52px;
    }
  }
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

const genderOptions = [
  { item: "FEMALE", value: "FEMALE" },
  { item: "MALE", value: "MALE" },
  { item: "UNDETERMINED", value: "UNDETERMINED" },
  { item: "UNKNOWN", value: "UNKNOWN" },
  { item: "UNSPECIFIED", value: "UNSPECIFIED" },
];

const keywordTypeOptions = [
  { item: "BROAD", value: "BROAD" },
  { item: "EXACT", value: "EXACT" },
  { item: "PHRASE", value: "PHRASE" },
];

const incomeRangeOptions = [
  { item: "INCOME RANGE 0 50", value: "INCOME_RANGE_0_50" },
  { item: "INCOME RANGE 50 60", value: "INCOME_RANGE_50_60" },
  { item: "INCOME RANGE 60 70", value: "INCOME_RANGE_60_70" },
  { item: "INCOME RANGE 70 80", value: "INCOME_RANGE_70_80" },
  { item: "INCOME RANGE 80 90", value: "INCOME_RANGE_80_90" },
  { item: "INCOME RANGE 90 UP", value: "INCOME_RANGE_90_UP" },
  { item: "INCOME RANGE UNDETERMINED", value: "INCOME_RANGE_UNDETERMINED" },
  { item: "UNKNOWN", value: "UNKNOWN" },
  { item: "UNSPECIFIED", value: "UNSPECIFIED" },
];

const statusOptions = [
  { item: "ENABLED", value: "ENABLED" },
  { item: "PAUSED", value: "PAUSED" },
  { item: "REMOVED", value: "REMOVED" },
];

const subChannelOptions = [{ item: "APP_CAMPAIGN", value: "APP_CAMPAIGN" }];

const appStrategyVariants = [
  "OPTIMIZE_INSTALLS_TARGET_INSTALL_COST",
  "OPTIMIZE_INSTALLS_WITHOUT_TARGET_INSTALL_COST",
  "OPTIMIZE_IN_APP_CONVERSIONS_TARGET_CONVERSION_COST",
  "OPTIMIZE_IN_APP_CONVERSIONS_TARGET_INSTALL_COST",
  "OPTIMIZE_PRE_REGISTRATION_CONVERSION_VOLUME",
  "OPTIMIZE_RETURN_ON_ADVERTISING_SPEND",
];

const initialFormData = {
  delivery_method: "ACCELERATED",
};

const AudienceCampaignComponent = React.memo(() => {
  const { t } = useTranslation();
  const { token } = useUserState();
  const { selectedCustomerId } = useGoogleAdsState();
  const { audiences } = useSettingsState();
  const { onShowAlert } = useAppActions();
  const [formData, setFormData] = useState<{ [key: string]: any }>(
    initialFormData
  );
  const [isFetching, setIsFetching] = useState<boolean>(false);

  const isFormDataValid: true | string = useMemo(() => {
    let isValid: true | string = true;
    //text_headlines_assets && text_description_assets
    const filteredHeadlines = formData?.text_headlines_assets?.filter(
      (str: string) => str !== ""
    );
    const filteredDescs = formData?.text_description_assets?.filter(
      (str: string) => str !== ""
    );
    if (formData.channel_type === "SEARCH") {
      if (!(filteredHeadlines?.length > 3) || !(filteredDescs?.length > 3)) {
        isValid =
          "Please enter minimum 4 options for text_description_assets and text_description_assets";
      }
    }
    if (formData.channel_type === "DISPLAY") {
      if (!(filteredHeadlines?.length > 0) || !(filteredDescs?.length > 0)) {
        isValid =
          "Please enter minimum 1 option for text_description_assets and text_description_assets";
      }
    }
    //Gender mapping validation
    if (formData.gender_mapping) {
      Object.values(formData.gender_mapping).forEach((val) => {
        if (val === "") isValid = "Please, complete gender mapping";
      });
    }
    //Images validation
    if (
      formData.channel_type === "DISPLAY" ||
      formData.channel_type === "MULTI_CHANNEL"
    ) {
      if (!formData.image || !formData.square_image)
        isValid = "Please, upload your images";
    }
    //Couldn't fill the 2nd part when the 1st is empty
    if (
      !formData.responsive_search_ad_path2 &&
      formData.responsive_search_ad_path1
    ) {
      isValid = "This field can only be set when path1 is also set.";
    }
    return isValid;
  }, [formData]);

  const handleAdd = useCallback(async () => {
    if (typeof isFormDataValid === "string") {
      onShowAlert(false, isFormDataValid);
      return;
    }
    const reqData: any = {
      customer_id: String(selectedCustomerId),
      city_targeting: true,
      gender_targeting: true,
      age_range_targeting: true,
      ...formData,
    };
    if (reqData.budget_micros) {
      reqData.budget_micros = parseInt(reqData.budget_micros, 10) * 1000000;
    }
    if (formData.target_cpa_micros) {
      reqData.target_cpa_micros =
        parseInt(formData.target_cpa_micros, 10) * 1000000;
    }
    if (reqData.final_urls) {
      reqData.final_urls = [reqData.final_urls];
    }
    if (reqData.text_headlines_assets) {
      reqData.text_headlines_assets = reqData.text_headlines_assets.filter(
        (string: string) => string !== ""
      );
    }
    if (reqData.text_description_assets) {
      reqData.text_description_assets = reqData.text_description_assets.filter(
        (string: string) => string !== ""
      );
    }
    if (reqData.keywords) {
      const words = reqData.keywords.split(", ").map((word: string) => ({
        match_type: reqData.keyword_match_type,
        text: word,
      }));
      reqData.keywords = words;
      delete reqData.keyword_match_type;
    }
    //Upload image separately
    if (formData.image && token) {
      setIsFetching(true);
      const [dataRes, dataErr] = await handle(
        GoogleAds.uploadImage(token, String(selectedCustomerId), formData.image)
      );
      if (dataRes) {
        reqData.image_resource = dataRes.image_resource_name;
        reqData.square_image_resource = dataRes.image_resource_name;
      }
      if (dataErr) {
        console.log(dataErr);
      }
      delete reqData.image;
    }

    //Upload square image separately
    if (formData.square_image && token) {
      setIsFetching(true);
      const [dataRes, dataErr] = await handle(
        GoogleAds.uploadImage(
          token,
          String(selectedCustomerId),
          formData.square_image
        )
      );
      if (dataRes) {
        reqData.square_image_resource = dataRes.image_resource_name;
      }
      if (dataErr) {
        console.log(dataErr);
      }
      delete reqData.square_image;
    }
    //Request
    if (token) {
      setIsFetching(true);
      const [dataRes, dataErr] = await handle(
        GoogleAds.createCampaignWithAudience(token, reqData)
      );
      setIsFetching(false);
      if (!dataErr) {
        onShowAlert(true, "Success");
      }
      if (dataErr) {
        onShowAlert(false, dataErr.error);
      }
    }
  }, [selectedCustomerId, formData, token, isFormDataValid]);

  const audiencesOptions = useMemo(() => {
    return audiences.map((a) => ({ item: a.name, value: a.id }));
  }, [audiences]);

  const showClearButton = useMemo(() => {
    let isChanged = false;
    Object.values(formData).forEach((data) => {
      if (data) isChanged = true;
    });
    return isChanged;
  }, [formData]);

  const handleClear = () => {
    setFormData(initialFormData);
  };

  const handleChangeKeywords = (values: { value: string; label: string }[]) => {
    const strings = values.map((v) => v.value);
    const allLessThan80Chars = strings.every((str) => str.length < 81);
    if (allLessThan80Chars && strings.length <= 10) {
      setFormData((p) => ({ ...p, keywords: strings.join(", ") }));
    }
    if (!allLessThan80Chars || strings.length > 10) {
      onShowAlert(
        false,
        "You could add max 10 keywords and each one should contain max 80 charactes."
      );
    }
  };

  const handleChangeGenders = (key: string, value: string) => {
    setFormData((p) => ({
      ...p,
      gender_mapping: { ...p.gender_mapping, [key]: value },
    }));
  };

  //final_urls must always start with: https://
  useEffect(() => {
    if (
      formData.hasOwnProperty("final_urls") &&
      formData.final_urls.slice(0, 8) !== "https://"
    ) {
      setFormData((p) => ({ ...p, final_urls: "https://" }));
    }
  }, [formData.final_urls]);

  const fetchGenders = useCallback(async () => {
    if (token && formData.audience_id) {
      const [dataRes, dataErr] = await handle(
        GoogleAds.getGenders(token, formData.audience_id)
      );
      if (dataRes) {
        const genders: { [key: string]: string } = {};
        dataRes.forEach((g: string) => (genders[g] = ""));
        setFormData((p) => ({ ...p, gender_mapping: genders }));
      }
      if (dataErr) {
        console.log(dataErr);
      }
    }
  }, [token, formData.audience_id]);

  useEffect(() => {
    fetchGenders();
  }, [fetchGenders]);

  return (
    <>
      <StyledTitle>{t("google_ads-audience_campaign")}</StyledTitle>
      <StyledInputsContainer>
        <StyledInputBox>
          <Dropdown
            placeholder="Audience"
            label="Audience"
            value={formData.audience_id || 0}
            onSelect={(val) =>
              setFormData((prev) => ({ ...prev, audience_id: val }))
            }
            options={audiencesOptions}
          />
          <StyledHint>
            <HintText>
              {t("google_ads-audience_campaign-h1")}
            </HintText>
            <InfoIcon />
          </StyledHint>
        </StyledInputBox>

        <StyledInputBox>
          <StyledInput
            name="campaign_name"
            type="text"
            placeholder="campaign_name"
            label="campaign_name"
            value={formData.campaign_name || ""}
            onChange={(val) =>
              setFormData((prev) => ({ ...prev, campaign_name: val }))
            }
          />
          <StyledHint>
            <HintText>{t("google_ads-audience_campaign-h2")}</HintText>
            <InfoIcon />
          </StyledHint>
        </StyledInputBox>

        <StyledInputBox>
          <StyledInput
            name="budget_micros"
            type="number"
            placeholder="Daily Budget"
            label="Daily Budget"
            value={formData.budget_micros || ""}
            onChange={(val) =>
              setFormData((prev) => ({ ...prev, budget_micros: val }))
            }
          />
          <StyledHint>
            <HintText>{t("google_ads-audience_campaign-h3")}</HintText>
            <EuroIcon />
          </StyledHint>
        </StyledInputBox>

        <StyledInputBox>
          <Dropdown
            label="channel_type"
            placeholder="channel_type"
            value={formData.channel_type || ""}
            onSelect={(val) =>
              setFormData((prev) => ({ ...prev, channel_type: val }))
            }
            options={channelOptions}
          />
          <StyledHint>
            <HintText>{t("google_ads-audience_campaign-h4")} </HintText>
            <InfoIcon />
          </StyledHint>
        </StyledInputBox>

        <StyledInputBox>
          <Dropdown
            placeholder="delivery_method"
            label="delivery_method"
            value={formData.delivery_method || ""}
            onSelect={(val) =>
              setFormData((prev) => ({ ...prev, delivery_method: val }))
            }
            options={deliveryMethodOptions}
          />
          <StyledHint>
            <HintText>
              {t("google_ads-audience_campaign-h5")}
            </HintText>
            <InfoIcon />
          </StyledHint>
        </StyledInputBox>

        <StyledInputBox>
          <StyledInput
            name="ad_group_name"
            type="text"
            placeholder="ad_group_name"
            label="ad_group_name"
            value={formData.ad_group_name || ""}
            onChange={(val) =>
              setFormData((prev) => ({ ...prev, ad_group_name: val }))
            }
          />
          <StyledHint>
            <HintText>{t("google_ads-audience_campaign-h6")}</HintText>
            <InfoIcon />
          </StyledHint>
        </StyledInputBox>

        <StyledInputBox>
          <DropdownWithSearch
            placeholder="Income range"
            label="Income range"
            options={incomeRangeOptions}
            value={formData.income_range || ""}
            onSelect={(v) => setFormData((p) => ({ ...p, income_range: v }))}
          />
          <StyledHint>
            <HintText>{t("google_ads-audience_campaign-h7")}</HintText>
            <InfoIcon />
          </StyledHint>
        </StyledInputBox>

        <StyledInputBox>
          <Dropdown
            placeholder="Status"
            label="Status"
            options={statusOptions}
            value={formData.status || ""}
            onSelect={(v) => setFormData((p) => ({ ...p, status: v }))}
          />
          <StyledHint>
            <HintText>{t("google_ads-audience_campaign-h8")}</HintText>
            <InfoIcon />
          </StyledHint>
        </StyledInputBox>

        {formData.gender_mapping && (
          <StyledInputBox>
            <MapingColumn>
              {Object.keys(formData.gender_mapping).map((gender) => {
                return (
                  <StyledGendersMaping key={gender}>
                    <p>{gender}</p>
                    <Dropdown
                      value={formData.gender_mapping[gender]}
                      placeholder="Gender"
                      label="Gender"
                      onSelect={(value) => handleChangeGenders(gender, value)}
                      options={genderOptions}
                    />
                  </StyledGendersMaping>
                );
              })}
            </MapingColumn>
            <StyledHint>
              <HintText>{t("google_ads-audience_campaign-h9")}</HintText>
              <InfoIcon />
            </StyledHint>
          </StyledInputBox>
        )}

        <StyledInputBox>
          <Dropdown
            placeholder="keyword_match_type"
            label="keyword_match_type"
            value={formData.keyword_match_type || ""}
            onSelect={(val) =>
              setFormData((prev) => ({ ...prev, keyword_match_type: val }))
            }
            options={keywordTypeOptions}
          />
          <StyledHint>
            <HintText>{t("google_ads-audience_campaign-h10")}</HintText>
            <InfoIcon />
          </StyledHint>
        </StyledInputBox>

        {formData.keyword_match_type && (
          <StyledInputBox>
            <CreateableDropdown
              placeholder="Add keywords"
              value={
                formData.keywords
                  ? formData?.keywords
                    ?.split(", ")
                    .map((value: string) => ({ value, label: value }))
                  : []
              }
              options={[]}
              onChange={handleChangeKeywords}
            />
            <StyledHint>
              <HintText>
                {t("google_ads-audience_campaign-h11")}
              </HintText>
              <InfoIcon />
            </StyledHint>
          </StyledInputBox>
        )}

        {formData.channel_type === "SEARCH" && (
          <>
            <StyledInputBox>
              <StyledInput
                name="final_urls"
                type="text"
                placeholder="final_urls"
                label="final_urls"
                value={formData.final_urls || "https://"}
                onChange={(v) => setFormData((p) => ({ ...p, final_urls: v }))}
              />
              <StyledHint>
                <HintText>{t("google_ads-audience_campaign-h12")}</HintText>
                <InfoIcon />
              </StyledHint>
            </StyledInputBox>

            <StyledInputBox>
              <StyledInput
                name="domain_name"
                type="text"
                placeholder="domain_name"
                label="domain_name"
                value={formData.domain_name || ""}
                onChange={(v) => setFormData((p) => ({ ...p, domain_name: v }))}
              />
              <StyledHint>
                <HintText>{t("google_ads-audience_campaign-h13")}</HintText>
                <InfoIcon />
              </StyledHint>
            </StyledInputBox>

            <StyledInputBox>
              <p>text_headlines_assets</p>
              <StringListComponent
                onChange={(v) =>
                  setFormData((p) => ({ ...p, text_headlines_assets: v }))
                }
                values={formData.text_headlines_assets || [""]}
              />
              <StyledHint>
                <HintText>{t("google_ads-audience_campaign-h14")}
                </HintText>
                <InfoIcon />
              </StyledHint>
            </StyledInputBox>

            <StyledInputBox>
              <p>text_description_assets</p>
              <StringListComponent
                onChange={(v) =>
                  setFormData((p) => ({ ...p, text_description_assets: v }))
                }
                values={formData.text_description_assets || [""]}
              />
              <StyledHint>
                <HintText>
                  {t("google_ads-audience_campaign-h16")}
                </HintText>
                <InfoIcon />
              </StyledHint>
            </StyledInputBox>

            <StyledInputBox>
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
                  {t("google_ads-audience_campaign-h17")}
                </HintText>
                <InfoIcon />
              </StyledHint>
            </StyledInputBox>

            <StyledInputBox>
              <StyledInput
                name="responsive_search_ad_path1"
                type="text"
                placeholder="responsive_search_ad_path1"
                label="responsive_search_ad_path1"
                value={formData.responsive_search_ad_path1 || ""}
                onChange={(v) =>
                  setFormData((p) => ({ ...p, responsive_search_ad_path1: v }))
                }
              />
              <StyledHint>
                <HintText>
                  {t("google_ads-audience_campaign-h18")}
                </HintText>
                <InfoIcon />
              </StyledHint>
            </StyledInputBox>

            <StyledInputBox>
              <StyledInput
                name="responsive_search_ad_path2"
                type="text"
                placeholder="responsive_search_ad_path2"
                label="responsive_search_ad_path2"
                disabled={!formData.responsive_search_ad_path1}
                value={formData.responsive_search_ad_path2 || ""}
                onChange={(v) =>
                  setFormData((p) => ({ ...p, responsive_search_ad_path2: v }))
                }
              />
              <StyledHint>
                <HintText>
                  {t("google_ads-audience_campaign-h19")}
                </HintText>
                <InfoIcon />
              </StyledHint>
            </StyledInputBox>
          </>
        )}

        {formData.channel_type === "DISPLAY" && (
          <>
            <StyledInputBox>
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
                  {t("google_ads-audience_campaign-h20")}
                </HintText>
                <InfoIcon />
              </StyledHint>
            </StyledInputBox>

            <StyledInputBox>
              <StyledInput
                name="final_urls"
                type="text"
                placeholder="final_urls"
                label="final_urls"
                value={formData.final_urls || ""}
                onChange={(v) => setFormData((p) => ({ ...p, final_urls: v }))}
              />
              <StyledHint>
                <HintText>{t("google_ads-audience_campaign-h21")}</HintText>
                <InfoIcon />
              </StyledHint>
            </StyledInputBox>

            <StyledInputBox>
              <StyledInput
                name="business_name"
                type="text"
                placeholder="business_name"
                label="business_name"
                value={formData.business_name || ""}
                onChange={(v) =>
                  setFormData((p) => ({ ...p, business_name: v }))
                }
              />
              <StyledHint>
                <HintText>{t("google_ads-audience_campaign-h22")}</HintText>
                <InfoIcon />
              </StyledHint>
            </StyledInputBox>

            <StyledInputBox>
              <StyledInput
                name="long_headline"
                type="text"
                placeholder="long_headline"
                label="long_headline"
                value={formData.long_headline || ""}
                onChange={(v) =>
                  setFormData((p) => ({ ...p, long_headline: v }))
                }
              />
              <StyledHint>
                <HintText>{t("google_ads-audience_campaign-h23")}</HintText>
                <InfoIcon />
              </StyledHint>
            </StyledInputBox>

            <StyledInputBox>
              <p>text_headlines_assets</p>
              <StringListComponent
                onChange={(v) =>
                  setFormData((p) => ({ ...p, text_headlines_assets: v }))
                }
                values={formData.text_headlines_assets || [""]}
              />
              <StyledHint>
                <HintText>
                  {t("google_ads-audience_campaign-h24")}
                </HintText>
                <InfoIcon />
              </StyledHint>
            </StyledInputBox>

            <StyledInputBox>
              <p>text_description_assets</p>
              <StringListComponent
                onChange={(v) =>
                  setFormData((p) => ({ ...p, text_description_assets: v }))
                }
                values={formData.text_description_assets || [""]}
              />
              <StyledHint>
                <HintText>
                  {t("google_ads-audience_campaign-h25")}
                </HintText>
                <InfoIcon />
              </StyledHint>
            </StyledInputBox>

            <StyledInputBox>
              <StyledInput
                name="call_to_action_text"
                type="text"
                placeholder="call_to_action_text"
                label="call_to_action_text"
                value={formData.call_to_action_text || ""}
                onChange={(v) =>
                  setFormData((p) => ({ ...p, call_to_action_text: v }))
                }
              />
              <StyledHint>
                <HintText>{t("google_ads-audience_campaign-h26")}</HintText>
                <InfoIcon />
              </StyledHint>
            </StyledInputBox>

            <StyledInputBox>
              <StyledInput
                name="price_prefix"
                type="text"
                placeholder="price_prefix"
                label="price_prefix"
                value={formData.price_prefix || ""}
                onChange={(v) =>
                  setFormData((p) => ({ ...p, price_prefix: v }))
                }
              />
              <StyledHint>
                <HintText>
                  {t("google_ads-audience_campaign-h27")}
                </HintText>
                <InfoIcon />
              </StyledHint>
            </StyledInputBox>

            <StyledInputBox>
              <StyledInput
                name="promo_text"
                type="text"
                placeholder="promo_text"
                label="promo_text"
                value={formData.promo_text || ""}
                onChange={(v) => setFormData((p) => ({ ...p, promo_text: v }))}
              />
              <StyledHint>
                <HintText>
                  {t("google_ads-audience_campaign-h28")}
                </HintText>
                <InfoIcon />
              </StyledHint>
            </StyledInputBox>

            <StyledInputBox>
              <InputFile
                formats="image/png, image/gif, image/jpeg"
                placeholder="Image resource"
                label="Image resource"
                onChange={(v) => setFormData((p) => ({ ...p, image: v }))}
                content={
                  <>
                    <TitleStyled>{t("sign-up_logo-drop")}</TitleStyled>
                    <TextStyled>{t("sign-up_logo-upload")}</TextStyled>
                    <Text>{t("sign-up_logo-format")}</Text>
                  </>
                }
              />
              {formData.image && (
                <>
                  <p>{formData.image.name}</p>
                  {/* <StyledDeleteImage onClick={() => setFormData((p) => ({...p, image: null}))}>
                      <NoIcon />
                    </StyledDeleteImage> */}
                </>
              )}
              <StyledHint>
                <HintText>
                  {t("google_ads-audience_campaign-h29")}
                </HintText>
                <InfoIcon />
              </StyledHint>
            </StyledInputBox>

            <StyledInputBox>
              <InputFile
                formats="image/png, image/gif, image/jpeg"
                placeholder="Square image resource"
                label="Square image resource"
                onChange={(v) =>
                  setFormData((p) => ({ ...p, square_image: v }))
                }
                content={
                  <>
                    <TitleStyled>{t("sign-up_logo-drop")}</TitleStyled>
                    <TextStyled>{t("sign-up_logo-upload")}</TextStyled>
                    <Text>{t("sign-up_logo-format")}</Text>
                  </>
                }
              />
              {formData.square_image && (
                <>
                  <p>{formData.square_image.name}</p>
                  {/* <StyledDeleteImage onClick={() => setFormData((p) => ({...p, image: null}))}>
                      <NoIcon />
                    </StyledDeleteImage> */}
                </>
              )}
              <StyledHint>
                <HintText>
                  {t("google_ads-audience_campaign-h30")}
                </HintText>
                <InfoIcon />
              </StyledHint>
            </StyledInputBox>
          </>
        )}

        {formData.channel_type === "MULTI_CHANNEL" && (
          <>
            <StyledInputBox>
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
                  {t("google_ads-audience_campaign-h31")}
                </HintText>
                <InfoIcon />
              </StyledHint>
            </StyledInputBox>

            <StyledInputBox>
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
                  {t("google_ads-audience_campaign-h32")}
                </HintText>
                <InfoIcon />
              </StyledHint>
            </StyledInputBox>

            <StyledInputBox>
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
                  {t("google_ads-audience_campaign-h33")}
                </HintText>
                <InfoIcon />
              </StyledHint>
            </StyledInputBox>

            <StyledInputBox>
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
                  {t("google_ads-audience_campaign-h34")}
                </HintText>
                <InfoIcon />
              </StyledHint>
            </StyledInputBox>

            <StyledInputBox>
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
                  {t("google_ads-audience_campaign-h35")}
                </HintText>
                <InfoIcon />
              </StyledHint>
            </StyledInputBox>
            <StyledInputBox>
              <InputFile
                formats="image/png, image/gif, image/jpeg"
                placeholder="Image resource"
                label="Image resource"
                onChange={(v) => setFormData((p) => ({ ...p, image: v }))}
                content={
                  <>
                    <TitleStyled>{t("sign-up_logo-drop")}</TitleStyled>
                    <TextStyled>{t("sign-up_logo-upload")}</TextStyled>
                    <Text>{t("sign-up_logo-format")}</Text>
                  </>
                }
              />
              {formData.image && (
                <>
                  <p>{formData.image.name}</p>
                  {/* <StyledDeleteImage onClick={() => setFormData((p) => ({...p, image: null}))}>
                      <NoIcon />
                    </StyledDeleteImage> */}
                </>
              )}
              <StyledHint>
                <HintText>
                  {t("google_ads-audience_campaign-h36")}
                </HintText>
                <InfoIcon />
              </StyledHint>
            </StyledInputBox>

            <StyledInputBox>
              <InputFile
                formats="image/png, image/gif, image/jpeg"
                placeholder="Square image resource"
                label="Square image resource"
                onChange={(v) =>
                  setFormData((p) => ({ ...p, square_image: v }))
                }
                content={
                  <>
                    <TitleStyled>{t("sign-up_logo-drop")}</TitleStyled>
                    <TextStyled>{t("sign-up_logo-upload")}</TextStyled>
                    <Text>{t("sign-up_logo-format")}</Text>
                  </>
                }
              />
              {formData.square_image && (
                <>
                  <p>{formData.square_image.name}</p>
                  {/* <StyledDeleteImage onClick={() => setFormData((p) => ({...p, image: null}))}>
                      <NoIcon />
                    </StyledDeleteImage> */}
                </>
              )}
              <StyledHint>
                <HintText>
                  {t("google_ads-audience_campaign-h37")}
                </HintText>
                <InfoIcon />
              </StyledHint>
            </StyledInputBox>
          </>
        )}
        {showClearButton && (
          <ClearButton onClick={handleClear} data-action={activityList["call-center-google-audience_clear"]}>Clear all</ClearButton>
        )}
      </StyledInputsContainer>
      {isFetching ? (
        <StyledLoader />
      ) : (
        <StyledAddBtn onClick={handleAdd} data-action={activityList["call-center-google-audience_create"]}>Add campaign</StyledAddBtn>
      )}
    </>
  );
});

export default AudienceCampaignComponent;
