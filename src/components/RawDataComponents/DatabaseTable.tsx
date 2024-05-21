import styled from "styled-components";
import {desktopBp} from "../../styles/variables";
import {Loader} from "../../UI/Spinners";
import {colors} from "../../styles/colors";
import {Button} from "../../UI/Button";
import React, {useCallback, useMemo, useRef, useState} from "react";
import {ITableColumn, RawDataModalType, useRawDataActions, useRawDataState} from "../../store/rawData";
import {Modal} from "../../UI/Modal";
import {
    CreateRowComponent,
    FixedActionsComponent,
    RowFilesComponent,
    TableActionsComponent,
    TableFooterComponent,
    TableRowComponent
} from "./index";
import {ImportData, UpdateData} from "../../views/RawDataViews";
import {activityList} from "../../config/userActivityList";
import {StyledTable, TableWrapper} from "../../UI/StyledTable";
import {t} from "i18next";
import {SortIcon} from "../../UI/Svg";


const Container = styled.div`
  position: relative;
  @media screen and (max-width: ${desktopBp}) {
    padding-inline-end: 44px;
  }
`

const SortBtn = styled.button<{ reversed: boolean }>`
  padding: 0;
  height: 17px;
  margin-inline-start: 10px;
  background-color: transparent;
  border-radius: 0;
  border: 0;
  cursor: pointer;
  transition: opacity 200ms linear;
  ${({ reversed }) => reversed && "transform: rotate(180deg);"}
  &:hover {
    opacity: 0.6;
  }
  svg {
    height: 17px;
    width: 17px;
  }
`;

const StyledLoader = styled(Loader)`
  height: 13.02vw;
  width: 13.02vw;
  margin: 0 auto;
  @media screen and (max-width: ${desktopBp}) {
    height: 163px;
    width: 163px;
  }
`;

const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  @media screen and (max-width: ${desktopBp}) {
    margin-top: 8px;
  }
`;

const LoadingText = styled.p`
  font-size: 1.04vw;
  line-height: 1.25vw;
  font-weight: normal;
  color: ${colors.graphite_6};
  @media screen and (max-width: ${desktopBp}) {
    font-size: 13px;
    line-height: 16px;
  }
`;

const TableContainer = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  align-items: flex-start;
  & > div:first-child {
    width: calc(100% - 108px);
  }
  tr {
    height: 38px;
  }
`;

const ResetSortingBtn = styled(Button)`
  position: absolute;
  inset-inline-end: 0;
  width: 100px;
  padding: 10px;
  font-size: 14px;
  line-height: 16px;
`;

const DatabaseTable = React.memo(()=>{
    const { tableColumns, table, sortBy, isFetchingTable } = useRawDataState();
    const { onSelectSort, onResetSort, onDeleteAction } = useRawDataActions();
    const [modal, setModal] = useState<RawDataModalType>(null);
    const [uploadRowId, setUploadRowId] = useState<string | null>(null);
    const [paymentModal, setPaymentModal] = useState<null | string>(null);

    const [editingRow, setEditingRow] = useState<ITableColumn | null>(null);

    const TableWrapperRef = useRef<HTMLDivElement>(null);

    const reversedSortBtn: string = useMemo(() => {
        return sortBy.direction === "ASC" ? sortBy.slug : "";
    }, [sortBy]);

    const handleCloseRowUpload = useCallback(() => {
        setModal(null);
        setUploadRowId(null);
    }, []);

    return (
        <>
            <Modal
                show={modal === "row-upload" && !!uploadRowId}
                onClose={handleCloseRowUpload}
            >
                <RowFilesComponent rowId={uploadRowId as string} />
            </Modal>
            <Modal show={modal === "file-upload"} onClose={() => setModal(null)}>
                <ImportData onClose={() => setModal(null)} />
            </Modal>
            <CreateRowComponent
                initialData={editingRow}
                onClose={() => setEditingRow(null)}
            />
            <Modal show={modal === "update"} onClose={() => setModal(null)}>
                <UpdateData onClose={() => setModal(null)} />
            </Modal>
            <Modal show={!!paymentModal} onClose={() => setPaymentModal(null)}>
                {/* <Payment id={paymentModal as string} /> */}
            </Modal>
            <Container>
                {isFetchingTable ? (
                    <>
                        <LoadingText>Refreshing your data</LoadingText>
                        <StyledLoader />
                    </>
                ) : (
                    <>
                        <StyledHeader>
                            <TableActionsComponent
                                onAddRow={() => setEditingRow({})}
                                onSetModal={setModal}
                            />
                            {/*<TableCountComponent />*/}
                        </StyledHeader>
                        <TableContainer>
                            {sortBy.slug && (
                                <ResetSortingBtn
                                    data-action={activityList["table-reset-sorting"]}
                                    onClick={onResetSort}
                                >
                                    Reset
                                </ResetSortingBtn>
                            )}
                            <TableWrapper ref={TableWrapperRef}>
                                <StyledTable>
                                    <thead>
                                    <tr>
                                        {tableColumns.map((header) => {
                                            //Exception for mobilizer
                                            if (header.slug === "mobilizer") {
                                                return (
                                                    <th key={header.slug}>
                                                        {t("mobilizer_full_name")}
                                                        <SortBtn
                                                            data-action={activityList["table-set-sorting"]}
                                                            onClick={() => onSelectSort(header.slug)}
                                                            reversed={header.slug === reversedSortBtn}
                                                        >
                                                            <SortIcon />
                                                        </SortBtn>
                                                    </th>
                                                );
                                            }
                                            //Exception for referal
                                            if (header.slug === "referal") {
                                                return (
                                                    <th key={header.slug}>
                                                        {t("referal_full_name")}
                                                        <SortBtn
                                                            data-action={activityList["table-set-sorting"]}
                                                            onClick={() => onSelectSort(header.slug)}
                                                            reversed={header.slug === reversedSortBtn}
                                                        >
                                                            <SortIcon />
                                                        </SortBtn>
                                                    </th>
                                                );
                                            }
                                            return (
                                                <th key={header.slug}>
                                                    {header.name}
                                                    <SortBtn
                                                        data-action={activityList["table-set-sorting"]}
                                                        onClick={() => onSelectSort(header.slug)}
                                                        reversed={header.slug === reversedSortBtn}
                                                    >
                                                        <SortIcon />
                                                    </SortBtn>
                                                </th>
                                            );
                                        })}
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <TableRowComponent rows={table} />
                                    </tbody>
                                </StyledTable>
                            </TableWrapper>
                            <FixedActionsComponent
                                onOpenPayment={setPaymentModal}
                                onOpenEditing={setEditingRow}
                                setUploadRowId={setUploadRowId}
                                onSetModal={setModal}
                            />
                        </TableContainer>
                        <TableFooterComponent ref={TableWrapperRef} />
                    </>
                )}
            </Container>
        </>
    );
})

export default DatabaseTable;
