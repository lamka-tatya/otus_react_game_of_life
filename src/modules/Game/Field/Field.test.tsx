import { mount, ReactWrapper } from "enzyme";
import React from "react";
import { Field } from "./Field";
import { Provider } from "react-redux";
import { store, restore } from "@/store";
import { setSettings } from "../gameReducer";

describe("Field tests", () => {
  const getWrapper: (
    columnCount: number,
    rowCount: number,
    fillingPercent: number
  ) => ReactWrapper = (columnCount, rowCount, fillingPercent) => {
    store.dispatch(
      setSettings({
        height: 200,
        width: 200,
        rowCount,
        columnCount,
        fillingPercent,
        frequency: 0,
      })
    );

    return mount(
      <Provider store={store}>
        <Field />
      </Provider>
    );
  };

  beforeEach(() => {
    store.dispatch(restore());
  });

  describe("Field is rendered with 2 columns and 2 rows", () => {
    it("should has 4 cells", () => {
      const wrapper = getWrapper(2, 2, 0);
      const cells = wrapper.findWhere((x) => x.hasClass(/CellStyled/));

      expect(cells.length).toBe(4);
    });
  });

  describe("Dead cell is clicked", () => {
    it("should became alive", () => {
      const wrapper = getWrapper(1, 1, 0);
      const deadCell = wrapper.findWhere((x) => x.hasClass(/deadStyle/));

      deadCell.simulate("click");

      const aliveCell = wrapper.findWhere((x) => x.hasClass(/aliveStyle/));
      expect(aliveCell.exists()).toBeTruthy();
    });
  });

  describe("Field is rendered with 10 columns and 10 rows", () => {
    it.each([
      [4, 4],
      [25, 25],
      [6, 6],
      [96, 96],
    ])(
      "and max alive percent is %s, it should has less or equal %s alive cells",
      (percent, maxAliveCount) => {
        const wrapper = getWrapper(10, 10, percent);
        const aliveCellsCount = wrapper.findWhere((x) =>
          x.hasClass(/aliveStyle/)
        ).length;

        expect(aliveCellsCount).toBeLessThanOrEqual(maxAliveCount);
        expect(aliveCellsCount).toBeGreaterThan(0);
      }
    );
  });
});
