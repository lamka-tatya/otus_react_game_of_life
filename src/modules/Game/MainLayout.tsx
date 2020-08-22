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
import { CellRow } from ".";

export const MainLayout: FC<{
  onClickPlayPause: () => void;
  userName: string;
  isPlaying: boolean;
}> = ({
  onClickPlayPause,
  userName,
  isPlaying
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
          disabled={true}
          title="Previous state"
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
          disabled={true}
        ></ImageButton>
      </ButtonsContainer>
      {userName}
    </BottomContainer>
  </MainContainer>
);
