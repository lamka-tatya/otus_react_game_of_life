import { AppState } from "@/store";
import { CellState } from "@/components/Cell";
import { createSelector } from "reselect";
import { CellRow, GameState } from ".";

export const gameSelectors = {
	settings: ({ game }: AppState) => game.settings,
	field: ({ game }: AppState) => game.field,
	gameIsPlaying: ({ game }: AppState) => game.isPlaying,
	hasPrevStep: (game: GameState) => !game.isPlaying && game.currentHistoryStep > 0,
	hasNextStep: (game: GameState) => !game.isPlaying && game.currentHistoryStep < game.history.length - 1,
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