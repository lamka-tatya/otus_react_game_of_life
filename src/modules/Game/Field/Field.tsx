import React, { FC, useCallback } from "react";
import { RowStyled, FieldStyled } from "./Field.styles";
import { Cell } from "@/components/Cell";
import { CellRow } from "..";

export const Field: FC<{
  makeCellAlive: ({}) => void;
  fieldHeight: number;
  fieldWidht: number;
  field: CellRow[];
  cellHeight: number;
  cellWidht: number;
}> = ({
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
