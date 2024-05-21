import React from "react";
import styled from "styled-components";
import {desktopBp} from "../../styles/variables";
import {Dropdown} from "../../UI/Dropdown";
import {CreateableDropdown} from "../../UI/CreateableDropdown";
import {useAppActions} from "../../store/app";

interface IProps{
    formData:{[p:string]:any},
    setFormData: React.Dispatch<React.SetStateAction<{[p: string]: any}>>,
}
const genderOptions = [
    { item: "FEMALE", value: "FEMALE" },
    { item: "MALE", value: "MALE" },
    { item: "UNDETERMINED", value: "UNDETERMINED" },
    { item: "UNKNOWN", value: "UNKNOWN" },
    { item: "UNSPECIFIED", value: "UNSPECIFIED" },
];
const GoogleAdsCreateCampaignFromAudienceExtraComponent = ({formData, setFormData}:IProps)=>{
    const { onShowAlert } = useAppActions();

    const handleChangeGenders = (key: string, value: string) => {
        setFormData((p) => ({
            ...p,
            gender_mapping: { ...p.gender_mapping, [key]: value },
        }));
    };

    const handleChangeKeywords = (values: { value: string; label: string }[]) => {
        const strings = values.map((v) => v.value);
        const allLessThan80Chars = strings.every((str) => str.length < 81);
        if (allLessThan80Chars && strings.length <= 10) {
            setFormData((p) => ({ ...p, keywords: strings.join(", ") }));
        }
        if (!allLessThan80Chars || strings.length > 10) {
            onShowAlert(
                false,
                "You could add max 10 keywords and each one should contain max 80 charactes."
            );
        }
    };

    return (
        <Container>
            <Group>
                {formData.gender_mapping && Object.keys(formData.gender_mapping).map((gender) => {
                    return (
                        <StyledItem key={gender}>
                            <Label>Gender</Label>
                            <DropdownStyled
                                value={formData.gender_mapping[gender]}
                                placeholder="Gender"
                                label="Gender"
                                onSelect={(value) => handleChangeGenders(gender, value)}
                                options={genderOptions}
                            />
                        </StyledItem>
                    );
                })}
                <StyledItem>
                    <StyledCreatableDropdown
                        placeholder="Add keywords"
                        value={
                            formData.keywords
                                ? formData?.keywords
                                    ?.split(", ")
                                    .map((value: string) => ({ value, label: value }))
                                : []
                        }
                        options={[]}
                        onChange={handleChangeKeywords}
                    />
                </StyledItem>
            </Group>
            <Group></Group>
        </Container>
    )
}

export default GoogleAdsCreateCampaignFromAudienceExtraComponent;

const Container = styled.div`
    display: flex;
  justify-content: space-between;
  gap:5px;
`

const Group = styled.div`
`
const StyledItem = styled.div`
    display: flex;
    gap:5px;
  width: 100%;
  min-width: 10.00vw;
  @media screen and (max-width: ${desktopBp}) {
    min-width: 150px;
  }
`
const Label = styled.p`
  width: 4.17vw;
  font-size: ${props => props.theme.fontSize.semiMedium.vw};
  @media screen and (max-width: ${desktopBp}) {
    font-size: ${props => props.theme.fontSize.semiMedium.px};
    width: 52px;
  }
`
const StyledCreatableDropdown = styled(CreateableDropdown)`
  & .createable__control{
    min-height: auto;
    padding: 0 !important;
    & button{
      font-size: ${props => props.theme.fontSize.semiMedium.vw} !important;
      @media screen and (max-width: ${desktopBp}) {
        font-size: ${props => props.theme.fontSize.semiMedium.px} !important;
      }
    }
  }
  & .createable__input{
    font-size: ${props => props.theme.fontSize.semiMedium.vw} !important;
    @media screen and (max-width: ${desktopBp}) {
      font-size: ${props => props.theme.fontSize.semiMedium.px} !important;
    }
  }
  & .createable__placeholder{
    font-size: ${props => props.theme.fontSize.semiMedium.vw} !important;
    @media screen and (max-width: ${desktopBp}) {
      font-size: ${props => props.theme.fontSize.semiMedium.px} !important;
    }
  }
`

const DropdownStyled = styled(Dropdown)`
  width: 6.25vw;
  color:rgba(254, 89, 18, 1);
  
  @media screen and (max-width: ${desktopBp}) {
    width: 78px;
  }
`;
