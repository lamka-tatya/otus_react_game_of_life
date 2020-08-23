import React from "react";
import { Game } from ".";
import { mount, ReactWrapper } from "enzyme";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { initGameState, setIsSettingsVisible, playGame } from "./gameReducer";
import { localStorageAuth } from "../Auth/authService";
import { BrowserRouter } from "react-router-dom";

describe("Game tests", () => {
  let wrapper: ReactWrapper;
  let store: any;
  const mockStore = configureStore([]);

  beforeEach(() => {
    localStorageAuth.login({ name: "test", gender: "robot" });

    store = mockStore({
      game: initGameState,
      auth: {
        user: {
          name: "test",
          gender: "robot",
        },
        userName: "test",
        userGender: "robot",
      },
    });

    wrapper = mount(
      <Provider store={store}>
        <BrowserRouter>
          <Game />
        </BrowserRouter>
      </Provider>
    );
  });

  describe("When click on settings button", () => {
    it("should call show settings form", () => {
      const settingsBtn = wrapper.findWhere((x) => x.key() === "settingsBtn");

      settingsBtn.simulate("click");

      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            type: setIsSettingsVisible.type,
            payload: true,
          }),
        ])
      );
    });
  });

  describe("When click on play button", () => {
    it("should change play|pause state", () => {
      const playBtn = wrapper.findWhere((x) => x.key() === "playBtn");

      playBtn.simulate("click");

      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            type: playGame.type,
          }),
        ])
      );
    });
  });
});
