import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
  useRef,
} from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { handle } from "../../api";
import { CallCenter } from "../../api/callCenter";
import { useAppActions } from "../../store/app";
import { PublicationType } from "../../store/sentimentor/types";
import { useUserState } from "../../store/user";
import { desktopBp } from "../../styles/variables";
import { Button } from "../../UI/Button";
import { Dropdown } from "../../UI/Dropdown";
import { FileInputFetch } from "../../UI/FileInputFetch";
import { Input } from "../../UI/Input";
import { Loader } from "../../UI/Spinners";
import { composeSignature, signatureBadge } from "../../utils/composeSignature";
import { SunEditorComponent } from "../common/SunEditorComponent";
import InitialPubComponent from "./InitialPubComponent";
import RecipientsEmails from "./RecipientsEmails";
import RecipientsInstitutions from "./RecipientsInstitutions";

const StyledEditor = styled.div`
  max-width: 1050px;
  .se-toolbar.se-toolbar-sticky {
    position: static;
  }
  .se-submenu {
    position: absolute;
    top: 84px !important;
  }
`;

const StyledContent = styled.div`
  display: flex;
  gap: 1.04vw;
  margin-bottom: 1.04vw;
  @media screen and (max-width: ${desktopBp}) {
    gap: 13px;
    margin-bottom: 13px;
  }
`;

const StyledLeft = styled.div``;

const StyledDropdown = styled(Dropdown)`
  margin-bottom: 1.04vw;
  @media screen and (max-width: ${desktopBp}) {
    margin-bottom: 13px;
  }
`;

const StyledInput = styled(Input)`
  margin-bottom: 1.04vw;
  @media screen and (max-width: ${desktopBp}) {
    margin-bottom: 13px;
  }
`;

const TranslateBtn = styled(Button)`
  width: auto;
  margin-bottom: 10px;
`;

const StyledAttachments = styled(FileInputFetch)`
  margin-top: 10px;
`;

const StyledBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.04vw;
  @media screen and (max-width: ${desktopBp}) {
    gap: 13px;
  }
`;

const StyledLoader = styled(Loader)`
  flex-shrink: 0;
  margin: 0 8.33vw;
  @media screen and (max-width: ${desktopBp}) {
    margin: 0 105px;
  }
