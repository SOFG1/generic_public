import React, { useRef, useState } from "react";
import { DigitalSignature } from "../../components/SignUpComponents";
//@ts-ignore
import { useScreenshot, createFileName } from "use-react-screenshot";
import styled from "styled-components";
import { Button, EButtonVariants } from "../../UI/Button";
import { useTranslation } from "react-i18next";
import { useUserState } from "../../store/user";
import { handle } from "../../api";
import { User } from "../../api/user";
import { useUserActions } from "../../store/user/hooks";
import { LogoutIcon } from "../../UI/Svg";
import { Input } from "../../UI/Input";
import { activityList } from "../../config/userActivityList";

const DownloadBtn = styled(Button)`
  font-size: 16px;
  width: auto;
  padding: 7px 20px;
  margin: 0 auto;
`;

const SubmitBtn = styled(Button)`
  margin: 20px auto 50px;
`;

const StyledInput = styled(Input)`
  margin-bottom: 20px;
`;

const LogoutBtn = styled.button`
  border: 0;
  background-color: transparent;
  transition: opacity 200ms linear;
  cursor: pointer;
  &:hover {
    opacity: 0.6;
  }
`;

const AskSignatureView = React.memo(() => {
  const { t } = useTranslation();
  const { token } = useUserState();
  const { getUserInfoAction, onLogout } = useUserActions();
  const [fullName, setFullName] = useState<string>("");
  const [uId, setUId] = useState<string>("");
  const [isSigned, setIsSigned] = useState<boolean>(false);
  const [image, takeScreenshot] = useScreenshot();
  const signRef = useRef(null);

  const handleEditSign = (isEdited: boolean) => {
    if (isEdited) takeScreenshot(signRef.current);
    setIsSigned(isEdited);
  };

  const handleDownload = () => {
    const a = document.createElement("a");
    a.download = createFileName("jpg", "screen");
    a.href = image;
    a.click();
  };

  const handleSendSignature = async () => {
    if (token) {
      const [dataRes, dataErr] = await handle(
        User.uploadSignature(image, token)
      );
      if (dataErr) {
        console.log(dataErr);
      }
      if (!dataErr) {
        getUserInfoAction(token);
      }
    }
  };

  return (
    <>
      <LogoutBtn onClick={onLogout}>
        <LogoutIcon />
      </LogoutBtn>
      <StyledInput
        label={t("signature-full_name")}
        placeholder={t("signature-full_name")}
        name="full_name"
        type="text"
        value={fullName}
        onChange={setFullName}
      />
      <StyledInput
        label={t("signature-u_id")}
        placeholder={t("signature-u_id")}
        name="u_id"
        type="text"
        value={uId}
        onChange={setUId}
      />
      <DigitalSignature
        fullName={fullName}
        uId={uId}
        isEdited={isSigned}
        setEdited={handleEditSign}
        ref={signRef}
      />
      {isSigned && (
        <DownloadBtn
          data-action={activityList["download-signature"]}
          variants={EButtonVariants.Secondary}
          onClick={handleDownload}
        >
          {t("sign-up_download")}
        </DownloadBtn>
      )}
      <SubmitBtn
        data-action={activityList["submit-signature"]}
        onClick={handleSendSignature}
        disabled={!isSigned || !fullName || !uId}
        variants={EButtonVariants.Primary}
      >
        Send signature
      </SubmitBtn>
    </>
  );
});

export default AskSignatureView;
