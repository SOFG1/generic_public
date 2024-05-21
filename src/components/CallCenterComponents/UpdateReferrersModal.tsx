import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { Modal } from "../../UI/Modal";
import { useUserState } from "../../store/user";
import { handle } from "../../api";
import { RawData } from "../../api/rawData";
import { Loader } from "../../UI/Spinners";
import { ITableColumn } from "../../store/rawData";
import { useAppActions } from "../../store/app";
import UpdateReferrersComponent from "./UpdateReferrersComponent";
import CreateReferrerRow from "./CreateReferrerRow";
import { useCallCenterState } from "../../store/callCenter";
import { useTranslation } from "react-i18next";

const StyledLoader = styled(Loader)`
  height: 200px;
  width: 200px;
  margin: 10px auto;
`;

const StyledContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

interface IProps {
  searchQuery: string;
  show: boolean;
  onClose: () => void;
}

const UpdateReferrersModal = React.memo(
  ({ searchQuery, show, onClose }: IProps) => {
    const { t } = useTranslation();
    const { token } = useUserState();
    const { interviewees } = useCallCenterState();
    const { onShowAlert } = useAppActions();
    const [isFetching, setIsFetching] = useState<boolean>(false);
    const [foundRows, setFoundRows] = useState<ITableColumn[]>([]);

    const searchRows = useCallback(async () => {
      if (token) {
        setIsFetching(true);
        const [dataRes, dataErr] = await handle(
          RawData.getTable(token, {
            offset: 0,
            limit: 20,
            keywords: searchQuery,
          })
        );
        setIsFetching(false);
        if (dataRes) {
          setFoundRows(dataRes.table);
        }
        if (dataErr) {
          onShowAlert(false, dataErr.error);
        }
      }
    }, [token, searchQuery]);

    const handleUpdate = useCallback(
      async (selectedRows: string[]) => {
        if (token) {
          const params = {
            id_list: selectedRows.join(", "),
            values: JSON.stringify({
              referal: interviewees?.id || "",
            }),
          };
          setIsFetching(true);
          const [dataRes, dataErr] = await handle(
            RawData.bulkUpdate(params, token)
          );
          setIsFetching(false);
          if (dataRes) {
            onShowAlert(true, t("referrer_success"));
            searchRows();
          }
          if (dataErr) {
            onShowAlert(false, dataErr.error);
          }
        }
      },
      [token, interviewees, searchRows, t]
    );

    useEffect(() => {
      if (show) {
        searchRows();
      }
    }, [searchRows, show]);

    return (
      <Modal show={show} onClose={onClose}>
        {isFetching && <StyledLoader />}
        {!isFetching && (
          <StyledContent>
            <UpdateReferrersComponent
              rows={foundRows}
              onUpdateRows={handleUpdate}
            />
            <CreateReferrerRow />
          </StyledContent>
        )}
      </Modal>
    );
  }
);

export default UpdateReferrersModal;
