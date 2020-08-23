import React, { FC } from "react";
import { store } from "./store";
import { Provider } from "react-redux";
import { Auth } from "./modules/Auth";

export const App: FC = () => (
  <Provider store={store}>
    <Auth/>
  </Provider>
);
