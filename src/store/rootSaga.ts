import { spawn } from "redux-saga/effects";
import { userWatcher } from "./user/saga";
import { rawDataWatcher } from "./rawData/saga";
import { historyWatcher } from "./history/saga";
import { callCenterHistoryWatcher } from "./callCenterHistory/saga";
import { settingsWatcher } from "./settings/saga";
import { smStatsWatcher } from "./smStats/saga";
import { usersWatcher } from "./users/saga";
import { callCenterWatcher } from "./callCenter/saga";
import { sentimentorWatcher } from "./sentimentor/saga";
import { electionWatcher } from "./election/saga";
import { volunteersWatcher } from "./volunteers/saga";
import { appWatcher } from "./app/saga";
import { googleAdsWatcher } from "./googleAds/saga";
import { opponentsWatcher } from "./opponents/saga";
import { relationsWatcher } from "./relations/saga";
import {sequenceWatcher} from "./sequence";



export function* rootSaga() {
  yield spawn(userWatcher);
  yield spawn(usersWatcher);
  yield spawn(callCenterHistoryWatcher);
  yield spawn(rawDataWatcher);
  yield spawn(historyWatcher);
  yield spawn(settingsWatcher);
  yield spawn(smStatsWatcher);
  yield spawn(callCenterWatcher);
  yield spawn(sentimentorWatcher);
  yield spawn(electionWatcher);
  yield spawn(volunteersWatcher);
  yield spawn(googleAdsWatcher);
  yield spawn(opponentsWatcher)
  yield spawn(relationsWatcher)
  yield spawn(appWatcher);
  yield spawn(sequenceWatcher)
}
