import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { composeWithDevTools } from "redux-devtools-extension";
import { load, save } from "redux-localstorage-simple";
import { applyMiddleware, createStore } from "@reduxjs/toolkit";
import { rootReducer } from "./store";
import { rootSaga } from "./store/rootSaga";
import createSagaMiddleware from "redux-saga";
import {ThemeProvider} from "styled-components";
import theme from "./styles/theme";

interface Props {
  children: React.ReactNode;
}

const PERSISTED_KEYS: string[] = [
  "user.isLogin",
  "user.token",
  "rawData",
  "opponents.daysFilter",
  "opponents.searchKeywords",
  "opponents.countryFilter",
  "opponents.selectedOpponents",
  "opponents.opponentsData",
  "opponents.opponentGtrends",
  "relations.posts",
  "relations.relations",
  "relations.persons",
  "relations.selectedPost",
  "relations.selectedPostPersons",
  "relations.selectedPostRelations",
  "relations.tagFilter",
  "relations.dateFilter",


];
const loadedState = load({
  states: PERSISTED_KEYS,
  disableWarnings: true,
});
const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  loadedState,
  composeWithDevTools(
    applyMiddleware(sagaMiddleware, save({ states: PERSISTED_KEYS }))
    // applyMiddleware(sagaMiddleware)
  )
);
sagaMiddleware.run(rootSaga);
function Providers({ children }: Props) {
  return (
    <Provider store={store}>
     <ThemeProvider theme={theme }>
       <BrowserRouter>{children}</BrowserRouter>
     </ThemeProvider>
    </Provider>
  );
}

export default Providers;
