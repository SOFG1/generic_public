import React, { useState, useCallback, useMemo, useRef } from "react";
import styled from "styled-components";
import { InputDate } from "../../UI/Input";
import { Button } from "../../UI/Button";
import { EButtonVariants } from "../../UI/Button";
import {
  useCallCenterHistoryActions,
  useCallCenterHistoryState,
} from "../../store/callCenterHistory";
import { DownloadLink } from "../../components/common/DownloadLink";
import { useTranslation } from "react-i18next";
import { DropdownSearchFetch, DropdownWithSearch } from "../../UI/Dropdown";
import { InputValueType } from "../../types";
import { useUserState } from "../../store/user";
import { handle } from "../../api";
import { CallCenterHistory } from "../../api/callCenterHistory";
import { aDayInMilliseconds, getFormatDate } from "../../utils";
import { Loader } from "../../UI/Spinners";
import { Pagination } from "../../components/common/Pagination/Pagination";
import { emailsCountPerPage } from "../../store/callCenterHistory/reducer";
import {
  StyledScrollBtn,
  StyledTable,
  StyledTableActions,
  TableWrapper,
} from "../../UI/StyledTable";
import { ChevronLeftIcon, ChevronRightIcon, SortIcon } from "../../UI/Svg";
import { desktopBp } from "../../styles/variables";
import { activityList } from "../../config/userActivityList";
import { withErrorBoundaryHOC } from "../../utils/withErrorBoundaryHOC";

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

const StyledLaoder = styled(Loader)`
  margin: 0.52vw auto;
  height: 5.21vw;
  width: 5.21vw;
  @media screen and (max-width: ${desktopBp}) {
    margin: 7px auto;
    height: 65px;
    width: 65px;
  }
`;

const StyledCount = styled.p`
  font-weight: 600;
  margin-inline-end: auto;
`;

