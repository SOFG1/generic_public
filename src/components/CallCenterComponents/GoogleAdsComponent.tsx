import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { handle } from "../../api";
import { GoogleAds } from "../../api/googleAds";
import { useAppActions } from "../../store/app";
import { useGoogleAdsState } from "../../store/googleAds";
import { useUserState } from "../../store/user";
import { desktopBp } from "../../styles/variables";
import { Button } from "../../UI/Button";
import { Dropdown } from "../../UI/Dropdown";
import { Input, InputFile } from "../../UI/Input";
import { HintText, StyledHint } from "../../UI/InputHint/InputHint";
import { Modal } from "../../UI/Modal";
import { Loader } from "../../UI/Spinners";
import { InfoIcon } from "../../UI/Svg";
import { Text } from "../common/Text";
import { Title } from "../common/Title";
import StringListComponent from "./StringListComponent";
import { activityList } from "../../config/userActivityList";

const Wrapper = styled.div`
  max-width: 13.54vw;
  display: flex;
  flex-direction: column;
  gap: 0.52vw;
  @media screen and (max-width: ${desktopBp}) {
    max-width: 170px;
    gap: 7px;
  }
`;

const StyledTitle = styled(Title)`
  margin-top: 0;
`;

const StyledInputsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.04vw;
  padding: 0 7.81vw 7.81vw;
  @media screen and (max-width: ${desktopBp}) {
    gap: 13px;
    padding: 0 98px 98px;
  }
  @media screen and (max-width: 650px) {
    padding: 20px;
  }
`;

const StyledInputBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.52vw;
  @media screen and (max-width: ${desktopBp}) {
    gap: 7px;
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


const ClearButton = styled(Button)`
  padding: 4px 5px;
  font-size: 0.73vw;
  width: 4.69vw;
  align-self: flex-end;
  @media screen and (max-width: ${desktopBp}) {
    font-size: 9px;
    width: 59px;
  }
`;

const StyledAddBtn = styled(Button)`
  margin: 0 auto;
`;

const StyledLoader = styled(Loader)`
  margin: 0 auto;
