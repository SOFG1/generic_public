import React, { useState, useMemo, useEffect } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { Card } from "../../components/common/Card";
import { useCallCenterHistoryActions } from "../../store/callCenterHistory";
import { usePermissions } from "../../store/user/hooks";
import { desktopBp } from "../../styles/variables";
import { Button } from "../../UI/Button";
import EmailsView from "./EmailsView";
import HistoryView from "./HistoryView";
import IncomingSmsView from "./IncomingSmsView";
import OutgoingSmsView from "./OutgoingSmsView";
import QuestionariesView from "./QuestionariesView";
import UsersActivityView from "./UsersActivityView";
import { activityList } from "../../config/userActivityList";
import AppQuestsView from "./AppQuestsView";
import { withErrorBoundaryHOC } from "../../utils/withErrorBoundaryHOC";

const StyledCard = styled(Card)`
  margin: 2.03vw 0 1.56vw;
  @media screen and (max-width: ${desktopBp}) {
    margin: 25px 0 20px;
  }
`;

const StyledTitle = styled.h2`
  font-weight: 400;
  font-size: 1.67vw;
  line-height: 2.19vw;
  margin-top: 0.73vw;
  margin-bottom: 4vw;
  margin-inline-start: 0.26vw;
  @media screen and (max-width: ${desktopBp}) {
    font-size: 21px;
    line-height: 27px;
    margin-top: 9px;
    margin-bottom: 50px;
    margin-inline-start: 3px;
  }
`;

const StyledBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.09vw;
  @media screen and (max-width: ${desktopBp}) {
    gap: 14px;
  }
  @media screen and (max-width: 500px) {
    gap: 8px;
  }
`;

const StyledBtn = styled(Button) <{ selected: boolean }>`
  font-size: 0.94vw;
  padding: 1.04vw 1.09vw;
  width: fit-content;
  white-space: nowrap;
  min-width: 9.06vw;
  max-width: 10.78vw;
  ${({ selected }) =>
    selected &&
    `
  color: #fff;
  background-color: #000;
  `}
  @media screen and (max-width: ${desktopBp}) {
    font-size: 12px;
    min-width: 114px;
    max-width: 135px;
    padding: 13px 14px;
  }
`;

const ChoosePlatformView = React.memo(() => {
  const { t, i18n } = useTranslation();
  const { onGetFilters } = useCallCenterHistoryActions();
  const {
    readSMSOutgoing,
    readSMSIncoming,
    readEmail,
    questionaries,
    edits_read,
  } = usePermissions("CallCenterHistory");
  const { app_connection } = usePermissions("Settings");
  const [selectedService, setSelectedService] = useState<string>("");

  const services = useMemo(() => {
    const accesible: string[] = [];
    if (readSMSOutgoing) accesible.push("outgoing-sms");
    if (readSMSIncoming) accesible.push("incoming-sms");
    if (readEmail) accesible.push("emails");
    if (questionaries) accesible.push("call-center");
    if (edits_read) accesible.push("edits");
    if (app_connection) accesible.push("app-quests");
    accesible.push("activity");
    return accesible;
  }, [readSMSOutgoing, readSMSIncoming, readEmail, questionaries, app_connection]);



  useEffect(() => {
    // set outgoing initially if it's accessible
    if (readSMSOutgoing) setSelectedService("outgoing-sms");
  }, [readSMSOutgoing]);

  useEffect(() => {
    onGetFilters();
  }, [i18n.language]);

  return (
    <StyledCard>
      <StyledTitle>{t("reporting_title")}</StyledTitle>
      <StyledBox>
        {services.map((s) => {
          //@ts-ignore
          const action = activityList[`reports-select-${s}`];
          return (
            <StyledBtn
              data-action={action}
              onClick={() => setSelectedService(s)}
              key={s}
              selected={selectedService === s}
            >
              {t(`reporting_${s}`)}
            </StyledBtn>
          );
        })}
        {selectedService === "outgoing-sms" && <OutgoingSmsView />}
        {selectedService === "incoming-sms" && <IncomingSmsView />}
        {selectedService === "app-quests" && <AppQuestsView />}
        {selectedService === "emails" && <EmailsView />}
        {selectedService === "call-center" && <QuestionariesView />}
        {selectedService === "edits" && <HistoryView />}
        {selectedService === "activity" && <UsersActivityView />}
      </StyledBox>
    </StyledCard>
  );
});

export default withErrorBoundaryHOC(ChoosePlatformView);
