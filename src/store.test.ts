import { initialAppState, rootReducer, restore, rootSaga } from "./store";
import { expectSaga } from "redux-saga-test-plan";
import { Gender } from "./modules/Game";

describe("Root reducer", () => {
  it("Restore should set state to initial", () => {
    const state = rootReducer(
      {
        game: {
          settings: {
            height: 1,
            width: 2,
            rowCount: 3,
            columnCount: 4,
            fillingPercent: 5,
            frequency: 6,
          },
          isPlaying: true,
          isSettingsVisible: true,
          userpic: "sdfasdfasrdfsd",
          field: [[], []],
          history: [[], []],
          currentHistoryStep: -100,
        },
        auth: {
          userName: "test",
          userGender: Gender.male,
          user: { userName: "test", userGender: Gender.male },
        },
      },
      restore()
    );

    expect(state).toStrictEqual(initialAppState);
  });
});

describe("Root saga", () => {
  it("forks game and auth", async () => {
    const result = await expectSaga(rootSaga)
      .withReducer(rootReducer, initialAppState)
      .run();

    expect(
      result.effects.fork.filter((e) => e.payload.args[0]?.startsWith("auth/"))
        .length
    ).toBeGreaterThan(0);

    expect(
      result.effects.fork.filter((e) => e.payload.args[0]?.startsWith("game/"))
        .length
    ).toBeGreaterThan(0);
  });
});
