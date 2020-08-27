import React, { FC } from "react";
import { withKnobs } from "@storybook/addon-knobs";
import { Field } from "./Field";
import { CellState } from "@/components/Cell";
import { Provider } from "react-redux";
import { store } from "@/store";
import { setField } from "../gameReducer";

export default {
  title: "Field",
  component: Field,
  decorators: [withKnobs],
};

export const FieldStory: FC = () => {
  store.dispatch(
    setField([
      { cells: [CellState.alive, CellState.alive, CellState.alive] },
      { cells: [CellState.dead, CellState.alive, CellState.dead] },
      { cells: [CellState.alive, CellState.dead, CellState.alive] },
    ])
  );
  return (
    <Provider store={store}>
      <Field />
    </Provider>
  );
};
