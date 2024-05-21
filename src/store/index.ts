import { combineReducers } from "@reduxjs/toolkit";
import { user } from "./user";
import { rawData } from "./rawData";
import { history } from "./history";
import { settings } from "./settings";
import { smStats } from "./smStats";
import { users } from "./users";
import { callCenter } from "./callCenter";
import { callCenterHistory } from "./callCenterHistory";
import { election } from "./election";
import { sentimentor } from "./sentimentor";
import { volunteers } from "./volunteers";
import { app } from "./app";
import { googleAds } from "./googleAds";
import { opponents } from "./opponents";
import { relations } from "./relations";
import {sequence} from "./sequence";


const rootReducer = combineReducers({
  user,
  users,
  rawData,
  history,
  sentimentor,
  settings,
  smStats,
  callCenter,
  callCenterHistory,
  election,
  volunteers,
  googleAds,
  opponents,
  relations,
  sequence,
  app
});

export type rootReducerType = ReturnType<typeof rootReducer>;
export { rootReducer };
