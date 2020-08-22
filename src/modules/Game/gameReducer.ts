import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { CellRow } from ".";
import { CellState } from "@/components/Cell";
import { AppState } from "@/store";
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
	height: 350,
	width: 350,
	rowCount: 10,
	columnCount: 10,
	fillingPercent: 30,
	frequency: 10,
};

export interface GameState {
	settings: GameSettings;
	isPlaying: boolean;
	isSettingsVisible: boolean;
	userpic: string;
	field: CellRow[];
}

export const initGameState: GameState = {
	settings: initSettingsState,
	isPlaying: false,
	isSettingsVisible: false,
	userpic: "",
	field: getRandomField(initSettingsState),
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
		},
		stopGame(state) {
			state.isPlaying = false;
		},
		setIsSettingsVisible(state, action) {
			state.isSettingsVisible = action.payload;
		},
		reset(state) {
			state.field = getRandomField(state.settings);
		},
		setUserpic(state, action) {
			state.userpic = action.payload;
		},
		setSettings(state, action) {
			state.settings = action.payload;
			state.field = getRandomField(action.payload);
		},
		setField(state, action) {
			state.field = action.payload;
		},
		makeCellAlive(state, action) {
			state.field = makeCellAliveField(
				state.field,
				action.payload.colIndex,
				action.payload.rowIndex
			);
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
} = gameSlice.actions;
export const gameReducer = gameSlice.reducer;

export const gameSelectors = {
	settings: ({ game }: AppState) => game.settings,
	field: ({ game }: AppState) => game.field,
	gameIsPlaying: ({ game }: AppState) => game.isPlaying,
};

const getNextCellState = (oldCell: CellState, neighbours: CellState[]): CellState => {
	const aliveNeighbourCount = neighbours.filter(
		(x) => x === CellState.alive
	).length;

	if ((oldCell === CellState.alive &&
		(aliveNeighbourCount === 2 || aliveNeighbourCount === 3)) ||
		(oldCell === CellState.dead && aliveNeighbourCount === 3)
	) {
		return CellState.alive;
	}

	return CellState.dead;
}

export const getCellWidth = createSelector(
	[
		({ game }: AppState) => game.settings.columnCount,
		({ game }: AppState) => game.settings.width,
	],
	(count, width) => {
		return (width - (count + 1) * 4) / count;
	}
);

export const getCellHeight = createSelector(
	[
		({ game }: AppState) => game.settings.rowCount,
		({ game }: AppState) => game.settings.height,
	],
	(count, height) => {
		return (height - (count + 1) * 4) / count;
	}
);

export const getNextGeneration = createSelector(
	[gameSelectors.field, gameSelectors.settings],
	(oldField, settings) => {
		const getCellIndex = (index: number) =>
			index < 0
				? 0
				: index > settings.columnCount
					? settings.columnCount
					: index;

		return oldField.reduce(
			(
				newField: CellRow[],
				currentRow: CellRow,
				rowIndex: number,
				allRows: CellRow[]
			) => {
				const newCells = currentRow.cells.reduce(
					(
						newRowCells: CellState[],
						currentCell: CellState,
						cellIndex: number,
						allCells: CellState[]
					) => {
						const neighbours: CellState[] = [];
						allRows[rowIndex - 1] &&
							neighbours.push(
								...allRows[rowIndex - 1].cells.slice(
									getCellIndex(cellIndex - 1),
									getCellIndex(cellIndex + 2)
								)
							);
						allRows[rowIndex + 1] &&
							neighbours.push(
								...allRows[rowIndex + 1].cells.slice(
									getCellIndex(cellIndex - 1),
									getCellIndex(cellIndex + 2)
								)
							);
						allCells[cellIndex - 1] && neighbours.push(allCells[cellIndex - 1]);
						allCells[cellIndex + 1] && neighbours.push(allCells[cellIndex + 1]);
						newRowCells.push(getNextCellState(currentCell, neighbours));
						return newRowCells;
					},
					[]
				);

				newField.push({ cells: newCells });
				return newField;
			},
			[]
		);
	}
);
