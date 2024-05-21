import React, { useCallback, useMemo, useState, useEffect } from "react";
import { Title } from "../../components/common/Title";
import { Card } from "../../components/common/Card";
import { Text } from "../../components/common/Text";
import { Button, EButtonVariants } from "../../UI/Button";
import styled from "styled-components";
import { Input, InputFile } from "../../UI/Input";
import { useUserActions, useUserState } from "../../store/user/hooks";
import { IRegistrationData } from "../../store/user/types";
import { colors } from "../../styles/colors";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import TextLayer from "../../components/common/Text/TextLayer";
import { desktopBp } from "../../styles/variables";
import { withErrorBoundaryHOC } from "../../utils/withErrorBoundaryHOC";

const StyledCard = styled(Card)`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const InputStyled = styled(Input)`
  width: 31.25vw;
  margin-bottom: 1.04vw;
  @media screen and (max-width: ${desktopBp}) {
    width: 392px;
    margin-bottom: 13px;
  }
  @media screen and (max-width: 470px) {
    width: auto;
  }
`;

const InputFileStyled = styled(InputFile)`
  margin-bottom: 1.04vw;
  @media screen and (max-width: ${desktopBp}) {
    margin-bottom: 13px;
  }
`;
const ButtonStyled = styled(Button)`
  margin: 1.04vw 0;
  @media screen and (max-width: ${desktopBp}) {
    margin: 13px 0;
  }
