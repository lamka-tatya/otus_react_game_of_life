import React, { FC, useCallback } from "react";
import { RowStyled, FieldStyled } from "./Field.styles";
import { Cell } from "@/components/Cell";
import { connect } from "react-redux";
import { AppState } from "@/store";
import {
  setField,
  makeCellAlive,
  getCellHeight,
  getCellWidth,
} from "../gameReducer";

const mapStateToProps = (state: AppState) => ({
  field: state.game.field,
  fieldHeight: state.game.settings.height,
  fieldWidht: state.game.settings.width,
  cellHeight: getCellHeight(state),
  cellWidht: getCellWidth(state),
});

const mapDispatchToProps = { setField, makeCellAlive };

type FieldProps = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps;

const FieldInternal: FC<FieldProps> = ({
  makeCellAlive,
  fieldHeight,
  fieldWidht,
  field,
  cellHeight,
  cellWidht,
}) => {
  const onCellClick = useCallback(
    (colIndex: number, rowIndex: number) => {
      makeCellAlive({ colIndex, rowIndex });
    },
    [makeCellAlive]
  );
  return (
    <FieldStyled width={fieldWidht} height={fieldHeight}>
      {field.map((row, rowIndex) => (
        <RowStyled key={rowIndex}>
          {row.cells.map((cell, colIndex) => (
            <Cell
              key={colIndex}
              state={cell}
              height={cellHeight}
              width={cellWidht}
              onCellClick={() => onCellClick(colIndex, rowIndex)}
            />
          ))}
        </RowStyled>
      ))}
    </FieldStyled>
  );
};

export const Field = connect(
  mapStateToProps,
  mapDispatchToProps
)(FieldInternal);
