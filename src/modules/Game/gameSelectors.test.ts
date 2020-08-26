import { gameSelectors, initGameState } from ".";
import { initialAppState } from "@/store";

describe("Game gameSelectors ", () => {
	it("gameIsPlaying", () => {
		expect(gameSelectors.gameIsPlaying(initialAppState)).toBeFalsy();
		expect(gameSelectors.gameIsPlaying({
			...initialAppState,
			game: {
				...initGameState,
				isPlaying: true
			}
		})).toBeTruthy();
	});
	it("hasPrevStep", () => {
		expect(gameSelectors.hasPrevStep(initialAppState.game)).toBeFalsy();
		expect(gameSelectors.hasPrevStep({
			...initGameState,
			isPlaying: true
		})).toBeFalsy();
		expect(gameSelectors.hasPrevStep({
			...initGameState,
			currentHistoryStep: 1
		})).toBeTruthy();
	});

	it("hasNextStep", () => {
		expect(gameSelectors.hasNextStep(initialAppState.game)).toBeFalsy();
		expect(gameSelectors.hasNextStep({
			...initGameState,
			isPlaying: true
		})).toBeFalsy();
		expect(gameSelectors.hasNextStep({
			...initGameState,
			currentHistoryStep: 1
		})).toBeFalsy();
		expect(gameSelectors.hasNextStep({
			...initGameState,
			history: [[], [], []],
			currentHistoryStep: 1
		})).toBeTruthy();
	});
});
