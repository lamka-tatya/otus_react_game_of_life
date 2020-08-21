import { mount } from "enzyme";
import React from "react";
import { Field } from "./Field";
import { CellState } from "@/components/Cell";

describe("Field tests", () => {
  describe("Field is rendered with 2 columns and 2 rows", () => {
    it("should has 4 cells", () => {
      const wrapper = mount(
        <Field
          makeCellAlive={() => {}}
          fieldHeight={200}
          fieldWidht={200}
          field={[
            { cells: [CellState.alive, CellState.alive] },
            { cells: [CellState.dead, CellState.alive] },
          ]}
          cellHeight={20}
          cellWidht={20}
        />
      );
      const cells = wrapper.findWhere((x) => x.hasClass(/CellStyled/));

      expect(cells.length).toBe(4);
    });
  });

  describe("Dead cell is clicked", () => {
    it("should call make cell alive", () => {
      const mock = jest.fn();
      const wrapper = mount(
        <Field
          makeCellAlive={mock}
          fieldHeight={200}
          fieldWidht={200}
          field={[{ cells: [CellState.dead] }]}
          cellHeight={20}
          cellWidht={20}
        />
      );
      const deadCell = wrapper.findWhere((x) => x.hasClass(/deadStyle/));

      deadCell.simulate("click");

      expect(mock).toHaveBeenCalledTimes(1);
    });
  });
});