`;

interface IProps{
  className?:string
}

const GoogleAdsComponent = React.memo(({className}:IProps) => {
  const { t } = useTranslation();
  const { token } = useUserState();
  const { selectedCustomerId, campaigns } = useGoogleAdsState();
  const { onShowAlert } = useAppActions();
  const [modalOpened, setModalOpened] = useState<boolean>(false);
  const [selectedCampaignId, setSelectedCampaignId] = useState<number>(0);
  const [groupsOfSelectedCampaign, setGroupsOfSelectedCampaign] = useState<
    any[]
  >([]);
  const [formData, setFormData] = useState<{ [key: string]: any }>({});
  const [isFetching, setIsFetching] = useState<boolean>(false);

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

  const groupsOptions = useMemo(() => {
    return groupsOfSelectedCampaign.map((g) => ({
      item: g.name,
      value: g.ad_group_id,
    }));
  }, [groupsOfSelectedCampaign]);

  useEffect(() => {
    if (selectedCampaignId) fetchGroups(selectedCampaignId);
  }, [selectedCampaignId]);

  const campaignsOptions = useMemo(() => {
    return campaigns.map((c) => ({ item: c.name, value: c.campaign_id }));
  }, [campaigns]);

  const channelOfSelectedCampaign = useMemo(() => {
    return campaigns.find((c) => c.campaign_id === selectedCampaignId)?.type;
  }, [selectedCampaignId, campaigns]);

  const isFormDataValid: true | string = useMemo(() => {
    let isValid: true | string = true;
    //text_headlines_assets && text_description_assets
    const filteredHeadlines = formData?.text_headlines_assets?.filter(
      (str: string) => str !== ""
    );
    const filteredDescs = formData?.text_description_assets?.filter(
      (str: string) => str !== ""
    );
    if (channelOfSelectedCampaign === "SEARCH") {
      if (!(filteredHeadlines?.length > 3) || !(filteredDescs?.length > 3)) {
        isValid =
          "Please enter minimum 4 options for text_description_assets and text_description_assets";
      }
    }
    if (channelOfSelectedCampaign === "DISPLAY") {
      if (!(filteredHeadlines?.length > 0) || !(filteredDescs?.length > 0)) {
        isValid =
          "Please enter minimum 1 option for text_description_assets and text_description_assets";
      }
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
  }, [formData, channelOfSelectedCampaign]);

  const handleAdd = useCallback(async () => {
    if (typeof isFormDataValid === "string") {
      onShowAlert(false, isFormDataValid);
      return;
    }
    if (token) {
      const reqData: any = {
        customer_id: String(selectedCustomerId),
        ...formData,
      };
      if (formData.ad_group) {
        reqData.ad_group = formData.ad_group.toString();
      }
      if (reqData.text_headlines_assets) {
        reqData.text_headlines_assets = reqData.text_headlines_assets.filter(
          (string: string) => string !== ""
        );
      }
      if (reqData.final_urls) {
        reqData.final_urls = [reqData.final_urls];
      }
      if (reqData.text_description_assets) {
        reqData.text_description_assets =
          reqData.text_description_assets.filter(
            (string: string) => string !== ""
          );
      }
      //Upload image separately
      if (formData.image && token) {
        setIsFetching(true);
        const [dataRes, dataErr] = await handle(
          GoogleAds.uploadImage(
            token,
            String(selectedCustomerId),
            formData.image
          )
        );
        if (dataRes) {
          reqData.image_resource = dataRes.image_resource_name;
          // reqData.square_image_resource = dataRes.image_resource_name;
        }
        if (dataErr) {
          console.log(dataErr);
        }
        delete reqData.image;
      }
      //Upload square_image separately
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
      }
      delete reqData.square_image;
      setIsFetching(true);
      const [dataRes, dataErr] = await handle(
        GoogleAds.createAd(token, reqData)
      );
      setIsFetching(false);
      if (!dataErr) {
        onShowAlert(true, "Success");
      }
      if (dataErr) {
        onShowAlert(false, dataErr.error);
      }
    }
  }, [token, selectedCustomerId, formData, isFormDataValid]);

  const showClearButton = useMemo(() => {
    let isChanged = false;
    if (selectedCampaignId) isChanged = true;
    Object.values(formData).forEach((data) => {
      if (data) isChanged = true;
    });
    return isChanged;
  }, [formData, selectedCampaignId]);

  const handleClear = () => {
    setSelectedCampaignId(0);
    setFormData({});
  };

  useEffect(() => {
    if (
      formData.hasOwnProperty("final_urls") &&
      formData.final_urls.slice(0, 8) !== "https://"
    ) {
      setFormData((p) => ({ ...p, final_urls: "https://" }));
    }
  }, [formData.final_urls]);

  return (
    <>
      <Wrapper className={className}>
        <Button onClick={() => setModalOpened(true)} data-action={activityList["call-center-google-ad_modal"]}>{t("google_ads-add-an-add")}</Button>
      </Wrapper>
      <Modal show={modalOpened} onClose={() => setModalOpened(false)}>
        <StyledTitle className = "styled_create_campaign_label">Create Ad</StyledTitle>
        <StyledInputsContainer className = "styled_create_campaign_inputs">
          <StyledInputBox>
            <Dropdown
              label="campaign"
              placeholder="campaign"
              onSelect={(v) => setSelectedCampaignId(v)}
              value={selectedCampaignId}
              options={campaignsOptions}
            />
          </StyledInputBox>

          <StyledInputBox>
            <Dropdown
              options={groupsOptions}
              isDisabled={!selectedCampaignId}
              placeholder="ad_group"
              label="ad_group"
              value={formData.ad_group || ""}
              onSelect={(v) => setFormData((p) => ({ ...p, ad_group: v }))}
            />
            <StyledHint>
              <HintText>
                {t("google_ads-ad-h1")}
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
                {t("google_ads-ad-h2")}
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
              value={formData.responsive_search_ad_path2 || ""}
              onChange={(v) =>
                setFormData((p) => ({ ...p, responsive_search_ad_path2: v }))
              }
            />
            <StyledHint>
              <HintText>
                {t("google_ads-ad-h3")}
              </HintText>
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
              onChange={(v) => setFormData((p) => ({ ...p, price_prefix: v }))}
            />
            <StyledHint>
              <HintText>{t("google_ads-ad-h4")}</HintText>
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
              <HintText>{t("google_ads-ad-h5")}</HintText>
              <InfoIcon />
            </StyledHint>
          </StyledInputBox>

          {channelOfSelectedCampaign === "SEARCH" && (
            <>
              <StyledInputBox>
                <StyledInput
                  name="final_urls"
                  type="text"
                  placeholder="final_urls"
                  label="final_urls"
                  value={formData.final_urls || "https://"}
                  onChange={(v) =>
                    setFormData((p) => ({ ...p, final_urls: v }))
                  }
                />
                <StyledHint>
                  <HintText>{t("google_ads-ad-h6")}</HintText>
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
                    {t("google_ads-ad-h7")}
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
                    {t("google_ads-ad-h8")}
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
                    setFormData((p) => ({
                      ...p,
                      responsive_search_ad_path1: v,
                    }))
                  }
                />
                <StyledHint>
                  <HintText>
                    {t("google_ads-ad-h9")}
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
                    setFormData((p) => ({
                      ...p,
                      responsive_search_ad_path2: v,
                    }))
                  }
                />
                <StyledHint>
                  <HintText>
                    {t("google_ads-ad-h10")}
                  </HintText>
                  <InfoIcon />
                </StyledHint>
              </StyledInputBox>
            </>
          )}

          {channelOfSelectedCampaign === "DISPLAY" && (
            <>
              <StyledInputBox>
                <StyledInput
                  name="final_urls"
                  type="text"
                  placeholder="final_urls"
                  label="final_urls"
                  value={formData.final_urls || "https://"}
                  onChange={(v) =>
                    setFormData((p) => ({ ...p, final_urls: v }))
                  }
                />
                <StyledHint>
                  <HintText>{t("google_ads-ad-h11")}</HintText>
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
                  <HintText>{t("google_ads-ad-h12")}</HintText>
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
                  <HintText>{t("google_ads-ad-h13")}</HintText>
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
                    {t("google_ads-ad-h14")}
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
                    {t("google_ads-ad-h15")}
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
                  <HintText>{t("google_ads-ad-h16")}</HintText>
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
                    {t("google_ads-ad-h17")}
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
                  onChange={(v) =>
                    setFormData((p) => ({ ...p, promo_text: v }))
                  }
                />
                <StyledHint>
                  <HintText>
                    {t("google_ads-ad-h18")}
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
                  {t("google_ads-ad-h19")}
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
                    {t("google_ads-ad-h20")}
                  </HintText>
                  <InfoIcon />
                </StyledHint>
              </StyledInputBox>
            </>
          )}

          {channelOfSelectedCampaign === "MULTI_CHANNEL" && (
            <>
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
                  <HintText>{t("google_ads-ad-h21")}</HintText>
                  <InfoIcon />
                </StyledHint>
              </StyledInputBox>
            </>
          )}
          {showClearButton && (
            <ClearButton onClick={handleClear} data-action={activityList["call-center-google-ad_clear"]}>Clear all</ClearButton>
          )}
        </StyledInputsContainer>
        {isFetching ? (
          <StyledLoader />
        ) : (
          <StyledAddBtn onClick={handleAdd} data-action={activityList["call-center-google-ad_create"]}>Add new ad</StyledAddBtn>
        )}
      </Modal>
    </>
  );
});

export default GoogleAdsComponent;
