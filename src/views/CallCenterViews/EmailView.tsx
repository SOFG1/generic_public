import React, {
  useCallback,
  useMemo,
  useState,
  useEffect,
  useRef,
} from "react";
import styled from "styled-components";
import { Title } from "../../components/common/Title";
import { Text } from "../../components/common/Text";
import { colors } from "../../styles/colors";
import { Checkbox, Input, SingleInputDate } from "../../UI/Input";
import { Button } from "../../UI/Button";
import {
  SendEmailAction,
  useCallCenterActions,
  useCallCenterState,
} from "../../store/callCenter";
import DropdownWithSearch from "../../UI/Dropdown/DropdownWithSearch";
import { getFormatDateTime, httpOrHttpsRegex } from "../../utils";
import { useUserState } from "../../store/user";
import { numberWithCommas } from "../../utils/numberWidthCommas";
import { useTranslation } from "react-i18next";
import { useSettingsState } from "../../store/settings";
import { Dropdown } from "../../UI/Dropdown";
import { debounce } from "lodash";
import { handle } from "../../api";
import { CallCenter } from "../../api/callCenter";
import { desktopBp } from "../../styles/variables";
import { FileInputFetch } from "../../UI/FileInputFetch";
import { SunEditorComponent } from "../../components/common/SunEditorComponent";
import { composeSignature, signatureBadge } from "../../utils/composeSignature";
import { activityList } from "../../config/userActivityList";
import { EmailServicesDropdown } from "../../components/CallCenterComponents";
import { withErrorBoundaryHOC } from "../../utils/withErrorBoundaryHOC";

const EmailCard = styled.div`
  margin-bottom: 2.08vw;
  @media screen and (max-width: ${desktopBp}) {
    margin-bottom: 26px;
  }
`;

const CardHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-content: flex-start;
  align-items: flex-start;
  width: 100%;
  justify-content: flex-start;
`;
const TitleStyled = styled(Title)`
  margin-top: 0;
  font-size: 1.25vw;
  line-height: 1.2;
  margin-bottom: 0;
  font-weight: 500;
  @media screen and (max-width: ${desktopBp}) {
    font-size: 16px;
  }
`;

const SubTitleStyled = styled(Text)`
  font-style: normal;
  font-weight: 500;
  font-size: 0.94vw;
  line-height: 1.15vw;
  color: ${colors.graphite_5};
  @media screen and (max-width: ${desktopBp}) {
    font-size: 12px;
    line-height: 14px;
  }
`;
const Form = styled.div`
  box-sizing: border-box;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
  gap: 0.52vw 1.04vw;
  margin: 1.04vw 0 2.19vw;
  @media screen and (max-width: ${desktopBp}) {
    margin: 13px 0 27px;
    gap: 7px 13px;
  }
`;

const StyledFooter = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StyledCheckbox = styled(Checkbox) <{ faded: boolean }>`
  ${({ faded }) => faded && "opacity: 0.5;"}
  &:hover {
    opacity: 1;
  }
`;

const InputStyled = styled(Input)`
  max-width: 15.63vw;
  @media screen and (max-width: ${desktopBp}) {
    max-width: 196px;
  }
`;
const InputLabel = styled.div`
  margin-inline-start: 1.04vw;
  font-style: normal;
  font-weight: normal;
  font-size: 0.73vw;
  line-height: 0.89vw;
  display: flex;
  gap: 5px;
  color: ${colors.graphite_5};
  margin-bottom: 0.26vw;
  @media screen and (max-width: ${desktopBp}) {
    margin-inline-start: 13px;
    font-size: 10px;
    line-height: 11px;
    margin-bottom: 3px;
  }
`;

const InputLabelSpan = styled.span<{ isActive: boolean }>`
  color: ${({ isActive }) =>
    isActive ? colors.graphite_5 : colors.graphite_3};
  text-decoration: ${({ isActive }) => (isActive ? "none" : "underline")};
  cursor: pointer;
`;

const InputWrapper = styled.div<{ isLink: boolean }>`
  display: flex;
  flex-grow: 1;
  flex-shrink: 0;
  flex-direction: column;
  min-width: 100%;
  max-width: ${({ isLink }) => (isLink ? "15.63vw" : "100%")};
  @media screen and (max-width: ${desktopBp}) {
    max-width: ${({ isLink }) => (isLink ? "196px" : "100%")};
  }