`;

const TitleStyled = styled(Title)`
  margin-bottom: 0.52vw;
  margin-top: 0;
  @media screen and (max-width: ${desktopBp}) {
    margin-bottom: 7px;
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

const AvatarPreview = styled.img`
  height: 7.81vw;
  width: 7.81vw;
  border-radius: 50%;
  object-fit: cover;
  @media screen and (max-width: ${desktopBp}) {
    height: 98px;
    width: 98px;
  }
`;

const ErrorMessage = styled.div`
  font-size: 0.83vw;
  line-height: 1;
  text-align: center;
  color: ${colors.orange};
  width: 100%;
  margin: 0.52vw 0;
  @media screen and (max-width: ${desktopBp}) {
    font-size: 11px;
    margin: 7px 0;
  }
`;

const StepOneView = React.memo(() => {
  const { t } = useTranslation();
  const { onRegistration } = useUserActions();
  const { errorMessage } = useUserState();
  const [fileName, setFileName] = useState<string>("");
  const [fileData, setFileData] = useState<File | null>(null);
  const [imgPreviewUrl, setImgPreviewUrl] = useState<any>(null);
  const [formData, setFormData] = useState<{
    username: string;
    full_name: string;
    uid: string;
    password: string;
    re_password: string;
    email: string;
  }>({
    username: "",
    full_name: "",
    uid: "",
    password: "",
    re_password: "",
    email: "",
  });
  const [formError, setFormError] = useState<{
    username: string;
    full_name: string;
    uid: string;
    password: string;
    re_password: string;
    email: string;
    file: string;
  }>({
    username: "",
    full_name: "",
    uid: "",
    password: "",
    re_password: "",
    email: "",
    file: "",
  });

  const onChangeHandler = useCallback(
    (key: string, val: string) => {
      let errorMessage = "";
      if (val.trim() === "") {
        errorMessage = `${key} is a required field!`;
      } else {
        switch (key) {
          case "password":
            errorMessage = val.length < 5 ? "Min length: 5" : errorMessage;
            break;
          case "re_password":
            errorMessage = val.length < 5 ? "Min length: 5" : errorMessage;
            break;
        }
      }
      let passwordError = "";
      if (key === "password" || key === "re_password") {
        if (key === "password") {
          if (
            formData["re_password"] !== "" &&
            formData["re_password"] !== val
          ) {
            passwordError = "Passwords do not match";
          }
        } else {
          if (formData["password"] !== "" && formData["password"] !== val) {
            passwordError = "Passwords do not match";
          }
        }
      }
      setFormData((prevState) => {
        return {
          ...prevState,
          [key]: val,
        };
      });
      setFormError((prevState) => {
        const data = {
          ...prevState,
          [key]: errorMessage,
        };
        if (passwordError !== "") {
          data["re_password"] = passwordError;
        } else if (key !== "re_password") {
          data["re_password"] =
            data["re_password"] === "Passwords do not match"
              ? ""
              : data["re_password"];
        }
        return {
          ...data,
        };
      });
    },
    [formData]
  );

  const onChangeFile = useCallback((file: File) => {
    let errorMessage = "";
    if (file) {
      if (file.type === "image/png" || file.type === "image/jpeg") {
        setFileName(file.name);
        setFileData(file);
      } else {
        setFileData(null);
        setFileName("");
        errorMessage = "Incorrect file format!";
      }
    }
    setFormError((prevState) => {
      return {
        ...prevState,
        file: errorMessage,
      };
    });
  }, []);

  const onSubmit = useCallback(() => {
    const registrationData: IRegistrationData = {
      login: formData.username,
      full_name: formData.full_name,
      uid: formData.uid,
      password: formData.password,
      password_confirmation: formData.re_password,
      email: formData.email,
    };
    if (fileData) registrationData.pic = fileData;
    onRegistration(registrationData);
  }, [formData, fileData]);

  //Set avatar preview url when file changes
  useEffect(() => {
    if (!fileData) {
      setImgPreviewUrl(null);
      return;
    }
    const objectUrl = URL.createObjectURL(fileData);
    setImgPreviewUrl(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [fileData]);

  const isNextDisabled: boolean = useMemo(() => {
    const isHasError =
      Object.values(formError).filter((error) => error !== "").length > 0;
    const isDataEmpty =
      Object.values(formData).filter((item) => item === "").length > 0;
    return isHasError || isDataEmpty;
  }, [formError, formData]);

  return (
    <>
      <Title>{t("sign-up_step1")}</Title>
      <StyledCard>
        <InputStyled
          placeholder={t("sign-up_user-name")}
          type={"text"}
          label={t("sign-up_user-name")}
          value={formData["username"]}
          id={"username"}
          errorMessage={formError["username"]}
          name={"username"}
          onChange={(value) => onChangeHandler("username", value)}
        />

        <InputStyled
          placeholder={t("sign-up_full-name")}
          type={"text"}
          label={t("sign-up_full-name")}
          value={formData["full_name"]}
          id={"full_name"}
          errorMessage={formError["full_name"]}
          name={"full_name"}
          onChange={(value) => onChangeHandler("full_name", value)}
        />

        <InputStyled
          placeholder={t("sign-up_uid")}
          type="int"
          label={t("sign-up_uid")}
          value={formData["uid"]}
          id="uid"
          errorMessage={formError["uid"]}
          name="uid"
          onChange={(value) => onChangeHandler("uid", value)}
        />

        <InputStyled
          placeholder={t("sign-up_pass")}
          type={"password"}
          label={t("sign-up_pass")}
          value={formData["password"]}
          id={"password"}
          errorMessage={formError["password"]}
          name={"password"}
          onChange={(value) => onChangeHandler("password", value)}
        />
        <InputStyled
          placeholder={t("sign-up_pass-rpt")}
          type={"password"}
          label={t("sign-up_pass-rpt")}
          value={formData["re_password"]}
          id={"re_password"}
          errorMessage={formError["re_password"]}
          name={"re_password"}
          onChange={(value) => onChangeHandler("re_password", value)}
        />
        <InputFileStyled
          formats="image/png, image/gif, image/jpeg"
          errorMessage={formError["file"]}
          content={
            <>
              <TitleStyled>{t("sign-up_logo-drop")}</TitleStyled>
              <TextStyled>{t("sign-up_logo-upload")}</TextStyled>
              <Text>{t("sign-up_logo-format")}</Text>
            </>
          }
          label={t("sign-up_logo-title")}
          placeholder={fileName || t("sign-up_logo-choose")}
          onChange={(f) => onChangeFile(f as File)}
        />
        <AvatarPreview src={imgPreviewUrl} />
        <InputStyled
          placeholder={t("sign-up_email")}
          type={"email"}
          label={t("sign-up_email")}
          value={formData["email"]}
          id={"email"}
          errorMessage={formError["email"]}
          name={"email"}
          onChange={(value) => onChangeHandler("email", value)}
        />
        <ButtonStyled
          disabled={isNextDisabled}
          onClick={onSubmit}
          variants={EButtonVariants.Primary}
        >
          {t("sign-up_next")}
        </ButtonStyled>
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        <Text>
          {t("sign-up_login")}{" "}
          <Link to={"/sign-in"}>
            <TextLayer as={"span"}>{t("sign-up_sign-in")}</TextLayer>
          </Link>
        </Text>
      </StyledCard>
    </>
  );
});

export default withErrorBoundaryHOC(StepOneView);
