import styled from "styled-components";
import {desktopBp} from "../../styles/variables";
import DropdownWithSearch from "../../UI/Dropdown/DropdownWithSearch";
import React, {useMemo} from "react";
import {useCallCenterActions, useCallCenterState} from "../../store/callCenter";
import {useUserState} from "../../store/user";
import {useSettingsState} from "../../store/settings";
import {useTranslation} from "react-i18next";

const OfflineCallsCreateParametersComponent = ()=>{
    const {t} = useTranslation();
    const { userInfo } = useUserState();
    const { audiences } = useSettingsState()
    const {
        onSelectQuestionarie,
        onSelectAudience,
    } = useCallCenterActions();
    const {
        questionariesList,
        selectedQuestionarieId,
        selectedAudienceId
    } = useCallCenterState();
    const handleSelectQuestionarie = (id: any) => {
        onSelectQuestionarie(id);
    };
    const isGeneralRole = userInfo?.role?.id !== 3;
    const questionarieOptions: { item: string; value: string | number }[] =
        useMemo(() => {
            return questionariesList.map((item) => {
                return {
                    item: item.name,
                    value: item.id,
                };
            });
        }, [questionariesList]);

    const audiencesOptions = useMemo(() => {
        return audiences?.map(a => ({ item: a.name, value: a.id }))
    }, [audiences])

    return (
        <Container>
            <Group>
                <StyledItem>
                    <Label>{t("questionaries-questionarie-plhr")}</Label>
                    <DropdownStyled
                        isReversed={true}
                        value={selectedQuestionarieId}
                        placeholder={t("questionaries-questionarie-plhr")}
                        onSelect={handleSelectQuestionarie}
                        options={questionarieOptions}
                        label={t("questionaries-questionarie-label")}
                    />
                </StyledItem>
                {isGeneralRole && (
                    <StyledItem>
                        <Label>{t("questionaries-audience")}</Label>
                        <DropdownStyled
                            isReversed={true}
                            value={selectedAudienceId || 0}
                            placeholder={t("questionaries-audience")}
                            onSelect={onSelectAudience}
                            options={audiencesOptions}
                            label={t("questionaries-audience")}
                        />
                    </StyledItem>
                )}
            </Group>
        </Container>
    )
}

export default OfflineCallsCreateParametersComponent;


const Container = styled.div`
  display: flex;
  gap:1.17vw;
  
  @media screen and (max-width: ${desktopBp}) {
    gap:15px;
  }
`

const DropdownStyled = styled(DropdownWithSearch)`
  width: 9.48vw;
  color:rgba(254, 89, 18, 1);
  & .styled_input{
    color:rgba(254, 89, 18, 1);
    font-size: ${props => props.theme.fontSize.semiMedium.vw};
    @media screen and (max-width: ${desktopBp}) {
      font-size: ${props => props.theme.fontSize.semiMedium.px};
    }
  }
  
  & .styled_dropdown_label{
    color:rgba(188, 188, 188, 1);
    transform: translateY(0) !important;
    ${props => props.value && "display:none"};
    font-size: ${props => props.theme.fontSize.semiMedium.vw};
    @media screen and (max-width: ${desktopBp}) {
      font-size: ${props => props.theme.fontSize.semiMedium.px};
      transform: translateY(0) !important;
    }
  }
  & .styled_input_label{
    ${props => props.value && "display:none"};
    transform: translateY(-1.25vw) !important;
    color:rgba(188, 188, 188, 1);
    font-size: ${props => props.theme.fontSize.semiMedium.vw};
    @media screen and (max-width: ${desktopBp}) {
      transform: translateY(-15px) !important;
      font-size: ${props => props.theme.fontSize.semiMedium.px};
    }
  }
  
  & .styled_search_input{
    font-size: ${props => props.theme.fontSize.semiMedium.vw};
    @media screen and (max-width: ${desktopBp}) {
      font-size: ${props => props.theme.fontSize.semiMedium.px};
    }
  }
  & .styled_search_input_container{
    padding-left: 0.36vw;
    padding-right: 0.36vw;
    width: calc(100% - 0.36vw * 2);
    max-width: calc(100% - 0.36vw * 2);
    font-size: ${props => props.theme.fontSize.semiMedium.vw};
    @media screen and (max-width: ${desktopBp}) {
      font-size: ${props => props.theme.fontSize.semiMedium.px};
      padding-left: 5px;
      width: calc(100% - 5px * 2);
      max-width: calc(100% - 5px * 2);
    }
  }
  & .styled_dropdown_item{
    transition:background-color .2s ease;
    padding-left: 3px;
    width: calc(100% - 3px);
    font-size: ${props => props.theme.fontSize.semiMedium.vw};
    @media screen and (max-width: ${desktopBp}) {
      font-size: ${props => props.theme.fontSize.semiMedium.px};
    }
  }
  & .styled_dropdown_option{
    width: calc(100% - 6px);
    &:hover{
      background-color: #fff;
    }
    &:hover .styled_dropdown_item{
      background-color: rgba(220, 220, 220, 1);
      border-radius: 3px;
    }
  }
  & .styled_dropdown_option-selected{
    background-color: #fff;
    color:#000;
  }
  & .styled_dropdown_item-selected{
    background-color: rgba(220, 220, 220, 1);
    border-radius: 3px;
  }
  
  @media screen and (max-width: ${desktopBp}) {
    width: 119px;
  }
`;


const Group = styled.div``
const Label = styled.p`
  width: 5.21vw;
  font-size: ${props => props.theme.fontSize.semiMedium.vw};
  @media screen and (max-width: ${desktopBp}) {
    width: 65px;
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
