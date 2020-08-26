import { expectSaga } from "redux-saga-test-plan";
import { delay } from "redux-saga/effects";
import { rootReducer, initialAppState } from "@/store";
import { gameSaga, CellRow } from ".";
import { setSettings, initSettingsState, playGame, setField, stopGame } from "./gameReducer";
import { CellState } from "@/components/Cell";

describe("Game saga", () => {
	const saga = expectSaga(gameSaga).withReducer(
		rootReducer,
		initialAppState
	);
	it("should start generating on play", async () => {
		const result = await saga
			.dispatch(playGame())
			.run();

		expect(result.storeState.game.isPlaying).toBeTruthy()

	});
	it("should stop generating on stop", async () => {
		const result = await saga
			.dispatch(playGame())
			.dispatch(stopGame())
			.run();

		expect(result.storeState.game.isPlaying).toBeFalsy()
	});
	it("should change field on generating", async () => {
		const result = await saga
			.dispatch(
				setSettings({
					...initSettingsState,
					frequency: 10,
				})
			)
			.dispatch(setField(
				[{ cells: [CellState.alive, CellState.alive] },
				{ cells: [CellState.dead, CellState.alive] }]))
			.dispatch(playGame())
			.run();

		delay(1000);

		expect(result.storeState.game.field).toStrictEqual([
			{ cells: [CellState.alive, CellState.alive] },
			{ cells: [CellState.alive, CellState.alive] }])
	});
	it("should end up with all cells dead if start game with 100% filling", async () => {
		const result = await saga
			.dispatch(
				setSettings({
					...initSettingsState,
					fillingPercent: 100,
					frequency: 1,
				})
			)
			.dispatch(playGame())
			.run();

		delay(1000);

		const allCells = [].concat(
			...result.storeState.game.field.map((x: CellRow) => x.cells)
		);
		expect(
			allCells.findIndex((x: CellState) => x === CellState.alive)
		).toBe(-1);
	});
});
