import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { Pagination } from "../../components/common/Pagination/Pagination";
import {
  IQuestionarieFilter,
  useCallCenterHistoryActions,
  useCallCenterHistoryState,
} from "../../store/callCenterHistory";
import { questionariesCountPerPage } from "../../store/callCenterHistory/reducer";
import { useSettingsActions, useSettingsState } from "../../store/settings";
import { desktopBp } from "../../styles/variables";
import { Button } from "../../UI/Button";
import { Dropdown } from "../../UI/Dropdown";
import { InputDate } from "../../UI/Input";
import { Loader } from "../../UI/Spinners";
import {
  StyledScrollBtn,
  StyledTable,
  StyledTableActions,
  TableWrapper,
} from "../../UI/StyledTable";
import { ChevronLeftIcon, ChevronRightIcon, SortIcon } from "../../UI/Svg";
import { getFormatDate } from "../../utils";
import { DownloadLink } from "../../components/common/DownloadLink";
import { activityList } from "../../config/userActivityList";
import { withErrorBoundaryHOC } from "../../utils/withErrorBoundaryHOC";

const aDayInMilliseconds = 60 * 60 * 24 * 1000;

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

const QuestionariesView = React.memo(() => {
  const { t } = useTranslation();
  const { interviewers, questionaries: questionariesHistory } =
    useCallCenterHistoryState();
  const TableWrapperRef = useRef<HTMLDivElement>(null);
  const isRtl = document.body.dir === "rtl";
  const {
    onGetQuestionaries: onGetQuestionariesTable,
    onSetQuestionariesPage,
    onDownloadQuestionaries,
    onSetQuestionariesSorting,
  } = useCallCenterHistoryActions();
  const { questionaries } = useSettingsState();
  const { onGetQuestionaries } = useSettingsActions();
  //Filters
  const [dateFilter, setDateFilter] = useState({
    startDate: null as null | Date,
    endDate: null as null | Date,
  });
  const [questionarieId, setQuestionarieId] = useState(0);
  const [interviewerId, setInterviewerId] = useState<string>("");

  const handleApply = useCallback(async () => {
    const data: IQuestionarieFilter = {};
    if (dateFilter.startDate && dateFilter.endDate) {
      //Add 1 day to end date
      const endDate = new Date(
        dateFilter.endDate.getTime() + aDayInMilliseconds
      );
      data.date_range = `${getFormatDate(
        dateFilter.startDate
      )} - ${getFormatDate(endDate)}`;
    }
    if (questionarieId) data.questionarie = questionarieId;
    if (interviewerId) data.interviewier = interviewerId;
    onGetQuestionariesTable(data);
  }, [dateFilter, questionarieId, interviewerId]);

  const handleClearFilters = useCallback(async () => {
    setDateFilter({ startDate: null, endDate: null })
    setQuestionarieId(0)
    setInterviewerId("")
  }, [])

  const handleDownload = useCallback(() => {
    const data: IQuestionarieFilter = {};
    if (dateFilter.startDate && dateFilter.endDate) {
      //Add 1 day to end date
      const endDate = new Date(
        dateFilter.endDate.getTime() + aDayInMilliseconds
      );
      data.date_range = `${getFormatDate(
        dateFilter.startDate
      )} - ${getFormatDate(endDate)}`;
    }
    if (questionarieId) data.questionarie = questionarieId;
    if (interviewerId) data.interviewier = interviewerId;
    onDownloadQuestionaries(data);
  }, [dateFilter, questionarieId, interviewerId]);

  const handleSetSorting = useCallback(
    (column: string) => {
      const order =
        questionariesHistory.sorting === `${column} ASC`
          ? `${column} DESC`
          : `${column} ASC`;
      onSetQuestionariesSorting(order);
      handleApply();
    },
    [handleApply, questionariesHistory.sorting, onSetQuestionariesSorting]
  );

  const handleChangePage = useCallback(
    (page: number) => {
      onSetQuestionariesPage(page);
      handleApply();
    },
    [handleApply]
  );

  const questionariesOptions = useMemo(() => {
    return questionaries.map((q) => ({ item: q.name, value: q.id }));
  }, [questionaries]);

  const interviewersOptions = useMemo(() => {
    return interviewers.map((i) => ({ item: i.login, value: i.id }));
  }, [interviewers]);

  const handleScrollTable = useCallback(
    (dir: "left" | "right") => {
      let scrollValue = dir === "right" ? 300 : -300;
      TableWrapperRef?.current?.scrollBy(scrollValue, 0);
    },
    [TableWrapperRef]
  );

  const dataKeys = useMemo(() => {
    return questionariesHistory.table[0]
      ? Object.keys(questionariesHistory.table[0])
      : [];
  }, [questionariesHistory.table]);

  const showClearBtn = useMemo(() => {
    if (dateFilter.startDate) return true
    if (dateFilter.endDate) return true
    if (questionarieId) return true
    if (interviewerId) return true
    return false
  }, [dateFilter, questionarieId, interviewerId])



  useEffect(() => {
    onSetQuestionariesPage(0);
  }, [dateFilter, questionarieId, interviewerId]);

  useEffect(() => {
    onGetQuestionaries();
  }, []);

  return (
    <>
      <Form>
        <InputDate
          label={t("reports-questionnaires_date")}
          startDate={dateFilter.startDate}
          expirationDate={dateFilter.endDate}
          onChange={(dates: Date[]) => {
            setDateFilter((prev: any) => ({
              ...prev,
              startDate: dates[0],
              endDate: dates[1],
            }));
          }}
        />
        <Dropdown
          options={interviewersOptions}
          value={interviewerId}
          onSelect={setInterviewerId}
          isMultiSelect={true}
          placeholder={t("reports-questionnaires_interviewer")}
          label={t("reports-questionnaires_interviewer")}
        />
        <Dropdown
          options={questionariesOptions}
          value={questionarieId}
          onSelect={setQuestionarieId}
          placeholder={t("reports-questionnaires_questionnaire")}
          label={t("reports-questionnaires_questionnaire")}
        />
      </Form>


      <ButtonsBox>
        <StyledCount>{t("reports-questionnaires_total")}{questionariesHistory.count}</StyledCount>
        {showClearBtn && (
          <StyledButton
            data-action={activityList["reports-questionnaires-clear"]}
            onClick={handleClearFilters}
          >
            {t("incoming-sms_clear")}
          </StyledButton>
        )}
        <StyledButton
          data-action={activityList["reports-questionnaires-apply"]}
          onClick={handleApply}
        >
          {t("incoming-sms_apply")}
        </StyledButton>
      </ButtonsBox>

      {questionariesHistory.isFetching && <StyledLaoder />}

      {!questionariesHistory.isFetching && (
        <>
          {!!questionariesHistory.table.length && (
            <DownloadLink
              handleClick={handleDownload}
              action={activityList["reports-questionnaires-download"]}
            >
              {t("reports-questionnaires_download")}
            </DownloadLink>
          )}
        </>
      )}

      {!questionariesHistory.isFetching && questionariesHistory.count > 0 && (
        <>
          <TableWrapper ref={TableWrapperRef}>
            <StyledTable>
              <thead>
                <tr>
                  {dataKeys.map((key, index) => {
                    if (key === "questionarie_name") {
                      return (
                        <th key={index}>
                          {t("reports-questionnaires_name")}
                          <SortBtn
                            data-action={
                              activityList["reports-questionnaires-sort"]
                            }
                            onClick={() => handleSetSorting(key)}
                            reversed={
                              questionariesHistory.sorting === `${key} DESC`
                            }
                          >
                            <SortIcon />
                          </SortBtn>
                        </th>
                      );
                    }
                    return (
                      <th key={index}>
                        {key}
                        <SortBtn
                          data-action={
                            activityList["reports-questionnaires-sort"]
                          }
                          onClick={() => handleSetSorting(key)}
                          reversed={
                            questionariesHistory.sorting === `${key} DESC`
                          }
                        >
                          <SortIcon />
                        </SortBtn>
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {questionariesHistory.table.map((item, index) => {
                  return (
                    <tr key={index}>
                      {dataKeys.map((k, i) => (
                        <td
                          key={i}
                          dangerouslySetInnerHTML={{ __html: item[k] }}
                        />
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </StyledTable>
          </TableWrapper>
          <StyledTableActions>
            <StyledScrollBtn
              data-action={activityList["reports-questionnaires-scroll"]}
              onClick={() => handleScrollTable(isRtl ? "right" : "left")}
            >
              {isRtl ? (
                <ChevronRightIcon height="16px" />
              ) : (
                <ChevronLeftIcon height="16px" />
              )}
            </StyledScrollBtn>

            <Pagination
              currentPage={questionariesHistory.currentPage}
              count={questionariesHistory.count}
              limit={questionariesCountPerPage}
              onSelectPage={(page) => handleChangePage(page)}
            />

            <StyledScrollBtn
              data-action={activityList["reports-questionnaires-scroll"]}
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

export default withErrorBoundaryHOC(QuestionariesView);
