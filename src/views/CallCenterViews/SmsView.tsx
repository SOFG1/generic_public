import React, { useCallback, useMemo, useState, useEffect } from "react";
import styled from "styled-components";
import { InputValueType } from "../../types";
import { Checkbox, Input, SingleInputDate } from "../../UI/Input";
import { Button } from "../../UI/Button";
import {
  SendSmsAction,
  useCallCenterActions,
  useCallCenterState,
} from "../../store/callCenter";
import DropdownWithSearch from "../../UI/Dropdown/DropdownWithSearch";
import { getFormatDateTime } from "../../utils";
import { useUserState } from "../../store/user";
import { numberWithCommas } from "../../utils/numberWidthCommas";
import { useTranslation } from "react-i18next";
import { InputVariants } from "../../UI/Input/types";
import { Loader } from "../../UI/Spinners";
import { useSettingsState } from "../../store/settings";
import { Dropdown } from "../../UI/Dropdown";
import { debounce } from "lodash";
import { handle } from "../../api";
import { CallCenter } from "../../api/callCenter";
import { desktopBp } from "../../styles/variables";
import { activityList } from "../../config/userActivityList";
import { SmsServicesDropdown, SmsCampaignComponent } from "../../components/CallCenterComponents";
import { ConfirmDeleteFull } from "../../components/common/ConfirmDeleteFull";
import { withErrorBoundaryHOC } from "../../utils/withErrorBoundaryHOC";

const StyledWrapper = styled.div`
  margin-bottom: 1.56vw;
  @media screen and (max-width: ${desktopBp}) {
    margin-bottom: 20px;
  }
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 39px;
  @media screen and (max-width: ${desktopBp}) {
    flex-direction: column;
  }
`;
const TitleStyled = styled.p`
  font-size: 1.46vw;
  line-height: 1.88vw;
  font-weight: 500;
  margin: 0;
  @media screen and (max-width: ${desktopBp}) {
    font-size: 18px;
    line-height: 24px;
  }
`;

const SubTitleStyled = styled.p`
  font-size: 0.94vw;
  line-height: 1.2vw;
  margin: 0;
  @media screen and (max-width: ${desktopBp}) {
    font-size: 12px;
    line-height: 15px;
  }
`;
const Form = styled.div`
  box-sizing: border-box;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: flex-start;
  align-content: flex-start;
  margin-top: 1.04vw;
  margin-bottom: 2.19vw;
  @media screen and (max-width: ${desktopBp}) {
    margin-top: 13px;
    margin-bottom: 27px;
  }
`;

const StyledFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1.56vw;
  @media screen and (max-width: ${desktopBp}) {
    flex-direction: column;
    gap: 20px;
  }
`;

const FooterForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.41vw;
  @media screen and (max-width: ${desktopBp}) {
    gap: 18px;
  }
`;

const StyledDateInput = styled(SingleInputDate) <{ faded: boolean }>`
  ${({ faded }) => faded && "opacity: 0.5;"}
  &:hover {
    opacity: 1;
  }
`;

const DropdownStyled = styled(DropdownWithSearch)`
  width: 11.98vw;
  @media screen and (max-width: ${desktopBp}) {
    width: 150px;
  }
  @media screen and (max-width: 850px) {
    width: 150px;
  }
  @media screen and (max-width: 400px) {
    width: 100%;
  }
`;

const StyledTextarea = styled(Input)`
  width: 100%;
  max-width: 100%;

  textarea {
    width: 100%;
    min-height: 6.82vw;
    @media screen and (max-width: ${desktopBp}) {
      border-radius: 13px;
      min-height: 86px;
    }
  }
`;

const StyledBtnBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.56vw;
  @media screen and (max-width: ${desktopBp}) {
    gap: 20px;
  }
  @media screen and (max-width: 450px) {
    width: 100%;
    flex-direction: column;
  }
`;

const StyledCheckbox = styled(Checkbox) <{ faded: boolean }>`
  ${({ faded }) => faded && "opacity: 0.5;"}
  &:hover {
    opacity: 1;
  }
