import React, { FC } from "react";
import { CellStyled } from "./Cell.styles";
import { CellState } from "./CellState";

export const Cell: FC<{
  state: CellState;
  height: number;
  width: number;
  onCellClick: () => void;
}> = ({state, height, width, onCellClick}) => (
  <CellStyled
    cellState={state}
    height={height}
    width={width}
    onClick={onCellClick}
  ></CellStyled>
);
