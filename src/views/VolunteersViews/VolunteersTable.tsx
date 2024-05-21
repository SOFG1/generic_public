import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  useMemo,
} from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { Card } from "../../components/common/Card";
import { ConfirmDeleteFull } from "../../components/common/ConfirmDeleteFull";
import { Pagination } from "../../components/common/Pagination/Pagination";
import { useUserState } from "../../store/user";
import {
  useVolunteersActions,
  useVolunteersState,
} from "../../store/volunteers/hooks";
import { ItemsCountPerPage } from "../../store/volunteers/reducer";
import { colors } from "../../styles/colors";
import { desktopBp } from "../../styles/variables";
import { Button } from "../../UI/Button";
import { Loader } from "../../UI/Spinners";
import {
  StyledScrollBtn,
  StyledTable,
  StyledTableAction,
  StyledTableActions,
  TableWrapper,
} from "../../UI/StyledTable";
import { ChevronLeftIcon, ChevronRightIcon, DeleteIcon } from "../../UI/Svg";
import { activityList } from "../../config/userActivityList";
import { withErrorBoundaryHOC } from "../../utils/withErrorBoundaryHOC";

const StyledCard = styled(Card)`
  min-height: 15.63vw;
  @media screen and (max-width: ${desktopBp}) {
    min-height: 196px;
  }
`;

const Title = styled.p`
  width: 100%;
  font-style: normal;
  font-weight: 500;
  font-size: 1.25vw;
  line-height: 1.51vw;
  color: ${colors.graphite_6};
  margin: 0 0 1.04vw;
  @media screen and (max-width: ${desktopBp}) {
    font-size: 16px;
    line-height: 19px;
    margin: 0 0 13px;
  }
`;

const StyledLaoder = styled(Loader)`
  height: 13.02vw;
  width: 13.02vw;
  margin: 0 auto;
  @media screen and (max-width: ${desktopBp}) {
    height: 163px;
    width: 163px;
  }
`;

const StyledBtn = styled(Button)`
  margin-inline-end: auto;
  margin-top: 0.52vw;
  @media screen and (max-width: ${desktopBp}) {
    margin-top: 7px;
  }
`;

const StyledTableHead = styled.th`
  text-transform: capitalize;
`;

const VolunteersTable = React.memo(() => {
  const { t } = useTranslation();
  const isRtl = document.body.dir === "rtl";
  const { userInfo } = useUserState();
  const { tableTotalCount, tableCurrentPage, tableData, isFetching } =
    useVolunteersState();
  const { onGetTable, onSetTablePage, onDeleteTableRow, onDownloadTable } =
    useVolunteersActions();
  const TableWrapperRef = useRef<HTMLDivElement>(null);

  const [confirmDelete, setConfirmDelete] = useState<number | null>(null);

  useEffect(() => {
    onGetTable();
  }, []);

  const handleDelete = (rowId: number) => {
    onDeleteTableRow(rowId);
    setConfirmDelete(null);
  };

  const handleScrollTable = useCallback(
    (dir: "left" | "right") => {
      let scrollValue = dir === "right" ? 300 : -300;
      TableWrapperRef?.current?.scrollBy(scrollValue, 0);
    },
    [TableWrapperRef]
  );

  const isUserGroupIs332 = useMemo(() => {
    return userInfo?.group.id === 332;
  }, [userInfo]);

  return (
    <StyledCard>
      <Title>
        {isUserGroupIs332
          ? t("volunteers-table_title2")
          : t("volunteers-table_title")}
      </Title>
      {tableData?.length > 0 && !isFetching && (
        <>
          <ConfirmDeleteFull
            title={t("raw-data_confirm")}
            show={!!confirmDelete}
            onClose={() => setConfirmDelete(null)}
            onDelete={() => handleDelete(confirmDelete as number)}
          />
          <TableWrapper>
            <StyledTable>
              <thead>
                <tr>
                  {Object.keys(tableData[0]).map((head) => {
                    console.log(head);
                    if (head === "id") return null;
                    const formatted = head.replaceAll("_", " ");
                    return (
                      <StyledTableHead key={head}>
                        {t(`volunteers-table-${head}`, formatted)}
                      </StyledTableHead>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {tableData.map((item) => {
                  return (
                    <tr key={item.id}>
                      {Object.keys(item).map(
                        (key) => key !== "id" && <td key={key}>{item[key]}</td>
                      )}
                      <StyledTableAction
                        data-action={activityList["volunteers-table-delete"]}
                        onClick={() => setConfirmDelete(item.id)}
                      >
                        <DeleteIcon />
                      </StyledTableAction>
                    </tr>
                  );
                })}
              </tbody>
            </StyledTable>
          </TableWrapper>
          <StyledTableActions>
            <StyledScrollBtn
              data-action={activityList["volunteers-table-scroll"]}
              onClick={() => handleScrollTable(isRtl ? "right" : "left")}
            >
              {isRtl ? (
                <ChevronRightIcon height="16px" />
              ) : (
                <ChevronLeftIcon height="16px" />
              )}
            </StyledScrollBtn>
            <Pagination
              onSelectPage={onSetTablePage}
              limit={ItemsCountPerPage}
              count={tableTotalCount}
              currentPage={tableCurrentPage}
            />
            <StyledScrollBtn
              data-action={activityList["volunteers-table-scroll"]}
              onClick={() => handleScrollTable(isRtl ? "left" : "right")}
            >
              {isRtl ? (
                <ChevronLeftIcon height="16px" />
              ) : (
                <ChevronRightIcon height="16px" />
              )}
            </StyledScrollBtn>
          </StyledTableActions>

          <StyledBtn
            onClick={onDownloadTable}
            data-action={activityList["volunteers-table-download"]}
          >
            {t("volunteers-table_download")}
          </StyledBtn>
        </>
      )}
      {tableData.length === 0 && !isFetching && (
        <p>{t("volunteers_no-data")}</p>
      )}
      {isFetching && <StyledLaoder />}
    </StyledCard>
  );
});

export default withErrorBoundaryHOC(VolunteersTable);
