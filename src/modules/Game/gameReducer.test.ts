import { gameReducer } from ".";
import { initGameState, playGame, stopGame, setIsSettingsVisible, reset, setUserpic, setSettings, setField, makeCellAlive } from "./gameReducer";
import { CellState } from "@/components/Cell";

describe("Game reducer", () => {
	it("Play game should set isPlaying to true", () => {
		const state = gameReducer(initGameState, playGame());

		expect(state.isPlaying).toBeTruthy();
	});
	it("Stop game should set isPlaying to false", () => {
		const playingState = gameReducer(initGameState, playGame());
		const stopState = gameReducer(playingState, stopGame());

		expect(playingState.isPlaying).toBeTruthy();
		expect(stopState.isPlaying).toBeFalsy();
	});

	it("Set is settings visible should change isSettingsVisible", () => {
		const firstState = gameReducer(initGameState, setIsSettingsVisible(true));
		const secondState = gameReducer(initGameState, setIsSettingsVisible(false));

		expect(firstState.isSettingsVisible).toBeTruthy();
		expect(secondState.isSettingsVisible).toBeFalsy();
	});

	it("Reset should change field", () => {
		const firstState = gameReducer(initGameState, reset());
		const secondState = gameReducer(firstState, reset());

		expect(firstState.field).not.toStrictEqual(secondState.field);
	});

	it("Set userpic should set userpic", () => {
		const state = gameReducer(initGameState, setUserpic("userpic"));

		expect(state.userpic).toBe("userpic");
	});

	it("Set settings should set settings", () => {
		const state = gameReducer(initGameState, setSettings({
			height: 100,
			width: 200,
			rowCount: 10,
			columnCount: 20,
			fillingPercent: 30,
			frequency: 40,
		}));

		expect(state.settings).toStrictEqual({
			height: 100,
			width: 200,
			rowCount: 10,
			columnCount: 20,
			fillingPercent: 30,
			frequency: 40,
		});
	});

	it("Set settings should generate new field by the settings", () => {
		const state = gameReducer(initGameState, setSettings({
			height: 100,
			width: 200,
			rowCount: 10,
			columnCount: 20,
			fillingPercent: 0,
			frequency: 40,
		}));

		expect(state.field.length).toBe(10);
		expect(state.field[0].cells.length).toBe(20);

		const rowIndexWithAliveCell = state.field.findIndex(r => r.cells.findIndex(c => c === CellState.alive) > -1);
		expect(rowIndexWithAliveCell).toBe(-1);
	});

	it("Set field should set field", () => {
		const state = gameReducer(initGameState, setField([
			{ cells: [CellState.alive, CellState.alive] },
			{ cells: [CellState.alive, CellState.alive] }]));

		expect(state.field).toEqual([
			{ cells: [CellState.alive, CellState.alive] },
			{ cells: [CellState.alive, CellState.alive] }]);
	});

	it("Make cell alive should make cell alive", () => {
		const state = gameReducer(initGameState, setField([{ cells: [CellState.dead] }]));
		const newState = gameReducer(state, makeCellAlive({ colIndex: 0, rowIndex: 0 }));

		expect(newState.field[0].cells[0]).toBe(CellState.alive);
	});
});