import React, { useCallback, useState } from "react";
import { Title } from "../../components/common/Title";
import { Card, card_size } from "../../components/common/Card";
import { Text } from "../../components/common/Text";
import { Button } from "../../UI/Button";
import styled from "styled-components";
import { Navigate } from "react-router-dom";
import { handle } from "../../api";
import { User } from "../../api/user";
import { useUserState } from "../../store/user";
import { useUserActions } from "../../store/user/hooks";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import TextLayer from "../../components/common/Text/TextLayer";
import { useAppActions } from "../../store/app";
import { AddKeywordsComponent } from "../../components/SignUpComponents";
import { withErrorBoundaryHOC } from "../../utils/withErrorBoundaryHOC";

const ButtonStyled = styled(Button)`
  margin: 30px 0 20px;
`;

const TextStyled = styled(Text)`
  margin-bottom: 10px;
  width: 100%;
  font-size: 24px;
`;

const SocialsBlock = styled.div`
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: center;
  margin-bottom: 40px;
`;

const StepThreeView = React.memo(() => {
  const { t } = useTranslation();
  const { token } = useUserState();
  const { getUserInfoAction, onLogout } = useUserActions();
  const {onShowAlert} = useAppActions()
  const [keywords, setKeywords] = useState<string[]>([])
  const [isFinish, setIsFinish] = useState<boolean>(false);

  const onFinishRegistration = useCallback(async () => {
    if (token) {
      const [dataRes, dataErr]: any = await handle(
        User.postUser({ keywords }, token)
      );
      if (dataRes !== undefined) {
        setIsFinish(true);
      }
      if (dataErr) {
        console.log(dataErr);
      }
    }
  }, [keywords, token]);

  if (isFinish) {
    if (token) {
      console.log("step get user info");
      getUserInfoAction(token);
    }
    return <Navigate to={"/"} />;
  }

  const handleAddKeyword = (keyword: string) => {
    const formated = keyword.trim()
    // if (/\s/g.test(escapeRegExp(keyword))) {
    //   onShowAlert(false, "Keyword should be without spaces");
    //   return;
    // }
    if (formated === "") {
      onShowAlert(false, "Keyword field is empty");
      return
    }
    if (keywords.includes(formated)) {
      onShowAlert(false, "You've already added this keyword!");
      return;
    }
    setKeywords((p) => ([...p, formated]))
  }

  const handleDeleteKeyword = (word: string) => {
    setKeywords((p) => p.filter((w) => w !== word))
  }

  return (
    <>
      <Title>{t("sign-up_step3")}</Title>
      <Card size={card_size.lg}>
        <SocialsBlock>
          {/*<SocialLogin><GoogleIcon/><Text color={colors.graphite_5}>login</Text></SocialLogin>*/}
        </SocialsBlock>
        <TextStyled>{t("sign-up_step3-keywords")}</TextStyled>
        <AddKeywordsComponent keywords={keywords} onAddKeyword={handleAddKeyword} onDeleteKeyword={handleDeleteKeyword} />
        <ButtonStyled
          disabled={!token}
          onClick={onFinishRegistration}
        >
          {t("sign-up_next")}
        </ButtonStyled>
        <Text>
          {t("sign-up_login")}{" "}
          <Link to={"/sign-in"} onClick={onLogout}>
            <TextLayer as={"span"}>{t("sign-up_sign-in")}</TextLayer>
          </Link>
        </Text>
      </Card>
    </>
  );
});

export default withErrorBoundaryHOC(StepThreeView);
