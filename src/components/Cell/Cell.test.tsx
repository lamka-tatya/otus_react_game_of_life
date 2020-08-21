import { shallow } from "enzyme";
import { Cell } from ".";
import React from "react";
import { CellState } from ".";

describe("Cell is rendered", () => {
  it.each`
    stateName  | state
    ${"alive"} | ${CellState.alive}
    ${"dead"}  | ${CellState.dead}
  `(`when cell is $stateName`, (state) => {
    const cell = shallow(
      <Cell state={state} onCellClick={jest.fn()} height={30} width={30} />
    );

    expect(cell.exists()).toBeTruthy();
  });
});

describe("When click on cell", () => {
  it("should call handler from props", () => {
    const mock = jest.fn();
    const wrapper = shallow(<Cell state={CellState.dead} onCellClick={mock} height={30} width={30}/>);

    wrapper.simulate("click");

    expect(mock).toHaveBeenCalledTimes(1);
  });
});
