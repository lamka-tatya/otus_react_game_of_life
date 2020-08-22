import { configureStore, combineReducers } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { fork } from "redux-saga/effects";
import { gameReducer, gameSaga } from "./modules/Game";
import { initGameState } from "./modules/Game/gameReducer";

export const initialAppState = {
	game: initGameState,
  };

export const sagaMiddleware = createSagaMiddleware();

export const reducer = combineReducers({
	game: gameReducer,
  });
  

function* rootSaga() {
  yield fork(gameSaga);
}

export const store = configureStore({
  reducer,
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(rootSaga);

export type AppState = ReturnType<typeof reducer>;
