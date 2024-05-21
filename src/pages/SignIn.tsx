import React, { useCallback, useMemo, useState } from "react";
import styled from "styled-components";
import { Title } from "../components/common/Title";
import { Card } from "../components/common/Card";
import {Input, InputLegacy, InputPassword} from "../UI/Input";
import { Button, EButtonVariants } from "../UI/Button";
import { Text } from "../components/common/Text";
import TextLayer from "../components/common/Text/TextLayer";
import { Link, Navigate } from "react-router-dom";
import { useUserState } from "../store/user";
import { useUserActions } from "../store/user/hooks";
import { colors } from "../styles/colors";
import { useTranslation } from "react-i18next";
import ReCAPTCHA from "react-google-recaptcha";
import { desktopBp } from "../styles/variables";
import { withErrorBoundaryHOC } from "../utils/withErrorBoundaryHOC";


const StyledCard = styled(Card)`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const SignInStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
  justify-content: flex-start;
  margin-top: 8.7vw;
  width: 100%;
  @media screen and (max-width: ${desktopBp}) {
    margin-top: 109px;
  }
  @media screen and (max-width: 740px) {
    margin-top: 50px;
  }
`;

const InputStyled = styled(InputLegacy)`
  width: 23.54vw;
  margin-bottom: 2.08vw;
  @media screen and (max-width: ${desktopBp}) {
    width: 295px;
    margin-bottom: 26px;
  }
  @media screen and (max-width: 740px) {
    width: 100%;
  }
`;

const StyledPassword = styled(InputPassword)`
  width: 23.54vw;
  margin-bottom: 2.08vw;
  @media screen and (max-width: ${desktopBp}) {
    width: 295px;
    margin-bottom: 26px;
  }
  @media screen and (max-width: 740px) {
    width: 100%;
  }
`

const ButtonStyled = styled(Button)`
  margin-top: 1.04vw;
  @media screen and (max-width: ${desktopBp}) {
    margin-top: 13px;
  }
`;

const TextStyled = styled(Text)`
  margin-top: 1.04vw;
  @media screen and (max-width: ${desktopBp}) {
    margin-top: 13px;
  }
`;

const ErrorMessage = styled.div`
  margin-top: 4px;
  font-size: 0.83vw;
  line-height: 1;
  text-align: center;
  color: ${colors.orange};
  width: 100%;
  margin-bottom: 0.52vw;
  @media screen and (max-width: ${desktopBp}) {
    font-size: 11px;
    margin-bottom: 7px;
  }
`;
const SignIn = () => {
  const { t } = useTranslation();
  const { onLogin } = useUserActions();
  const [formData, setFormData] = useState<{
    login: string;
    password: string;
    captcha: null | string;
  }>({ login: "", password: "", captcha: null });
  const { isLogin, errorMessage } = useUserState();
  const onChangeHandler = (key: string, val: string | null) => {
    setFormData((prevState) => {
      return {
        ...prevState,
        [key]: val,
      };
    });
  };

  const onLoginHandler = useCallback(() => {
    onLogin({ username: formData["login"], password: formData["password"] });
  }, [onLogin]);

  const isLoginDisabled: boolean = useMemo(() => {
    return (
      formData.login === "" ||
      formData.password === "" ||
      formData.captcha === null
    );
  }, [formData]);

  if (isLogin) return <Navigate to={"/"} />;

  return (
    <SignInStyled>
      <Title>{t("sign-in_title")}</Title>
      <StyledCard>
        <InputStyled
          placeholder={t("sign-in_login")}
          type={"text"}
          label={t("sign-in_login")}
          value={formData.login}
          id={"login"}
          name={"login"}
          onChange={(value) => onChangeHandler("login", value)}
        />
        <StyledPassword
          label={t("sign-in_pass")}
          placeholder={t("sign-in_pass")}
          onChange={(value: string) => onChangeHandler("password", value)}
          value={formData.password}
          name="passwords"
          useLegacyInput
        />
        <ReCAPTCHA
          sitekey="6LcvqJsiAAAAAHWsjyOpCHQQ4zWnHoCqLd3Bb4IF"
          onChange={(value) => onChangeHandler("captcha", value)}
        />
        <ButtonStyled
          disabled={isLoginDisabled}
          variants={EButtonVariants.Primary}
          onClick={onLoginHandler}
        >
          {t("sign-in_btn")}
        </ButtonStyled>
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        {/* <TextStyled>
          {t("sign-in_account")}{" "}
          <Link to={signUpUrl}>
            <TextLayer as={"span"}>{t("sign-in_registration")}</TextLayer>
          </Link>
        </TextStyled> */}
        <TextStyled>
          <Link to={"/privacy-policy"}>
            <TextLayer as={"span"}>{t("sign-in_privacy-policy")}</TextLayer>
          </Link>
        </TextStyled>
      </StyledCard>
    </SignInStyled>
  );
}

export default withErrorBoundaryHOC(SignIn);
