import React, { FC } from "react";
import { Game } from "./modules/Game";
import { store } from "./store";
import { Provider } from "react-redux";

export const App: FC = () => (
  <Provider store={store}>
    <Game/>
  </Provider>
);
