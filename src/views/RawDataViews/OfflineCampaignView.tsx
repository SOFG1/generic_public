import {memo, useEffect, useMemo} from "react";
import {desktopBp} from "../../styles/variables";
import styled from "styled-components";
import {SettingsSmallTabComponent} from "../../components/SettingsComponents";
import {useUserState} from "../../store/user";
import {OfflineCampaignIcon} from "../../UI/Svg";
import {useTranslation} from "react-i18next";
import {useCallCenterActions} from "../../store/callCenter";
import {OfflineCallsCreateComponent} from "../../components/RawDataComponents";
import {activityList} from "../../config/userActivityList";

const OfflineCampaignView = memo(()=>{
    const { userInfo } = useUserState();
    const {t} = useTranslation();
    const { onGetQuestionariesList } = useCallCenterActions();

    const isCalls = useMemo(
        () => userInfo?.permissions.CallCenter.actions.calls,
        [userInfo]
    );

    useEffect(()=>{
        onGetQuestionariesList();
    },[]);
    return(
        <StyledSettingsSmallTabComponent activity={activityList["raw-data-offline-campaign-opened"]} title={(
            <StyledTitle>
                <OfflineCampaignIcon/>
                <StyledLabel>{t("raw_data_create_audience_offline_campaign")}</StyledLabel>
            </StyledTitle>
        )}>
            {isCalls && <OfflineCallsCreateComponent/>}
        </StyledSettingsSmallTabComponent>
    )
})

export default OfflineCampaignView;


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
