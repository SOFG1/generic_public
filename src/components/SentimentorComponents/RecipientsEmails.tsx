import _ from "lodash";
import React, { useCallback, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { handle } from "../../api";
import { Sentimentor } from "../../api/sentimentor";
import { useAppActions } from "../../store/app";
import { useUserState } from "../../store/user";
import { desktopBp } from "../../styles/variables";
import { DropdownSearchFetch } from "../../UI/Dropdown";
import { validEmailRegex } from "../../utils";
import EmailsInputComponent from "./EmailsInputComponent";
import { useTranslation } from "react-i18next";

const StyledRecipientsBox = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1.04vw;
  @media screen and (max-width: ${desktopBp}) {
    gap: 13px;
  }
`;

const StyledRecipientsInput = styled(EmailsInputComponent)`
  margin: 1.04vw 0;
  flex-grow: 1;
  @media screen and (max-width: ${desktopBp}) {
    margin: 13px 0;
  }
`;

const ClientsDropdown = styled(DropdownSearchFetch)`
  max-width: 15.63vw;
  margin-top: 2.3vw;
  @media screen and (max-width: ${desktopBp}) {
    max-width: 196px;
    margin-top: 32px;
  }
`;

interface IProps {
  emails: string[];
  onChange: (emails: string[]) => void;
}


const RecipientsEmails = React.memo(({ emails, onChange }: IProps) => {
  const {t} = useTranslation()
  const {token} = useUserState()
  const { onShowAlert } = useAppActions();
  const [emailsOptions, setEmailsOptions] = useState<{item: string, value: string}[]>([])

  const fetchEmailsOptions = useCallback(async (val: string) => {
    if(token && val) {
      const [dataRes, dataErr] = await handle(Sentimentor.getClientsEmails(token, val))
      if(dataRes) {
        const opts = dataRes.map((a: string) => ({item: a, value: a}))
        setEmailsOptions(opts)
      }
      if(dataErr) {
        onShowAlert(false, dataErr.error)
      }
    }
  }, [token]);

  const fetchEmailsDebounced = useCallback(_.debounce(fetchEmailsOptions, 1000), [fetchEmailsOptions, _])

  const handleAddRecipient = useCallback(
    (email: string) => {
      if (emails.includes(email)) {
        onShowAlert(false, t("ranking_email-added"));
        return;
      }
      if (!validEmailRegex.test(email)) {
        onShowAlert(false, t("ranking_email-incorrect"));
        return;
      }
      onChange([...emails, email]);
    },
    [emails, t]
  );

  const handleDelete = useCallback(
    (email: string) => {
      onChange(emails.filter((e) => e !== email));
    },
    [emails]
  );


  return (
    <StyledRecipientsBox>
      <StyledRecipientsInput
        label={t("ranking_email-add")}
        emails={emails}
        onAddEmail={handleAddRecipient}
        onDeleteEmail={handleDelete}
      />
      <ClientsDropdown
        value=""
        label={t("ranking_email-start")}
        placeholder={t("ranking_email-start")}
        onSelect={handleAddRecipient}
        options={emailsOptions}
        isReversed={true}
        onSearch={fetchEmailsDebounced}
      />
    </StyledRecipientsBox>
  );
});

export default RecipientsEmails;
