import React, { FC } from "react";
import { withKnobs, select, number } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import { Cell } from ".";
import { CellState } from ".";

export default {
  title: "Cell",
  component: Cell,
  decorators: [withKnobs],
};

export const CellStory: FC = () => {
  return (
    <Cell
      state={select("Cell state", CellState, CellState.alive)}
      onCellClick={action("Click")}
      height={number("Height", 20)}
      width={number("Width", 20)}
    />
  );
};
