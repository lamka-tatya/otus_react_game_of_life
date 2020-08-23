import React, { FC } from "react";
import { store } from "./store";
import { Provider } from "react-redux";
import { BrowserRouter, Route } from "react-router-dom";
import { AuthScreen, GameScreen } from "./screens";

export const App: FC = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Route path="/" exact>
        <AuthScreen />
      </Route>
      <Route path="/game">
        <GameScreen />
      </Route>
    </BrowserRouter>
  </Provider>
);
