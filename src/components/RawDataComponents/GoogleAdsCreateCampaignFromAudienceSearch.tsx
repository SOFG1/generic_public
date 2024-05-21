import React, {memo} from "react";
import styled from "styled-components";
import {desktopBp} from "../../styles/variables";
import {Input} from "../../UI/Input";
import {useTranslation} from "react-i18next";
import StringListComponent from "../CallCenterComponents/StringListComponent";
import {isoCodes} from "../../utils/isoCodes";
import {DropdownWithSearch} from "../../UI/Dropdown";

interface IProps{
    formData:{[p:string]:any},
    setFormData: React.Dispatch<React.SetStateAction<{[p: string]: any}>>,
}

const GoogleAdsCreateCampaignFromAudienceSearch = memo(({formData, setFormData}:IProps)=>{
    return (
        <Container>
            <Group>
                <StyledItem>
                    <Label>final_urls</Label>
                    <StyledInput
                        name="final_urls"
                        type="text"
                        placeholder="final_urls"
                        label=""
                        value={formData.final_urls || "https://"}
                        onChange={(v:any) => setFormData((p) => ({ ...p, final_urls: v }))}
                    />
                </StyledItem>
                <StyledItem>
                    <Label>Domain name</Label>
                    <StyledInput
                        name="domain_name"
                        type="text"
                        placeholder="domain_name"
                        label=""
                        value={formData.domain_name || ""}
                        onChange={(v) => setFormData((p) => ({ ...p, domain_name: v }))}
                    />
                </StyledItem>
                <StyledItem>
                    <Label>text_headlines_assets</Label>
                    <StyledStringListComponent
                        onChange={(v) =>
                            setFormData((p) => ({ ...p, text_headlines_assets: v }))
                        }
                        values={formData.text_headlines_assets || [""]}
                    />
                </StyledItem>
                <StyledItem>
                    <Label>text_description_assets</Label>
                    <StyledStringListComponent
                        onChange={(v) =>
                            setFormData((p) => ({ ...p, text_description_assets: v }))
                        }
                        values={formData.text_description_assets || [""]}
                    />
                </StyledItem>
            </Group>
            <Group>
                <StyledItem>
                    <Label>Language code</Label>
                    <StyledDropdownWithSearch
                        label=""
                        placeholder="language_code"
                        value={formData.language_code || ""}
                        options={isoCodes}
                        onSelect={(v) =>
                            setFormData((p) => ({ ...p, language_code: v }))
                        }
                    />
                </StyledItem>
                <StyledItem>
                    <Label>responsive_search_ad_path1</Label>
                    <StyledInput
                        name="responsive_search_ad_path1"
                        type="text"
                        placeholder="responsive_search_ad_path1"
                        label=""
                        value={formData.responsive_search_ad_path1 || ""}
                        onChange={(v) =>
                            setFormData((p) => ({ ...p, responsive_search_ad_path1: v }))
                        }
                    />
                </StyledItem>
                <StyledItem>
                    <Label>responsive_search_ad_path2</Label>
                    <StyledInput
                        name="responsive_search_ad_path2"
                        type="text"
                        placeholder="responsive_search_ad_path2"
                        label=""
                        disabled={!formData.responsive_search_ad_path1}
                        value={formData.responsive_search_ad_path2 || ""}
                        onChange={(v) =>
                            setFormData((p) => ({ ...p, responsive_search_ad_path2: v }))
                        }
                    />
                </StyledItem>
            </Group>
        </Container>
    )
})

export default GoogleAdsCreateCampaignFromAudienceSearch;

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
    gap:10px;
  width: 100%;
`
const Label = styled.p`
  font-size: ${props => props.theme.fontSize.semiMedium.vw};
  @media screen and (max-width: ${desktopBp}) {
    font-size: ${props => props.theme.fontSize.semiMedium.px};
  }
`
const StyledInput = styled(Input)`
  width: 6.25vw;
  color:rgba(254, 89, 18, 1);
  

  @media screen and (max-width: ${desktopBp}) {
    width: 78px;
  }
`;

const StyledStringListComponent = styled(StringListComponent)`
  width: 7.81vw;
  
  @media screen and (max-width: ${desktopBp}) {
    width: 98px;
  }
  
`
const StyledDropdownWithSearch = styled(DropdownWithSearch)`
  width: 6.25vw;
  color:rgba(254, 89, 18, 1);
  
  
  @media screen and (max-width: ${desktopBp}) {
    width: 78px;
  }
`;
