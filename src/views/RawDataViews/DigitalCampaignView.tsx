import {memo, useEffect, useMemo, useState} from "react";
import {SettingsSmallTabComponent} from "../../components/SettingsComponents";
import styled from "styled-components";
import {desktopBp} from "../../styles/variables";
import {DigitalCampaignIcon, FacebookCircleIcon, GoogleCircleIcon, SmsIcon} from "../../UI/Svg";
import {useUserState} from "../../store/user";
import {useCallCenterActions} from "../../store/callCenter";
import {useSettingsActions} from "../../store/settings";
import {useRawDataActions} from "../../store/rawData";
import {
    EmailsCreateComponent,
    FacebookAdsCreateComponent, GoogleAdsCreateComponent,
    SmsCreateComponent
} from "../../components/RawDataComponents";
import {useTranslation} from "react-i18next";
import {activityList} from "../../config/userActivityList";


const StyledSettingsSmallTabComponent = styled(SettingsSmallTabComponent)`
  margin-bottom: 0;
  
  & .styled_setting_big_tab_title{
    font-size: 0.94vw;
    
  } 
  & .styled_settings_smallTab{
    border-bottom: 1px solid #000;
    border-radius: 0;
    margin-bottom: 0;
    @media(max-width: ${desktopBp}){
      margin-bottom: 0;
    }
  }
  
  & .styled_settings_content{
    padding-top: 0;
    @media(max-width: ${desktopBp}){
      padding: 0;
    }
  }
  min-width: 47.50vw;
  width: calc(100% - 15px);
  @media(max-width: ${desktopBp}){
    font-size: 12px;
    margin-bottom: 0;
    min-width: 596px;
  }
  
  @media(max-width: 800px){
    min-width: auto;
  }

`

const StyledTitle = styled.div`
  display: flex;
  gap: 0.42vw;
  align-items: center;
  @media(max-width: ${desktopBp}){
    gap: 5px;
  }
  svg path {
    stroke: none;
  }
  
  svg{
    transform: none;
  }
  
`

const StyledLabel = styled.p`
  margin-block-start: 0;
  margin-block-end: 0;
  font-size: ${props => props.theme.fontSize.primary.vw};
  @media(max-width: ${desktopBp}){
    font-size: ${props => props.theme.fontSize.primary.px};
  }
`

const StyledGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 1.67vw;
  @media(max-width: ${desktopBp}){
    margin-left: 21px;
  }
`

const DigitalCampaignView = memo(()=>{
    const { userInfo } = useUserState();
    const {t} = useTranslation();
    const { onGetApplayFilter, onGetSMS, onGetEmail } = useCallCenterActions();
    const { getFilters, getFields } = useRawDataActions();
    const { onGetAudiences } = useSettingsActions();
    const [secondaryTab, setSecondaryTab] = useState<number | undefined>(undefined);

    useEffect(() => {
        getFilters();
        onGetApplayFilter()
        onGetSMS()
        onGetEmail()
        getFields();
        onGetAudiences();
    }, []);


    const isSms = useMemo(
        () => userInfo?.permissions.CallCenter.actions.sms,
        [userInfo]
    );
    const isEmail = useMemo(
        () => userInfo?.permissions.CallCenter.actions.email,
        [userInfo]
    );
    const isFBmarketing = useMemo(
        () => userInfo?.permissions.CallCenter.actions.FBMarketing,
        [userInfo]
    );
    const isGoogleAds = useMemo(
        () => userInfo?.permissions.CallCenter.actions.google_ads,
        [userInfo]
    );

    return (
        <StyledSettingsSmallTabComponent activity={activityList["raw-data-digital-campaign-opened"]} title={(
            <StyledTitle>
                <DigitalCampaignIcon/>
                <StyledLabel>{t("raw_data_create_audience_digital_campaign")}</StyledLabel>
            </StyledTitle>
        )}>
            <StyledGroup>
                {isSms && (
                    <StyledSettingsSmallTabComponent initialState={secondaryTab === 0} onClick={()=>setSecondaryTab(0)} title={(
                        <StyledTitle>
                            <SmsIcon/>
                            <StyledLabel>{t("raw-data_sms")}</StyledLabel>
                        </StyledTitle>
                    )}>
                        <SmsCreateComponent/>
                    </StyledSettingsSmallTabComponent>
                )}
                {isEmail && (
                    <StyledSettingsSmallTabComponent initialState={secondaryTab === 1} onClick={()=>setSecondaryTab(1)} title={(
                        <StyledTitle>
                            <DigitalCampaignIcon/>
                            <StyledLabel>{t("raw-data_emails")}</StyledLabel>
                        </StyledTitle>
                    )}>
                        <EmailsCreateComponent/>
                    </StyledSettingsSmallTabComponent>
                )}

                {isFBmarketing && (
                    <StyledSettingsSmallTabComponent initialState={secondaryTab === 2} onClick={()=>setSecondaryTab(2)} title={(
                        <StyledTitle>
                            <FacebookCircleIcon/>
                            <StyledLabel>{t("raw_data_facebook-ads")}</StyledLabel>
                        </StyledTitle>
                    )}>
                        <FacebookAdsCreateComponent/>
                    </StyledSettingsSmallTabComponent>
                )}
                {isGoogleAds && (
                    <StyledSettingsSmallTabComponent initialState={secondaryTab === 3} onClick={()=>setSecondaryTab(3)} title={(
                        <StyledTitle>
                            <GoogleCircleIcon/>
                            <StyledLabel>{t("raw_data_google-ads")}</StyledLabel>
                        </StyledTitle>
                    )}>
                        <GoogleAdsCreateComponent/>
                    </StyledSettingsSmallTabComponent>
                )}
            </StyledGroup>
        </StyledSettingsSmallTabComponent>
    )
})

export default DigitalCampaignView;
