import React, { FC } from "react";
import { ImageStyled, ButtonStyled } from "./ImageButton.styles";
import DefaultImg from "./assets/default.svg";

export const ImageButton: FC<{
  src?: string;
  type: "submit" | "reset" | "button";
  onClick?: () => void;
  disabled?: boolean;
  title?: string;
  name?: string;
}> = ({ src, type, onClick, disabled, title, name }) => (
  <ButtonStyled type={type} onClick={onClick} disabled={disabled} name={name}>
    <ImageStyled
      src={src || DefaultImg}
      disabled={disabled || false}
      title={title}
    />
  </ButtonStyled>
);
