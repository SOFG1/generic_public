import React, { useState, useMemo, useCallback, useRef, useEffect } from "react";
import styled from "styled-components";
import { Dropdown } from "../../UI/Dropdown";
import { Input, InputDate } from "../../UI/Input";
import { Button } from "../../UI/Button";
//
import { DownloadLink } from "../../components/common/DownloadLink";
import { useHistoryActions, useHistoryState } from "../../store/history";
import { IHistoryState } from "../../store/history/types";
import { useTranslation } from "react-i18next";
import { Pagination } from "../../components/common/Pagination/Pagination";
import {
  StyledScrollBtn,
  StyledTable,
  StyledTableActions,
  TableWrapper,
} from "../../UI/StyledTable";
import { ChevronLeftIcon, ChevronRightIcon, SortIcon } from "../../UI/Svg";
import { numberWithCommas } from "../../utils/numberWidthCommas";
import { desktopBp } from "../../styles/variables";
import { usePermissions } from "../../store/user/hooks";
import { getFormatDate } from "../../utils";
import { activityList } from "../../config/userActivityList";
import { itemsPerPageHistory } from "../../store/history/reducer";
import { withErrorBoundaryHOC } from "../../utils/withErrorBoundaryHOC";

const convertFormData = (data: {
  [key: string]: any;
}): { [key: string]: string } => {
  const filters: any = {};
  if (data.action) {
    filters.action = data.action
      .split(", ")
      .filter((a: any) => a)
      .join(", ");
  }
  if (data.editors) {
    filters.editors = data.editors;
  }
  if (data.edited_row) {
    filters.edited_row = data.edited_row;
  }
  if (data.edit_at_start || data.edit_at_end) {
    const startDate = data.edit_at_start
      ? getFormatDate(data.edit_at_start)
      : "";
    const endDate = data.edit_at_end ? getFormatDate(data.edit_at_end) : "";
    filters.edit_at = `${startDate} - ${endDate}`;
  }
  return filters;
};

const Form = styled.div`
  display: flex;
  width: 100%;
  align-items: flex-end;
  gap: 0.63vw 2.86vw;
  flex-wrap: wrap;
  margin-top: 2.92vw;
  margin-bottom: 40px;
  > div {
    width: 15.78vw;
  }
  @media screen and (max-width: ${desktopBp}) {
    gap: 8px 36px;
    margin-top: 37px;
    > div {
      width: 198px;
    }
  }
  @media screen and (max-width: 440px) {
    align-items: center;
    flex-direction: column;
  }
`;

const ButtonsBox = styled.div`
  display: flex;
  gap: 0.63vw;
  width: 100%;
  @media screen and (max-width: ${desktopBp}) {
    gap: 8px;
  }
`

const StyledButton = styled(Button)`
  max-width: 13.02vw;
  @media screen and (max-width: ${desktopBp}) {
    max-width: 163px;
  }
`;


const StyledInputDate = styled(InputDate)`
  flex-shrink: 0;
`;

const StyledBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledCount = styled.p`
  font-weight: 600;
  margin-inline-end: auto;
`;

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

const initialFilters = {
  editors: "",
  edited_row: "",
  action: "",
  edit_at_start: null,
  edit_at_end: null,
  test_date: "",
}

