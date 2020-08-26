import React, { FC } from "react";
import { CellStyled } from "./Cell.styles";
import { CellState } from "./CellState";

export const Cell: FC<{
  state: CellState;
  height: number;
  width: number;
  onCellClick: () => void;
  name?: string;
}> = ({ state, height, width, onCellClick, name }) => (
  <CellStyled
    name={name}
    cellState={state}
    height={height}
    width={width}
    onClick={onCellClick}
  ></CellStyled>
);
