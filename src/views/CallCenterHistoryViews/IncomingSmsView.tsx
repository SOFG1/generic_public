import React, { useState, useCallback, useRef, useMemo } from "react";
import styled from "styled-components";
import { InputDate } from "../../UI/Input";
import { DropdownSearchFetch, DropdownWithSearch } from "../../UI/Dropdown";
import { Button } from "../../UI/Button";
import { EButtonVariants } from "../../UI/Button";
import { DownloadLink } from "../../components/common/DownloadLink";
import {
  useCallCenterHistoryActions,
  useCallCenterHistoryState,
} from "../../store/callCenterHistory";
import { useUserState } from "../../store/user";
import { handle } from "../../api";
import { CallCenterHistory } from "../../api/callCenterHistory";
import { useTranslation } from "react-i18next";
import { InputValueType } from "../../types";
import { aDayInMilliseconds, getFormatDate } from "../../utils";
import { Loader } from "../../UI/Spinners";
import { Pagination } from "../../components/common/Pagination/Pagination";
import { incomingSmsCountPerPage } from "../../store/callCenterHistory/reducer";
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

const StyledCount = styled.p`
  font-weight: 600;
  margin-inline-end: auto;
`;

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
  width: 100%;
  gap: 0.63vw;
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

const IncomingSmsView = React.memo(() => {
  const { t } = useTranslation();
  const isRtl = document.body.dir === "rtl";
  const { token } = useUserState();
  const { filters, smsIncoming } = useCallCenterHistoryState();
  const {
    onGetIncomingSms,
    onDownloadIncomingSms,
    onSetIncomingPage,
    onSetIncomingSorting,
  } = useCallCenterHistoryActions();
  const TableWrapperRef = useRef<HTMLDivElement>(null);
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
    onGetIncomingSms(reqData);
  }, [filterParams]);

  const handleSetSorting = useCallback(
    (column: string) => {
      const order =
        smsIncoming.sorting === `${column} ASC`
          ? `${column} DESC`
          : `${column} ASC`;
      onSetIncomingSorting(order);
      applyFilter();
    },
    [applyFilter, smsIncoming.sorting, onSetIncomingSorting]
  );

  const handleChangePage = useCallback(
    (page: number) => {
      onSetIncomingPage(page);
      applyFilter();
    },
    [applyFilter]
  );

  //Download history
  const handleDownload = () => {
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
    onDownloadIncomingSms(reqData);
  };

  const fetchOptions = useCallback(
    async (slug: string, val: string) => {
      if (token && val.length > 3) {
        const [dataRes, dataErr]: any = await handle(
          CallCenterHistory.getFiltersData(token, "sms", "incoming", slug, val)
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

  const tableItemsCount = useMemo(() => {
    return smsIncoming.table.length;
  }, [smsIncoming.table]);

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
        {filters?.sms?.incoming &&
          Object.keys(filters.sms.incoming).map((slug) => {
            const filter = filters.sms.incoming[slug];
            if (filter?.type === "date_range") {
              return (
                <InputDate
                  key={slug}
                  label={filter.name}
                  placeholder={filter.name}
                  startDate={
                    Array.isArray(filterParams?.date)
                      ? filterParams?.date[0]
                      : null
                  }
                  expirationDate={
                    Array.isArray(filterParams?.date)
                      ? filterParams?.date[1]
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
          {t("incoming-sms_total-rows")} {tableItemsCount}
        </StyledCount>
        {showClearBtn && (
          <StyledButton
            data-action={activityList["reports-incoming-sms-clear"]}
            onClick={() => setFilterParams({})}
          >
            {t("incoming-sms_clear")}
          </StyledButton>
        )}
        <StyledButton
          data-action={activityList["reports-incoming-sms-apply"]}
          onClick={applyFilter}
        >
          {t("incoming-sms_apply")}
        </StyledButton>
      </ButtonsBox>
      {!smsIncoming.isFetching ? (
        <>
          {tableItemsCount > 0 && (
            <DownloadLink
              action={activityList["reports-incoming-sms-download"]}
              handleClick={handleDownload}
              disabled={smsIncoming.isFetching}
            />
          )}

          {tableItemsCount > 0 && (
            <>
              <TableWrapper ref={TableWrapperRef}>
                <StyledTable>
                  <thead>
                    <tr>
                      <th>
                        {t("incoming-sms_supplier")}
                        <SortBtn
                          data-action={
                            activityList["reports-incoming-sms-sort"]
                          }
                          onClick={() => handleSetSorting("supplier")}
                          reversed={smsIncoming.sorting === "supplier DESC"}
                        >
                          <SortIcon />
                        </SortBtn>
                      </th>
                      <th>
                        {t("incoming-sms_number")}
                        <SortBtn
                          data-action={
                            activityList["reports-incoming-sms-sort"]
                          }
                          onClick={() => handleSetSorting("number")}
                          reversed={smsIncoming.sorting === "number DESC"}
                        >
                          <SortIcon />
                        </SortBtn>
                      </th>
                      <th>
                        {t("incoming-sms_message")}
                        <SortBtn
                          data-action={
                            activityList["reports-incoming-sms-sort"]
                          }
                          onClick={() => handleSetSorting("message")}
                          reversed={smsIncoming.sorting === "message DESC"}
                        >
                          <SortIcon />
                        </SortBtn>
                      </th>
                      <th>
                        {t("incoming-sms_count")}
                        <SortBtn
                          data-action={
                            activityList["reports-incoming-sms-sort"]
                          }
                          onClick={() => handleSetSorting("count")}
                          reversed={smsIncoming.sorting === "count DESC"}
                        >
                          <SortIcon />
                        </SortBtn>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {smsIncoming.table.map((message, index) => {
                      return (
                        <tr key={index}>
                          <td>{message.supplier}</td>
                          <td>{message.our_number}</td>
                          <td>{message.received_message}</td>
                          <td>{message.count}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </StyledTable>
              </TableWrapper>
              <StyledTableActions>
                <StyledScrollBtn
                  data-action={activityList["reports-incoming-sms-scroll"]}
                  onClick={() => handleScrollTable(isRtl ? "right" : "left")}
                >
                  {isRtl ? (
                    <ChevronRightIcon height="16px" />
                  ) : (
                    <ChevronLeftIcon height="16px" />
                  )}
                </StyledScrollBtn>

                <Pagination
                  currentPage={smsIncoming.currentPage}
                  count={smsIncoming.count}
                  limit={incomingSmsCountPerPage}
                  onSelectPage={(page) => handleChangePage(page)}
                />

                <StyledScrollBtn
                  data-action={activityList["reports-incoming-sms-scroll"]}
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

export default withErrorBoundaryHOC(IncomingSmsView);
