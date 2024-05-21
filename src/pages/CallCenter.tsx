import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import {
  EmailView,
  QuestionsView,
  SmsView,
  FacebookMarketingView,
  ChooseServiceView,
  GoogleAdsView,
} from "../views/CallCenterViews";
import { useRawDataActions } from "../store/rawData";
import { useCallCenterActions } from "../store/callCenter";
import { useUserState } from "../store/user";
import { useSettingsActions } from "../store/settings";
import { Card } from "../components/common/Card";

const StyledCard = styled(Card)``;

const CallCenter = () => {
  const { userInfo } = useUserState();
  const { getFilters, getFields } = useRawDataActions();
  const { onGetApplayFilter, onGetSMS, onGetEmail, onGetQuestionariesList } = useCallCenterActions();
  const { onGetAudiences } = useSettingsActions();
  const [selectedService, setSelectedService] = useState<string>("sms");

  const isCalls = useMemo(
    () => userInfo?.permissions.CallCenter.actions.calls,
    [userInfo]
  );
  const isSms = useMemo(
    () => userInfo?.permissions.CallCenter.actions.sms,
    [userInfo]
  );
  const isEmail = useMemo(
    () => userInfo?.permissions.CallCenter.actions.email,
    [userInfo]
  );
  const isFBmarketing = useMemo(
    () => userInfo?.permissions.CallCenter.actions.FBMarketing,
    [userInfo]
  );
  const isGoogleAds = useMemo(
    () => userInfo?.permissions.CallCenter.actions.google_ads,
    [userInfo]
  );

  useEffect(() => {
    getFilters();
    onGetApplayFilter()
    onGetSMS()
    onGetEmail()
    onGetQuestionariesList()
    getFields();
    onGetAudiences();
  }, []);

  useEffect(() => {
    if (selectedService === "sms" && !isSms) setSelectedService("");
  }, [selectedService, isSms]);

  const servicesList: string[] = useMemo(() => {
    const list: string[] = [];
    if (isSms) list.push("sms");
    if (isCalls) list.push("calls");
    if (isEmail) list.push("emails");
    if (isFBmarketing) list.push("social");
    if (isGoogleAds) list.push("google");
    return list;
  }, [isCalls, isSms, isEmail, isGoogleAds]);

  return (
      <StyledCard>
        <ChooseServiceView
          selected={selectedService}
          selectService={setSelectedService}
          services={servicesList}
        />
        {selectedService === "emails" && <EmailView />}
        {selectedService === "sms" && <SmsView />}
        {selectedService === "calls" && <QuestionsView />}
        {selectedService === "social" && <FacebookMarketingView />}
        {selectedService === "google" && <GoogleAdsView />}
      </StyledCard>
  );
}

export default CallCenter;
