import React, { FC } from "react";
import { OverlayStyled, OverlayChildrenStyled } from "./SettingsPanel.styles";

export const Overlay: FC = ({ children }) => (
  <>
    <OverlayStyled />
    <OverlayChildrenStyled>{children}</OverlayChildrenStyled>
  </>
);