`;

const DropdownStyled = styled(DropdownWithSearch)`
  max-width: 15.99vw;
  @media screen and (max-width: ${desktopBp}) {
    max-width: 201px;
  }
`;

const MailDropdown = styled(DropdownStyled)`
  margin-bottom: 0;
`;

const LinkInput = styled(Input)``;

const StyledTextarea = styled(Input)`
  width: 100%;
  max-width: 100%;

  textarea {
    width: 100%;
    min-height: 6.82vw;
    @media screen and (max-width: ${desktopBp}) {
      min-height: 86px;
    }
  }
`;

const StyledDateInput = styled(SingleInputDate) <{ faded: boolean }>`
  ${({ faded }) => faded && "opacity: 0.5;"}
  &:hover {
    opacity: 1;
  }
`;

const SelectDataBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.41vw;
  @media screen and (max-width: ${desktopBp}) {
    gap: 18px;
  }
`;

const StyledBox = styled.div`
  display: flex;
  gap: 1.56vw;
  @media screen and (max-width: ${desktopBp}) {
    gap: 20px;
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

const initialState: { [key: string]: any } = {
  from: "",
  title: "",
  isNow: false,
  date: null,
};

const EmailView = React.memo(() => {
  const { t } = useTranslation();
  const {
    email,
    applayFilter: { email_count },
  } = useCallCenterState();
  const { userInfo, token } = useUserState();
  const { audiences } = useSettingsState();
  const { onSendEmail } = useCallCenterActions();
  const editorRef = useRef<any>(null);
  const [data, setData] = useState<{ [key: string]: any }>(initialState);
  const [isLink, setIsLink] = useState<boolean>(false);
  const [audienceRecipientsCount, setAudienceRecipientsCount] = useState<
    number | null
  >(null);

  const onChangeHandler = useCallback((key: string, value: any) => {
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

  const onSendEmailHandler = useCallback(
    (isTest: boolean) => {
      const sendData: SendEmailAction = {
        from: data.from,
        date: data.isNow
          ? null
          : data.date !== null
            ? getFormatDateTime(data.date)
            : null,
        text: isLink ? data.linkUrl : editorRef.current?.getContents(),
        link: isLink,
        title: data.title,
        now: data.isNow,
      };
      if (isTest) sendData.test_list = true;
      if (data.audience_ids !== "") {
        sendData.audience_ids = data.audience_ids
          .split(", ")
          .map((v: string) => parseInt(v, 10));
      }
      if (data.files) {
        sendData.attachments = data.files.map((f: any) => f.id);
      }
      onSendEmail(sendData);
    },
    [data, isLink]
  );

  const getAudienceRecipientsCount = async (
    token: string,
    data: { [key: string]: any }
  ) => {
    if (data.audience_ids === "") setAudienceRecipientsCount(null);
    if (data.audience_ids !== "") {
      const audienceIds = data.audience_ids
        .split(", ")
        .map((v: string) => parseInt(v, 10));
      const [dataRes, dataErr] = await handle(
        CallCenter.getEmailAudienceRecCount(token, audienceIds)
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
    return email_count;
  }, [audienceRecipientsCount, email_count]);

  const previewUrl = useMemo(() => {
    if (!isLink || !data.text) return null;
    if (httpOrHttpsRegex.test(data.text)) return data.text;
    return `http://${data.text}`;
  }, [data.text, isLink]);

  //Save signatures in editor context
  useEffect(() => {
    const rtlSign = userInfo?.email_signatures.find((s) => s.lang === "he");
    const ltrSign = userInfo?.email_signatures.find((s) => s.lang === "en");
    if (!editorRef?.current) return;
    if (rtlSign) {
      editorRef.current.core.context.rtlSign = rtlSign.url;
    }
    if (ltrSign) {
      editorRef.current.core.context.ltrSign = ltrSign.url;
    }
  }, [userInfo?.email_signatures]);

  //Set signature initially
  useEffect(() => {
    const alreadyAddedSign = editorRef.current
      ?.getContents()
      ?.match(signatureBadge);
    if (alreadyAddedSign) return;
    if (!editorRef.current) return;
    const lang = localStorage.getItem("i18nextLng");
    const ltrSign = editorRef.current.core.context.ltrSign;
    const rtlSign = editorRef.current.core.context.rtlSign;
    if (lang === "en" && ltrSign) {
      const sign = composeSignature(editorRef.current.core.context.ltrSign);
      editorRef?.current.appendContents(sign);
    }
    if (lang === "he" && rtlSign) {
      const sign = composeSignature(editorRef.current.core.context.rtlSign);
      editorRef?.current.appendContents(sign);
    }
  }, [editorRef.current]);

  return (
    <EmailCard dir="auto">
      <CardHeader>
        <TitleStyled>
          {t("call-center_email-title")}
          {!userInfo?.group.email_service && " - Demo"}
        </TitleStyled>
        <SubTitleStyled>
          {t("call-center_email-quota")} {numberWithCommas(email.quota || 0)}
        </SubTitleStyled>
        <SubTitleStyled>
          {t("call-center_email-sent")} {numberWithCommas(recipientsCount || 0)}{" "}
          {t("call-center_email-adresses")}
        </SubTitleStyled>
      </CardHeader>
      <Form>
        <InputStyled
          type="text"
          name="title"
          value={data["title"] || ""}
          label={t("call-center_email-label")}
          onChange={(v) => onChangeHandler("title", v)}
        />
        <DropdownStyled
          as={Dropdown}
          value={data.audience_ids || ""}
          label={t("call-center_audience-label")}
          placeholder={t("call-center_audience-label")}
          onSelect={(v: string) =>
            setData((prev) => ({ ...prev, audience_ids: v }))
          }
          options={audiencesOptions}
          isMultiSelect={true}
        />
        {userInfo?.group_connect && <EmailServicesDropdown value={data.service_id} onChange={(v) => setData(p => ({ ...p, service_id: v }))} />}
        <InputWrapper isLink={isLink}>
          <InputLabel>
            <InputLabelSpan onClick={() => setIsLink(false)} isActive={!isLink}>
              {t("call-center_email-text")}
            </InputLabelSpan>
            <InputLabelSpan onClick={() => setIsLink(true)} isActive={isLink}>
              {t("call-center_email-link")}
            </InputLabelSpan>
          </InputLabel>
          {isLink && (
            <LinkInput
              type="text"
              name="text"
              label={t("call-center_email-link_label")}
              onChange={(v) => onChangeHandler("linkUrl", v)}
              value={data["linkUrl"] || ""}
            />
          )}
          {!isLink && <SunEditorComponent ref={editorRef} />}
        </InputWrapper>
        {/* Email content preview */}
        {previewUrl && (
          <>
            <SubTitleStyled>{t("call-center_email-preview")}</SubTitleStyled>
            <iframe src={previewUrl} height="600px" width="100%"></iframe>
          </>
        )}

        <MailDropdown
          value={data.from || ""}
          placeholder={t("call-center_email-email")}
          onSelect={(val) => onChangeHandler(`from`, val)}
          options={
            email.from?.map((item) => {
              return {
                item: item,
                value: item,
              };
            }) || []
          }
          label={t("call-center_email-email")}
        />
        <FileInputFetch
          filesList={data.files || []}
          onChange={(v) => onChangeHandler("files", v)}
        />
      </Form>
      <StyledFooter>
        <SelectDataBlock>
          <StyledCheckbox
            faded={!!data.date}
            label={t("call-center_send-now")}
            isActive={Boolean(data["isNow"])}
            onChange={(val) => onChangeHandler("isNow", val)}
          />
          <StyledDateInput
            faded={!!data.isNow}
            label={t("call-center_select-time")}
            onChange={(val) => onChangeHandler("date", val)}
            startDate={data["date"] || null}
          />
        </SelectDataBlock>
        <StyledBox>
          <StyledBtn
            data-action={activityList["call-center-email_test"]}
            disabled={data.from === "" || data.title === "" || data.text === ""}
            onClick={() => onSendEmailHandler(true)}
          >
            {t("call-center_test")}
          </StyledBtn>
          <StyledBtn
            data-action={activityList["call-center-email_send"]}
            disabled={data.from === "" || data.title === "" || data.text === ""}
            onClick={() => onSendEmailHandler(false)}
          >
            {t("call-center_send")}
          </StyledBtn>
        </StyledBox>
      </StyledFooter>
    </EmailCard>
  );
});

export default withErrorBoundaryHOC(EmailView);