const EmailsView = React.memo(() => {
  const { t } = useTranslation();
  const isRtl = document.body.dir === "rtl";
  const { token } = useUserState();
  const { filters, emails } = useCallCenterHistoryState();
  const TableWrapperRef = useRef<HTMLDivElement>(null);
  const { onGetEmails, onDownloadEmails, onSetEmailsPage, onSetEmailsSorting } =
    useCallCenterHistoryActions();

  const [filterParams, setFilterParams] = useState<{
    [key: string]: InputValueType;
  }>({});
  const [fetchDropdownOptions, setFetchDropdownOptions] = useState<{
    [key: string]: Array<{ item: string; value: string }>;
  }>({});

  //Apply filter
  const applyFilter = useCallback(() => {
    const reqData: { [key: string]: string } = {};
    for (let slug in filterParams) {
      let value = filterParams[slug];
      if (typeof value === "string") {
        reqData[slug] = value.replace(/\s+/g, "");
      }
      if (Array.isArray(value) && value[0] && value[1]) {
        reqData[slug] = `${getFormatDate(value[0])} - ${getFormatDate(
          new Date(value[1].getTime() + aDayInMilliseconds)
        )}`;
      }
    }
    onGetEmails(reqData);
  }, [filterParams]);

  const handleSetSorting = useCallback(
    (column: string) => {
      const order =
        emails.sorting === `${column} ASC` ? `${column} DESC` : `${column} ASC`;
      onSetEmailsSorting(order);
      applyFilter();
    },
    [applyFilter, emails.sorting, onSetEmailsSorting]
  );

  const handleChangePage = useCallback(
    (page: number) => {
      onSetEmailsPage(page);
      applyFilter();
    },
    [applyFilter]
  );

  const tableItemsCount = useMemo(() => {
    return emails.table.length;
  }, [emails.table]);

  const showClearBtn = useMemo(() => {
    return !!Object.values(filterParams).filter(f => f).length
  }, [filterParams])

  //Download emails
  const handleDownload = useCallback(() => {
    const reqData: { [key: string]: string } = {};
    for (let slug in filterParams) {
      let value = filterParams[slug];
      if (typeof value === "string") {
        reqData[slug] = value.replace(/\s+/g, "");
      }
      if (Array.isArray(value) && value[0] && value[1]) {
        reqData[slug] = `${getFormatDate(value[0])} - ${getFormatDate(
          new Date(value[1].getTime() + aDayInMilliseconds)
        )}`;
      }
    }
    onDownloadEmails(reqData);
  }, [filterParams]);

  const fetchOptions = useCallback(
    async (slug: string, val: string) => {
      if (token && val.length > 3) {
        const [dataRes, dataErr]: any = await handle(
          CallCenterHistory.getFiltersData(
            token,
            "email",
            "outgoing",
            slug,
            val
          )
        );
        if (dataRes) {
          setFetchDropdownOptions((prev) => ({
            ...prev,
            [slug]: dataRes.map((o: string) => ({ item: o, value: o })),
          }));
        }
        if (dataErr) {
          console.log(dataErr);
        }
      }
      if (val.length <= 3) {
        setFetchDropdownOptions((prev) => ({ ...prev, [slug]: [] }));
      }
    },
    [token]
  );

  const handleScrollTable = useCallback(
    (dir: "left" | "right") => {
      let scrollValue = dir === "right" ? 300 : -300;
      TableWrapperRef?.current?.scrollBy(scrollValue, 0);
    },
    [TableWrapperRef]
  );

  return (
    <>
      <Form>
        {filters?.email?.outgoing &&
          Object.keys(filters.email.outgoing).map((slug) => {
            const filter = filters.email.outgoing[slug];
            if (filter?.type === "date_range") {
              return (
                <InputDate
                  key={slug}
                  label={filter.name}
                  placeholder={filter.name}
                  startDate={
                    Array.isArray(filterParams[slug])
                      ? (filterParams[slug] as any[])[0]
                      : null
                  }
                  expirationDate={
                    Array.isArray(filterParams[slug])
                      ? (filterParams[slug] as any[])[1]
                      : null
                  }
                  onChange={(dates: Date[]) => {
                    setFilterParams((prev: any) => ({
                      ...prev,
                      [slug]: dates,
                    }));
                  }}
                />
              );
            }
            if (!filter.fetch) {
              return (
                <DropdownWithSearch
                  key={slug}
                  value={filterParams[slug] || ""}
                  placeholder={filter.name}
                  onSelect={(value) =>
                    setFilterParams((prev) => ({ ...prev, [slug]: value }))
                  }
                  label={filter.name}
                  isMultiSelect={true}
                  options={
                    filter.options
                      ? filter.options.map((o) => ({ item: o, value: o }))
                      : []
                  }
                />
              );
            }
            if (filter.fetch) {
              return (
                <DropdownSearchFetch
                  key={slug}
                  value={filterParams[slug] || ""}
                  placeholder={filter.name}
                  onSelect={(value) =>
                    setFilterParams((prev) => ({ ...prev, [slug]: value }))
                  }
                  onSearch={(value) => fetchOptions(slug, value)}
                  label={filter.name}
                  isSmall={true}
                  isMultiSelect={true}
                  options={fetchDropdownOptions[slug] || []}
                />
              );
            }
          })}
      </Form>

      <ButtonsBox>
        <StyledCount>
          {t("emails-history_total-rows")} {tableItemsCount}
        </StyledCount>
        {showClearBtn && (
          <StyledButton
            data-action={activityList["reports-emails-clear"]}
            onClick={() => setFilterParams({})}
          >
            {t("emails-history_clear")}
          </StyledButton>
        )}
        <StyledButton
          data-action={activityList["reports-emails-apply"]}
          onClick={applyFilter}
        >
          {t("emails-history_apply")}
        </StyledButton>
      </ButtonsBox>

      {!emails.isFetching ? (
        <>
          {tableItemsCount > 0 && (
            <DownloadLink
              action={activityList["reports-emails-download"]}
              handleClick={handleDownload}
              disabled={emails.isFetching}
            />
          )}

          {tableItemsCount > 0 && (
            <>
              <TableWrapper ref={TableWrapperRef}>
                <StyledTable>
                  <thead>
                    <tr>
                      <th>
                        {t("emails-history_supplier")}
                        <SortBtn
                          data-action={activityList["reports-emails-sort"]}
                          onClick={() => handleSetSorting("supplier")}
                          reversed={emails.sorting === "supplier DESC"}
                        >
                          <SortIcon />
                        </SortBtn>
                      </th>
                      <th>
                        {t("emails-history_id")}
                        <SortBtn
                          data-action={activityList["reports-emails-sort"]}
                          onClick={() => handleSetSorting("id")}
                          reversed={emails.sorting === "id DESC"}
                        >
                          <SortIcon />
                        </SortBtn>
                      </th>
                      <th>
                        {t("emails-history_theme")}

                        <SortBtn
                          data-action={activityList["reports-emails-sort"]}
                          onClick={() => handleSetSorting("theme")}
                          reversed={emails.sorting === "theme DESC"}
                        >
                          <SortIcon />
                        </SortBtn>
                      </th>
                      <th>
                        {t("emails-history_text")}
                        <SortBtn
                          data-action={activityList["reports-emails-sort"]}
                          onClick={() => handleSetSorting("text")}
                          reversed={emails.sorting === "text DESC"}
                        >
                          <SortIcon />
                        </SortBtn>
                      </th>
                      <th>
                        {t("emails-history_date")}
                        <SortBtn
                          data-action={activityList["reports-emails-sort"]}
                          onClick={() => handleSetSorting("date")}
                          reversed={emails.sorting === "date DESC"}
                        >
                          <SortIcon />
                        </SortBtn>
                      </th>
                      <th>
                        {t("emails-history_status")}
                        <SortBtn
                          data-action={activityList["reports-emails-sort"]}
                          onClick={() => handleSetSorting("status")}
                          reversed={emails.sorting === "status DESC"}
                        >
                          <SortIcon />
                        </SortBtn>
                      </th>
                      <th>
                        {t("emails-history_recipients")}
                        <SortBtn
                          data-action={activityList["reports-emails-sort"]}
                          onClick={() => handleSetSorting("recipients")}
                          reversed={emails.sorting === "recipients DESC"}
                        >
                          <SortIcon />
                        </SortBtn>
                      </th>
                      <th>
                        {t("emails-history_total")}
                        <SortBtn
                          data-action={activityList["reports-emails-sort"]}
                          onClick={() => handleSetSorting("total")}
                          reversed={emails.sorting === "total DESC"}
                        >
                          <SortIcon />
                        </SortBtn>
                      </th>
                      <th>
                        {t("emails-history_opened")}
                        <SortBtn
                          data-action={activityList["reports-emails-sort"]}
                          onClick={() => handleSetSorting("opened")}
                          reversed={emails.sorting === "opened DESC"}
                        >
                          <SortIcon />
                        </SortBtn>
                      </th>
                      <th>
                        {t("emails-history_clicks")}
                        <SortBtn
                          data-action={activityList["reports-emails-sort"]}
                          onClick={() => handleSetSorting("clicks")}
                          reversed={emails.sorting === "clicks DESC"}
                        >
                          <SortIcon />
                        </SortBtn>
                      </th>
                      <th>
                        {t("emails-history_blocked")}
                        <SortBtn
                          data-action={activityList["reports-emails-sort"]}
                          onClick={() => handleSetSorting("blocked")}
                          reversed={emails.sorting === "blocked DESC"}
                        >
                          <SortIcon />
                        </SortBtn>
                      </th>
                      <th>
                        {t("emails-history_returned")}
                        <SortBtn
                          data-action={activityList["reports-emails-sort"]}
                          onClick={() => handleSetSorting("returned")}
                          reversed={emails.sorting === "returned DESC"}
                        >
                          <SortIcon />
                        </SortBtn>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {emails.table.map((message, index) => {
                      console.log(message);
                      return (
                        <tr key={index}>
                          <td>{message.supplier}</td>
                          <td>{message.campaing_id}</td>
                          <td>{message.email_them}</td>
                          <td>{message.email_text}</td>
                          <td>{message.email_date}</td>
                          <td>{message.status}</td>
                          <td>{message.recipients}</td>
                          <td>{message.total_sent}</td>
                          <td>{message.opened}</td>
                          <td>{message.clicks}</td>
                          <td>{message.blocked}</td>
                          <td>{message.returned}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </StyledTable>
              </TableWrapper>
              <StyledTableActions>
                <StyledScrollBtn
                  data-action={activityList["reports-emails-scroll"]}
                  onClick={() => handleScrollTable(isRtl ? "right" : "left")}
                >
                  {isRtl ? (
                    <ChevronRightIcon height="16px" />
                  ) : (
                    <ChevronLeftIcon height="16px" />
                  )}
                </StyledScrollBtn>

                <Pagination
                  currentPage={emails.currentPage}
                  count={emails.count}
                  limit={emailsCountPerPage}
                  onSelectPage={(page) => handleChangePage(page)}
                />

                <StyledScrollBtn
                  data-action={activityList["reports-emails-scroll"]}
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
      ) : (
        <StyledLaoder />
      )}
    </>
  );
});

export default withErrorBoundaryHOC(EmailsView);
