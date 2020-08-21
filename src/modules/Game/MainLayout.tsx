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

  makeCellAlive: ({}) => void;
  fieldHeight: number;
  fieldWidht: number;
  field: CellRow[];
  cellHeight: number;
  cellWidht: number;
}> = ({
  onClickPlayPause,
  userName,
  isPlaying,

  makeCellAlive,
  fieldHeight,
  fieldWidht,
  field,
  cellHeight,
  cellWidht,
}) => (
  <MainContainer>
    <FieldContainer>
      <Field
        key="field"
        makeCellAlive={makeCellAlive}
        fieldHeight={fieldHeight}
        fieldWidht={fieldWidht}
        field={field}
        cellHeight={cellHeight}
        cellWidht={cellWidht}
      />
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
