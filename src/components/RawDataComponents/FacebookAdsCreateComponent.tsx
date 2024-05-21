import styled from "styled-components";
import {desktopBp} from "../../styles/variables";
import {Button} from "../../UI/Button";
import {useTranslation} from "react-i18next";
import React, {memo, useCallback, useState} from "react";
import {Breadcrumbs} from "../../UI/Breadcrumbs";
import {ArrowRight} from "../../UI/Svg";
import {FbNodeType, useCallCenterActions, useCallCenterState} from "../../store/callCenter";
import {FacebookAdsCreateContentComponent, FacebookAdsCreateParametersComponent} from "./index"
import {Modal} from "../../UI/Modal";
import {
    CreateAdModal,
    CreateAudienceModal,
    CreateCampaignModal,
    CreateCreativeModal,
    CreateSetModal
} from "../../views/CallCenterViews";
import {activityList} from "../../config/userActivityList";

export interface IFacebookAdsCreateInitialState{
    selectedCampaign:number,
    selectedAudiences:number,
    selectedSet:number,
    selectedCreative:number,
    selectedAd:number
}

const FacebookAdsCreateInitialState:IFacebookAdsCreateInitialState = {
    selectedCampaign:0,
    selectedAudiences:0,
    selectedSet:0,
    selectedCreative:0,
    selectedAd:0,
}

const FacebookAdsCreateComponent = memo(()=>{
    const {t} = useTranslation()
    const [index, setIndex] = useState(0);
    const [data, setData] = useState(FacebookAdsCreateInitialState);
    const [currentModal, setCurrentModal] = useState<FbNodeType>(null);
    const { onDeleteNode } = useCallCenterActions();
    const {
        selectedFBAccount,
    } = useCallCenterState();

    const onChangeHandler = useCallback((key:keyof IFacebookAdsCreateInitialState, data:any)=>{
        setData(prev => ({...prev, [key]:data}));
    },[])

    const next = useCallback(()=>{
        if(index + 1 > 1) return;
        setIndex(index + 1);
    },[index]);

    const back = useCallback(()=>{
        if((index - 1) < 0) return;
        setIndex(index - 1);
    }, [index]);

    const isNextDisable = useCallback(()=>{
        return !selectedFBAccount
    },[index, data, selectedFBAccount]);
    return (
        <Container>
            <Modal show={!!currentModal} onClose={() => setCurrentModal(null)}>
                {currentModal === "campaings" && <CreateCampaignModal />}
                {currentModal === "sets" && <CreateSetModal />}
                {currentModal === "customaudience" && <CreateAudienceModal />}
                {currentModal === "creatives" && <CreateCreativeModal />}
                {currentModal === "ad" && <CreateAdModal />}
            </Modal>

            <Breadcrumbs index = {index} separator={<ArrowRight/>}>
                <StyledBreadcrumbLabel>{t("raw_data_breadcrumbs_parameters")}</StyledBreadcrumbLabel>
                <StyledBreadcrumbLabel>{t("raw_data_breadcrumbs_content")}</StyledBreadcrumbLabel>
            </Breadcrumbs>
            <Content>
                {index === 0 && <FacebookAdsCreateParametersComponent/>}
                {index === 1 && <FacebookAdsCreateContentComponent data={data} onChangeHandler={onChangeHandler} setCurrentModal={setCurrentModal}/>}
            </Content>
            <StyledButtonContainer>
                {index !== 0 && <StyledButton onClick = {back}>{t("raw_data_digital_campaign-prev")}</StyledButton>}
                {index === 0 && <StyledButton disabled={isNextDisable()} style = {{marginLeft:"auto"}} onClick = {next}>{t("raw_data_digital_campaign-next")}</StyledButton>}
                {index === 1 && (
                    <ButtonGroup>
                        <StyledButton data-action = {activityList["raw-data-digital-campaign-facebook-del"]} onClick = {()=>onDeleteNode({ node: "ad", id: data.selectedAd })}  disabled={isNextDisable()}>{t("raw_data_digital_campaign_facebook_remove")}</StyledButton>
                        <StyledButton data-action = {activityList["raw-data-digital-campaign-facebook-create"]} onClick={() => setCurrentModal("ad")}   disabled={isNextDisable()}>{t("raw_data_digital_campaign_facebook_create")}</StyledButton>
                    </ButtonGroup>
                )}
            </StyledButtonContainer>
        </Container>
    )
})

export default FacebookAdsCreateComponent;

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
  justify-content: space-between;
  margin-top: 3.80vw;
  margin-bottom: 3.54vw;
  padding: 0 0.52vw;
  @media(max-width: ${desktopBp}){
    margin-top: 48px;
    margin-bottom: 44px;
    padding: 0 7px;
  }
`

const StyledButton = styled(Button)`
  width: 4.01vw;
  height: 1.67vw;
  border-width: 1px;
  font-size: 0.63vw;

  @media(max-width: ${desktopBp}){
    width: 50px;
    height: 21px;
    font-size: 8px;
  }
`

const Content = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`


const ButtonGroup = styled.div`
    display: flex;
  gap: 5px;
`
