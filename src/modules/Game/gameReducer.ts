import { createSlice } from "@reduxjs/toolkit";
import { CellRow, gameSelectors } from ".";
import { CellState } from "@/components/Cell";
import { GameSettings } from "@/components/SettingsPanel";

export const getRandomField = (settings: GameSettings) => {
	const { columnCount, rowCount, fillingPercent } = settings;
	const result: CellRow[] = [];
	const cellsCount = columnCount * rowCount;
	const maxAliveCount = (cellsCount / 100) * fillingPercent;
	let aliveCount = 0;

	for (let y = 0; y < rowCount; y++) {
		const rowCells: CellState[] = [];

		for (let x = 0; x < columnCount; x++) {
			let cellState = CellState.dead;

			if (Math.round(Math.random() * 100) <= fillingPercent) {
				aliveCount++;
				if (aliveCount <= maxAliveCount) {
					cellState = CellState.alive;
				}
			}

			rowCells.push(cellState);
		}
		result.push({ cells: rowCells });
	}
	return result;
};

export const initSettingsState: GameSettings = {
	height: 600,
	width: 600,
	rowCount: 18,
	columnCount: 18,
	fillingPercent: 40,
	frequency: 4,
};

export interface GameState {
	settings: GameSettings;
	isPlaying: boolean;
	isSettingsVisible: boolean;
	userpic: string;
	field: CellRow[];
	history: CellRow[][];
	currentHistoryStep: number;
}

export const initGameState: GameState = {
	settings: initSettingsState,
	isPlaying: false,
	isSettingsVisible: false,
	userpic: "",
	field: getRandomField(initSettingsState),
	history: [],
	currentHistoryStep: -1
};

const makeCellAliveField = (
	oldField: CellRow[],
	colIndex: number,
	rowIndex: number
) => {
	if (oldField[rowIndex].cells[colIndex] !== CellState.alive) {
		const newRows = [...oldField];
		const rowCells = [...newRows[rowIndex].cells];
		rowCells[colIndex] = CellState.alive;
		newRows[rowIndex] = { cells: rowCells };

		return newRows;
	}
	return oldField;
};

const gameSlice = createSlice({
	name: "game",
	initialState: initGameState,
	reducers: {
		playGame(state) {
			state.isPlaying = true;

			state.history = [state.field];

			state.currentHistoryStep = 0;
		},
		stopGame(state) {
			state.isPlaying = false;
		},
		setIsSettingsVisible(state, action) {
			state.isSettingsVisible = action.payload;
		},
		reset(state) {
			state.field = getRandomField(state.settings);

			state.history = [state.field];
			state.currentHistoryStep = 0;
		},
		setUserpic(state, action) {
			state.userpic = action.payload;
		},
		setSettings(state, action) {
			state.settings = action.payload;
			state.field = getRandomField(action.payload);

			state.history = [state.field];
			state.currentHistoryStep = 0;
		},
		setField(state, action) {
			state.field = action.payload;

			state.history.push(state.field);
			state.currentHistoryStep++;
		},
		makeCellAlive(state, action) {
			state.field = makeCellAliveField(
				state.field,
				action.payload.colIndex,
				action.payload.rowIndex
			);

			state.history.push(state.field);
			state.currentHistoryStep++;
		},
		nextStep(state) {
			if (gameSelectors.hasNextStep(state)) {

				state.currentHistoryStep++;
				state.field = state.history[state.currentHistoryStep];
			}
		},
		prevStep(state) {
			if (gameSelectors.hasPrevStep(state)) {

				state.currentHistoryStep--;
				state.field = state.history[state.currentHistoryStep];
			}
		},
	},
});

export const {
	setSettings,
	playGame,
	stopGame,
	setIsSettingsVisible,
	reset,
	setUserpic,
	setField,
	makeCellAlive,
	nextStep,
	prevStep,
} = gameSlice.actions;
export const gameReducer = gameSlice.reducer;

