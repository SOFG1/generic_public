import React, { useCallback, useState } from "react";
import styled from "styled-components";
import { RawDataModalType, useRawDataActions, useRawDataState } from "../../store/rawData";
import { usePermissions, useUserState } from "../../store/user";
import { activityList } from "../../config/userActivityList";
import { DeleteIcon, EditIcon, PaymentTableIcon, UploadTableIcon } from "../../UI/Svg";
import { useAppActions } from "../../store/app";
import { ConfirmDeleteFull } from "../common/ConfirmDeleteFull";
import { useTranslation } from "react-i18next";
import { handle } from "../../api";
import { RawData } from "../../api/rawData";

const FixedActions = styled.div`
  width: 108px;
  padding-top: 47px;
`;

const ActionsBox = styled.div`
  display: flex;
  position: relative;
  top:-1px;
  border-left: 1px solid rgba(188, 188, 188, 1);
  &:first-child button {
    border-top: 1px solid rgba(188, 188, 188, 1);
  }
`;

const StyledActionButton = styled.button`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 38px;
  background: transparent;
  width: 38px;
  border: 0;

  border-inline-end: 1px solid rgba(188, 188, 188, 1);
  border-bottom: 1px solid rgba(188, 188, 188, 1);
  padding: 0;
  cursor: pointer;
  transition: 200ms;
  span {
    position: absolute;
    opacity: 0;
    bottom: 100%;
    font-size: 16px;
    z-index: -100;
    border-radius: 2px;
    background-color: #fff;
  }
  &:hover span {
    opacity: 1;
    transition: transform 200ms;
    transform: translateY(-50%);
    z-index: 0;
  }
  &:hover {
    background-color: #cccccc;
  }
`;

interface IProps {
  onOpenPayment: (id: string) => void;
  onOpenEditing: (row: any) => void
  setUploadRowId: (id: string) => void
  onSetModal: (m: RawDataModalType) => void
}

const FixedActionsComponent = React.memo(({ onOpenPayment, onOpenEditing, onSetModal, setUploadRowId }: IProps) => {
  const { t } = useTranslation();
  const { token } = useUserState();
  const { table } = useRawDataState();
  const permissions = usePermissions("Raw_Data");
  const { onDeleteAction, onGetTable } = useRawDataActions();
  const { onShowAlert } = useAppActions();
  const [showConfirmDelete, setShowConfirmDelete] = useState<Object | null>(
    null
  );

  const onDelete = useCallback(
    async (row: any) => {
      if (!permissions["delete"]) {
        onShowAlert(false, "You dont have access for delete!");
        return;
      }
      if (token) {
        const delData: { [key: string]: any } = {};
        if (row.id) delData.id = row.id;
        if (row.first_name) delData.first_name = row.first_name;
        if (row.phone) delData.phone = row.phone;
        if (row.email) delData.email = row.email;

        const [dataRes, dataErr]: any = await handle(
          RawData.delete(delData, token)
        );
        if (dataRes !== undefined) {
          onDeleteAction(row.id);
          onGetTable();
        }
        if (dataErr) {
          console.log(dataErr);
        }
      }
      setShowConfirmDelete(null);
    },
    [token, permissions]
  );

  return (
    <>
      <ConfirmDeleteFull
        title={t("raw-data_confirm-delete")}
        text={t("raw-data_confirm")}
        show={!!showConfirmDelete}
        onClose={() => setShowConfirmDelete(null)}
        onDelete={() => onDelete(showConfirmDelete)}
      />

      <FixedActions>
        {table.map((row, id) => {
          return (
            <ActionsBox key={id}>
              {permissions["payment"] && (
                <StyledActionButton
                  data-action={activityList["table-payment"]}
                  onClick={() => onOpenPayment(row.id as string)}
                >
                  <span>Payment</span>
                  <PaymentTableIcon />
                </StyledActionButton>
              )}
              {permissions["delete"] && (
                <StyledActionButton
                  data-action={activityList["table-delete"]}
                  onClick={() => setShowConfirmDelete(row)}
                >
                  <span>Delete</span>
                  <DeleteIcon />
                </StyledActionButton>
              )}
              {permissions["edit"] && (
                <StyledActionButton
                  data-action={activityList["table-edit"]}
                  onClick={() => onOpenEditing(row)}
                >
                  <span>Edit</span>
                  <EditIcon />
                </StyledActionButton>
              )}
              {permissions["edit"] && (
                <StyledActionButton
                  data-action={activityList["table-row-files"]}
                  onClick={() => {
                    onSetModal("row-upload");
                    setUploadRowId(row.id as string);
                  }}
                >
                  <span>Upload a file</span>
                  <UploadTableIcon />
                </StyledActionButton>
              )}
            </ActionsBox>
          );
        })}
      </FixedActions>
    </>
  );
});

export default FixedActionsComponent;
