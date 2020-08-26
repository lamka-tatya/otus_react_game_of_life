import styled from "@emotion/styled";
import { css } from "@emotion/core";
import { SerializedStyles } from "@emotion/serialize";
import { CellState } from "./CellState";

const aliveStyle = css`
  box-shadow: inset 3px 2px 9px 5px #0e0e0e61;
  background-color: #14bb00;
`;

const deadStyle = css`
  background-color: white;
`;

const getStyle: (cellState: CellState) => SerializedStyles = (cellState) => {
  switch (cellState) {
    case CellState.alive:
      return aliveStyle;
    case CellState.dead:
      return deadStyle;
    default:
      throw TypeError("Unknown cell state");
  }
};

export const CellStyled = styled.button<{
  cellState: CellState;
  width: number;
  height: number;
}>`
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  border: none;

  display: inline-block;
  border-radius: 20px;
  line-height: 25px;
  margin: 2px;
  cursor: pointer;
  outline: none;

  ${(props) => getStyle(props.cellState)};
`;
