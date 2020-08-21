import { shallow, mount } from "enzyme";
import React from "react";
import { SettingsPanel, GameSettings } from ".";
import { render, fireEvent, wait } from "@testing-library/react";

describe("SettingsPanel is rendered", () => {
  it("should exist", () => {
    const panel = shallow(
      <SettingsPanel
        setIsSettingsVisible={() => {}}
        setSettings={() => {}}
        visible={true}
        settings={
          {
            height: 300,
            width: 300,
            rowCount: 10,
            columnCount: 10,
            fillingPercent: 50,
            frequency: 100,
          } as GameSettings
        }
      />
    );

    expect(panel.exists()).toBeTruthy();
  });
  it("should call set visible with false on close click", () => {
    const mock = jest.fn();
    const panel = shallow(
      <SettingsPanel
        setIsSettingsVisible={mock}
        setSettings={() => {}}
        visible={true}
        settings={
          {
            height: 300,
            width: 300,
            rowCount: 10,
            columnCount: 10,
            fillingPercent: 50,
            frequency: 100,
          } as GameSettings
        }
      />
    );

    panel.findWhere((c) => c.key() == "closeBtn").simulate("click");

    expect(mock).toHaveBeenCalledWith(false);
  });

  it("should call set settings on OK click", async () => {
    const setVisibleMock = jest.fn();
    const setSettingsMock = jest.fn();
    const { container } = render(
      <SettingsPanel
        setIsSettingsVisible={setVisibleMock}
        setSettings={setSettingsMock}
        visible={true}
        settings={
          {
            height: 300,
            width: 300,
            rowCount: 10,
            columnCount: 10,
            fillingPercent: 50,
            frequency: 100,
          } as GameSettings
        }
      />
    );

    const submit = container.querySelector('button[type="submit"]');
    await wait(() => {
      fireEvent.click(submit!);
    });

    expect(setVisibleMock).toHaveBeenCalledWith(false);
    expect(setSettingsMock).toHaveBeenCalledWith({
		height: 300,
		width: 300,
		rowCount: 10,
		columnCount: 10,
		fillingPercent: 50,
		frequency: 100,
	  });
  });
});
