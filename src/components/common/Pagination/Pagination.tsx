import React, { useMemo } from "react";
import styled from "styled-components";
import { desktopBp } from "../../../styles/variables";
import { ChevronLeftIcon, ChevronRightIcon } from "../../../UI/Svg";
import { activityList } from "../../../config/userActivityList";

const Box = styled.div`
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: center;
  margin-top: 0.83vw;
  width: 100%;
  @media screen and (max-width: ${desktopBp}) {
    margin-top: 10px;
  }
`;

const Page = styled.div<{ isActive?: boolean }>`
  height: 1.25vw;
  flex-basis:1.25vw;
  flex-grow: 0;
  flex-shrink: 0;
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: center;
  background-color: ${({ isActive }) => (isActive ? "#fff" : "#fff")};
  border-radius: 4px;
  border: 0;
  cursor: pointer;
  transition: all 0.25s ease;
  margin: 0 0.52vw;

  span {
    font-size: 0.83vw;
    line-height: 0.83vw;
    letter-spacing: 0.05em;
    padding: 0 4px;
    color: rgba(220, 220, 220, 1);
    ${({ isActive }) => isActive && "color: #000;"}
  }

  svg {
    max-width: 100%;
    stroke: #000;
  }

  &:hover {
    span {
      color: #000;
    }
  }

  @media screen and (max-width: ${desktopBp}) {
    flex-basis: 16px;
    height: 16px;
    margin: 0 7px;

    span {
      font-size: 10px;
      line-height: 10px;
    }
  }

  @media screen and (max-width: 450px) {
    margin: 0 3px;
  }
`;

interface IProps {
  currentPage: number;
  onSelectPage: (page: number) => void;
  count: number;
  limit: number;
}

export const Pagination = React.memo(
  ({ currentPage, onSelectPage, count, limit }: IProps) => {
    const pages: number[] = useMemo(() => {
      const countPages = Math.ceil(count / limit);
      const numberPages: number[] = [];
      for (let i = 0; i < countPages; i++) {
        numberPages.push(i);
      }
      return numberPages;
    }, [count, limit]);


    const showNextButton = useMemo(() => {
      return currentPage + 1 <= Math.floor(count / limit)
    }, [currentPage, count, limit])


    return (
      <Box>
        {currentPage > 0 && (
          <Page onClick={() => onSelectPage(currentPage - 1)} data-action={activityList["pagination-prev"]}>
            {document.body.dir === "rtl" ? (
              <ChevronRightIcon height={16} />
            ) : (
              <ChevronLeftIcon height={16} />
            )}
          </Page>
        )}
        {pages
          .slice(
            currentPage - 2 < 0 ? 0 : currentPage - 2,
            currentPage + 3 > pages.length ? pages.length : currentPage + 3
          )
          .map((page) => {
            return (
              <Page
                isActive={page === currentPage}
                key={`Page-${page}`}
                onClick={() => onSelectPage(page)}
                data-action={activityList["pagination-change"]}
              >
                <span>{page + 1}</span>
              </Page>
            );
          })}
        {showNextButton && (
          <Page onClick={() => onSelectPage(currentPage + 1)} data-action={activityList["pagination-next"]}>
            {document.body.dir === "rtl" ? (
              <ChevronLeftIcon height={16} />
            ) : (
              <ChevronRightIcon height={16} />
            )}
          </Page>
        )}
      </Box>
    );
  }
);
