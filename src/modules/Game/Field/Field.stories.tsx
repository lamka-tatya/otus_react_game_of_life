import React, { FC } from "react";
import { withKnobs, number } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import { Field } from "./Field";
import { CellState } from "@/components/Cell";

export default {
  title: "Field",
  component: Field,
  decorators: [withKnobs],
};

export const FieldStory: FC = () => {
  return (
    <Field
      makeCellAlive={action("Make cell alive")}
      fieldHeight={number("Field height", 200)}
      fieldWidht={number("Field width", 200)}
      field={[
        { cells: [CellState.alive, CellState.alive, CellState.alive] },
        { cells: [CellState.dead, CellState.alive, CellState.dead] },
        { cells: [CellState.alive, CellState.dead, CellState.alive] },
      ]}
      cellHeight={number("Cell height", 20)}
      cellWidht={number("Cell width", 20)}
    />
  );
};
