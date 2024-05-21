import React, {memo, useState} from "react";
import styled from "styled-components";
import {
    CampaignCriteriaComponent,
    CreateCampaignComponent,
    GoogleAdsComponent,
    GoogleCampaignsComponent,
    GoogleGroupsComponent
} from "../CallCenterComponents";
import {activityList} from "../../config/userActivityList";
import {useTranslation} from "react-i18next";
import {Modal} from "../../UI/Modal";
import {Button} from "../../UI/Button";
import CreateGroupComponent from "../CallCenterComponents/CreateGroupComponent";
import GroupCriteriaComponent from "../CallCenterComponents/GroupCriteriaComponent";
import {desktopBp} from "../../styles/variables";

const GoogleAdsCreateCustomCampaign = memo(()=>{
    const {t} = useTranslation();
    const [campaignModal, setCampaignModal] = useState<boolean>(false);
    const [groupModal, setGroupModal] = useState(false);
    return(
        <Container>
            <StyledModal show={campaignModal} onClose={() => setCampaignModal(false)}>
                <CreateCampaignComponent />
                <CampaignCriteriaComponent />
            </StyledModal>
            <StyledModal show={groupModal} onClose={() => setGroupModal(false)}>
                <CreateGroupComponent />
                <GroupCriteriaComponent />
            </StyledModal>
            <StyledButton
                onClick={() => setCampaignModal(true)}
                data-action={activityList["call-center-google-campaign_modal"]}
            >
                {t("google_ads-add-a-campaign")}
            </StyledButton>
            <StyledButton onClick={() => setGroupModal(true)} data-action={activityList["call-center-google-group_modal"]}>{t("google_ads-add-a-group")}</StyledButton>
            <StyledGoogleAdsContainer>
                <GoogleAdsComponent/>
            </StyledGoogleAdsContainer>
        </Container>
    )
})

export default GoogleAdsCreateCustomCampaign;


const Container = styled.div`
    display: flex;
  gap: 5px;
`
const StyledButton = styled(Button)`
  min-width: fit-content;
  width: 7.81vw;
  height: 1.67vw;
  border-width: 1px;
  font-size: ${props => props.theme.fontSize.semiMedium.vw};

  @media(max-width: ${desktopBp}){
    height: 21px;
    width: 98px;
    font-size: ${props => props.theme.fontSize.semiMedium.px};
  }
`

const StyledGoogleAdsContainer = styled.div`
    & button{
      width: 8.33vw;
      height: 1.67vw;
      border-width: 1px;
      font-size: ${props => props.theme.fontSize.semiMedium.vw};
      
      @media(max-width: ${desktopBp}){
        height: 21px;
        width: 105px;
        font-size: ${props => props.theme.fontSize.semiMedium.px};
      }
    }
  
`
const StyledModal = styled(Modal)`
    & .js-modal-content{
      max-height: 40vh;
    }
 
  & button{
    width: 8.33vw;
    height: 1.67vw;
    border-width: 1px;
    font-size: ${props => props.theme.fontSize.semiMedium.vw};
    @media(max-width: ${desktopBp}){
      height: 21px;
      width: 105px;
      font-size: ${props => props.theme.fontSize.semiMedium.px};
    }
    
  }
`
