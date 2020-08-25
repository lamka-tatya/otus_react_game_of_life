import { mount, ReactWrapper } from "enzyme";
import React from "react";
import { App } from "./App";
import { Provider } from "react-redux";
import { store, restore } from "./store";

describe("On app start", () => {
  let wrapper: ReactWrapper;
  beforeEach(() => {
    localStorage.clear();

    store.dispatch(restore());

    wrapper = mount(
      <Provider store={store}>
        <App />
      </Provider>
    );
  });

  it("should show hello label", () => {
    const helloLabel = wrapper.findWhere((x) => x.key() === "hello");

    expect(helloLabel.exists()).toBeTruthy();
  });

  it("should not show settings", () => {
    const settingsForm = wrapper.findWhere((x) => x.key() === "settingsForm");

    expect(settingsForm.exists()).toBeFalsy();
  });

  it("should not go to the game if name is not set", () => {
    const form = wrapper.find('form[name="authForm"]');

    form.simulate("submit");

    expect(window.location.href).toBe("http://localhost/");
  });

  it("should go to the game if name is set", async () => {
    const form = wrapper.find('form[name="authForm"]');
    const name = wrapper.find('input[name="userName"]');

    expect(window.location.href).toBe("http://localhost/");

    name.simulate("change", {
      target: {
        value: "test name",
      },
    });
    form.simulate("submit");

    expect(window.location.href).toBe("http://localhost/game");
  });
});