`;

const StyledBtn = styled(Button)`
  position: relative;
  font-size: 1.35vw;
  line-height: 1.77vw;
  height: 5.83vw;
  width: 11.67vw;
  @media screen and (max-width: ${desktopBp}) {
    font-size: 17px;
    line-height: 22px;
    height: 73px;
    width: 146px;
  }
`;

const StyledLoader = styled(Loader)`
  height: 2.6vw;
  width: 2.6vw;
  @media screen and (max-width: ${desktopBp}) {
    height: 33px;
    width: 33px;
  }
`;

const initialState: { [key: string]: any } = {
  from: "",
  text: "",
  isNow: false,
  date: null,
  campaignName: "",
};

const SmsView = React.memo(() => {
  const { t } = useTranslation();
  const {
    sms,
    applayFilter: { phone_count },
    isFetching,
  } = useCallCenterState();
  const { onSendSms } = useCallCenterActions();
  const { userInfo, token } = useUserState();
  const { audiences } = useSettingsState();
  const [data, setData] = useState<{ [key: string]: any }>(initialState);
  const [showConfirmSend, setShowConfirmSend] = useState<boolean>(false);
  const [audienceRecipientsCount, setAudienceRecipientsCount] = useState<
    number | null
  >(null);


  const onChangeHandler = useCallback((key: string, value: InputValueType) => {
    setData((prevState) => {
      const data = { ...prevState, [key]: value };
      if (key === "date" && value !== null) data.isNow = false;
      if (key === "isNow" && value === true) data.date = null;
      return data;
    });
  }, []);

  const audiencesOptions = useMemo(() => {
    return audiences.map((a) => ({ value: a.id, item: a.name }));
  }, [audiences]);

  const getAudienceRecipientsCount = async (
    token: string,
    data: { [key: string]: any }
  ) => {
    if (!data.audience_ids) setAudienceRecipientsCount(null);
    if (data.audience_ids && data.audience_ids !== "") {
      const audienceIds = data.audience_ids
        ? data.audience_ids.split(", ").map((v: string) => parseInt(v, 10))
        : [];
      const [dataRes, dataErr] = await handle(
        CallCenter.getSmsAudienceRecCount(token, audienceIds)
      );
      if (typeof dataRes === "number") {
        setAudienceRecipientsCount(dataRes);
      }
    }
  };

  const debounceFn = useCallback(
    debounce((token, data) => getAudienceRecipientsCount(token, data), 2000),
    []
  );

  useEffect(() => {
    debounceFn(token, data);
  }, [data, debounceFn, token]);

  const recipientsCount = useMemo(() => {
    //Recipients will be only for selected audiences if there are selected audiences
    if (typeof audienceRecipientsCount === "number")
      return audienceRecipientsCount;
    // Return recipients count for applied filters if there isn't selected audiences
    return phone_count;
  }, [audienceRecipientsCount, phone_count]);

  const onSendEmailHandler = useCallback(
    (isTest: boolean) => {
      const sendData: SendSmsAction = {
        from: data.from,
        exclude_compaings: data.exclude_compaings,
        date: data.isNow
          ? null
          : data.date !== null
            ? getFormatDateTime(data.date)
            : null,
        text: data.text,
        now: data.isNow,
        test_list: isTest,
        add_param_comment: data.campaignName ? data.campaignName : null,
      };
      if (data.audience_ids && data.audience_ids !== "") {
        sendData.audience_ids = data.audience_ids
          .split(", ")
          .map((v: string) => parseInt(v, 10));
      }
      onSendSms(sendData);
    },
    [data]
  );

  //Show message characters length after 30, for users from Israel
  const messageCharactersCount: number = useMemo(() => {
    const userIsFromIsrael = userInfo?.group?.country?.id === 328;
    const messageLength = data["text"].length;
    if (userIsFromIsrael) return messageLength + 30;
    return messageLength;
  }, [userInfo, data]);

  const sendWarningMessage = useMemo(() => {
    const count = numberWithCommas(recipientsCount || 0);
    const personOrPeople = recipientsCount > 2 ? "people" : "person";
    const sceduleWarning = data.date
      ? " You won’t be able to cancel the scheduled sms. Are you sure you want to continue?"
      : "";
    return `SMS will be send to ${count} ${personOrPeople}. ${sceduleWarning}`;
  }, [recipientsCount, data.date]);

  return (
    <>
      <ConfirmDeleteFull
        show={showConfirmSend}
        text={sendWarningMessage}
        onDelete={() => onSendEmailHandler(false)}
        onClose={() => setShowConfirmSend(false)}
      />
      <StyledWrapper dir="auto">
        <CardHeader>
          <SubTitleStyled>
            {t("call-center_sms-sent")} {numberWithCommas(recipientsCount || 0)}{" "}
            {t("call-center_sms-numbers")}
          </SubTitleStyled>
        </CardHeader>
        <Form>
          <StyledBtnBox>
            <DropdownStyled
              value={data[`from`] || ""}
              placeholder={t("call-center_sms-from")}
              onSelect={(val) => onChangeHandler(`from`, val)}
              options={
                sms.from?.map((item) => {
                  return {
                    item: item,
                    value: item,
                  };
                }) || []
              }
              label={t("call-center_sms-from")}
            />
            <DropdownStyled
              as={Dropdown}
              value={data.audience_ids ? data.audience_ids : ""}
              label={t("call-center_choose-aud")}
              placeholder={t("call-center_choose-aud")}
              onSelect={(v: string) =>
                setData((prev) => ({ ...prev, audience_ids: v }))
              }
              options={audiencesOptions}
              isMultiSelect={true}
            />
            <DropdownStyled
              as={Input}
              name="campaign name"
              type="text"
              placeholder={t("call-center_sms-campaign")}
              label={t("call-center_sms-campaign")}
              value={data["campaignName"]}
              onChange={(val: string) => onChangeHandler(`campaignName`, val)}
              variant={InputVariants.Small}
            />
            <SmsCampaignComponent selected={data.exclude_compaings || []} onChange={(v) => setData(p => ({ ...p, exclude_compaings: v }))} />
            {userInfo?.group_connect && <SmsServicesDropdown value={data.service_id} onChange={(v) => onChangeHandler("service_id", v)} />}
          </StyledBtnBox>

          <StyledTextarea
            type="text"
            name="text"
            isTextarea={true}
            label={`${t("call-center_sms-text")}: ${messageCharactersCount}`}
            onChange={(v) => onChangeHandler("text", v)}
            value={data["text"] || ""}
          />
        </Form>
        <StyledFooter>
          <FooterForm>
            <StyledCheckbox
              faded={!!data.date}
              label={t("call-center_sms-now")}
              isActive={Boolean(data["isNow"])}
              onChange={(val) => onChangeHandler("isNow", val)}
            />
            <StyledDateInput
              faded={!!data.isNow}
              label={t("call-center_sms-datetime")}
              onChange={(val) => onChangeHandler("date", val)}
              startDate={data["date"] || null}
            />
          </FooterForm>
          {isFetching ? (
            <StyledLoader />
          ) : (
            <StyledBtnBox>
              <StyledBtn
                disabled={data.from === "" || data.text === ""}
                onClick={() => setShowConfirmSend(true)}
                data-action={activityList["call-center-sms_send"]}
              >
                {t("call-center_sms-send")}
              </StyledBtn>
              <StyledBtn
                disabled={data.from === "" || data.text === ""}
                onClick={() => onSendEmailHandler(true)}
                data-action={activityList["call-center-sms_test"]}
              >
                {t("call-center_sms-test")}
              </StyledBtn>
            </StyledBtnBox>
          )}
        </StyledFooter>
      </StyledWrapper>
    </>
  );
});

export default withErrorBoundaryHOC(SmsView);
