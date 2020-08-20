import React, { FC } from "react";
import { ImageStyled, ButtonStyled } from "./ImageButton.styles";
import DefaultImg from "./assets/default.svg";

export const ImageButton: FC<{
  src?: string;
 // type: "submit" | "reset" | "button";
  onClick?: () => void;
  disabled?: boolean;
  title?: string;
}> = ({ src, /*type,*/ onClick, disabled, title }) => (
  <ButtonStyled /*type={type}*/ onClick={onClick} disabled={disabled}>
    <ImageStyled src={src || DefaultImg} disabled={disabled || false} title={title} />
  </ButtonStyled>
);
