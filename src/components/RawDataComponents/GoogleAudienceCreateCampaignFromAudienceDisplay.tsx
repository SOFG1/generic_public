import React, {memo} from "react";
import styled from "styled-components";
import {desktopBp} from "../../styles/variables";
import {Input, InputFile} from "../../UI/Input";
import StringListComponent from "../CallCenterComponents/StringListComponent";
import {Text} from "../common/Text";
import {useTranslation} from "react-i18next";

interface IProps{
    formData:{[p:string]:any},
    setFormData: React.Dispatch<React.SetStateAction<{[p: string]: any}>>,
}

const GoogleAudienceCreateCampaignFromAudienceDisplay = memo(({formData, setFormData}:IProps)=>{
    const {t} = useTranslation();
    return(
        <Container>
            <Group>
                <StyledItem>
                    <Label>target_cpa_micros</Label>
                    <StyledInput
                        name="target_cpa_micros"
                        type="number"
                        placeholder="target_cpa"
                        label=""
                        value={formData.target_cpa_micros || ""}
                        onChange={(v) =>
                            setFormData((p) => ({ ...p, target_cpa_micros: v }))
                        }
                    />
                </StyledItem>
                <StyledItem>
                    <Label>final_urls</Label>
                    <StyledInput
                        name="final_urls"
                        type="text"
                        placeholder="final_urls"
                        label=""
                        value={formData.final_urls || ""}
                        onChange={(v) => setFormData((p) => ({ ...p, final_urls: v }))}
                    />
                </StyledItem>
                <StyledItem>
                    <Label>business_name</Label>
                    <StyledInput
                        name="business_name"
                        type="text"
                        placeholder="business_name"
                        label=""
                        value={formData.business_name || ""}
                        onChange={(v) =>
                            setFormData((p) => ({ ...p, business_name: v }))
                        }
                    />
                </StyledItem>
                <StyledItem>
                    <Label>call_to_action_text</Label>
                    <StyledInput
                        name="call_to_action_text"
                        type="text"
                        placeholder="call_to_action_text"
                        label=""
                        value={formData.call_to_action_text || ""}
                        onChange={(v) =>
                            setFormData((p) => ({ ...p, call_to_action_text: v }))
                        }
                    />
                </StyledItem>
                <StyledItem>
                    <Label>price_prefix</Label>
                    <StyledInput
                        name="price_prefix"
                        type="text"
                        placeholder="price_prefix"
                        label=""
                        value={formData.price_prefix || ""}
                        onChange={(v) =>
                            setFormData((p) => ({ ...p, price_prefix: v }))
                        }
                    />
                </StyledItem>
                <StyledItem>
                    <Label>promo_text</Label>
                    <StyledInput
                        name="promo_text"
                        type="text"
                        placeholder="promo_text"
                        label=""
                        value={formData.promo_text || ""}
                        onChange={(v) => setFormData((p) => ({ ...p, promo_text: v }))}
                    />
                </StyledItem>
                <StyledItem>
                    <StyledImageInput
                        formats="image/png, image/gif, image/jpeg"
                        placeholder="Image resource"
                        label={<Label>Image</Label>}
                        onChange={(v) => setFormData((p) => ({ ...p, image: v }))}
                        content={
                            <>
                                <Label>{t("sign-up_logo-drop")}</Label>
                                <Label>{t("sign-up_logo-upload")}</Label>
                                <Text>{t("sign-up_logo-format")}</Text>
                            </>
                        }
                    />
                    {formData.image && (
                        <Label>{formData.image.name}</Label>
                    )}
                </StyledItem>
                <StyledItem>
                    <StyledImageInput
                        formats="image/png, image/gif, image/jpeg"
                        placeholder="Square image resource"
                        label={<Label>Square image</Label>}
                        onChange={(v) =>
                            setFormData((p) => ({ ...p, square_image: v }))
                        }
                        content={
                            <>
                                <Label>{t("sign-up_logo-drop")}</Label>
                                <Label>{t("sign-up_logo-upload")}</Label>
                                <Text>{t("sign-up_logo-format")}</Text>
                            </>
                        }
                    />
                    {formData.square_image && (
                        <Label>{formData.square_image.name}</Label>
                    )}
                </StyledItem>
            </Group>
            <Group>
                <StyledItem>
                    <Label>long_headline</Label>
                    <StyledInput
                        name="long_headline"
                        type="text"
                        placeholder="long_headline"
                        label=""
                        value={formData.long_headline || ""}
                        onChange={(v) =>
                            setFormData((p) => ({ ...p, long_headline: v }))
                        }
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
        </Container>
    )
})

export default GoogleAudienceCreateCampaignFromAudienceDisplay;

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
  gap: 10px;
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
  & .styled_string-add_btn{
    width: 0.8vw;
    height: 0.8vw;
    display: flex;
    align-self: center;
    @media screen and (max-width: ${desktopBp}) {
      width: 10px;
      height: 10px;
    }
    &:before{
      width: 5px;
      height: 1px;
    }
    &:after{
      width: 5px;
      height: 1px;
    }
  }
  @media screen and (max-width: ${desktopBp}) {
    width: 98px;
  }
  
`



const StyledImageInput = styled(InputFile)`
  font-size: 0.52vw;
  @media screen and (max-width: ${desktopBp}) {
    font-size: 7px;
  }
`
