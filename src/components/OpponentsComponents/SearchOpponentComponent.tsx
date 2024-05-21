import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { handle } from "../../api";
import { Opponents } from "../../api/opponents";
import { colorsChart } from "../../config";
import { useAppActions } from "../../store/app";
import {
  IOpponents,
  OpponentOrderType,
  useOpponentsActions,
  useOpponentsState,
} from "../../store/opponents";
import { useUserState } from "../../store/user";
import { desktopBp } from "../../styles/variables";
import { Input } from "../../UI/Input";
import { Loader } from "../../UI/Spinners";
import { MagnifierIcon, TrashIcon } from "../../UI/Svg";
import SelectOpponentComponent from "./SelectOpponentComponent";
import { activityList } from "../../config/userActivityList";
import { OpponentsDemoDataKey, demoUsers, opponentsDemoData } from "../../config/demoUsers";
import { withErrorBoundaryHOC } from "../../utils/withErrorBoundaryHOC";

const InputBox = styled.div`
  gap: 0.52vw;
  display: flex;
  align-items: flex-end;
  margin-bottom: 1.93vw;
  &:last-child {
    margin-bottom: 0;
  }
  @media screen and (max-width: ${desktopBp}) {
    gap: 7px;
    margin-bottom: 24px;
  }
`;

const StyledInput = styled(Input)<{ color?: string }>`
  position: relative;
  padding-inline-start: 1.15vw;
  @media screen and (max-width: ${desktopBp}) {
    padding-inline-start: 14px;
  }
  &::after {
    content: "";
    position: absolute;
    top: 2px;
    inset-inline-start: 0;
    border-radius: 50%;
    height: 1.04vw;
    width: 1.04vw;
    ${({ color }) => `background-color: ${color};`}
    @media screen and (max-width: ${desktopBp}) {
      height: 13px;
      width: 13px;
    }
  }
`;

const StyledBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  border-radius: 50%;
  border: 1px solid #000;
  background-color: transparent;
  height: 1.3vw;
  width: 1.3vw;
  margin-bottom: 0.89vw;
  cursor: pointer;
  flex-shrink: 0;
  svg {
    height: 0.63vw;
    width: 0.63vw;
  }
  @media screen and (max-width: ${desktopBp}) {
    margin-bottom: 11px;
    height: 16px;
    width: 16px;
    svg {
      height: 8px;
      width: 8px;
    }
  }
`;

const StyledDeleteBtn = styled(StyledBtn)`
  svg {
    height: 0.78vw;
    width: 0.78vw;
  }
  @media screen and (max-width: ${desktopBp}) {
    svg {
      height: 10px;
      width: 10px;
    }
  }
`;

const StyledLoader = styled(Loader)`
  height: 25px;
  width: 25px;
  flex-shrink: 0;
  margin-bottom: 0.89vw;
  @media screen and (max-width: ${desktopBp}) {
    height: 25px;
    width: 25px;
  }
`;



//This function return static(hardcoded) data for specific search cases on static user
//Ff this function returns value, there is no need to fetch data from API for this user and search case
const getStaticData = (login: string, searchWord: string): any => {
  const search = searchWord.toLowerCase()
  if(demoUsers.includes(login) && opponentsDemoData.hasOwnProperty(search)) {
    return opponentsDemoData[search as OpponentsDemoDataKey]
  }
}

interface IProps {
  order: OpponentOrderType;
}

const SearchOpponentComponent = React.memo(({ order }: IProps) => {
  const { t } = useTranslation();
  const { token, userInfo } = useUserState();
  const { countryFilter, searchKeywords, alreadySearched } =
    useOpponentsState();
  const {
    onSelectOpponent,
    onSetSearchKeyword,
    onSetAlreadySearched,
    resetOnSearch,
    onGetGtrends,
    onResetSelected,
    onSetOpponentsData,
  } = useOpponentsActions();
  const { onShowAlert } = useAppActions();
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [opponents, setOpponents] = useState<IOpponents | null>(null);
  const [showSearchedOpponents, setShowSearchedOpponents] =
    useState<boolean>(false);
  const [isFetchingOpponents, setIsFetchingOpponents] =
    useState<boolean>(false);

  const handleSelect = useCallback(
    (opponent: any) => {
      onSelectOpponent(opponent, order);
    },
    [order, searchKeywords[order]]
  );

  const fetchOpponents = useCallback(async () => {
    if (token && searchKeyword) {
      const staticData = getStaticData(userInfo?.login as string, searchKeyword)
      if(staticData) {
        console.log("Static data inserted")
        onSelectOpponent({page_name: searchKeyword, id: searchKeyword}, order)
        onSetOpponentsData(order, staticData)
        return 
      }
      setIsFetchingOpponents(true);
      const [dataRes, dataErr] = await handle(
        Opponents.getOpponents(token, searchKeyword, countryFilter)
      );
      setIsFetchingOpponents(false);
      if (dataRes) {
        setOpponents(dataRes);
        setShowSearchedOpponents(true)
      }
      if (dataErr) {
        onShowAlert(false, dataErr.error);
      }
    }
  }, [token, searchKeyword, countryFilter, userInfo?.login, order]);

  const handleFetchOpponents = useCallback(() => {
    if (!alreadySearched) resetOnSearch(order);
    onSetSearchKeyword(searchKeyword, order);
    onGetGtrends();
    fetchOpponents();
    onSetAlreadySearched(true);
  }, [fetchOpponents, alreadySearched, order]);

  const handleClear = useCallback(() => {
    onResetSelected(order);
  }, [order]);

  useEffect(() => {
    setSearchKeyword(searchKeywords[order]);
  }, [searchKeywords[order]]);

  const badgeColor = useMemo(() => {
    return searchKeywords[order] ? colorsChart[order] : "transparent";
  }, [searchKeywords, order, colorsChart]);


  return (
    <>
      {showSearchedOpponents && (
        <SelectOpponentComponent
          order={order}
          opponents={opponents as IOpponents}
          onSelect={(page_id) => handleSelect(page_id)}
          onClose={() => setShowSearchedOpponents(false)}
        />
      )}
      <InputBox>
        <StyledInput
          color={badgeColor}
          type="text"
          name="search"
          label={t("opponents-select_title")}
          value={searchKeyword}
          onChange={(v) => setSearchKeyword(v)}
        />
        {isFetchingOpponents ? (
          <StyledLoader />
        ) : (
          <StyledBtn
            data-action={activityList["opponents-search"]}
            onClick={handleFetchOpponents}
            disabled={!searchKeyword || isFetchingOpponents}
          >
            <MagnifierIcon />
          </StyledBtn>
        )}
        <StyledDeleteBtn onClick={handleClear} data-action={activityList["opponents-delete"]}>
          <TrashIcon />
        </StyledDeleteBtn>
      </InputBox>
    </>
  );
});

export default withErrorBoundaryHOC(SearchOpponentComponent);