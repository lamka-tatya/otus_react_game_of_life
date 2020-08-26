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
  nextStep,
  prevStep,
} from "./gameReducer";
import { logout } from "@/modules/Auth";
import { Redirect } from "react-router-dom";
import { gameSelectors } from "./gameSelectors";

const mapStateToProps = (state: AppState) => ({
  isPlaying: state.game.isPlaying,
  userpic: state.game.userpic,
  user: state.auth.user,
  isSettingsVisible: state.game.isSettingsVisible,
  gameSettings: state.game.settings,
  hasNextStep: gameSelectors.hasNextStep(state.game),
  hasPrevStep: gameSelectors.hasPrevStep(state.game),
});

const mapDispatchToProps = {
  playGame,
  stopGame,
  setIsSettingsVisible,
  reset,
  setSettings,
  logout,
  nextStep,
  prevStep,
};

type GameProps = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

const GameInternal: FC<GameProps> = ({
  isPlaying,
  playGame,
  stopGame,
  setIsSettingsVisible,
  reset,
  userpic,
  user,
  setSettings,
  gameSettings,
  isSettingsVisible,
  logout,
  nextStep,
  prevStep,
  hasPrevStep,
  hasNextStep,
}) => {
  const onClickPlayPause = useCallback(() => {
    isPlaying ? stopGame() : playGame();
  }, [isPlaying, stopGame, playGame]);

  const onClickSettings = useCallback(() => {
    setIsSettingsVisible(true);
  }, [setIsSettingsVisible]);

  const onReset = useCallback(() => {
    reset();
  }, [reset]);

  const onClickNext = useCallback(() => {
    nextStep();
  }, [nextStep]);

  const onClickPrev = useCallback(() => {
    prevStep();
  }, [prevStep]);

  const onDoLogout = useCallback(() => {
    logout();
  }, [logout]);

  return user ? (
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
          onClickNext={onClickNext}
          onClickPrev={onClickPrev}
          isPlaying={isPlaying}
          userName={user.name}
          hasPrevStep={hasPrevStep}
          hasNextStep={hasNextStep}
        />
        <RightSideLayout
          onClickSettings={onClickSettings}
          onReset={onReset}
          onLogout={onDoLogout}
          userPic={userpic}
        />
      </GameContainer>
    </>
  ) : (
    <Redirect to="/" />
  );
};

export const Game = connect(mapStateToProps, mapDispatchToProps)(GameInternal);