const HistoryView = React.memo(() => {
  const { t } = useTranslation();
  const { numberOfActions, actions, sorting, currentPage }: IHistoryState =
    useHistoryState();
  const { onDownloadActions, onSetSorting, onApplyFilters, onSetCurrentPage } = useHistoryActions();
  const isRtl = document.body.dir === "rtl";
  const TableWrapperRef = useRef<HTMLDivElement>(null);
  const { editss_download } = usePermissions("CallCenterHistory");

  const [filterParams, setFilterParams] = useState(initialFilters);

  const actionOptions = [
    { item: t("history_action-create"), value: "create" },
    { item: t("history_action-update"), value: "update" },
    { item: t("history_action-delete"), value: "delete" },
    { item: t("history_action-delete-mon"), value: "deleted_from_monitoring" },
  ];


  const applyFilter = useCallback((): void => {
    const filters: any = convertFormData(filterParams);
    onApplyFilters(filters)
  }, [filterParams]);

  const handleSetSorting = useCallback(
    (column: string) => {
      const order =
        sorting === `${column} ASC` ? `${column} DESC` : `${column} ASC`;
      onSetSorting(order);
    },
    [sorting, onSetSorting]
  );

  const handleDownload = useCallback((): void => {
    onDownloadActions();
  }, [filterParams]);

  const handleScrollTable = useCallback(
    (dir: "left" | "right") => {
      let scrollValue = dir === "right" ? 300 : -300;
      TableWrapperRef?.current?.scrollBy(scrollValue, 0);
    },
    [TableWrapperRef]
  );

  const showClearBtn = useMemo(() => {
    return !!Object.values(filterParams).filter(v => v).length
  }, [filterParams])



  return (
    <>
      <Form>
        <Input
          value={filterParams.edited_row}
          type="text"
          label={t("history_row")}
          name="row"
          onChange={(value) =>
            setFilterParams((prev) => ({ ...prev, edited_row: value }))
          }
          placeholder={t("history_row")}
        />
        <Input
          value={filterParams.editors}
          type="text"
          label={t("history_editors")}
          name="row"
          onChange={(value) =>
            setFilterParams((prev) => ({ ...prev, editors: value }))
          }
          placeholder={t("history_editors")}
        />
        <StyledInputDate
          label={t("history_field-date_label")}
          startDate={filterParams.edit_at_start}
          expirationDate={filterParams.edit_at_end}
          onChange={(dates: Date[]) =>
            setFilterParams((prev: any) => ({
              ...prev,
              edit_at_start: dates[0],
              edit_at_end: dates[1],
            }))
          }
        />
        <Dropdown
          value={filterParams.action}
          placeholder={t("history_action")}
          onSelect={(value: string) =>
            setFilterParams((prev) => ({ ...prev, action: value }))
          }
          options={actionOptions}
          label={t("history_action")}
          isSmall={true}
          isMultiSelect={true}
        />
      </Form>


      <ButtonsBox>
        <StyledCount>{`${t("history_total-rows")} ${numberWithCommas(
          numberOfActions
        )}`}</StyledCount>
        {showClearBtn && (
          <StyledButton
            onClick={() => setFilterParams(initialFilters)}
            data-action={activityList["reports-edits-clear"]}
          >
            {t("history_clear")}
          </StyledButton>
        )}
        <StyledButton
          onClick={applyFilter}
          data-action={activityList["reports-edits-apply"]}
        >
          {t("history_apply")}
        </StyledButton>
      </ButtonsBox>


      <StyledBox>
        {actions.length > 0 && editss_download && (
          <DownloadLink
            handleClick={handleDownload}
            action={activityList["reports-edits-download"]}
          />
        )}
      </StyledBox>

      {actions.length > 0 && (
        <>
          <TableWrapper ref={TableWrapperRef}>
            <StyledTable>
              <thead>
                <tr>
                  <th>
                    {t("history_field-row")}{" "}
                    <SortBtn
                      data-action={activityList["reports-edits-sort"]}
                      onClick={() => handleSetSorting("edited_row")}
                      reversed={sorting === "edited_row DESC"}
                    >
                      <SortIcon />
                    </SortBtn>
                  </th>
                  <th>
                    {t("history_field-date")}
                    <SortBtn
                      data-action={activityList["reports-edits-sort"]}
                      onClick={() => handleSetSorting("edit_at")}
                      reversed={sorting === "edit_at DESC"}
                    >
                      <SortIcon />
                    </SortBtn>
                  </th>
                  <th>
                    {t("history_field-edited")}
                    <SortBtn
                      data-action={activityList["reports-edits-sort"]}
                      onClick={() => handleSetSorting("editer")}
                      reversed={sorting === "editer DESC"}
                    >
                      <SortIcon />
                    </SortBtn>
                  </th>
                  <th>
                    {t("history_field-action")}
                    <SortBtn
                      data-action={activityList["reports-edits-sort"]}
                      onClick={() => handleSetSorting("action")}
                      reversed={sorting === "action DESC"}
                    >
                      <SortIcon />
                    </SortBtn>
                  </th>
                  <th>
                    {t("history_field-status-from")}
                    <SortBtn
                      data-action={activityList["reports-edits-sort"]}
                      onClick={() => handleSetSorting("status_from")}
                      reversed={sorting === "status_from DESC"}
                    >
                      <SortIcon />
                    </SortBtn>
                  </th>
                  <th>
                    {t("history_field-status-to")}
                    <SortBtn
                      data-action={activityList["reports-edits-sort"]}
                      onClick={() => handleSetSorting("status_to")}
                      reversed={sorting === "status_to DESC"}
                    >
                      <SortIcon />
                    </SortBtn>
                  </th>
                  <th>
                    {t("history_field-edited-fields")}
                    <SortBtn
                      data-action={activityList["reports-edits-sort"]}
                      onClick={() => handleSetSorting("fields")}
                      reversed={sorting === "fields DESC"}
                    >
                      <SortIcon />
                    </SortBtn>
                  </th>
                </tr>
              </thead>
              <tbody>
                {actions.map((action, index) => {
                  return (
                    <tr key={index}>
                      <td>{action.edited_row}</td>
                      <td>{action.edit_at}</td>
                      <td>{action.editer}</td>
                      <td>{action.action}</td>
                      <td>{action.status_from}</td>
                      <td>{action.status_to}</td>
                      <td>{action.fields}</td>
                    </tr>
                  );
                })}
              </tbody>
            </StyledTable>
          </TableWrapper>
          <StyledTableActions>
            <StyledScrollBtn
              data-action={activityList["reports-edits-scroll"]}
              onClick={() => handleScrollTable(isRtl ? "right" : "left")}
            >
              {isRtl ? (
                <ChevronRightIcon height="16px" />
              ) : (
                <ChevronLeftIcon height="16px" />
              )}
            </StyledScrollBtn>

            <Pagination
              currentPage={currentPage}
              onSelectPage={onSetCurrentPage}
              count={numberOfActions}
              limit={itemsPerPageHistory}
            />

            <StyledScrollBtn
              data-action={activityList["reports-edits-scroll"]}
              onClick={() => handleScrollTable(isRtl ? "left" : "right")}
            >
              {isRtl ? (
                <ChevronLeftIcon height="16px" />
              ) : (
                <ChevronRightIcon height="16px" />
              )}
            </StyledScrollBtn>
          </StyledTableActions>
        </>
      )}
    </>
  );
});

export default withErrorBoundaryHOC(HistoryView);
