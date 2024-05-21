import React, { useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { handle, PRIMARY_SERVER_URL } from "../../api";
import { Settings } from "../../api/settings";
import { useAppActions } from "../../store/app";
import { useUserState, useUserActions } from "../../store/user";
import { IEmailSignature } from "../../store/user/types";
import { desktopBp } from "../../styles/variables";
import { Loader } from "../../UI/Spinners";
import { TrashIcon } from "../../UI/Svg";
import { ConfirmDeleteFull } from "../common/ConfirmDeleteFull";
import { activityList } from "../../config/userActivityList";

const StyledWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 4.17vw;
  padding: 0.52vw;
  border: 1px solid #000;
  margin-bottom: 20px;
  @media screen and (max-width: ${desktopBp}) {
    gap: 52px;
    padding: 7px;
  }
`;

const StyledOrder = styled.p`
  margin: 0;
`;

const StyledLang = styled.p`
  margin: 0;
`;

const StyledImage = styled.img`
  width: 15.63vw;
  height: 7.81vw;
  @media screen and (max-width: ${desktopBp}) {
    width: 196px;
    height: 98px;
  }
`;

const DeleteButton = styled.button`
  height: 1.56vw;
  width: 1.56vw;
  padding: 0;
  border: 1px solid #000;
  border-radius: 50%;
  background-color: transparent;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  svg {
    width: 1.04vw;
    height: 1.04vw;
  }
  @media screen and (max-width: ${desktopBp}) {
    height: 20px;
    width: 20px;
    svg {
      width: 13px;
      height: 13px;
    }
  }
`;

interface IProps {
  order: number;
  signature: IEmailSignature;
}

const SignaturePreviewComponent = React.memo(({ signature, order }: IProps) => {
  const { t } = useTranslation();
  const { token } = useUserState();
  const { addUserInfoAction } = useUserActions();
  const { onShowAlert } = useAppActions();
  const [showConfirmDelete, setShowConfirmDelete] = useState<boolean>(false);
  const [isFetching, setIsFetching] = useState<boolean>(false);

  const handleDeleteSignature = useCallback(async () => {
    if (token) {
      setIsFetching(true);
      const [dataRes, dataErr] = await handle(
        Settings.deleteSignature(token, signature.id)
      );
      setIsFetching(false);
      if (dataRes) {
        onShowAlert(true, "Successfully deleted");
        addUserInfoAction(dataRes);
      }
      if (dataErr) {
        onShowAlert(false, dataErr.error);
      }
    }
  }, [token, signature.id]);

  return (
    <>
      <ConfirmDeleteFull
        show={showConfirmDelete}
        onClose={() => setShowConfirmDelete(false)}
        title={t("settings_signatures-warn")}
        onDelete={handleDeleteSignature}
      />
      <StyledWrapper>
        <StyledOrder>{order}</StyledOrder>
        <StyledLang>Lang: {signature.lang}</StyledLang>
        <StyledImage src={`${PRIMARY_SERVER_URL}${signature.url}`} />
        {isFetching ? (
          <Loader />
        ) : (
          <DeleteButton
            onClick={() => setShowConfirmDelete(true)}
            data-action={activityList["settings-delete-signature"]}
          >
            <TrashIcon />
          </DeleteButton>
        )}
      </StyledWrapper>
    </>
  );
});

export default SignaturePreviewComponent;
