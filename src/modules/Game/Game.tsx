import React, { FC, useState, useCallback } from "react";
import { GameContainer } from "./Game.styles";

import { Redirect } from "react-router-dom";
import { MainLayout } from "./MainLayout";
import { RightSideLayout } from "./RightSideLayout";
import { SettingsPanel, GameSettings } from "@/components/SettingsPanel";
import { User } from ".";
import { CellState } from "@/components/Cell";

export const Game: FC<{
  user: User;
  onLogout: () => void;
  isPlaying: boolean;
  playGame: () => void;
  stopGame: () => void;
  setIsSettingsVisible: ({}) => void;
  reset: () => void;
  userpic: string | undefined;
  isLogout: boolean;
  logout: () => void;
  setSettings: ({}) => void;
  gameSettings: GameSettings;
  isSettingsVisible: boolean;
}> = ({
  user,
  onLogout,
  isPlaying,
  playGame,
  stopGame,
  setIsSettingsVisible,
  reset,
  userpic,
  isLogout,
  logout,
  setSettings,
  gameSettings,
  isSettingsVisible,
}) => {
  const [] = useState(false);

  const onClickPlayPause = useCallback(() => {
    isPlaying ? stopGame() : playGame();
  }, [stopGame, playGame]);

  const onClickSettings = useCallback(() => {
    setIsSettingsVisible(true);
  }, [setIsSettingsVisible]);

  const onReset = useCallback(() => {
    reset();
  }, [reset]);

  const onDoLogout = useCallback(() => {
    onLogout && onLogout();
    logout();
  }, [onLogout, logout]);

  return isLogout ? (
    <Redirect to="/" push={true} />
  ) : (
    <>
      <SettingsPanel
        key="settingsWindow"
        setIsSettingsVisible={setIsSettingsVisible}
        setSettings={setSettings}
        settings={gameSettings}
        visible={isSettingsVisible}
      />
      <GameContainer>
        <MainLayout
          makeCellAlive={() => {}}
          fieldHeight={200}
          fieldWidht={200}
          field={[
            { cells: [CellState.alive, CellState.alive, CellState.alive] },
            { cells: [CellState.dead, CellState.alive, CellState.dead] },
            { cells: [CellState.alive, CellState.dead, CellState.alive] },
          ]}
          cellHeight={20}
          cellWidht={20}
          onClickPlayPause={onClickPlayPause}
          isPlaying={isPlaying}
          userName={user?.name ?? ""}
        />
        <RightSideLayout
          onClickSettings={onClickSettings}
          onReset={onReset}
          onLogout={onDoLogout}
          userPic={userpic}
        />
      </GameContainer>
    </>
  );
};
