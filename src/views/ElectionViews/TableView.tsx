import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { Card } from "../../components/common/Card";
import { Pagination } from "../../components/common/Pagination/Pagination";
import { useElectionActions, useElectionState } from "../../store/election";
import { desktopBp } from "../../styles/variables";
import { Button } from "../../UI/Button";
import { Loader } from "../../UI/Spinners";
import {
  StyledScrollBtn,
  StyledTable,
  StyledTableActions,
  TableWrapper,
} from "../../UI/StyledTable";
import { ChevronLeftIcon, ChevronRightIcon, SortIcon } from "../../UI/Svg";
import { decimalToPercents } from "../../utils/decimalToPercents";
import { numberWithCommas } from "../../utils/numberWidthCommas";
import { calcDividedTotals } from "./calcTotalsRatio";
import { activityList } from "../../config/userActivityList";
import { withErrorBoundaryHOC } from "../../utils/withErrorBoundaryHOC";
import { electionTableItemsPerPage } from "../../store/election/reducer";

const StyledLoader = styled(Loader)`
  height: 10.42vw;
  width: 10.42vw;
  @media screen and (max-width: ${desktopBp}) {
    height: 131px;
    width: 131px;
  }
`;

const StyledSortBtn = styled.button<{ reversed: boolean }>`
  padding: 0;
  height: 0.89vw;
  margin-inline-start: 0.52vw;
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
    height: 0.89vw;
    width: 0.89vw;
  }
  @media screen and (max-width: ${desktopBp}) {
    height: 11px;
    margin-inline-start: 7px;
    svg {
      height: 11px;
      width: 11px;
    }
  }
`;

const ResetSortingBtn = styled(Button)`
  align-self: flex-start;
  width: 10.42vw;
  margin-bottom: 0.52vw;
  padding: 0.52vw;
  font-size: 0.73vw;
  line-height: 0.83vw;
  @media screen and (max-width: ${desktopBp}) {
    width: 131px;
    margin-bottom: 7px;
    padding: 7px;
    font-size: 9px;
    line-height: 10px;
  }
`;

const tableDataToPercent = (data: string | number) => {
  if (typeof data === "string") return data;
  return decimalToPercents(data, 2);
};

const TableView = React.memo(() => {
  const {t} = useTranslation()
  const { onGetTable, onSetTableSort, onResetTableSort, onSetPage } =
    useElectionActions();
  const {
    table,
    isFetchingTable,
    currentPage,
    pagesCount,
    tableSortBy,
  } = useElectionState();
  const isRtl = document.body.dir === "rtl";
  const TableWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    onGetTable();
  }, []);

  const reversedSortBtn: string = useMemo(() => {
    return tableSortBy.direction === "ASC" ? tableSortBy.sortedTitle : "";
  }, [tableSortBy]);

  const handleScrollTable = useCallback(
    (dir: "left" | "right") => {
      let scrollValue = dir === "right" ? 300 : -300;
      TableWrapperRef?.current?.scrollBy(scrollValue, 0);
    },
    [TableWrapperRef]
  );

  const keys: string[] = table[0] ? Object.keys(table[0]) : [];
  return (
    <Card>
      {isFetchingTable && <StyledLoader />}
      {!isFetchingTable && (
        <>
          {tableSortBy.sortedTitle && (
            <ResetSortingBtn onClick={onResetTableSort} data-action={activityList["election-table-reset_sort"]}>
              Reset Sorting
            </ResetSortingBtn>
          )}
          <TableWrapper ref={TableWrapperRef}>
            <StyledTable>
              <thead>
                <tr>
                  {keys.map((row, index) => {
                    
                    return (
                      <th key={index}>
                        {t(row)}
                        <StyledSortBtn
                         data-action={activityList["election-table-sort"]}
                          onClick={() => onSetTableSort(row)}
                          reversed={reversedSortBtn === row}
                        >
                          <SortIcon />
                        </StyledSortBtn>
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {table.map((item, index) => {
                  return (
                    <tr key={index}>
                      {keys.map((k, i) => {
                        if (
                          k === "Total voting percentage" ||
                          k === "Target Audience voting percentage" ||
                          k === "Supporters voting percentage"
                        ) {
                          return (
                            <td dir="ltr" key={i}>
                              {tableDataToPercent(item[k])}%
                            </td>
                          );
                        }
                        return (
                          <td dir="ltr" key={i}>
                            {typeof item[k] === "number"
                              ? //@ts-ignore
                                numberWithCommas(item[k])
                              : item[k]}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr>
                  {keys.map((key: string, index: number) => {
                    if (index === 0) return <td key={index}>Total</td>;
                    //Mean Percent
                    if (key === "Total voting percentage") {
                      const decimalValue = calcDividedTotals(
                        table,
                        "Already voted",
                        "Total Eligible Voters"
                      );
                      return (
                        <td dir="ltr" key={index}>
                          {decimalToPercents(decimalValue as number)}%
                        </td>
                      );
                    }
                    //Mean Percent
                    if (key === "Target Audience voting percentage") {
                      const decimalValue = calcDividedTotals(
                        table,
                        "Target Audience Already Voted",
                        "Total Target Audience"
                      );
                      return (
                        <td dir="ltr" key={index}>
                          {decimalToPercents(decimalValue as number)}%
                        </td>
                      );
                    }
                    // Show percents from Supporters voting percentage
                    if (key === "Supporters voting percentage") {
                      const decimalValue = calcDividedTotals(
                        table,
                        "Supporters Already Voted",
                        "Total Supports"
                      );
                      return (
                        <td dir="ltr" key={index}>
                          {decimalToPercents(decimalValue as number)}%
                        </td>
                      );
                    }
                    return (
                      <td dir="ltr" key={index}>
                        {
                          //Calculating totals and return an integer or number with 3 digits after point.
                          (() => {
                            const value: number = table.reduce(
                              (prev, current) =>
                                prev + (current[key] as number),
                              0
                            );
                            return Number.isInteger(value)
                              ? numberWithCommas(value)
                              : numberWithCommas(value.toFixed(3));
                          })()
                        }
                      </td>
                    );
                  })}
                </tr>
              </tfoot>
            </StyledTable>
          </TableWrapper>

          <StyledTableActions>
            <StyledScrollBtn
            data-action={activityList["election-table-scroll"]}
              onClick={() => handleScrollTable(isRtl ? "right" : "left")}
            >
              {isRtl ? (
                <ChevronRightIcon height="16px" />
              ) : (
                <ChevronLeftIcon height="16px" />
              )}
            </StyledScrollBtn>

            <Pagination
              onSelectPage={onSetPage}
              limit={electionTableItemsPerPage}
              count={pagesCount}
              currentPage={currentPage}
            />

            <StyledScrollBtn
            data-action={activityList["election-table-scroll"]}
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
    </Card>
  );
});

export default withErrorBoundaryHOC(TableView);
