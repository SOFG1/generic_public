import React, {memo, useMemo} from "react";
import styled from "styled-components";
import {desktopBp} from "../../styles/variables";
import {Dropdown, DropdownWithSearch} from "../../UI/Dropdown";
import {useSettingsState} from "../../store/settings";
import {HintText, StyledHint} from "../../UI/InputHint/InputHint";
import {EuroIcon, InfoIcon} from "../../UI/Svg";
import {useTranslation} from "react-i18next";
import {Input} from "../../UI/Input";

const channelOptions = [
    { item: "SEARCH", value: "SEARCH" },
    { item: "DISPLAY", value: "DISPLAY" },
    { item: "MULTI_CHANNEL", value: "MULTI_CHANNEL" },
];

const deliveryMethodOptions = [
    { item: "STANDART", value: "STANDART" },
    { item: "ACCELERATED", value: "ACCELERATED" },
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
interface IProps{
    formData:{[p:string]:any},
    setFormData: React.Dispatch<React.SetStateAction<{[p: string]: any}>>,
}

const GoogleAdsCreateCampaignFromAudienceComponent = memo(({formData, setFormData}:IProps)=>{
    const {t} = useTranslation();
    const { audiences } = useSettingsState();

    const audiencesOptions = useMemo(() => {
        return audiences.map((a) => ({ item: a.name, value: a.id }));
    }, [audiences]);

   return (
       <Container>
           <Group>
               <StyledItem>
                   <Label>Audience</Label>
                   <DropdownStyled
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
               </StyledItem>
               <StyledItem>
                   <Label>Campaign</Label>
                   <StyledInput
                       name="campaign_name"
                       type="text"
                       placeholder="campaign_name"
                       label=""
                       value={formData.campaign_name || ""}
                       onChange={(val) =>
                           setFormData((prev) => ({ ...prev, campaign_name: val }))
                       }
                   />
                   <StyledHint>
                       <HintText>{t("google_ads-audience_campaign-h2")}</HintText>
                       <InfoIcon />
                   </StyledHint>
               </StyledItem>
               <StyledItem>
                   <Label>Budget</Label>
                   <StyledInput
                       name="budget_micros"
                       type="number"
                       placeholder="Daily Budget"
                       label=""
                       value={formData.budget_micros || ""}
                       onChange={(val) =>
                           setFormData((prev) => ({ ...prev, budget_micros: val }))
                       }
                   />
                   <StyledHint>
                       <HintText>{t("google_ads-audience_campaign-h3")}</HintText>
                       <EuroIcon />
                   </StyledHint>
               </StyledItem>
               <StyledItem>
                   <Label>Channel Type</Label>
                   <DropdownStyled
                       label=""
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
               </StyledItem>
               <StyledItem>
                   <Label>Delivery method</Label>
                   <DropdownStyled
                       placeholder="delivery_method"
                       label=""
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
               </StyledItem>
           </Group>
           <Group>
               <StyledItem>
                   <Label>Ad group name</Label>
                   <StyledInput
                       name="ad_group_name"
                       type="text"
                       placeholder="ad_group_name"
                       label=""
                       value={formData.ad_group_name || ""}
                       onChange={(val) =>
                           setFormData((prev) => ({ ...prev, ad_group_name: val }))
                       }
                   />
                   <StyledHint>
                       <HintText>{t("google_ads-audience_campaign-h6")}</HintText>
                       <InfoIcon />
                   </StyledHint>
               </StyledItem>
               <StyledItem>
                   <Label>Income Range</Label>
                   <StyledDropdownWithSearch
                       placeholder="Income range"
                       label=""
                       options={incomeRangeOptions}
                       value={formData.income_range || ""}
                       onSelect={(v) => setFormData((p) => ({ ...p, income_range: v }))}
                   />
                   <StyledHint>
                       <HintText>{t("google_ads-audience_campaign-h7")}</HintText>
                       <InfoIcon />
                   </StyledHint>
               </StyledItem>
               <StyledItem>
                   <Label>Status</Label>
                   <DropdownStyled
                       placeholder="Status"
                       label=""
                       options={statusOptions}
                       value={formData.status || ""}
                       onSelect={(v) => setFormData((p) => ({ ...p, status: v }))}
                   />
                   <StyledHint>
                       <HintText>{t("google_ads-audience_campaign-h8")}</HintText>
                       <InfoIcon />
                   </StyledHint>
               </StyledItem>
               <StyledItem>
                   <Label>Keyword Match Type</Label>
                   <DropdownStyled
                       placeholder="keyword_match_type"
                       label=""
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
               </StyledItem>
           </Group>
       </Container>
   )
})

export default GoogleAdsCreateCampaignFromAudienceComponent;


const Container = styled.div`
    display: flex;
  gap:3.33vw;
  @media screen and (max-width: ${desktopBp}) {
    gap:42px;
  }
`

const Group = styled.div`
`
const StyledItem = styled.div`
    display: flex;
    gap:5px;
`
const Label = styled.p`
  width: 4.17vw;
  margin-block-start: 0em;
  margin-block-end: 0em;
  font-size: ${props => props.theme.fontSize.semiMedium.vw};
  @media screen and (max-width: ${desktopBp}) {
    font-size: ${props => props.theme.fontSize.semiMedium.vw};
    width: 52px;
  }
`

const DropdownStyled = styled(Dropdown)`
  width: 6.50vw;
  color:rgba(254, 89, 18, 1);
 
  
  @media screen and (max-width: ${desktopBp}) {
    width: 80px;
  }
`;


const StyledInput = styled(Input)`
  width: 6.25vw;
  color:rgba(254, 89, 18, 1);
  

  @media screen and (max-width: ${desktopBp}) {
    width: 78px;
  }
`;


const StyledDropdownWithSearch = styled(DropdownWithSearch)`
  width: 6.25vw;
  color:rgba(254, 89, 18, 1);

  @media screen and (max-width: ${desktopBp}) {
    width: 78px;
  }
`;
