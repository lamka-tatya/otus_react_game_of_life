import React from "react";
import { Game, CellRow } from ".";
import { mount, ReactWrapper } from "enzyme";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import {
  initGameState,
  setIsSettingsVisible,
  playGame,
  reset,
  nextStep,
  prevStep,
} from "./gameReducer";
import { BrowserRouter } from "react-router-dom";
import { logout } from "../Auth";

describe("Game tests", () => {
  let wrapper: ReactWrapper;
  let store: any;
  const mockStore = configureStore([]);

  beforeEach(() => {
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

  it("should call show settings form when click on settings button", () => {
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

  it("should change play|pause state when click on play button", () => {
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

  it("should call reset when click on reset button", () => {
    const playBtn = wrapper.findWhere((x) => x.key() === "resetBtn");

    playBtn.simulate("click");

    expect(store.getActions()).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          type: reset.type,
        }),
      ])
    );
  });

  it("should call logout when click on quit button", () => {
    const playBtn = wrapper.findWhere((x) => x.key() === "logoutBtn");

    playBtn.simulate("click");

    expect(store.getActions()).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          type: logout.type,
        }),
      ])
    );
  });

  it("should enable history buttons when game is not playing and has history", () => {
    store = mockStore({
      game: {
        ...initGameState,
        history: [[], [], []],
        currentHistoryStep: 1,
      },
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

    const nextBtn = wrapper.findWhere((x) => x.key() === "next");
    const prevBtn = wrapper.findWhere((x) => x.key() === "prev");

    expect(nextBtn.props().disabled).toBeFalsy();
    expect(prevBtn.props().disabled).toBeFalsy();
  });

  it("should call next on click next button", () => {
    store = mockStore({
      game: {
        ...initGameState,
        history: [[], [], []],
        currentHistoryStep: 1,
      },
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

    const nextBtn = wrapper.findWhere((x) => x.key() === "next");
    nextBtn.simulate("click");

    expect(store.getActions()).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          type: nextStep.type,
        }),
      ])
    );
  });

  it("should call prev on click prev button", () => {
    store = mockStore({
      game: {
        ...initGameState,
        history: [[], [], []],
        currentHistoryStep: 1,
      },
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

    const nextBtn = wrapper.findWhere((x) => x.key() === "prev");
    nextBtn.simulate("click");

    expect(store.getActions()).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          type: prevStep.type,
        }),
      ])
    );
  });
  it("should disable history buttons when game is playing", () => {
    store = mockStore({
      game: {
        ...initGameState,
        isPlaying: true,
      },
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

    const nextBtn = wrapper.findWhere((x) => x.key() === "next");
    const prevBtn = wrapper.findWhere((x) => x.key() === "prev");

    expect(nextBtn.props().disabled).toBeTruthy();
    expect(prevBtn.props().disabled).toBeTruthy();
  });

  it("should not show userpic image if userpic is not provided", () => {
    const userpic = wrapper.findWhere((x) => x.key() === "userpic");

    expect(userpic.exists()).toBeFalsy();
  });

  it("should show userpic image if userpic is provided", () => {
    store = mockStore({
      game: {
        ...initGameState,
        userpic: "ewrwaerawe",
      },
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

    const userpic = wrapper.findWhere((x) => x.key() === "userpic");

    expect(userpic.exists()).toBeTruthy();
  });
});
