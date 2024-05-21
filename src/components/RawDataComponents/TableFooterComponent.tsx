import React, { useCallback, forwardRef } from "react"
import { StyledScrollBtn, StyledTableActions } from "../../UI/StyledTable"
import { ChevronLeftIcon, ChevronRightIcon } from "../../UI/Svg";
import { Pagination } from "../common/Pagination/Pagination";
import { useRawDataActions, useRawDataState } from "../../store/rawData";


const TableFooterComponent = forwardRef((props: {}, ref: any) => {
    const isRtl = document.body.dir === "rtl";
    const {
        currentPage,
        limit,
        count,
      } = useRawDataState();
      const {
        onSelectPage,
      } = useRawDataActions();

    const handleScrollTable = useCallback(
        (dir: "left" | "right") => {
          let scrollValue = dir === "right" ? 300 : -300;
          ref?.current?.scrollBy(scrollValue, 0);
        },
        [ref]
      );



    return  <StyledTableActions>
    <StyledScrollBtn
      onClick={() => handleScrollTable(isRtl ? "right" : "left")}
    >
      {isRtl ? (
        <ChevronRightIcon height="16px" />
      ) : (
        <ChevronLeftIcon height="16px" />
      )}
    </StyledScrollBtn>
    <Pagination
      onSelectPage={onSelectPage}
      limit={limit}
      count={count}
      currentPage={currentPage}
    />
    <StyledScrollBtn
      onClick={() => handleScrollTable(isRtl ? "left" : "right")}
    >
      {isRtl ? (
        <ChevronLeftIcon height="16px" />
      ) : (
        <ChevronRightIcon height="16px" />
      )}
    </StyledScrollBtn>
  </StyledTableActions>
})

export default TableFooterComponent