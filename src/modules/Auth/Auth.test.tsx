import React from "react";
import { mount, ReactWrapper } from "enzyme";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import {
  setUserName,
  setUserGender,
  setUser,
  getStoredUser,
} from "@/modules/Auth/authReducer";
import { Auth } from "./Auth";
import { initialAppState } from "@/store";

describe("When render auth", () => {
  let wrapper: ReactWrapper;
  let store: any;
  const mockStore = configureStore([]);

  beforeEach(() => {
    store = mockStore(initialAppState);

    wrapper = mount(
      <Provider store={store}>
        <BrowserRouter>
          <Auth />
        </BrowserRouter>
      </Provider>
    );
  });

  it("should has robot gender selected", () => {
    const input = wrapper.find('input[value="robot"]');

    expect((input.instance() as any).checked).toBeTruthy();
  });

  it("should call get stored user", () => {
    expect(store.getActions()).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          type: getStoredUser.type,
        }),
      ])
    );
  });

  it("should be able to change name", () => {
    const name = wrapper.find('input[name="userName"]');

    name.simulate("change", {
      target: {
        value: "test name",
      },
    });

    expect(store.getActions()).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          type: setUserName.type,
          payload: "test name",
        }),
      ])
    );
  });

  it("should be able to change gender", () => {
    const input = wrapper.find('input[value="male"]');

    input.simulate("change", {
      target: {
        value: "male",
      },
    });

    expect(store.getActions()).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          type: setUserGender.type,
          payload: "male",
        }),
      ])
    );
  });

  it("should set user on submit", async () => {
    const { container } = render(
      <Provider store={store}>
        <BrowserRouter>
          <Auth />
        </BrowserRouter>
      </Provider>
    );

    const submit = container.querySelector('button[type="submit"]');
    await waitFor(() => {
      fireEvent.click(submit!);
    });

    expect(store.getActions()).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          type: setUser.type,
          payload: { name: "", gender: "robot" },
        }),
      ])
    );
  });
});
