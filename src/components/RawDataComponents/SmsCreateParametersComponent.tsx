import styled from "styled-components";
import DropdownWithSearch from "../../UI/Dropdown/DropdownWithSearch";
import {desktopBp} from "../../styles/variables";
import {SmsCreateInitialState} from "./SmsCreateComponent";
import {useCallCenterActions, useCallCenterState} from "../../store/callCenter";
import {Dropdown} from "../../UI/Dropdown";
import React, {memo, useEffect, useMemo} from "react";
import {useTranslation} from "react-i18next";
import {useSettingsState} from "../../store/settings";
import {Input} from "../../UI/Input";
import {InputVariants} from "../../UI/Input/types";
import CircleSearch from "../../UI/Svg/icons/CircleSearch";

interface IProps{
    data:SmsCreateInitialState,
    onChangeHandler:(key:keyof SmsCreateInitialState, data:string | string[])=>void,
}
const SmsCreateParametersComponent = memo(({data, onChangeHandler}:IProps)=>{
    const {t} = useTranslation();
    const {
        sms
    } = useCallCenterState();
    const { audiences } = useSettingsState();
    const { campaigns } = useCallCenterState()
    const { onGetCampaigns } = useCallCenterActions()


    useEffect(() => {
        onGetCampaigns()
    }, [onGetCampaigns])

    const options = useMemo(() => {
        return campaigns.map(c => ({ item: c, value: c }))
    }, [campaigns])

    const audiencesOptions = useMemo(() => {
        return audiences.map((a) => ({ value: a.id, item: a.name }));
    }, [audiences]);


    return(
        <Container>
            <Group>
                <StyledItem>
                    <Label>{t("raw_data_digital_campaign_sms_sender")}:</Label>
                    <DropdownStyled
                        label={t("raw_data_digital_campaign_sms_sender")}
                        searchIcon={<CircleSearch/>}
                        onSelect={(value)=>{onChangeHandler("sender", value)}}
                        options={sms.from?.map((item) => {
                            return {
                                item: item,
                                value: item,
                            };
                        }) || []}
                        placeholder={t("raw_data_digital_campaign_sms_sender")}
                        value={data.sender}/>
                </StyledItem>
                <StyledItem>
                    <Label>{t("raw_data_digital_campaign_sms_name")}</Label>
                    <DropdownStyled
                        as={Input}
                        name={t("raw_data_digital_campaign_sms_name")}
                        type="text"
                        placeholder={t("raw_data_digital_campaign_sms_name")}
                        label={""}
                        value={data.name}
                        onChange={(val: string) => onChangeHandler("name", val)}
                        variant={InputVariants.Small}
                    />
                </StyledItem>
            </Group>
            <Group>
                <StyledItem>
                    <Label>{t("raw_data_digital_campaign_sms_audience")}</Label>
                    <DropdownStyled
                        as={Dropdown}
                        value={data.audience || ""}
                        label={t("call-center_choose-aud")}
                        placeholder={t("call-center_choose-aud")}
                        onSelect={(v: string) =>
                            onChangeHandler("audience",  v)
                        }
                        options={audiencesOptions}
                        isMultiSelect={true}
                    />
                </StyledItem>
                <StyledItem>
                    <Label>{t("raw_data_digital_campaign_sms_exclude")}</Label>
                    <DropdownStyled
                        searchIcon={<CircleSearch/>}
                        label={t("call-center_sms-campaigns")}
                        placeholder={t("call-center_sms-campaigns")}
                        value={data.exclude} onSelect={(v) => onChangeHandler("exclude", v)}
                        options={options}
                        isMultiSelect={true} />

                </StyledItem>
            </Group>
        </Container>
    )

})

export default SmsCreateParametersComponent;

const Container = styled.div`
  display: flex;
  
  flex-wrap: wrap;
  padding: 0 0.52vw;
  gap:3.33vw;
  @media screen and (max-width: ${desktopBp}) {
    gap:42px;
    padding: 0 7px;
  }
`

const DropdownStyled = styled(DropdownWithSearch)`
  width: 9.48vw;
  color:rgba(254, 89, 18, 1);
  
  @media screen and (max-width: ${desktopBp}) {
    width: 119px;
  }
`;


const Group = styled.div``
const Label = styled.p`
  width: 2.60vw;
  font-size: ${props => props.theme.fontSize.semiMedium.vw};
  @media screen and (max-width: ${desktopBp}) {
    font-size: ${props => props.theme.fontSize.semiMedium.px};
    width: 33px;
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
