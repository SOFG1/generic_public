import styled from "styled-components";
import {desktopBp} from "../../styles/variables";
import DropdownWithSearch from "../../UI/Dropdown/DropdownWithSearch";
import {Input} from "../../UI/Input";
import {InputVariants} from "../../UI/Input/types";
import React, {memo, useMemo} from "react";
import {EmailsCreateInitialState} from "./EmailsCreateComponent";
import {useTranslation} from "react-i18next";
import {Dropdown} from "../../UI/Dropdown";
import {useSettingsState} from "../../store/settings";
import {useCallCenterState} from "../../store/callCenter";
interface IProps{
    data:EmailsCreateInitialState,
    onChangeHandler:(key:keyof EmailsCreateInitialState, data:string | string[] | number)=>void,
}
const EmailsCreateParametersComponent = memo(({data, onChangeHandler}:IProps)=>{
    const {t} = useTranslation();
    const { audiences } = useSettingsState();
    const {
        email
    } = useCallCenterState();

    const audiencesOptions = useMemo(() => {
        return audiences.map((a) => ({ value: a.id, item: a.name }));
    }, [audiences]);
    return (
        <Container>
            <Group>
                <StyledItem>
                    <Label>{t("raw_data_digital_campaign_emails_subject")}</Label>
                    <DropdownStyled
                        as={Input}
                        name={t("raw_data_digital_campaign_emails_subject")}
                        type="text"
                        placeholder={t("raw_data_digital_campaign_emails_subject")}
                        label={""}
                        value={data.subject}
                        onChange={(val: string) => onChangeHandler("subject", val)}
                        variant={InputVariants.Small}
                    />
                </StyledItem>
                <StyledItem>
                    <Label>{t("raw_data_digital_campaign_emails_audience")}</Label>
                    <DropdownStyled
                        as={Dropdown}
                        value={data.audience || ""}
                        label={t("raw_data_digital_campaign_emails_audience")}
                        placeholder={t("raw_data_digital_campaign_emails_audience")}
                        onSelect={(v: string) => onChangeHandler("audience", v)}
                        options={audiencesOptions}
                        isMultiSelect={true}
                    />
                </StyledItem>
            </Group>
            <Group>
                <StyledItem>
                    <Label>{t("raw_data_digital_campaign_emails_sender")}</Label>
                    <DropdownStyled
                        value={data.audience || ""}
                        placeholder={t("raw_data_digital_campaign_emails_sender")}
                        onSelect={(val) => onChangeHandler(`sender`, val)}
                        options={
                            email.from?.map((item) => {
                                return {
                                    item: item,
                                    value: item,
                                };
                            }) || []
                        }
                        label={t("raw_data_digital_campaign_emails_sender")}
                    />
                </StyledItem>
            </Group>
        </Container>
    )
})

export default EmailsCreateParametersComponent;

const Container = styled.div`
    display: flex;
  gap:3.33vw;
  
  @media screen and (max-width: ${desktopBp}) {
    gap:42px;
  }
`

const Group = styled.div``
const Label = styled.p`
  font-size: ${props => props.theme.fontSize.semiMedium.vw};
  @media screen and (max-width: ${desktopBp}) {
    font-size: ${props => props.theme.fontSize.semiMedium.px};
  }
`
const StyledItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.68vw;
  font-size: ${props => props.theme.fontSize.semiMedium.vw};
  @media screen and (max-width: ${desktopBp}) {
    gap:8px;
    font-size: ${props => props.theme.fontSize.semiMedium.px};
  }
`

const DropdownStyled = styled(DropdownWithSearch)`
  width: 9.48vw;
  color:rgba(254, 89, 18, 1);
  
  
  @media screen and (max-width: ${desktopBp}) {
    width: 119px;
  }
`;
