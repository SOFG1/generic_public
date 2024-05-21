import React, { useCallback, useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { handle } from "../../api";
import { GoogleAds } from "../../api/googleAds";
import { RawData } from "../../api/rawData";
import { useAppActions } from "../../store/app";
import { useGoogleAdsState } from "../../store/googleAds";
import { useUserState } from "../../store/user";
import { desktopBp } from "../../styles/variables";
import { Button } from "../../UI/Button";
import {
  Dropdown,
  DropdownSearchFetch,
  DropdownWithSearch,
} from "../../UI/Dropdown";
import { Input } from "../../UI/Input";
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

const CampaignCriteriaComponent = React.memo(() => {
  const { t } = useTranslation()
  const { token } = useUserState();
  const { campaigns, selectedCustomerId } = useGoogleAdsState();
  const { onShowAlert } = useAppActions();
  const [formData, setFormData] = useState<{ [key: string]: any }>({});
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [cityOptions, setCityOptions] = useState<
    { item: string; value: string }[]
  >([]);

  const campaignsOptions = useMemo(() => {
    return campaigns.map((c) => ({ item: c.name, value: c.campaign_id }));
  }, [campaigns]);

  const handleAdd = useCallback(async () => {
    const reqData: any = {
      customer_id: String(selectedCustomerId),
      ...formData,
    };
    if (formData.lang_list) {
      reqData.lang_list = [formData.lang_list];
    }
    if (token) {
      setIsFetching(true);
      const [dataRes, dataErr] = await handle(
        GoogleAds.setCampaignCriteria(token, reqData)
      );
      setIsFetching(false);
      if (!dataErr) {
        onShowAlert(true, "Success");
      }
      if (dataErr) {
        onShowAlert(false, dataErr.error);
      }
    }
  }, [token, selectedCustomerId, formData]);

  const handleClear = () => {
    setFormData({});
  };

  const showClearButton = useMemo(() => {
    let isChanged = false;
    Object.values(formData).forEach((data) => {
      if (data) isChanged = true;
    });
    return isChanged;
  }, [formData]);

  const fetchCityOptions = useCallback(
    async (query: string) => {
      if (token) {
        const [dataRes, dataErr] = await handle(
          RawData.getFilterData({ filter_name: "city", option: "query" }, token)
        );
        if (dataRes) {
          const citiesOptions = dataRes.map((c: [number, string]) => ({
            item: c[1],
            value: c[1],
          }));
          setCityOptions(citiesOptions);
        }
        if (dataErr) {
          console.log(dataErr);
        }
      }
    },
    [token]
  );

  useEffect(() => {
    fetchCityOptions("");
  }, [fetchCityOptions]);

  return (
    <>
      <StyledTitle>Create Campaign Criteria</StyledTitle>
      <InputsContainer className="styled_create_campaign_inputs">
        <InputBox>
          <Dropdown
            label="campaign"
            placeholder="campaign"
            onSelect={(v) => setFormData((p) => ({ ...p, campaign_id: v }))}
            value={formData.campaign_id}
            options={campaignsOptions}
          />
          <StyledHint>
            <HintText>{t("google_ads-criteria_campaign-h2")}</HintText>
            <InfoIcon />
          </StyledHint>
        </InputBox>

        <InputBox>
          <Input
            name="locs"
            type="text"
            placeholder="locs"
            label="locs"
            value={formData.locs || ""}
            onChange={(v) => setFormData((p) => ({ ...p, locs: v }))}
          />
          <StyledHint>
            <HintText>{t("google_ads-criteria_campaign-h2")}</HintText>
            <InfoIcon />
          </StyledHint>
        </InputBox>

        <InputBox>
          <DropdownWithSearch
            placeholder="country_code"
            label="country_code"
            options={isoCodes}
            value={formData.country_code || ""}
            onSelect={(v) => setFormData((p) => ({ ...p, country_code: v }))}
          />
          <StyledHint>
            <HintText>{t("google_ads-criteria_campaign-h3")}</HintText>
            <InfoIcon />
          </StyledHint>
        </InputBox>

        <InputBox>
          <DropdownSearchFetch
            options={cityOptions}
            value={formData.city || ""}
            placeholder="city"
            onSelect={(v) => setFormData((p) => ({ ...p, city: v }))}
            onSearch={(query) => fetchCityOptions(query)}
            label="city"
          />
          <StyledHint>
            <HintText>City</HintText>
            <InfoIcon />
          </StyledHint>
        </InputBox>

        <InputBox>
          <Input
            name="locale"
            type="text"
            placeholder="locale"
            label="locale"
            value={formData.locale || ""}
            onChange={(v) => setFormData((p) => ({ ...p, locale: v }))}
          />
          <StyledHint>
            <HintText>{t("google_ads-criteria_campaign-h4")}</HintText>
            <InfoIcon />
          </StyledHint>
        </InputBox>

        {showClearButton && (
          <ClearButton onClick={handleClear}>Clear all</ClearButton>
        )}
      </InputsContainer>
      {isFetching ? (
        <StyledLoader />
      ) : (
        <StyledAddBtn onClick={handleAdd} data-action={activityList["call-center-google-criteria_create"]}>Set a criteria</StyledAddBtn>
      )}
    </>
  );
});

export default CampaignCriteriaComponent;
