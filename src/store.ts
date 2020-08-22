import { configureStore, combineReducers, createAction } from "@reduxjs/toolkit";
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

export const restore = createAction("restore");
export const rootReducer = (state: any, action: any) => {
	if (action.type === restore.type) {
		state = { ...initialAppState };
	}

	return reducer(state, action);
};

function* rootSaga() {
	yield fork(gameSaga);
}

export const store = configureStore({
	reducer: rootReducer,
	middleware: [sagaMiddleware],
});

sagaMiddleware.run(rootSaga);

export type AppState = ReturnType<typeof reducer>;