`;

interface IProps {
  publication: PublicationType;
  publications: PublicationType[];
  onSelectPublication: (pub: PublicationType) => void;
}

const EmailEditorComponent = React.memo(
  ({ publication, publications, onSelectPublication }: IProps) => {
    const { t } = useTranslation();
    const { token } = useUserState();
    const { userInfo } = useUserState();
    const { onShowAlert } = useAppActions();
    const [emailTitle, setEmailTitle] = useState<string>("");
    const editorRef = useRef<any>(null);
    const [isFetching, setIsFetching] = useState<boolean>(false);
    const [isTranslating, setIsTranslating] = useState<boolean>(false);
    const [attachments, setAttachments] = useState<any[]>([]);
    //Resipients
    const [recipientsEmails, setRecipientsEmails] = useState<string[]>([]);
    const [selectedInstitutionId, setSelectedInsitutionId] =
      useState<number>(0);

    useEffect(() => {
      let text = "";
      Object.keys(publication).forEach((key) => {
        const value = publication[key];
        const keyTranslated = t(`ranking_email_${key}`)
        if (key === "_sender") return;
        if (typeof value === "string") {
          text += keyTranslated;
          text += ` - ${value}<br>`;
        }
        if (key === "keywords:" && value) {
          text += `${keyTranslated}<br>`;
          publication.keywords.forEach((k: any) => (text += `${k.name}<br>`));
        }
        if (key === "institutions:" && value) {
          text += `${keyTranslated}<br>`;
          publication.institutions.forEach(
            (i: any) => (text += `${i.inst_name}<br>`)
          );
        }
      });
      const oldContent = editorRef.current?.getContents();
       editorRef.current?.setContents(oldContent + text);
    }, [publication, editorRef.current]);

    const pubsOptions = useMemo(() => {
      return publications.map((pub, index) => ({
        item: pub.title,
        value: index,
      }));
    }, [publications]);

    const isAvailableNext = useMemo(() => {
      const currentPubIndex = publications.indexOf(publication);
      return currentPubIndex + 1 < publications.length;
    }, [publication, publications]);

    const handleSetNext = useCallback(() => {
      if (isAvailableNext) {
        const currentIndex = publications.indexOf(publication);
        const nextPublication = publications[currentIndex + 1];
        onSelectPublication(nextPublication);
      }
    }, [isAvailableNext, publications, publication]);

    const handleSend = useCallback(async () => {
      if (!recipientsEmails.length && !selectedInstitutionId) {
        onShowAlert(false, "Please, add recipients");
      }
      const email: any = {
        title: emailTitle,
        text: editorRef.current?.getContents(),
        now: true,
      };
      if (attachments.length > 0) {
        email.attachments = attachments.map((f) => f.id);
      }
      if (token) {
        // const filters: any = {};
        // if (selectedInstitutionId) filters.institution = selectedInstitutionId;
        setIsFetching(true);
        const [dataRes, dataErr] = await handle(
          CallCenter.postEmail(token, email, recipientsEmails)
        );
        setIsFetching(false);
        if (dataErr) {
          onShowAlert(false, dataErr.error);
        }
        if (dataRes) {
          onShowAlert(true, "Sent successfully");
        }
      }
    }, [
      token,
      emailTitle,
      editorRef.current,
      selectedInstitutionId,
      recipientsEmails,
      attachments,
    ]);

    const handleTranslate = useCallback(async () => {
      if (token) {
        setIsTranslating(true);
        const [dataRes, dataErr] = await handle(
          CallCenter.translateHTML(token, editorRef.current?.getContents())
        );
        setIsTranslating(false);
        if (dataRes) {
          editorRef.current?.setContents(dataRes);
        }
        if (dataErr) {
          onShowAlert(false, dataErr.error);
        }
      }
    }, [token, editorRef.current]);

    //Save signatures in editor context
    useEffect(() => {
      const rtlSign = userInfo?.email_signatures.find((s) => s.lang === "he");
      const ltrSign = userInfo?.email_signatures.find(
        (s) => s.lang === "en"
      );
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
      const alreadyAddedSign = editorRef.current?.getContents()?.match(signatureBadge)
      if(alreadyAddedSign) return
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
      <StyledEditor>
        <StyledContent dir="ltr">
          <StyledLeft>
            <StyledDropdown
              label={t("ranking_publications")}
              placeholder={t("ranking_publications")}
              onSelect={(i) => onSelectPublication(publications[i])}
              options={pubsOptions}
              value={publications.indexOf(publication)}
            />
            <StyledInput
              label={t("ranking_email-title")}
              type="text"
              name="email_title"
              value={emailTitle}
              onChange={setEmailTitle}
            />
            {isTranslating ? (
              <Loader />
            ) : (
              <TranslateBtn onClick={handleTranslate}>{t("ranking_translate")}</TranslateBtn>
            )}
            <SunEditorComponent
              ref={editorRef}
            />
            <StyledAttachments
              filesList={attachments}
              onChange={setAttachments}
            />
            <RecipientsEmails
              emails={recipientsEmails}
              onChange={setRecipientsEmails}
            />
            {/* <RecipientsInstitutions
              value={selectedInstitutionId}
              onChange={setSelectedInsitutionId}
            /> */}
          </StyledLeft>
          <InitialPubComponent post={publication} />
        </StyledContent>
        <StyledBox>
          {isFetching ? (
            <StyledLoader />
          ) : (
            <Button onClick={handleSend}>{t("ranking_send-email")}</Button>
          )}
          {isAvailableNext && (
            <Button onClick={handleSetNext}>{t("ranking_next-pub")}</Button>
          )}
        </StyledBox>
      </StyledEditor>
    );
  }
);

export default EmailEditorComponent;
