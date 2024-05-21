import styled from "styled-components";
import {desktopBp} from "../../styles/variables";
import {useTranslation} from "react-i18next";
import {useCallCenterActions, useCallCenterState} from "../../store/callCenter";
import React, {useCallback, useEffect, useMemo} from "react";
import {useRawDataState} from "../../store/rawData";
import {Button} from "../../UI/Button";
import {convert972to0} from "../../utils/convert972to0";
import {activityList} from "../../config/userActivityList";
import {handle} from "../../api";
import {CallCenter} from "../../api/callCenter";
import {useUserState} from "../../store/user";
import Radio from "../../UI/Input/Radio";

const OfflineCallsCreateUsersComponent = ()=>{
    const {t} = useTranslation();
    const { interviewees, selectedIntervieweeNumber } = useCallCenterState();
    const { token } = useUserState();
    const { fields } = useRawDataState()
    const { onGetQuestionariesInterviewees } = useCallCenterActions();
    const { onSelectIntervieweePhone } = useCallCenterActions();

    useEffect(() => {
        if (!interviewees?.phone && interviewees?.mobile_phone) {
            onSelectIntervieweePhone(interviewees.mobile_phone);
        }
        if (interviewees?.phone) {
            onSelectIntervieweePhone(interviewees.phone);
        }
    }, [interviewees]);

    const buttonDisabled = useMemo(() => {
        return !selectedIntervieweeNumber || selectedIntervieweeNumber !== "0";
    }, [selectedIntervieweeNumber]);

    const intervieweeBrithday: null | string = useMemo(() => {
        if (!interviewees?.birthdate) return null;
        const date = new Date(interviewees.birthdate);
        const yyyy = date.getFullYear();
        let mm: number | string = date.getMonth() + 1; // Months start at 0!
        let dd: number | string = date.getDate();
        if (dd < 10) dd = `0${dd}`;
        if (mm < 10) mm = `0${mm}`;
        return `${dd}-${mm}-${yyyy}`;
    }, [interviewees]);

    const handleCall = useCallback(async () => {
        if (token && interviewees?.log_id) {
            const [dataRes, dataErr] = await handle(
                CallCenter.postLogId(token, interviewees.log_id)
            );
            if (dataRes) {
                console.log(dataRes);
            }
            if (dataErr) {
                console.log(dataErr);
            }
        }
    }, [token, interviewees]);


    return (
        <Container>
            <Title>{t("info-component_title")}</Title>
            <GroupContainer>
                <Group>
                    <UserInfo>
                        {interviewees &&
                            Object.keys(interviewees).map((key: string) => {
                                const showName = fields.find(f => f.slug === key)?.name
                                type KeyType = keyof typeof interviewees;
                                const val = String(interviewees[key as KeyType]);
                                if (!interviewees[key as KeyType]) return null
                                if (key === 'id' || key === 'log_id') return null
                                if (key === "birthdate") {
                                    return (
                                        <UserItem>
                                            <Title>{t("info-component_birthdate")}</Title>
                                            <Label>{intervieweeBrithday}</Label>
                                        </UserItem>
                                    );
                                }
                                return (
                                    <UserItem>
                                        <Title>{showName} - </Title>
                                        <Label>{val}</Label>
                                    </UserItem>
                                );
                            })}
                    </UserInfo>
                </Group>
                {interviewees && (
                    <Group>
                        <StyledButton
                            as="a"
                            href={`tel:${convert972to0(selectedIntervieweeNumber)}`}
                            data-action={activityList["call-center-call"]}
                            onClick={handleCall}
                            disabled={buttonDisabled}
                        > {t("info-component_call")}</StyledButton>
                        <StyledButton
                            data-action={activityList["call-center-no_answer"]}
                            onClick={() => onGetQuestionariesInterviewees(interviewees.id)}
                        >{t("info-component_next")}</StyledButton>
                        {interviewees.phone && (
                            <StyledPhone>
                                <StyledRadio
                                    isActive={selectedIntervieweeNumber === interviewees?.phone}
                                    id={0}
                                    label=""
                                    onChange={() =>
                                        onSelectIntervieweePhone(interviewees?.phone)
                                    }
                                />
                                <Label dir="ltr">{interviewees.phone}</Label>
                            </StyledPhone>
                        )}
                        {interviewees.mobile_phone && (
                            <StyledPhone>
                                <StyledRadio
                                    isActive={selectedIntervieweeNumber === interviewees?.mobile_phone}
                                    id={0}
                                    label=""
                                    onChange={() =>
                                        onSelectIntervieweePhone(interviewees?.mobile_phone)
                                    }
                                />
                                <Label dir="ltr">{interviewees.mobile_phone}</Label>
                            </StyledPhone>
                        )}
                    </Group>
                )}
            </GroupContainer>
        </Container>
    )
}

export default OfflineCallsCreateUsersComponent;


const Container = styled.div`
    display: flex;
  gap: 5px;
  flex-direction: column;
`

const GroupContainer = styled.div`
    display: flex;
  gap:3.33vw;
  @media screen and (max-width: ${desktopBp}) {
    gap:42px;
  }
`

const Title = styled.div`
  font-weight: bold;
  font-size: ${props => props.theme.fontSize.semiMedium.vw};
  @media screen and (max-width: ${desktopBp}) {
    font-size: ${props => props.theme.fontSize.semiMedium.px};
  }
`
const Group = styled.div`
    display: flex;
  flex-direction: column;
  gap: 4px;
`
const UserInfo = styled.div`
    display: flex;
  flex-direction: column;
`

const Label = styled.div`
  font-size: ${props => props.theme.fontSize.semiMedium.vw};
  @media screen and (max-width: ${desktopBp}) {
    font-size: ${props => props.theme.fontSize.semiMedium.px};
  }
`
const UserItem = styled.div`
    display: flex;
  align-items: center;
  gap: 5px;
`

const StyledButton = styled(Button)`
  height: 1.67vw;
  border-width: 1px;
  font-size: 0.63vw;
  
  @media(max-width: ${desktopBp}){
    height: 21px;
    font-size: 8px;
  }
`

const StyledPhone = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  margin-top: 2.60vw;
  @media screen and (max-width: ${desktopBp}) {
    margin-top: 33px;
  }
`

const StyledRadio = styled(Radio)`
`
