import React, { FC } from "react";
import { Game } from "./modules/Game";

export const App: FC = () => (
  <Game
    user={{ name: "Name", gender: "robot" }}
    onLogout={() => {}}
    isPlaying={false}
    playGame={() => {}}
    stopGame={() => {}}
    setIsSettingsVisible={({}) => {}}
    reset={() => {}}
    userpic={""}
    isLogout={false}
    logout={() => {}}
    setSettings={({}) => {}}
    gameSettings={{
      height: 300,
      width: 300,
      rowCount: 10,
      columnCount: 10,
      fillingPercent: 50,
      frequency: 100,
    }}
    isSettingsVisible={false}
  />
);
