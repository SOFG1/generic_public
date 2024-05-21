import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { handle } from "../../api";
import { CallCenter } from "../../api/callCenter";
import { Text } from "../../components/common/Text";
import { Title } from "../../components/common/Title";
import { useAppActions } from "../../store/app";
import {
  useCallCenterActions,
  useCallCenterState,
} from "../../store/callCenter";
import { useUserState } from "../../store/user";
import { desktopBp } from "../../styles/variables";
import { Button } from "../../UI/Button";
import { Dropdown } from "../../UI/Dropdown";
import { Input, InputFile } from "../../UI/Input";
import { activityList } from "../../config/userActivityList";

const ModalFrame = styled.div<{ isFetching: boolean }>`
  ${({ isFetching }) => isFetching && "cursor: wait;& * {cursor: wait;}"}
`;

const TitleStyled = styled(Title)`
  font-size: 1.25vw;
  line-height: 1.2;
  font-weight: 500;
  margin: 0;
  @media screen and (max-width: ${desktopBp}) {
    font-size: 16px;
  }
`;

const InputStyled = styled(Input)`
  min-width: 20.83vw;
  margin-bottom: 1.04vw;
  @media screen and (max-width: ${desktopBp}) {
    min-width: 261px;
    margin-bottom: 13px;
  }
  @media screen and (max-width: 500px) {
    min-width: 200px;
  }
`;

const InputFileStyled = styled(InputFile)`
  margin-bottom: 1.04vw;
  @media screen and (max-width: ${desktopBp}) {
    margin-bottom: 13px;
  }
`;

const TextStyled = styled(Text)`
  margin-bottom: 0.52vw;
  margin-top: 0;
  text-decoration: underline;
  cursor: pointer;
  @media screen and (max-width: ${desktopBp}) {
    margin-bottom: 7px;
  }
`;

const DropdownStyled = styled(Dropdown)`
  margin-bottom: 1.04vw;
  min-width: 20.83vw;
  @media screen and (max-width: ${desktopBp}) {
    margin-bottom: 13px;
    min-width: 261px;
  }
  @media screen and (max-width: 500px) {
    min-width: 200px;
  }
`;

const ButtonStyled = styled(Button)`
  margin-top: 0.52vw;
  padding: 0.57vw 1.77vw;
  @media screen and (max-width: ${desktopBp}) {
    margin-top: 7px;
    padding: 7px 22px;
  }
`;

const CreateCreativeModal = React.memo(() => {
  const { t } = useTranslation();
  const { token } = useUserState();
  const { onShowAlert } = useAppActions();
  const { selectedFBAccount, isFetching } = useCallCenterState();
  const { onCreateCreative } = useCallCenterActions();
  const [newName, setNewName] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [description, setDescription] = useState<string>("")
  const [headline, setHeadline] = useState<string>("")
  const [fileData, setFileData] = useState<File | null>(null);
  const [selectedPage, setSelectedPage] = useState<number>(0);
  const [creativeParams, setCreativeParams] = useState<any>(null);

  const onChangeFile = useCallback((file: File) => {
    if (file) {
      setFileData(file);
    }
  }, []);

  const getCreativeParams = useCallback(async () => {
    if (token) {
      const [dataRes, dataErr]: any = await handle(
        CallCenter.getCreativesParams(token)
      );
      if (dataRes) {
        setCreativeParams(dataRes);
      }
      if (dataErr) {
        const errText = dataErr?.error?.error_user_msg || dataErr.error || "Something went wrong! Try again later!"
        onShowAlert(false, errText);
      }
    }
  }, [token]);

  const onCreateCreativeHandler = useCallback(() => {
    let CreativeData: any = new FormData();
    CreativeData.append("acc_id", selectedFBAccount);
    CreativeData.append("name", newName);
    CreativeData.append("title", title);
    CreativeData.append("body", body);
    CreativeData.append("page_id", selectedPage);
    CreativeData.append("media", fileData);
    CreativeData.append("message", message);
    CreativeData.append("description", description);
    CreativeData.append("headline", headline);
    onCreateCreative(CreativeData);
  }, [selectedFBAccount, newName, title, body, fileData, selectedPage, message, description, headline]);

  useEffect(() => {
    getCreativeParams();
  }, [getCreativeParams]);

  return (
    <ModalFrame isFetching={isFetching === "creatives"}>
      <TitleStyled>{t("creative_title")}</TitleStyled>

      <InputStyled
        type="text"
        placeholder={t("creative_name-placeholder")}
        value={newName}
        onChange={setNewName}
        name="creative_name"
        label={t("creative_name-label")}
      />
      <InputStyled
        type="text"
        placeholder={t("creative_title-placeholder")}
        value={title}
        onChange={setTitle}
        name="creative_title"
        label={t("creative_title-label")}
      />
      <InputStyled
        type="text"
        placeholder={t("creative_body-placeholder")}
        value={body}
        onChange={setBody}
        name="creative_body"
        label={t("creative_body-label")}
      />

      <InputStyled
        type="text"
        placeholder={t("creative_message")}
        value={message}
        onChange={setMessage}
        name="message"
        label={t("creative_message")}
      />


      <InputStyled
        type="text"
        placeholder={t("creative_description")}
        value={description}
        onChange={setDescription}
        name="description"
        label={t("creative_description")}
      />

      <InputStyled
        type="text"
        placeholder={t("creative_headline")}
        value={headline}
        onChange={setHeadline}
        name="headline"
        label={t("creative_headline")}
      />



      <InputFileStyled
        errorMessage={""}
        content={
          <>
            <TitleStyled>{t("creative_media-title")}</TitleStyled>
            <TextStyled>{t("creative_media-text")}</TextStyled>
          </>
        }
        label={t("creative_media-label")}
        placeholder={fileData?.name || t("creative_media-placeholder")}
        onChange={(f) => onChangeFile(f as File)}
      />
      {fileData ? (
        <DropdownStyled
          value={selectedPage}
          placeholder={"Page"}
          onSelect={setSelectedPage}
          options={creativeParams.pages.map((item: any) => {
            return { item: item.name, value: item.id };
          })}
          label={"Page"}
        />
      ) : null}
      <ButtonStyled
        data-action={activityList["call-center-FB-creative_create"]}
        disabled={isFetching === "creatives"}
        onClick={onCreateCreativeHandler}
      >
        {t("creative_create")}
      </ButtonStyled>
    </ModalFrame>
  );
});

export default CreateCreativeModal;
