import React, {memo, useCallback, useEffect, useMemo, useState} from "react";
import styled from "styled-components";
import {desktopBp} from "../../styles/variables";
import {Button} from "../../UI/Button";
import {ArrowRight} from "../../UI/Svg";
import {Breadcrumbs} from "../../UI/Breadcrumbs";
import {useTranslation} from "react-i18next";
import {
    GoogleAdsCreateCampaignComponent,
    GoogleAdsCreateCampaignFromAudienceComponent,
    GoogleAdsCreateCampaignFromAudienceExtraComponent,
    GoogleAdsCreateCampaignFromAudienceSearch,
    GoogleAdsCreateParametersComponent, GoogleAudienceCreateCampaignFromAudienceDisplay,
    GoogleAudienceCreateCampaignFromAudienceMultiChannel,GoogleAdsCreateCustomCampaign
} from "./index";
import {useGoogleAdsActions, useGoogleAdsState} from "../../store/googleAds";
import {handle} from "../../api";
import {GoogleAds} from "../../api/googleAds";
import {useUserState} from "../../store/user";

import {activityList} from "../../config/userActivityList";
import {useAppActions} from "../../store/app";
import {Loader} from "../../UI/Spinners";


const initialFormData = {
    delivery_method: "ACCELERATED",
};

const GoogleAdsCreateComponent = memo(()=>{
    const {t} = useTranslation();
    const { token } = useUserState();
    const { onShowAlert } = useAppActions();
    const { selectedCustomerId } = useGoogleAdsState();
    const [isFetching, setIsFetching] = useState<boolean>(false);
    const [isCustomCampaign, setIsCustomCampaign] = useState(false);
    const [formData, setFormData] = useState<{ [key: string]: any }>(
        initialFormData
    );

    const [index, setIndex] = useState(0);
    const { onGetCustomers } =
        useGoogleAdsActions();

    useEffect(()=>{
        onGetCustomers();
    },[]);

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

    const next = useCallback(()=>{
        if(index + 1 > 4) return;
        setIndex(index + 1);
    },[index]);

    const back = useCallback(()=>{
        if((index - 1) < 0) return;
        setIndex(index - 1);
    }, [index]);

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

    const handleAddNotCustomCampaign = useCallback(async () => {
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

    const isNextDisabled = useCallback(()=>{
       return !selectedCustomerId
    },[selectedCustomerId])
    return (
        <Container>
            <Breadcrumbs index = {index} separator={<ArrowRight/>}>
                <StyledBreadcrumbLabel>{t("raw_data_breadcrumbs_parameters")}</StyledBreadcrumbLabel>
                <StyledBreadcrumbLabel>{t("raw_data_breadcrumbs_content")}</StyledBreadcrumbLabel>
                {!isCustomCampaign && <StyledBreadcrumbLabel>Extra</StyledBreadcrumbLabel>}
                {!isCustomCampaign && formData.channel_type === "SEARCH" && <StyledBreadcrumbLabel>Search</StyledBreadcrumbLabel>}
                {!isCustomCampaign && formData.channel_type === "DISPLAY" && <StyledBreadcrumbLabel>Display</StyledBreadcrumbLabel>}
                {!isCustomCampaign && formData.channel_type === "MULTI_CHANNEL" && <StyledBreadcrumbLabel>Multi Channel</StyledBreadcrumbLabel>}
            </Breadcrumbs>
            <Content>
                {index === 0 && <GoogleAdsCreateParametersComponent/>}
                {index === 1  && <GoogleAdsCreateCampaignComponent isCustomCampaign={isCustomCampaign} setIsCustomCampaign={setIsCustomCampaign}/>}
                {index === 2 && isCustomCampaign && <GoogleAdsCreateCustomCampaign/>}

                {index === 2 && !isCustomCampaign && <GoogleAdsCreateCampaignFromAudienceComponent formData={formData} setFormData={setFormData}/>}
                {index === 3 && !isCustomCampaign && <GoogleAdsCreateCampaignFromAudienceExtraComponent formData={formData} setFormData={setFormData}/>}

                {index === 4 && !isCustomCampaign && formData.channel_type === "SEARCH" && <GoogleAdsCreateCampaignFromAudienceSearch formData={formData} setFormData = {setFormData}/>}
                {index === 4 && !isCustomCampaign && formData.channel_type === "DISPLAY" && <GoogleAudienceCreateCampaignFromAudienceDisplay formData={formData} setFormData = {setFormData}/>}
                {index === 4 && !isCustomCampaign &&  formData.channel_type === "MULTI_CHANNEL" && <GoogleAudienceCreateCampaignFromAudienceMultiChannel formData={formData} setFormData = {setFormData}/>}


            </Content>
            {!isFetching && (
                <StyledButtonContainer>
                    <StyledButton onClick = {back}>Back</StyledButton>
                    {((!isCustomCampaign && index !== 4) || (isCustomCampaign && index !== 2)) && <StyledButton disabled={isNextDisabled()} onClick = {next}>Next</StyledButton>}
                    {index === 4 && !isCustomCampaign && <StyledButton onClick = {handleAddNotCustomCampaign} data-action={activityList["call-center-google-audience_create"]}>Create</StyledButton>}
                </StyledButtonContainer>
            )}
            {isFetching && (
                <StyledLoaderContainer>
                    <Loader/>
                </StyledLoaderContainer>
            )}
        </Container>
    )
})

export default GoogleAdsCreateComponent;


const Container = styled.div`
`

const StyledBreadcrumbLabel = styled.p`
  font-weight: 500;
  font-size: ${props => props.theme.fontSize.small.vw};
  @media(max-width: ${desktopBp}){
    font-size: ${props => props.theme.fontSize.small.vw};
  }
`

const StyledButtonContainer = styled.div`
    display: flex;
  width: 100%;
  justify-content: space-between;
  margin-top: 3.80vw;
  margin-bottom: 3.54vw;
  @media(max-width: ${desktopBp}){
    margin-top: 48px;
    margin-bottom: 44px;
  }
`

const StyledButton = styled(Button)`
  width: 4.01vw;
  height: 1.67vw;
  border-width: 1px;
  font-size: ${props => props.theme.fontSize.semiMedium.vw};
  
  @media(max-width: ${desktopBp}){
    width: 50px;
    height: 21px;
    font-size: ${props => props.theme.fontSize.semiMedium.px};
  }
`

const Content = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`

const StyledLoaderContainer = styled.div`
    width: 100%;
  display: flex;
  justify-content: center;
`
