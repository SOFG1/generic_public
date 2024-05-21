import React, { useCallback, useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { handle } from "../../api";
import { GoogleAds } from "../../api/googleAds";
import { useAppActions } from "../../store/app";
import { useGoogleAdsState } from "../../store/googleAds";
import { useUserState } from "../../store/user";
import { desktopBp } from "../../styles/variables";
import { Button } from "../../UI/Button";
import { CreateableDropdown } from "../../UI/CreateableDropdown";
import { Dropdown, DropdownWithSearch } from "../../UI/Dropdown";
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
  margin: 0 auto;
`;

const StyledLoader = styled(Loader)`
  margin: 0 auto;
`;

const ageRangeOptions = [
  { item: "AGE RANGE 18 24", value: "AGE_RANGE_18_24" },
  { item: "AGE RANGE 25 34", value: "AGE_RANGE_25_34" },
  { item: "AGE RANGE 35 44", value: "AGE_RANGE_35_44" },
  { item: "AGE RANGE 45 54", value: "AGE_RANGE_45_54" },
  { item: "AGE RANGE 55 64", value: "AGE_RANGE_55_64" },
  { item: "AGE RANGE 65 UP", value: "AGE_RANGE_65_UP" },
  { item: "AGE RANGE UNDETERMINED", value: "AGE_RANGE_UNDETERMINED" },
  { item: "UNKNOWN", value: "UNKNOWN" },
  { item: "UNSPECIFIED", value: "UNSPECIFIED" },
];

const genderOptions = [
  { item: "FEMALE", value: "FEMALE" },
  { item: "MALE", value: "MALE" },
  { item: "UNDETERMINED", value: "UNDETERMINED" },
  { item: "UNKNOWN", value: "UNKNOWN" },
  { item: "UNSPECIFIED", value: "UNSPECIFIED" },
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

const keywordTypeOptions = [
  { item: "BROAD", value: "BROAD" },
  { item: "EXACT", value: "EXACT" },
  { item: "PHRASE", value: "PHRASE" },
];

const parentalStatusOptions = [
  { item: "NOT_A_PARENT", value: "NOT_A_PARENT" },
  { item: "PARENT", value: "PARENT" },
  { item: "UNDETERMINED", value: "UNDETERMINED" },
  { item: "UNKNOWN", value: "UNKNOWN" },
  { item: "UNSPECIFIED", value: "UNSPECIFIED" },
];

const GroupCriteriaComponent = React.memo(() => {
  const { t } = useTranslation()
  const { token } = useUserState();
  const { onShowAlert } = useAppActions();
  const { campaigns, selectedCustomerId } = useGoogleAdsState();
  const [formData, setFormData] = useState<{ [key: string]: any }>({});
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [groupsOfSelectedCampaign, setGroupsOfSelectedCampaign] = useState<
    any[]
  >([]);

  const handleAdd = useCallback(async () => {
    const reqData: any = {
      customer_id: String(selectedCustomerId),
      ...formData,
    };
    if (reqData.keywords) {
      const words = reqData.keywords.split(", ").map((word: string) => ({
        match_type: reqData.keyword_match_type,
        text: word,
      }));
      reqData.keywords = words;
      delete reqData.keyword_match_type;
    }
    //Request
    if (token) {
      setIsFetching(true);
      const [dataRes, dataErr] = await handle(
        GoogleAds.setGroupCriteria(token, reqData)
      );
      setIsFetching(false);
      if (!dataErr) {
        onShowAlert(true, "Success");
      }
      if (dataErr) {
        onShowAlert(false, dataErr.error);
      }
    }
  }, [selectedCustomerId, formData, token]);

  const campaignsOptions = useMemo(() => {
    return campaigns.map((c) => ({ item: c.name, value: c.campaign_id }));
  }, [campaigns]);

  const fetchGroups = useCallback(
    async (campignId: number) => {
      if (token) {
        const [dataRes, dataErr] = await handle(
          GoogleAds.getGroups(token, campignId)
        );
        if (dataRes) {
          setGroupsOfSelectedCampaign(dataRes);
        }
        if (dataErr) {
          console.log(dataErr);
        }
      }
    },
    [token]
  );

  useEffect(() => {
    if (formData.campaign_id) fetchGroups(formData.campaign_id);
  }, [formData.campaign_id, fetchGroups]);

  const groupOptions = useMemo(() => {
    return groupsOfSelectedCampaign.map((g) => ({
      item: g.name,
      value: g.ad_group_id,
    }));
  }, [groupsOfSelectedCampaign]);

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

  const showClearButton = useMemo(() => {
    let isChanged = false;
    Object.values(formData).forEach((data) => {
      if (data) isChanged = true;
    });
    return isChanged;
  }, [formData]);

  const handleClear = () => {
    setFormData({});
  };

  return (
    <>
      <StyledTitle className = "styled_create_campaign_label">Create ad group criteria</StyledTitle>
      <InputsContainer className = "styled_create_campaign_inputs">
        <InputBox>
          <Dropdown
            placeholder="Campaign"
            label="Campaign"
            value={formData.campaign_id || ""}
            onSelect={(v) => setFormData((p) => ({ ...p, campaign_id: v }))}
            options={campaignsOptions}
          />
          <StyledHint>
            <HintText>{t("google_ads-criteria_group-h1")}</HintText>
            <InfoIcon />
          </StyledHint>
        </InputBox>

        <InputBox>
          <Dropdown
            placeholder="Ad Group"
            label="Ad Group"
            value={formData.ad_group_id || ""}
            onSelect={(v) => setFormData((p) => ({ ...p, ad_group_id: v }))}
            options={groupOptions}
          />
          <StyledHint>
            <HintText>{t("google_ads-criteria_group-h2")}</HintText>
            <InfoIcon />
          </StyledHint>
        </InputBox>

        <InputBox>
          <DropdownWithSearch
            placeholder="Age range"
            label="Age range"
            options={ageRangeOptions}
            value={formData.age_range || ""}
            onSelect={(v) => setFormData((p) => ({ ...p, age_range: v }))}
          />
          <StyledHint>
            <HintText>{t("google_ads-criteria_group-h3")}</HintText>
            <InfoIcon />
          </StyledHint>
        </InputBox>

        <InputBox>
          <DropdownWithSearch
            placeholder="Gender"
            label="Gender"
            options={genderOptions}
            value={formData.gender || ""}
            onSelect={(v) => setFormData((p) => ({ ...p, gender: v }))}
          />
          <StyledHint>
            <HintText>{t( "google_ads-criteria_group-h4")}</HintText>
            <InfoIcon />
          </StyledHint>
        </InputBox>

        <InputBox>
          <DropdownWithSearch
            placeholder="Income range"
            label="Income range"
            options={incomeRangeOptions}
            value={formData.income_range || ""}
            onSelect={(v) => setFormData((p) => ({ ...p, income_range: v }))}
          />
          <StyledHint>
            <HintText>{t("google_ads-criteria_group-h5")}</HintText>
            <InfoIcon />
          </StyledHint>
        </InputBox>

        <InputBox>
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
            <HintText>{t("google_ads-criteria_group-h6")}</HintText>
            <InfoIcon />
          </StyledHint>
        </InputBox>

        <InputBox>
          <Dropdown
            placeholder="parental status"
            label="parental status"
            value={formData.parental_status || ""}
            onSelect={(val) =>
              setFormData((prev) => ({ ...prev, parental_status: val }))
            }
            options={parentalStatusOptions}
          />
          <StyledHint>
            <HintText>{t("google_ads-criteria_group-h7")}</HintText>
            <InfoIcon />
          </StyledHint>
        </InputBox>

        {formData.keyword_match_type && (
          <InputBox>
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
               {t("google_ads-criteria_group-h8")}
              </HintText>
              <InfoIcon />
            </StyledHint>
          </InputBox>
        )}

        {showClearButton && (
          <ClearButton onClick={handleClear} data-action={activityList["call-center-google-group_criteria_clear"]}>Clear all</ClearButton>
        )}
      </InputsContainer>
      {isFetching ? (
        <StyledLoader />
      ) : (
        <StyledAddBtn onClick={handleAdd} data-action={activityList["call-center-google-group_criteria_create"]}>Add campaign</StyledAddBtn>
      )}
    </>
  );
});

export default GroupCriteriaComponent;
