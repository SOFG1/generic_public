import React, {memo} from "react";
import styled from "styled-components";
import {desktopBp} from "../../styles/variables";
import {Checkbox, Input, InputFile} from "../../UI/Input";
import StringListComponent from "../CallCenterComponents/StringListComponent";
import {DropdownWithSearch} from "../../UI/Dropdown";
import {useTranslation} from "react-i18next";
const appStrategyVariants = [
    "OPTIMIZE_INSTALLS_TARGET_INSTALL_COST",
    "OPTIMIZE_INSTALLS_WITHOUT_TARGET_INSTALL_COST",
    "OPTIMIZE_IN_APP_CONVERSIONS_TARGET_CONVERSION_COST",
    "OPTIMIZE_IN_APP_CONVERSIONS_TARGET_INSTALL_COST",
    "OPTIMIZE_PRE_REGISTRATION_CONVERSION_VOLUME",
    "OPTIMIZE_RETURN_ON_ADVERTISING_SPEND",
];

const subChannelOptions = [{ item: "APP_CAMPAIGN", value: "APP_CAMPAIGN" }];
interface IProps{
    formData:{[p:string]:any},
    setFormData: React.Dispatch<React.SetStateAction<{[p: string]: any}>>,
}
const GoogleAudienceCreateCampaignFromAudienceMultiChannel = memo(({formData, setFormData}:IProps)=>{
    const {t} = useTranslation();
    return (
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
                    <Label>app_id</Label>
                    <StyledInput
                        name="app_id"
                        type="text"
                        placeholder="app_id"
                        label=""
                        value={formData.app_id || ""}
                        onChange={(v) => setFormData((p) => ({ ...p, app_id: v }))}
                    />
                </StyledItem>
                <StyledItem>
                    <Label>app_store</Label>
                    <RadioBox>
                        <StyledCheckbox
                            label="APPLE"
                            isActive={formData.app_store === "APPLE"}
                            onChange={() =>
                                setFormData((p) => ({ ...p, app_store: "APPLE" }))
                            }
                        />
                        <StyledCheckbox
                            label="GOOGLE"
                            isActive={formData.app_store === "GOOGLE"}
                            onChange={() =>
                                setFormData((p) => ({ ...p, app_store: "GOOGLE" }))
                            }
                        />
                    </RadioBox>
                </StyledItem>
                <StyledItem>
                    <Label>app_strategy</Label>
                    <RadioBox>
                        {appStrategyVariants.map((v) => {
                            return (
                                <StyledCheckbox
                                    key={v}
                                    label={v}
                                    isActive={formData.app_strategy === v}
                                    onChange={() =>
                                        setFormData((p) => ({ ...p, app_strategy: v }))
                                    }
                                />
                            );
                        })}
                    </RadioBox>
                </StyledItem>
                <StyledItem>
                    <DropdownWithSearch
                        label=""
                        placeholder="channel_sub_type"
                        value={formData.channel_sub_type || ""}
                        options={subChannelOptions}
                        onSelect={(v) =>
                            setFormData((p) => ({ ...p, channel_sub_type: v }))
                        }
                    />
                </StyledItem>
                <StyledItem>
                    <StyledImageInput
                        formats="image/png, image/gif, image/jpeg"
                        placeholder="Image resource"
                        label="Image resource"
                        onChange={(v) => setFormData((p) => ({ ...p, image: v }))}
                        content={
                            <>
                                <Label>{t("sign-up_logo-drop")}</Label>
                                <Label>{t("sign-up_logo-upload")}</Label>
                                <Label>{t("sign-up_logo-format")}</Label>
                            </>
                        }
                    />
                    {formData.image && (
                        <Label>{formData.image.name}</Label>
                    )}
                </StyledItem>
                <StyledItem>
                    <InputFile
                        formats="image/png, image/gif, image/jpeg"
                        placeholder="Square image resource"
                        label="Square image resource"
                        onChange={(v) =>
                            setFormData((p) => ({ ...p, square_image: v }))
                        }
                        content={
                            <>
                                <Label>{t("sign-up_logo-drop")}</Label>
                                <Label>{t("sign-up_logo-upload")}</Label>
                                <Label>{t("sign-up_logo-format")}</Label>
                            </>
                        }
                    />
                    {formData.square_image && (
                        <p>{formData.square_image.name}</p>
                    )}
                </StyledItem>
            </Group>
            <Group></Group>
        </Container>
    )
})

export default GoogleAudienceCreateCampaignFromAudienceMultiChannel;

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
  margin: 7px 0;
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



const RadioBox = styled.div`
  display: flex;
  gap: 5px;
  flex-wrap: wrap;
  margin-inline-end: auto;
  margin: 5px 0;
`;
const StyledCheckbox = styled(Checkbox)`
  & .styled_checkbox_label{
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

const StyledImageInput = styled(InputFile)`
  & .styled_checkbox_label{
    @media screen and (max-width: ${desktopBp}) {
      font-size: ${props => props.theme.fontSize.semiMedium.px};
    }
  }
`
