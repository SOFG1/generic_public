import { createAction } from "@reduxjs/toolkit";
import {
  IGTrends,
  IOpponentData,
  OpponentOrderType,
  SelectOpponentPayloadType,
} from "./types";

export const opponentsSetDaysFilter = createAction<number>(
  "opponents/setDaysFilter"
);

export const opponentsSetCountryFilter = createAction<number>(
  "opponents/setCountryFilter"
);

export const opponentsSetSearchKeyword = createAction<{word: string, order: OpponentOrderType}>('opponents/setSearchKeyword')

export const opponentsSetSelectedOpponents =
  createAction<SelectOpponentPayloadType>("opponents/setSelectedOpponents");

  export const opponentsGetGTrends = createAction('opponents/getGTrends')

export const opponentsSetGTrends = createAction<IGTrends>(
  "opponents/setGTrends"
);
export const opponentsSetGTrendsFetching = createAction<boolean>(
  "opponents/setGTrendsFetching"
);
export const opponentsSetDataFetching = createAction<boolean>(
  "opponents/setDataFetching"
);

export const opponentsSetData = createAction<{
  data: IOpponentData | null;
  order: OpponentOrderType;
}>("opponents/setData");

export const opponentsResetOnSearch = createAction<OpponentOrderType>("opponents/clearData");
export const opponentsResetAll = createAction("opponents/resetAll");
export const opponentsResetSelected = createAction<OpponentOrderType>("opponents/resetSelected")


export const opponentsSetAlreadySearched = createAction<boolean>('opponents/setAlreadySearched')