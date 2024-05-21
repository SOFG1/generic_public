import React, { useEffect, useState, useCallback, useMemo } from "react";
import styled from "styled-components";
import { langOptions } from "../../config/langOptions";
import { desktopBp } from "../../styles/variables";
import { Dropdown } from "../../UI/Dropdown";
import { Title } from "../common/Title";
import { InputFile } from "../../UI/Input";
import { Text } from "../common/Text";
import { UploadIcon } from "../../UI/Svg";
import { useTranslation } from "react-i18next";
import { Button } from "../../UI/Button";
import { useUserState } from "../../store/user";
import { handle } from "../../api";
import { Settings } from "../../api/settings";
import { useUserActions } from "../../store/user";
import { Loader } from "../../UI/Spinners";
import { useAppActions } from "../../store/app";
import { activityList } from "../../config/userActivityList";

const StyledWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 4.17vw;
  padding: 0.52vw;
  border: 1px solid #000;
  @media screen and (max-width: ${desktopBp}) {
    gap: 52px;
    padding: 7px;
  }
  @media screen and (max-width: 700px) {
    flex-direction: column;
  }
`;

const StyledDropdown = styled(Dropdown)``;

const InputFileStyled = styled(InputFile)`
  width: 15.63vw;
  height: 7.81vw;
  .file-drop {
    min-width: 15.63vw;
  }
  @media screen and (max-width: ${desktopBp}) {
    width: 196px;
    height: 98px;
    margin-bottom: 13px;
    .file-drop {
      min-width: 196px;
    }
  }
`;

const PreviewImage = styled.img`
  height: 100%;
  width: 100%;
  object-fit: contain;
`;

const TitleModal = styled(Title)`
  margin-bottom: 0.52vw;
  margin-top: 0;
  min-width: 15.63vw;
  @media screen and (max-width: ${desktopBp}) {
    margin-bottom: 7px;
    min-width: 196px;
  }
`;

const TextModal = styled(Text)`
  margin-bottom: 0.52vw;
  margin-top: 0;
  text-decoration: underline;
  cursor: pointer;
  @media screen and (max-width: ${desktopBp}) {
    margin-bottom: 7px;
  }
`;

const StyledLoader = styled(Loader)`
  flex-shrink: 0;
`;


const AddSignatureComponent = React.memo(() => {
  const { t } = useTranslation();
  const { token } = useUserState();
  const {userInfo} = useUserState()
  const { getUserInfoAction } = useUserActions();
  const {onShowAlert} = useAppActions()
  const [lang, setLang] = useState<string>(langOptions[0].value);
  const [file, setFile] = useState<null | File>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isFetching, setIsFetching] = useState<boolean>(false);

  useEffect(() => {
    let url: string | undefined;
    if (file) {
      url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
    return () => {
      if (url) {
        URL.revokeObjectURL(url);
      }
    };
  }, [file]);

  const alreadyAdded = useMemo(() => {  //Already added for this language
    return userInfo?.email_signatures.some(s => s.lang === lang)
  }, [lang, userInfo])

  const handleAddSignature = useCallback(async () => {
    if(alreadyAdded) {
      onShowAlert(false, 'You already have a signature for selected language')
      return
    }
    if (token && file) {
      setIsFetching(true);
      const [dataRes, dataErr] = await handle(
        Settings.createSignature(token, lang, file)
      );
      setIsFetching(false);
      if (!dataErr) {
        onShowAlert(true, 'Successfully added !')
        getUserInfoAction(token);
        setFile(null)
        setPreviewUrl(null)
      }
      if (dataErr) {
        onShowAlert(false, dataErr.error || 'Error, max size 2mb.')
      }
    }
  }, [token, lang, file]);

  return (
    <StyledWrapper>
      <StyledDropdown
        label={t("settings_signatures-lang")}
        placeholder={t("settings_signatures-lang")}
        value={lang}
        onSelect={setLang}
        options={langOptions}
      />
      <InputFileStyled
        formats="image/png, image/jpeg"
        content={
          <>
            <TitleModal>{t("settings_signatures-drop")}</TitleModal>
            <TextModal>{t("settings_signatures-click")}</TextModal>
            <Text>{t("settings_signatures-format")}</Text>
          </>
        }
        placeholder={
          previewUrl ? (
            <PreviewImage src={previewUrl} />
          ) : (
            <>
              <UploadIcon /> {t("raw-data_template-upload")}
            </>
          )
        }
        onChange={(f) => setFile(f as File)}
      />
      {file && !isFetching && (
        <Button onClick={handleAddSignature} data-action={activityList["settings-add-signature"]}>
          {t("settings_signatures-add")}
        </Button>
      )}
      {isFetching && <StyledLoader />}
    </StyledWrapper>
  );
});

export default AddSignatureComponent;
