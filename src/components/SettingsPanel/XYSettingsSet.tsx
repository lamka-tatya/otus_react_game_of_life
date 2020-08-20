import React, { FC } from "react";
import {
  FieldsetStyled,
  FieldsContainer,
  FieldContainer,
  FieldStyled,
  ImageStyled,
} from "./SettingsPanel.styles";
import VArrowsImg from "./assets/v_arrows_svg.svg";
import HArrowsImg from "./assets/h_arrows_svg.svg";

export const XYSettingsSet: FC<{
  legend: string;
  ySettingName: string;
  xSettngName: string;
}> = ({ legend, ySettingName, xSettngName }) => (
  <FieldsetStyled>
    <legend>{legend}</legend>
    <FieldsContainer>
      <FieldContainer>
        <ImageStyled src={VArrowsImg} />
        <FieldStyled type="number" name={ySettingName} />
      </FieldContainer>
      <FieldContainer>
        <ImageStyled src={HArrowsImg} />
        <FieldStyled type="number" name={xSettngName} />
      </FieldContainer>
    </FieldsContainer>
  </FieldsetStyled>
);
