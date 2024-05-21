import React, { useCallback, useEffect, useState, useMemo, useRef } from "react"
import { useUserState } from "../../store/user"
import { handle } from "../../api"
import { CallCenterHistory } from "../../api/callCenterHistory"
import { desktopBp } from "../../styles/variables";
import styled from "styled-components";
import { Button } from "../../UI/Button";
import { activityList } from "../../config/userActivityList";
import { useTranslation } from "react-i18next";
import { InputDate } from "../../UI/Input";
import { Dropdown } from "../../UI/Dropdown";
import { useSettingsActions, useSettingsState } from "../../store/settings";
import { IQuestionarieFilter, useCallCenterHistoryActions, useCallCenterHistoryState } from "../../store/callCenterHistory";
import { aDayInMilliseconds, getFormatDate } from "../../utils";
import { Loader } from "../../UI/Spinners";
import { DownloadLink } from "../../components/common/DownloadLink";
import { StyledScrollBtn, StyledTable, StyledTableActions, TableWrapper } from "../../UI/StyledTable";
import { ChevronLeftIcon, ChevronRightIcon, SortIcon } from "../../UI/Svg";
import { Pagination } from "../../components/common/Pagination/Pagination";
import { questionariesCountPerPage } from "../../store/callCenterHistory/reducer";
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



const AppQuestsView = React.memo(() => {
    const { t } = useTranslation()
    const { token } = useUserState()
    const { voterQuests: voterQuestsList } = useSettingsState()
    const { voterQuests } = useCallCenterHistoryState()
    const { onGetVoterQuests } = useSettingsActions()
    const { onGetQuestsReports, onDownloadVoterQuests, onSetVoterSorting, onChangeVoterPage } = useCallCenterHistoryActions()
    const TableWrapperRef = useRef<HTMLDivElement>(null);
    const [dateFilter, setDateFilter] = useState({
        startDate: null as null | Date,
        endDate: null as null | Date,
    });
    const isRtl = document.body.dir === "rtl";
    const [questionarieId, setQuestionarieId] = useState(0);
    const [interviewerId, setInterviewerId] = useState<string>("");
    const [interviewerOptions, setInterviewerOptions] = useState<{ item: string, value: number }[]>([])


    const questionariesOptions = useMemo(() => {
        return voterQuestsList.map((q) => ({ item: q.name, value: q.id }));
    }, [voterQuestsList]);

    const dataKeys = useMemo(() => {
        return voterQuests.table[0]
            ? Object.keys(voterQuests.table[0])
            : [];
    }, [voterQuests.table]);


    const showClearBtn = useMemo(() => {
        if (dateFilter.startDate) return true
        if (dateFilter.endDate) return true
        if (questionarieId) return true
        if (interviewerId) return true
        return false
    }, [dateFilter, questionarieId, interviewerId])

    const handleFetchInterviewers = useCallback(async () => {
        if (token) {
            const [dataRes, dataErr] = await handle(CallCenterHistory.getQuestionarieFilters(token, true))
            if (dataRes) {
                const opts = dataRes.interviewier.map((c: any) => ({ item: c.login, value: c.id }))
                setInterviewerOptions(opts)
            }
            if (dataErr) {
                console.log(dataErr)
            }
        }
    }, [token])


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
        onGetQuestsReports(data);
    }, [dateFilter, questionarieId, interviewerId]);

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

        onDownloadVoterQuests(data);
    }, [dateFilter, questionarieId, interviewerId]);

    const handleSetSorting = useCallback(
        (column: string) => {
            const order =
                voterQuests.sorting === `${column} ASC`
                    ? `${column} DESC`
                    : `${column} ASC`;
            onSetVoterSorting(order);
            handleApply();
        },
        [handleApply, voterQuests.sorting, onSetVoterSorting]
    );


    const handleScrollTable = useCallback(
        (dir: "left" | "right") => {
            let scrollValue = dir === "right" ? 300 : -300;
            TableWrapperRef?.current?.scrollBy(scrollValue, 0);
        },
        [TableWrapperRef]
    );


    const handleClearFilters = useCallback(async () => {
        setDateFilter({
            startDate: null,
            endDate: null,
        })
        setQuestionarieId(0)
        setInterviewerId("")
    }, [])



    useEffect(() => {
        handleFetchInterviewers()
    }, [handleFetchInterviewers])


    useEffect(() => {
        onGetVoterQuests()
    }, [])


    return <>
        <Form>
            <InputDate
                label={t("reports-app_date")}
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
                options={interviewerOptions}
                value={interviewerId}
                onSelect={setInterviewerId}
                isMultiSelect={true}
                placeholder={t("reports-app_interviewer")}
                label={t("reports-app_interviewer")}
            />
            <Dropdown
                options={questionariesOptions}
                value={questionarieId}
                onSelect={setQuestionarieId}
                placeholder={t("reports-app_questionnaire")}
                label={t("reports-app_questionnaire")}
            />
        </Form>

        <ButtonsBox>
            <StyledCount>{t("reports-app_total")}:{voterQuests.count}</StyledCount>
            {showClearBtn && <StyledButton
                data-action={activityList["reports-voter-clear"]}
                onClick={handleClearFilters}
            >
                {t("reports-app_clear")}
            </StyledButton>}
            <StyledButton
                data-action={activityList["reports-voter-apply"]}
                onClick={handleApply}
            >
                {t("reports-app_apply")}
            </StyledButton>
        </ButtonsBox>


        {voterQuests.isFetching && <StyledLaoder />}

        {!voterQuests.isFetching && (
            <>
                {!!voterQuests.table.length && (
                    <DownloadLink
                        handleClick={handleDownload}
                        action={activityList["reports-app-download"]}
                    >
                        {t("reports-app_download")}
                    </DownloadLink>
                )}
            </>
        )}



        {!voterQuests.isFetching && voterQuests.count > 0 && (
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
                                                        activityList["reports-app-sort"]
                                                    }
                                                    onClick={() => handleSetSorting(key)}
                                                    reversed={
                                                        voterQuests.sorting === `${key} DESC`
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
                                                    activityList["reports-app-sort"]
                                                }
                                                onClick={() => handleSetSorting(key)}
                                                reversed={
                                                    voterQuests.sorting === `${key} DESC`
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
                            {voterQuests.table.map((item, index) => {
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
                        data-action={activityList["reports-app-scroll"]}
                        onClick={() => handleScrollTable(isRtl ? "right" : "left")}
                    >
                        {isRtl ? (
                            <ChevronRightIcon height="16px" />
                        ) : (
                            <ChevronLeftIcon height="16px" />
                        )}
                    </StyledScrollBtn>

                    <Pagination
                        currentPage={voterQuests.currentPage}
                        count={voterQuests.count}
                        limit={questionariesCountPerPage}
                        onSelectPage={(page) => onChangeVoterPage(page)}
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
})

export default withErrorBoundaryHOC(AppQuestsView)