import React, { FC, useState, useCallback } from "react";
import { GameContainer } from "./Game.styles";
import { MainLayout } from "./MainLayout";
import { RightSideLayout } from "./RightSideLayout";
import { SettingsPanel } from "@/components/SettingsPanel";
import { connect } from "react-redux";
import { AppState } from "@/store";
import {
  playGame,
  stopGame,
  setIsSettingsVisible,
  reset,
  setSettings,
} from "./gameReducer";

const mapStateToProps = (state: AppState) => ({
  isPlaying: state.game.isPlaying,
  userpic: state.game.userpic,
  isSettingsVisible: state.game.isSettingsVisible,
  gameSettings: state.game.settings,
});

const mapDispatchToProps = {
  playGame,
  stopGame,
  setIsSettingsVisible,
  reset,
  setSettings,
};

type GameProps = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

const GameInternal: FC<GameProps> = ({
  isPlaying,
  playGame,
  stopGame,
  setIsSettingsVisible,
  reset,
  userpic,
  setSettings,
  gameSettings,
  isSettingsVisible,
}) => {
  const [] = useState(false);

  const onClickPlayPause = useCallback(() => {
    isPlaying ? stopGame() : playGame();
  }, [isPlaying, stopGame, playGame]);

  const onClickSettings = useCallback(() => {
    setIsSettingsVisible(true);
  }, [setIsSettingsVisible]);

  const onReset = useCallback(() => {
    reset();
  }, [reset]);

  const onDoLogout = useCallback(() => {}, []);

  return (
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
          onClickPlayPause={onClickPlayPause}
          isPlaying={isPlaying}
          userName={"Hello!"}
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

export const Game = connect(mapStateToProps, mapDispatchToProps)(GameInternal);
