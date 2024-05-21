import React, { useCallback, useEffect, useMemo } from "react";
import styled from "styled-components";
import { colors } from "../../styles/colors";
import { Button } from "../../UI/Button";
import Radio from "../../UI/Input/Radio";
import {
  useCallCenterActions,
  useCallCenterState,
} from "../../store/callCenter";
import { useTranslation } from "react-i18next";
import { convert972to0 } from "../../utils/convert972to0";
import { desktopBp } from "../../styles/variables";
import { useUserState } from "../../store/user";
import { handle } from "../../api";
import { CallCenter } from "../../api/callCenter";
import { activityList } from "../../config/userActivityList";
import { useRawDataState } from "../../store/rawData";

const InfoComponentCard = styled.div`
  padding: 0;
  flex-shrink: 0;
  width: fit-content;
  max-width: 35%;
  border-inline-start: 1px solid #000;
  box-sizing: border-box;
  padding-inline-start: 3.07vw;
  @media screen and (max-width: ${desktopBp}) {
    padding-inline-start: 39px;
  }
  @media screen and (max-width: 740px) {
    order: -1;
    max-width: 100%;
    width: 100%;
  }
`;

const CardTitle = styled.p`
  font-size: 1.46vw;
  line-height: 1.88vw;
  font-weight: 500;
  text-align: left;
  margin: 0 0 2.6vw;
  @media screen and (max-width: ${desktopBp}) {
    font-size: 18px;
    line-height: 24px;
    margin-bottom: 33px;
  }
`;

const User = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: flex-start;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-style: normal;
  font-size: 0.94vw;
  line-height: 1.15vw;
  font-weight: 500;
  color: ${colors.graphite_5};
  margin-bottom: 5px;

  span {
    margin-left: 5px;
    font-weight: bold;
    color: ${colors.graphite_6};
  }
  @media screen and (max-width: ${desktopBp}) {
    font-size: 12px;
    line-height: 14px;
    margin-bottom: 3px;
  }
`;

const ButtonBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 0.78vw;
  @media screen and (max-width: ${desktopBp}) {
    gap: 10px;
  }
`;

const StyledButton = styled(Button)`
  width: 7.03vw;
  padding-left: 0;
  padding-right: 0;
  @media screen and (max-width: ${desktopBp}) {
    width: 88px;
  }
`;

const Phones = styled.div`
  display: flex;
  flex-direction: column;
  align-content: flex-start;
  align-items: flex-start;
  justify-content: flex-start;
  margin-top: 1.04vw;

  & > div {
    margin-bottom: 0.52vw;

    &:last-child {
      margin-bottom: 0;
    }
  }

  @media screen and (max-width: ${desktopBp}) {
    margin-top: 13px;

    & > div {
      margin-bottom: 7px;
    }
  }
`;

const PhoneBox = styled.div`
  display: flex;
  align-items: center;
`;

const PhoneLabel = styled.p`
  font-size: 0.94vw;
  line-height: 1.15vw;
  font-weight: bold;
  color: #253238;
  cursor: pointer;
  text-decoration: none;
  @media screen and (max-width: ${desktopBp}) {
    font-size: 12px;
    line-height: 14px;
  }
`;

const InfoComponent = React.memo(() => {
  const { t } = useTranslation();
  const { token } = useUserState();
  const { interviewees, selectedIntervieweeNumber } = useCallCenterState();

  const { fields } = useRawDataState()
  const { onSelectIntervieweePhone } = useCallCenterActions();
  const { onGetQuestionariesInterviewees } = useCallCenterActions();

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

  useEffect(() => {
    if (!interviewees?.phone && interviewees?.mobile_phone) {
      onSelectIntervieweePhone(interviewees.mobile_phone);
    }
    if (interviewees?.phone) {
      onSelectIntervieweePhone(interviewees.phone);
    }
  }, [interviewees]);


  return (
    <InfoComponentCard>
      <CardTitle>{t("info-component_title")}</CardTitle>
      <User>
        {interviewees &&
          Object.keys(interviewees).map((key: string) => {
            const showName = fields.find(f => f.slug === key)?.name
            type KeyType = keyof typeof interviewees;
            const val = String(interviewees[key as KeyType]);
            if (!interviewees[key as KeyType]) return null
            if (key === 'id' || key === 'log_id') return null
            if (key === "birthdate") {
              return (
                <UserInfo>
                  {t("info-component_birthdate")}
                  <span>{intervieweeBrithday}</span>
                </UserInfo>
              );
            }
            return (
              <UserInfo>
                {showName}
                <span>{val}</span>
              </UserInfo>
            );
          })}
        {interviewees && (
          <>
            <Phones>
              {interviewees.phone && (
                <PhoneBox>
                  <Radio
                    isActive={selectedIntervieweeNumber === interviewees?.phone}
                    id={0}
                    label=""
                    onChange={() =>
                      onSelectIntervieweePhone(interviewees?.phone)
                    }
                  />
                  <PhoneLabel dir="ltr">{interviewees.phone}</PhoneLabel>
                </PhoneBox>
              )}

              {interviewees.mobile_phone && (
                <PhoneBox>
                  <Radio
                    isActive={
                      selectedIntervieweeNumber === interviewees.mobile_phone
                    }
                    id={1}
                    label=""
                    onChange={() =>
                      onSelectIntervieweePhone(interviewees.mobile_phone)
                    }
                  />
                  <PhoneLabel dir="ltr">{interviewees.mobile_phone}</PhoneLabel>
                </PhoneBox>
              )}
            </Phones>
            <ButtonBlock>
              <StyledButton
                as="a"
                onClick={handleCall}
                disabled={buttonDisabled}
                href={`tel:${convert972to0(selectedIntervieweeNumber)}`}
                data-action={activityList["call-center-call"]}
              >
                {t("info-component_call")}
              </StyledButton>
              <StyledButton
                data-action={activityList["call-center-no_answer"]}
                onClick={() => onGetQuestionariesInterviewees(interviewees.id)}
              >
                {t("info-component_next")}
              </StyledButton>
            </ButtonBlock>
          </>
        )}
      </User>
    </InfoComponentCard>
  );
});

export default InfoComponent;
