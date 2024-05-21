import React, {memo} from "react";
import {desktopBp} from "../../styles/variables";
import styled from "styled-components";
import {Checkbox} from "../../UI/Input";
import {useTranslation} from "react-i18next";

interface IProps{
    isCustomCampaign:boolean,
    setIsCustomCampaign:(value:boolean)=>void,
}

const GoogleAdsCreateCampaignComponent = memo(({isCustomCampaign, setIsCustomCampaign}:IProps)=>{
    const {t} = useTranslation();

    return (
        <Container>
            <StyledCheckbox
                label={t("google_ads-custom")}
                isActive={isCustomCampaign}
                onChange={() => setIsCustomCampaign(true)}
            />
            <StyledCheckbox
                label={t("google_ads-audience_campaign")}
                isActive={!isCustomCampaign}
                onChange={() => setIsCustomCampaign(false)}
            />
        </Container>
    )
})

export default GoogleAdsCreateCampaignComponent


const Container = styled.div`
    display: flex;
  flex-direction: column;
  gap:5px;
  
`

const StyledCheckbox = styled(Checkbox)`
  & .styled_checkbox_label{
    font-size: ${props => props.theme.fontSize.semiMedium.vw};
    @media screen and (max-width: ${desktopBp}) {
      font-size: ${props => props.theme.fontSize.semiMedium.px};
    }
  }
  
  & .styled_checkbox_btn{
    width: 12px;
    height: 12px;
    span {
      height: 8px;
      width: 8px;
  }
`
