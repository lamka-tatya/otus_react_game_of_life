import styled from "@emotion/styled";
import { css } from "@emotion/core";
import { SerializedStyles } from "@emotion/serialize";
import { CellState } from "./CellState";

const aliveStyle = css`
  border-color: green;
  background: green;
`;

const deadStyle = css`
  border-color: grey;
  opacity: 0.5;
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
  border: 1px solid;
  display: inline-block;
  border-radius: 20px;
  line-height: 25px;
  margin: 2px;
  cursor: pointer;
  outline: none;

  ${(props) => getStyle(props.cellState)};
`;
