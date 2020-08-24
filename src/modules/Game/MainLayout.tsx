import React, { FC } from "react";
import {
  MainContainer,
  BottomContainer,
  ButtonsContainer,
  FieldContainer,
} from "./Game.styles";

import PlayImg from "./assets/play_pause.svg";
import PauseImg from "./assets/pause.svg";
import BackImg from "./assets/back.svg";
import ForwardImg from "./assets/forward.svg";
import { Field } from "./Field/Field";
import { ImageButton } from "@/components/ImageButton";

export const MainLayout: FC<{
  onClickPlayPause: () => void;
  onClickNext: () => void;
  onClickPrev: () => void;
  userName: string;
  isPlaying: boolean;
  hasPrevStep: boolean;
  hasNextStep: boolean;
}> = ({
  onClickPlayPause,
  onClickNext,
  onClickPrev,
  userName,
  isPlaying,
  hasPrevStep,
  hasNextStep,
}) => (
  <MainContainer>
    <FieldContainer>
      <Field key="field" />
    </FieldContainer>
    <BottomContainer>
      <ButtonsContainer>
        <ImageButton
          src={BackImg}
          type="button"
          disabled={!hasPrevStep}
          title="Previous state"
          key="prev"
          onClick={onClickPrev}
        ></ImageButton>
        <ImageButton
          key="playBtn"
          src={isPlaying ? PauseImg : PlayImg}
          type="button"
          title="Play"
          onClick={onClickPlayPause}
        ></ImageButton>
        <ImageButton
          src={ForwardImg}
          type="button"
          title="Next state"
          key="next"
          disabled={!hasNextStep}
          onClick={onClickNext}
        ></ImageButton>
      </ButtonsContainer>
      {userName}
    </BottomContainer>
  </MainContainer>
);
