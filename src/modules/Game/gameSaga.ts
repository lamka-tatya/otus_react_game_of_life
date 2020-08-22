import {
	put,
	select,
	takeEvery,
	take,
	all,
	fork,
	delay,
	cancel,
} from "redux-saga/effects";
import { setField, gameSelectors, getNextGeneration, playGame, stopGame } from "./gameReducer";

function* playWorker() {
	while (true) {
		const { frequency } = yield select(gameSelectors.settings);
		const nextFieldRows = yield select(getNextGeneration);
		yield put(setField(nextFieldRows));
		yield delay(frequency * 100);
	}
}

function* playGameFlow() {
	const playTask = yield fork(playWorker);
	yield take(stopGame.type);
	yield cancel(playTask);
}

function* startGameSaga() {
	yield takeEvery(playGame.type, playGameFlow);
}

export function* gameSaga() {
	yield all([startGameSaga()]);
}
