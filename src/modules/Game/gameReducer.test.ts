import { gameReducer } from ".";
import { initGameState, playGame, stopGame, setIsSettingsVisible, reset, setUserpic, setSettings, setField, makeCellAlive, prevStep, nextStep } from "./gameReducer";
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

		expect(initGameState.isSettingsVisible).toBeFalsy();
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

		expect(initGameState.userpic).toBe("");
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

	it("Make cell alive should make dead cell alive", () => {
		const state = gameReducer(initGameState, setField([{ cells: [CellState.dead] }]));
		const newState = gameReducer(state, makeCellAlive({ colIndex: 0, rowIndex: 0 }));

		expect(state.field[0].cells[0]).toBe(CellState.dead);
		expect(newState.field[0].cells[0]).toBe(CellState.alive);
	});

	it("Make cell alive should not change alive cell", () => {
		const state = gameReducer(initGameState, setField([{ cells: [CellState.alive] }]));
		const newState = gameReducer(state, makeCellAlive({ colIndex: 0, rowIndex: 0 }));

		expect(newState.field === state.field).toBeTruthy();
	});

	it("Set field should add history and current step", () => {
		const initState = gameReducer(initGameState, setField([]));
		const state = gameReducer(initState, setField([]));
		const newState = gameReducer(state, setField([]));

		expect(newState.currentHistoryStep).toBe(2);
		expect(newState.history.length).toBe(3);
	});

	it("Prev step should not make effect if game is playing", () => {
		const initState = gameReducer(initGameState, playGame());
		const state = gameReducer(initState, setField([]));
		const newState = gameReducer(state, prevStep());

		expect(state === newState).toBeTruthy();
	});

	it("Prev step should not make effect if current step is 0", () => {
		const initState = gameReducer(initGameState, prevStep());

		expect(initGameState === initState).toBeTruthy();
	});

	it("Play game should clear history", () => {
		const initState = gameReducer(initGameState, setField([]));
		const state = gameReducer(initState, setField([]));
		const newState = gameReducer(state, playGame());

		expect(newState.currentHistoryStep).toBe(0);
		expect(newState.history.length).toBe(1);
	});

	it("Reset should clear history", () => {
		const initState = gameReducer(initGameState, setField([]));
		const state = gameReducer(initState, setField([]));
		const newState = gameReducer(state, reset());

		expect(newState.currentHistoryStep).toBe(0);
		expect(newState.history.length).toBe(1);
	});

	it("Set settings should clear history", () => {
		const initState = gameReducer(initGameState, setField([]));
		const state = gameReducer(initState, setField([]));
		const newState = gameReducer(state, setSettings({}));

		expect(newState.currentHistoryStep).toBe(0);
		expect(newState.history.length).toBe(1);
	});

	it("Make cell alive should add history", () => {
		const initState = gameReducer(initGameState, setField([{ cells: [CellState.dead] }]));
		const state = gameReducer(initState, setField([{ cells: [CellState.dead] }]));
		const newState = gameReducer(state, makeCellAlive({ colIndex: 0, rowIndex: 0 }));

		expect(newState.currentHistoryStep).toBe(2);
		expect(newState.history.length).toBe(3);
	});

	it("Prev step should set previous field", () => {
		const initState = gameReducer(initGameState, setField([{ cells: [CellState.dead] }]));
		const state = gameReducer(initState, setField([{ cells: [CellState.alive] }]));
		const newState = gameReducer(state, prevStep());

		expect(newState.field).toStrictEqual([{ cells: [CellState.dead] }]);
		expect(newState.currentHistoryStep).toBe(0);
	});

	it("Next step should set next field", () => {
		const state = gameReducer({
			...initGameState,
			history: [[{ cells: [CellState.dead] }], [{ cells: [CellState.alive] }]],
			currentHistoryStep: 0
		}, nextStep());

		expect(state.field).toStrictEqual([{ cells: [CellState.alive] }]);
		expect(state.currentHistoryStep).toBe(1);
	});

	it("Next step should not make effect if game is playing", () => {
		const initState = gameReducer(initGameState, playGame());
		const state = gameReducer(initState, setField([]));
		const newState = gameReducer(state, nextStep());

		expect(state === newState).toBeTruthy();
	});

	it("Next step should not make effect if current step is lager than history length", () => {
		const initState = { ...initGameState, currentHistoryStep: 3 };
		const state = gameReducer(initState, nextStep());

		expect(state === initState).toBeTruthy();
	});
});
