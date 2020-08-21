import React from "react";
import { Game } from ".";
import { mount, ReactWrapper } from "enzyme";

describe("Game tests", () => {
  const gameSettings = {
    height: 300,
    width: 300,
    rowCount: 10,
    columnCount: 10,
    fillingPercent: 50,
    frequency: 100,
  };

  describe("When click on settings button", () => {
    it("should call show settings form", () => {
      const mock = jest.fn();
      const wrapper = mount(
        <Game
          user={{ name: "Name", gender: "robot" }}
          onLogout={() => {}}
          isPlaying={false}
          playGame={() => {}}
          stopGame={() => {}}
          setIsSettingsVisible={mock}
          reset={() => {}}
          userpic={""}
          isLogout={false}
          logout={() => {}}
          setSettings={({}) => {}}
          gameSettings={gameSettings}
          isSettingsVisible={false}
        />
      );
      const settingsBtn = wrapper.findWhere((x) => x.key() === "settingsBtn");

      settingsBtn.simulate("click");

      expect(mock).toHaveBeenCalledWith(true);
    });
  });

  describe("When click on play button", () => {
    it("should call play game", () => {
      const mock = jest.fn();
      const wrapper = mount(
        <Game
          user={{ name: "Name", gender: "robot" }}
          onLogout={() => {}}
          isPlaying={false}
          playGame={mock}
          stopGame={() => {}}
          setIsSettingsVisible={({}) => {}}
          reset={() => {}}
          userpic={""}
          isLogout={false}
          logout={() => {}}
          setSettings={({}) => {}}
          gameSettings={gameSettings}
          isSettingsVisible={false}
        />
      );
      const playBtn = wrapper.findWhere((x) => x.key() === "playBtn");

      playBtn.simulate("click");

      expect(mock).toHaveBeenCalledTimes(1);
    });
  });
});
